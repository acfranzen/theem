import { desc, and, eq, isNull } from 'drizzle-orm';
import { db } from './drizzle';
import { activityLogs, teamMembers, teams, themes, users } from './schema';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/session';

export async function getUser() {
  const sessionCookie = (await cookies()).get('session');
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  const sessionData = await verifyToken(sessionCookie.value);
  if (!sessionData || !sessionData.user || typeof sessionData.user.id !== 'number') {
    return null;
  }

  if (new Date(sessionData.expires) < new Date()) {
    return null;
  }

  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.id, sessionData.user.id), isNull(users.deletedAt)))
    .limit(1);

  if (user.length === 0) {
    return null;
  }

  return user[0];
}

export async function getTeamByStripeCustomerId(customerId: string) {
  const result = await db
    .select()
    .from(teams)
    .where(eq(teams.stripeCustomerId, customerId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function updateTeamSubscription(
  teamId: number,
  subscriptionData: {
    stripeSubscriptionId: string | null;
    stripeProductId: string | null;
    planName: string | null;
    subscriptionStatus: string;
  }
) {
  await db
    .update(teams)
    .set({
      ...subscriptionData,
      updatedAt: new Date(),
    })
    .where(eq(teams.id, teamId));
}

export async function getUserWithTeam(userId: number) {
  const result = await db
    .select({
      user: users,
      teamId: teamMembers.teamId,
    })
    .from(users)
    .leftJoin(teamMembers, eq(users.id, teamMembers.userId))
    .where(eq(users.id, userId))
    .limit(1);

  return result[0];
}

export async function getActivityLogs() {
  const user = await getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  return await db
    .select({
      id: activityLogs.id,
      action: activityLogs.action,
      timestamp: activityLogs.timestamp,
      ipAddress: activityLogs.ipAddress,
      userName: users.name,
    })
    .from(activityLogs)
    .leftJoin(users, eq(activityLogs.userId, users.id))
    .where(eq(activityLogs.userId, user.id))
    .orderBy(desc(activityLogs.timestamp))
    .limit(10);
}

export async function getTeamForUser(userId: number) {
  const result = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      teamMembers: {
        with: {
          team: {
            with: {
              teamMembers: {
                with: {
                  user: {
                    columns: {
                      id: true,
                      name: true,
                      email: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return result?.teamMembers[0]?.team || null;
}

// Theme related queries
export async function getUserThemes(userId: number) {
  return await db
    .select()
    .from(themes)
    .where(eq(themes.userId, userId))
    .orderBy(desc(themes.updatedAt));
}

export async function getUserDefaultTheme(userId: number) {
  const result = await db
    .select()
    .from(themes)
    .where(and(eq(themes.userId, userId), eq(themes.isDefault, true)))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function saveUserTheme(
  userId: number,
  themeName: string,
  lightTheme: any,
  darkTheme: any,
  isDefault: boolean = false
) {
  // If this theme is set as default, update any existing default themes
  if (isDefault) {
    await db
      .update(themes)
      .set({ isDefault: false })
      .where(and(eq(themes.userId, userId), eq(themes.isDefault, true)));
  }

  return await db
    .insert(themes)
    .values({
      userId,
      name: themeName,
      lightTheme,
      darkTheme,
      isDefault,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();
}

export async function updateUserTheme(
  themeId: number,
  userId: number,
  updates: {
    name?: string;
    lightTheme?: any;
    darkTheme?: any;
    isDefault?: boolean;
  }
) {
  // If this theme is set as default, update any existing default themes
  if (updates.isDefault) {
    await db
      .update(themes)
      .set({ isDefault: false })
      .where(and(eq(themes.userId, userId), eq(themes.isDefault, true)));
  }

  return await db
    .update(themes)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(and(eq(themes.id, themeId), eq(themes.userId, userId)))
    .returning();
}

export async function deleteUserTheme(themeId: number, userId: number) {
  const themeToDelete = await db
    .select()
    .from(themes)
    .where(and(eq(themes.id, themeId), eq(themes.userId, userId)))
    .limit(1);

  if (themeToDelete.length === 0) {
    return null;
  }

  // Delete the theme
  await db.delete(themes).where(and(eq(themes.id, themeId), eq(themes.userId, userId)));

  return themeToDelete[0];
}

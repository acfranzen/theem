'use server';

import { revalidatePath } from 'next/cache';
import {
  getUserThemes,
  getUserDefaultTheme,
  saveUserTheme,
  updateUserTheme,
  deleteUserTheme,
} from '@/lib/db/queries';
import { getUser } from '@/lib/db/queries';
import { NewTheme, Theme } from '@/lib/db/schema';
import { ThemeMode } from '@/lib/picker/theme-utils';

export type ThemeData = {
  id?: number;
  name: string;
  isDefault?: boolean;
  light: Record<string, string>;
  dark: Record<string, string>;
};

/**
 * Get all themes for the current user
 */
export async function getUserThemesList(): Promise<ThemeData[]> {
  const user = await getUser();
  if (!user) {
    return [];
  }

  const themes = await getUserThemes(user.id);

  return themes.map(theme => ({
    id: theme.id,
    name: theme.name,
    isDefault: theme.isDefault,
    light: theme.lightTheme as Record<string, string>,
    dark: theme.darkTheme as Record<string, string>,
  }));
}

/**
 * Get the default theme for the current user
 */
export async function getCurrentUserDefaultTheme(): Promise<ThemeData | null> {
  const user = await getUser();
  if (!user) {
    return null;
  }

  const theme = await getUserDefaultTheme(user.id);
  if (!theme) {
    return null;
  }

  return {
    id: theme.id,
    name: theme.name,
    isDefault: theme.isDefault,
    light: theme.lightTheme as Record<string, string>,
    dark: theme.darkTheme as Record<string, string>,
  };
}

/**
 * Save a theme for the current user
 */
export async function saveTheme(themeData: ThemeData): Promise<ThemeData | null> {
  const user = await getUser();
  if (!user) {
    return null;
  }

  const result = await saveUserTheme(
    user.id,
    themeData.name,
    themeData.light,
    themeData.dark,
    themeData.isDefault || false
  );

  if (!result || result.length === 0) {
    return null;
  }

  const savedTheme = result[0];

  revalidatePath('/settings/themes');

  return {
    id: savedTheme.id,
    name: savedTheme.name,
    isDefault: savedTheme.isDefault,
    light: savedTheme.lightTheme as Record<string, string>,
    dark: savedTheme.darkTheme as Record<string, string>,
  };
}

/**
 * Update an existing theme
 */
export async function updateTheme(
  themeId: number,
  updates: Partial<ThemeData>
): Promise<ThemeData | null> {
  const user = await getUser();
  if (!user) {
    return null;
  }

  const updateData: any = {};

  if (updates.name) {
    updateData.name = updates.name;
  }

  if (updates.isDefault !== undefined) {
    updateData.isDefault = updates.isDefault;
  }

  if (updates.light) {
    updateData.lightTheme = updates.light;
  }

  if (updates.dark) {
    updateData.darkTheme = updates.dark;
  }

  const result = await updateUserTheme(themeId, user.id, updateData);

  if (!result || result.length === 0) {
    return null;
  }

  const updatedTheme = result[0];

  revalidatePath('/settings/themes');

  return {
    id: updatedTheme.id,
    name: updatedTheme.name,
    isDefault: updatedTheme.isDefault,
    light: updatedTheme.lightTheme as Record<string, string>,
    dark: updatedTheme.darkTheme as Record<string, string>,
  };
}

/**
 * Delete a theme
 */
export async function removeTheme(themeId: number): Promise<boolean> {
  const user = await getUser();
  if (!user) {
    return false;
  }

  const result = await deleteUserTheme(themeId, user.id);

  revalidatePath('/settings/themes');

  return !!result;
}

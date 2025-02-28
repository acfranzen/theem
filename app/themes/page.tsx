import { getUserThemesList, ThemeData } from '@/lib/services/theme-service';
import ThemeCreator from '@/components/picker/theme-creator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Suspense } from 'react';
import ThemeManagerClient from '@/components/themes/theme-manager-client';

export const metadata = {
  title: 'My Themes',
  description: 'Create, customize, and manage your themes',
};

export default async function ThemesPage() {
  const themes = await getUserThemesList();

  return (
    <Suspense fallback={<div>Loading your themes...</div>}>
      <ThemeManagerClient initialThemes={themes} />
    </Suspense>
  );
}

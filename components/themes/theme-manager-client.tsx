'use client';

import { useState, useRef, useEffect } from 'react';
import ThemeManager from '@/components/picker/theme-manager';
import { ThemeData } from '@/lib/services/theme-service';
import { useTheme } from 'next-themes';
import { ThemeMode, getActiveThemeMode, applyThemeToDOM } from '@/lib/picker/theme-utils';
import { defaultTheme } from '@/components/picker/defaults/defaultTheme';

interface ThemeManagerClientProps {
  initialThemes: ThemeData[];
}

export default function ThemeManagerClient({ initialThemes }: ThemeManagerClientProps) {
  const [themes, setThemes] = useState<ThemeData[]>(initialThemes);
  const { theme: currentTheme, setTheme } = useTheme();

  // Use a ref to store the current theme without triggering re-renders
  const themeColorsRef = useRef<Record<ThemeMode, any>>({
    light: { ...defaultTheme.light },
    dark: { ...defaultTheme.dark },
  });

  // Handle applying a saved theme
  const handleSelectTheme = (theme: ThemeData) => {
    // Update the theme colors reference
    themeColorsRef.current = {
      light: { ...theme.light },
      dark: { ...theme.dark },
    };

    // Get the current active mode
    const activeMode = getActiveThemeMode(currentTheme);

    // Apply the active theme to DOM
    applyThemeToDOM(themeColorsRef.current, activeMode, document.documentElement, false);

    // For the inactive theme, we'll use data attributes
    const inactiveMode: ThemeMode = activeMode === 'light' ? 'dark' : 'light';

    // Store the inactive theme using data attributes
    const inactiveTheme = theme[inactiveMode];
    Object.entries(inactiveTheme).forEach(([key, value]) => {
      // Handle data-attributes appropriately based on the key
      const dataKey = key.replace(/-([a-z])/g, (_, p1) => p1.toUpperCase());
      document.documentElement.style.setProperty(`--${key}`, `hsl(${value})`);
    });
  };

  return (
    <div className='container py-6 space-y-6'>
      <header className='sticky top-0 z-[15] w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/5 dark:shadow-secondary border-b'>
        <div className='container h-14 flex items-center justify-between pl-4 sm:px-8'>
          <h1 className='font-bold text-foreground pl-4'>My Themes</h1>
        </div>
      </header>
      <ThemeManager
        themes={themes}
        currentTheme={themeColorsRef.current}
        onSelectTheme={handleSelectTheme}
      />
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { ModeToggle } from '@/components/mode-toggle';
import { useTheme } from 'next-themes';
import React from 'react';
import {
  ThemeMode,
  ThemeColors,
  EditorMode,
  updateAllHues,
  randomizeTheme,
  generateThemeCode,
  extractHueFromColor,
  getThemePreviewStyles,
  getActiveThemeMode,
} from '@/lib/picker/theme-utils';
import ThemeEditor from '@/components/picker/theme-editor';
import ThemePreview from '@/components/picker/theme-preview';
import { defaultTheme } from './defaultTheme';

// Default theme values

// Type for theme color key
type ThemeColorKey = keyof typeof defaultTheme.light;

export default function ThemeCreator() {
  const [themeColors, setThemeColors] = useState<Record<ThemeMode, ThemeColors>>({
    light: { ...defaultTheme.light },
    dark: { ...defaultTheme.dark },
  });
  const [copied, setCopied] = useState(false);
  const { theme: currentTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [editorMode, setEditorMode] = useState<EditorMode>('advanced');
  const [currentHue, setCurrentHue] = useState<number>(295); // Default hue value

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize the currentHue value from the theme colors on mount
  useEffect(() => {
    if (!mounted) return;

    const mode = getActiveThemeMode(currentTheme);
    const primaryColor = themeColors[mode].primary;
    const hue = extractHueFromColor(primaryColor);
    setCurrentHue(hue);
  }, [mounted, themeColors, currentTheme]);

  // When component mounts, apply the theme styles to document.documentElement
  useEffect(() => {
    if (!mounted) return;

    const mode = getActiveThemeMode(currentTheme);

    // Apply active theme colors
    const activeTheme = themeColors[mode];
    Object.entries(activeTheme).forEach(([key, value]) => {
      if (key === 'radius') {
        document.documentElement.style.setProperty(`--${key}`, value);
      } else {
        document.documentElement.style.setProperty(`--${key}`, `hsl(${value})`);
      }
    });

    // Cleanup function
    return () => {
      // Reset to default theme or clean up as needed
      Object.keys(themeColors[mode]).forEach(key => {
        document.documentElement.style.removeProperty(`--${key}`);
      });
    };
  }, [themeColors, currentTheme, mounted]);

  const handleColorChange = (key: string, value: string, mode: ThemeMode) => {
    setThemeColors(prev => ({
      ...prev,
      [mode]: {
        ...prev[mode],
        [key]: value,
      },
    }));
  };

  // Update all hues with new value
  const handleHueChange = (newHue: number) => {
    setCurrentHue(newHue);
    setThemeColors(updateAllHues(themeColors, newHue));
  };

  // Handle randomize theme
  const handleRandomizeTheme = () => {
    const { updatedThemes, newHue } = randomizeTheme(themeColors);
    setCurrentHue(newHue);
    setThemeColors(updatedThemes);
  };

  // Handle editor mode change
  const handleEditorModeChange = (mode: EditorMode) => {
    setEditorMode(mode);
  };

  // Handle theme toggle
  const handleThemeToggle = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  // Handle copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateThemeCode(themeColors));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast('Theme code has been copied to your clipboard');
  };

  if (!mounted) {
    return <div>Loading...</div>;
  }

  const activeMode = getActiveThemeMode(currentTheme);

  return (
    <div
      className='flex flex-col min-h-screen'
      style={getThemePreviewStyles(themeColors, activeMode)}
    >
      <header className='border-b'>
        <div className='container flex items-center justify-between h-16 px-4'>
          <h1 className='text-2xl font-bold'>ShadCN Theme Creator</h1>
          <div className='flex items-center gap-4'>
            <Button onClick={copyToClipboard} variant='outline' size='sm'>
              {copied ? <Check className='w-4 h-4 mr-2' /> : <Copy className='w-4 h-4 mr-2' />}
              Copy Code
            </Button>
            <Button size='sm'>Generate Theme</Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      <div className='flex flex-col md:flex-row flex-1'>
        {/* Theme Editor Component */}
        <ThemeEditor
          themeColors={themeColors}
          activeMode={activeMode}
          currentHue={currentHue}
          editorMode={editorMode}
          currentTheme={currentTheme}
          onColorChange={handleColorChange}
          onHueChange={handleHueChange}
          onRandomizeTheme={handleRandomizeTheme}
          onEditorModeChange={handleEditorModeChange}
          onThemeToggle={handleThemeToggle}
        />

        {/* Theme Preview Component */}
        <ThemePreview />
      </div>
      <Toaster />
    </div>
  );
}

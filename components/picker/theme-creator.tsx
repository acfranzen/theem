'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  applyThemeToDOM,
  toCamelCase,
  updateThemeColor,
  updateAllThemeHues,
} from '@/lib/picker/theme-utils';
import ThemeEditor from '@/components/picker/theme-editor';
import ThemePreview from '@/components/picker/theme-preview';
import { defaultTheme } from './defaultTheme';

// Type for theme color key
type ThemeColorKey = keyof typeof defaultTheme.light;

export default function ThemeCreator() {
  // Use a ref to store the current theme without triggering re-renders
  const themeColorsRef = useRef<Record<ThemeMode, ThemeColors>>({
    light: { ...defaultTheme.light },
    dark: { ...defaultTheme.dark },
  });

  // Only use state for UI-driven elements that need rendering
  const [copied, setCopied] = useState(false);
  const { theme: currentTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [editorMode, setEditorMode] = useState<EditorMode>('simple');
  const currentHueRef = useRef<number>(295); // Use ref instead of state

  // Track when we need to force an editor update (for slider and UI refresh)
  const [forceEditorUpdate, setForceEditorUpdate] = useState(0);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize the currentHue value from the theme colors on mount
  useEffect(() => {
    if (!mounted) return;

    const mode = getActiveThemeMode(currentTheme);
    const primaryColor = themeColorsRef.current[mode].primary;
    const hue = extractHueFromColor(primaryColor);
    currentHueRef.current = hue;

    // Apply the theme on initial mount
    applyThemeToDOM(themeColorsRef.current, mode);
  }, [mounted, currentTheme]);

  // Update all hues with new value without re-rendering
  const handleHueChange = useCallback(
    (newHue: number) => {
      // Use the utility function from theme-utils
      updateAllThemeHues({
        newHue,
        themeColorsRef,
        currentTheme,
        currentHueRef,
        setForceEditorUpdate,
      });
    },
    [currentTheme]
  );

  // Handle color change for a specific color with complete HSL values
  const handleColorChange = useCallback(
    (key: string, value: string, mode: ThemeMode) => {
      // Use the utility function from theme-utils
      updateThemeColor({
        themeColorsRef,
        key,
        value,
        mode,
        currentTheme,
        currentHueRef,
        setForceEditorUpdate,
      });
    },
    [currentTheme]
  );

  // Handle randomize theme
  const handleRandomizeTheme = useCallback(() => {
    const { updatedThemes, newHue } = randomizeTheme(themeColorsRef.current);
    currentHueRef.current = newHue;
    themeColorsRef.current = updatedThemes;

    // Get the current active mode
    const activeMode = getActiveThemeMode(currentTheme);

    // Apply the active theme to DOM
    // Use forceApply=false here since we only want to apply the current theme
    applyThemeToDOM(themeColorsRef.current, activeMode, document.documentElement, false);

    // For the inactive theme, we'll use data attributes
    const inactiveMode: ThemeMode = activeMode === 'light' ? 'dark' : 'light';

    // Store the inactive theme using data attributes
    const inactiveTheme = themeColorsRef.current[inactiveMode];
    Object.entries(inactiveTheme).forEach(([key, value]) => {
      // Convert key to camelCase for dataset property
      const dataKey = toCamelCase(`${inactiveMode}-${key}`);

      if (key === 'radius') {
        document.documentElement.dataset[dataKey] = value;
      } else {
        document.documentElement.dataset[dataKey] = `hsl(${value})`;
      }
    });

    // Trigger a force update on the parent to refresh UI elements
    setForceEditorUpdate(prev => prev + 1);
  }, [currentTheme]);

  // Handle editor mode change
  const handleEditorModeChange = useCallback((mode: EditorMode) => {
    setEditorMode(mode);
  }, []);

  // Handle theme toggle
  const handleThemeToggle = useCallback(() => {
    // Get the current theme mode and determine what we're switching to
    const currentMode = getActiveThemeMode(currentTheme);
    const newMode: ThemeMode = currentMode === 'light' ? 'dark' : 'light';

    // Apply the new theme with forceApply=true to ensure it's applied
    // regardless of current theme class state
    applyThemeToDOM(themeColorsRef.current, newMode, document.documentElement, true);

    // Toggle the theme which will update the classes
    setTheme(newMode);

    // Force a UI update after theme change
    setForceEditorUpdate(prev => prev + 1);
  }, [currentTheme, setTheme]);

  // Handle copy to clipboard
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(generateThemeCode(themeColorsRef.current));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast('Theme code has been copied to your clipboard');
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  const activeMode = getActiveThemeMode(currentTheme);

  return (
    <div
      className='flex flex-col min-h-screen'
      // Use inline styles for theme preview to avoid re-renders
      style={getThemePreviewStyles(themeColorsRef.current, activeMode)}
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
        {/* Theme Editor Component - avoid remounting with key changes */}
        <ThemeEditor
          themeColors={themeColorsRef.current}
          activeMode={activeMode}
          currentHue={currentHueRef.current}
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

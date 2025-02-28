'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Copy, Check, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
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
import ThemeImportModal from '@/components/picker/theme-import-modal';
import { defaultTheme } from './defaults/defaultTheme';
import { ModeToggle } from '../mode-toggle';
import { SidebarTrigger } from '../ui/sidebar';
import { ScrollArea } from '../ui/scroll-area';
import { FontOption, applyFontToDocument, fontOptions } from '@/lib/picker/font-utils';
import { saveTheme, getUserThemesList, ThemeData } from '@/lib/services/theme-service';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  const [currentFont, setCurrentFont] = useState<string>('Manrope'); // Default font

  // Track when we need to force an editor update (for slider and UI refresh)
  const [forceEditorUpdate, setForceEditorUpdate] = useState(0);
  const [importModalOpen, setImportModalOpen] = useState(false);

  // Add state for saving to database
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [themeName, setThemeName] = useState('My Custom Theme');
  const [isDefault, setIsDefault] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isThemeSaved, setIsThemeSaved] = useState(false);

  // Check if theme is already saved
  const checkIfThemeIsSaved = useCallback(async () => {
    try {
      const userThemes = await getUserThemesList();
      // Compare current theme with saved themes
      // This is a simple check - you might want a more sophisticated comparison
      const themeFound = userThemes.some(
        savedTheme =>
          JSON.stringify(savedTheme.light) === JSON.stringify(themeColorsRef.current.light) &&
          JSON.stringify(savedTheme.dark) === JSON.stringify(themeColorsRef.current.dark)
      );
      setIsThemeSaved(themeFound);
      return themeFound;
    } catch (error) {
      console.error('Error checking if theme is saved:', error);
      return false;
    }
  }, []);

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

    // Apply the default font on initial mount
    const defaultFont = fontOptions.find(font => font.family === currentFont);
    if (defaultFont) {
      applyFontToDocument(defaultFont);
    }

    // Check if theme is already saved
    checkIfThemeIsSaved();
  }, [mounted, currentTheme, currentFont, checkIfThemeIsSaved]);

  // Check if theme is saved when it changes significantly
  useEffect(() => {
    if (!mounted) return;
    // Debounce the check to avoid too many API calls
    const timer = setTimeout(() => {
      checkIfThemeIsSaved();
    }, 1000);

    return () => clearTimeout(timer);
  }, [forceEditorUpdate, checkIfThemeIsSaved, mounted]);

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

  // Handle imported theme
  const handleImportTheme = useCallback(
    (importedTheme: Record<ThemeMode, ThemeColors>) => {
      // Update the theme colors reference
      themeColorsRef.current = importedTheme;

      // Get the current active mode
      const activeMode = getActiveThemeMode(currentTheme);

      // Apply the active theme to DOM
      applyThemeToDOM(importedTheme, activeMode, document.documentElement, false);

      // For the inactive theme, store as data attributes
      const inactiveMode: ThemeMode = activeMode === 'light' ? 'dark' : 'light';
      const inactiveTheme = importedTheme[inactiveMode];

      Object.entries(inactiveTheme).forEach(([key, value]) => {
        const dataKey = toCamelCase(`${inactiveMode}-${key}`);

        if (key === 'radius') {
          document.documentElement.dataset[dataKey] = value;
        } else {
          // Special handling for sidebar background
          if (key === 'sidebar-background') {
            const sidebarKey = toCamelCase(`${inactiveMode}-sidebar`);
            document.documentElement.dataset[sidebarKey] = `hsl(${value})`;
          } else {
            document.documentElement.dataset[dataKey] = `hsl(${value})`;
          }
        }
      });

      // Extract hue from primary color for the hue selector
      const primaryColor = importedTheme[activeMode].primary;
      const hue = extractHueFromColor(primaryColor);
      currentHueRef.current = hue;

      // Force UI update
      setForceEditorUpdate(prev => prev + 1);

      // Show success message
      toast('Theme imported successfully');
    },
    [currentTheme]
  );

  // Handle font change
  const handleFontChange = useCallback((font: FontOption) => {
    setCurrentFont(font.family);
    // Font will be applied by the FontSelector component through the FontProvider
  }, []);

  // Handle save to database
  const handleSaveToDatabase = useCallback(async () => {
    try {
      // First check if theme is already saved
      const alreadySaved = await checkIfThemeIsSaved();
      if (alreadySaved) {
        toast('This theme is already saved in your account');
        return;
      }

      setIsSaving(true);

      const themeData: ThemeData = {
        name: themeName,
        isDefault: isDefault,
        light: themeColorsRef.current.light,
        dark: themeColorsRef.current.dark,
      };

      await saveTheme(themeData);

      // Close the dialog
      setSaveDialogOpen(false);
      setIsThemeSaved(true);

      // Show success message
      toast('Theme saved successfully');
    } catch (error) {
      console.error('Error saving theme:', error);
      toast.error('Failed to save theme');
    } finally {
      setIsSaving(false);
    }
  }, [themeName, isDefault, checkIfThemeIsSaved]);

  // Handle selecting a default theme
  const handleSelectDefaultTheme = useCallback(
    (themeName: string, theme: any) => {
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

      // Extract hue from primary color
      const primaryColor = theme[activeMode].primary;
      const hue = extractHueFromColor(primaryColor);
      currentHueRef.current = hue;

      // Force UI update
      setForceEditorUpdate(prev => prev + 1);

      // Show toast notification
      toast(`${themeName.replace('Theme', '')} theme applied successfully`);
    },
    [currentTheme]
  );

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
      <header className='sticky top-0 z-[15] w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/5 dark:shadow-secondary border-b'>
        <div className='container h-14 flex items-center justify-between pl-4 sm:px-8'>
          <div className='flex items-center space-x-4 lg:space-x-0'>
            <SidebarTrigger />
            <h1 className='font-bold text-foreground pl-4'>Create a Theme</h1>
          </div>
          <div className='flex items-center gap-4'>
            <ModeToggle onClick={() => handleThemeToggle()} />
            <Button onClick={copyToClipboard} variant='outline' size='sm'>
              {copied ? <Check className='w-4 h-4 mr-2' /> : <Copy className='w-4 h-4 mr-2' />}
              Copy Code
            </Button>
            <Button onClick={() => setImportModalOpen(true)} size='sm'>
              Import Theme
            </Button>
            <Button
              onClick={() => setSaveDialogOpen(true)}
              variant='default'
              size='sm'
              disabled={isThemeSaved}
            >
              <Save className='w-4 h-4 mr-2' />
              {isThemeSaved ? 'Theme Saved' : 'Save Theme'}
            </Button>
          </div>
        </div>
      </header>

      <div className='flex flex-col md:flex-row flex-1 px-4 bg-card'>
        {/* Theme Editor Component - avoid remounting with key changes */}
        <ThemeEditor
          themeColors={themeColorsRef.current}
          activeMode={activeMode}
          currentHue={currentHueRef.current}
          editorMode={editorMode}
          currentTheme={currentTheme}
          currentFont={currentFont}
          onColorChange={handleColorChange}
          onHueChange={handleHueChange}
          onRandomizeTheme={handleRandomizeTheme}
          onEditorModeChange={handleEditorModeChange}
          onThemeToggle={handleThemeToggle}
          onFontChange={handleFontChange}
          onSelectDefaultTheme={handleSelectDefaultTheme}
        />

        {/* Theme Preview Component */}
        <ScrollArea className='w-full h-[calc(100vh-3.5rem-2rem)] bg-background'>
          <ThemePreview />
        </ScrollArea>
      </div>

      <ThemeImportModal
        open={importModalOpen}
        onOpenChange={setImportModalOpen}
        onImport={handleImportTheme}
      />

      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Theme</DialogTitle>
            <DialogDescription>Save your current theme to your account</DialogDescription>
          </DialogHeader>

          <div className='space-y-4 py-2'>
            <div className='space-y-2'>
              <Label htmlFor='db-theme-name'>Theme Name</Label>
              <Input
                id='db-theme-name'
                value={themeName}
                onChange={e => setThemeName(e.target.value)}
                placeholder='My Custom Theme'
              />
            </div>

            <div className='flex items-center space-x-2'>
              <input
                type='checkbox'
                id='db-is-default'
                checked={isDefault}
                onChange={e => setIsDefault(e.target.checked)}
                className='h-4 w-4 rounded border-gray-300'
              />
              <Label htmlFor='db-is-default'>Set as default theme</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant='outline' onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveToDatabase} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Theme'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  );
}

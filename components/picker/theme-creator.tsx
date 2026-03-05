'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';
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
  getRandomHue,
} from '@/lib/picker/theme-utils';
import { useStyleContext } from '@/lib/picker/style-context';
import { resolveStyleToDOM } from '@/lib/picker/style-resolver';
import ThemeEditor from '@/components/picker/theme-editor';
import ThemeImportModal from '@/components/picker/theme-import-modal';
import StyleSelector from '@/components/picker/style-selector';
import StyleControls from '@/components/picker/style-controls';
import PreviewSwitcher from '@/components/picker/preview/preview-switcher';
import { defaultTheme } from './defaults/defaultTheme';
import { ModeToggle } from '../mode-toggle';
import { SidebarTrigger } from '../ui/sidebar';
import { ScrollArea } from '../ui/scroll-area';
import { FontOption, applyFontToDocument, fontOptions } from '@/lib/picker/font-utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Type for theme color key
type ThemeColorKey = keyof typeof defaultTheme.light;

export default function ThemeCreator() {
  const { activeStyle, profile, resolvedSurface, resolvedComposition } = useStyleContext();

  // Use a ref to store the current theme without triggering re-renders
  const themeColorsRef = useRef<Record<ThemeMode, ThemeColors>>({
    light: { ...profile.tokens.light },
    dark: { ...profile.tokens.dark },
  });

  // Only use state for UI-driven elements that need rendering
  const [copied, setCopied] = useState(false);
  const { theme: currentTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [editorMode, setEditorMode] = useState<EditorMode>('simple');
  const currentHueRef = useRef<number>(getRandomHue());
  const [currentFont, setCurrentFont] = useState<string>('Manrope');
  const [leftTab, setLeftTab] = useState<string>('styles');

  // Track when we need to force an editor update (for slider and UI refresh)
  const [forceEditorUpdate, setForceEditorUpdate] = useState(0);
  const [importModalOpen, setImportModalOpen] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // When style changes, apply the new profile's tokens
  useEffect(() => {
    if (!mounted) return;

    // Load the style's token set
    themeColorsRef.current = {
      light: { ...profile.tokens.light },
      dark: { ...profile.tokens.dark },
    };

    const mode = getActiveThemeMode(currentTheme);

    // Apply full style resolution (tokens + composition + surface)
    resolveStyleToDOM(profile, mode, resolvedSurface, resolvedComposition);

    // Apply the default font on initial mount
    const defaultFont = fontOptions.find(font => font.family === currentFont);
    if (defaultFont) {
      applyFontToDocument(defaultFont);
    }

    // Force UI update
    setForceEditorUpdate(prev => prev + 1);
  }, [mounted, activeStyle, profile, currentTheme, resolvedSurface, resolvedComposition, currentFont]);

  // Update all hues with new value without re-rendering
  const handleHueChange = useCallback(
    (newHue: number) => {
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

    const activeMode = getActiveThemeMode(currentTheme);
    applyThemeToDOM(themeColorsRef.current, activeMode, document.documentElement, false);

    const inactiveMode: ThemeMode = activeMode === 'light' ? 'dark' : 'light';
    const inactiveTheme = themeColorsRef.current[inactiveMode];
    Object.entries(inactiveTheme).forEach(([key, value]) => {
      const dataKey = toCamelCase(`${inactiveMode}-${key}`);
      if (key === 'radius') {
        document.documentElement.dataset[dataKey] = value;
      } else {
        document.documentElement.dataset[dataKey] = `hsl(${value})`;
      }
    });

    setForceEditorUpdate(prev => prev + 1);
  }, [currentTheme]);

  // Handle editor mode change
  const handleEditorModeChange = useCallback((mode: EditorMode) => {
    setEditorMode(mode);
  }, []);

  // Handle theme toggle
  const handleThemeToggle = useCallback(() => {
    const currentMode = getActiveThemeMode(currentTheme);
    const newMode: ThemeMode = currentMode === 'light' ? 'dark' : 'light';
    applyThemeToDOM(themeColorsRef.current, newMode, document.documentElement, true);
    setTheme(newMode);
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
      const mergedTheme: Record<ThemeMode, ThemeColors> = {
        light: { ...themeColorsRef.current.light, ...importedTheme.light },
        dark: { ...themeColorsRef.current.dark, ...importedTheme.dark },
      };

      themeColorsRef.current = mergedTheme;
      const activeMode = getActiveThemeMode(currentTheme);
      const primaryColor = mergedTheme[activeMode].primary;
      const hue = extractHueFromColor(primaryColor);
      currentHueRef.current = hue;

      const updatedThemes = updateAllHues(mergedTheme, hue);
      themeColorsRef.current = updatedThemes;

      applyThemeToDOM(updatedThemes, activeMode, document.documentElement, true);

      const inactiveMode: ThemeMode = activeMode === 'light' ? 'dark' : 'light';
      const inactiveTheme = updatedThemes[inactiveMode];
      Object.entries(inactiveTheme).forEach(([key, value]) => {
        const dataKey = toCamelCase(`${inactiveMode}-${key}`);
        if (key === 'radius') {
          document.documentElement.dataset[dataKey] = value;
        } else {
          if (key === 'sidebar-background') {
            const sidebarKey = toCamelCase(`${inactiveMode}-sidebar`);
            document.documentElement.dataset[sidebarKey] = `hsl(${value})`;
          } else {
            document.documentElement.dataset[dataKey] = `hsl(${value})`;
          }
        }
      });

      setTimeout(() => {
        setForceEditorUpdate(prev => prev + 1);
      }, 0);

      toast('Theme imported successfully');
    },
    [currentTheme]
  );

  // Handle font change
  const handleFontChange = useCallback((font: FontOption) => {
    setCurrentFont(font.family);
  }, []);

  // Handle selecting a default theme
  const handleSelectDefaultTheme = useCallback(
    (themeName: string, theme: any) => {
      const mergedTheme = {
        light: { ...themeColorsRef.current.light, ...theme.light },
        dark: { ...themeColorsRef.current.dark, ...theme.dark },
      };

      themeColorsRef.current = mergedTheme;
      const activeMode = getActiveThemeMode(currentTheme);
      applyThemeToDOM(themeColorsRef.current, activeMode, document.documentElement, false);

      const inactiveMode: ThemeMode = activeMode === 'light' ? 'dark' : 'light';
      const inactiveTheme = themeColorsRef.current[inactiveMode];
      Object.entries(inactiveTheme).forEach(([key, value]) => {
        const dataKey = toCamelCase(`${inactiveMode}-${key}`);
        if (key === 'radius') {
          document.documentElement.dataset[dataKey] = value;
        } else {
          document.documentElement.dataset[dataKey] = `hsl(${value})`;
        }
      });

      const primaryColor = theme[activeMode].primary;
      const hue = extractHueFromColor(primaryColor);
      currentHueRef.current = hue;

      setForceEditorUpdate(prev => prev + 1);
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
      className="flex flex-col min-h-screen"
      style={getThemePreviewStyles(themeColorsRef.current, activeMode)}
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-[15] w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/5 dark:shadow-secondary border-b">
        <div className="container h-14 flex items-center justify-between pl-4 sm:px-8">
          <div className="flex items-center space-x-4 lg:space-x-0">
            <SidebarTrigger />
            <h1 className="font-bold text-foreground pl-4">Theme Style Picker</h1>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle onClick={() => handleThemeToggle()} />
            <Button onClick={copyToClipboard} variant="outline" size="sm">
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              Copy Code
            </Button>
            <Button onClick={() => setImportModalOpen(true)} size="sm">
              Import Theme
            </Button>
          </div>
        </div>
      </header>

      {/* ── 3-Panel Layout ─────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden bg-card">
        {/* ── Left Panel: Styles + Theme Editor ────────────── */}
        <div className="w-[280px] border-r flex flex-col shrink-0">
          <Tabs value={leftTab} onValueChange={setLeftTab} className="flex flex-col flex-1">
            <div className="px-3 pt-3">
              <TabsList className="w-full h-8">
                <TabsTrigger value="styles" className="text-xs flex-1 h-7">
                  Styles
                </TabsTrigger>
                <TabsTrigger value="tokens" className="text-xs flex-1 h-7">
                  Tokens
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="styles" className="flex-1 m-0">
              <ScrollArea className="h-[calc(100vh-7.5rem)]">
                <div className="p-3">
                  <StyleSelector />
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="tokens" className="flex-1 m-0">
              <ScrollArea className="h-[calc(100vh-7.5rem)]">
                <ThemeEditor
                  key={`editor-${forceEditorUpdate}`}
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
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* ── Center Panel: Live Preview ───────────────────── */}
        <div className="flex-1 overflow-hidden bg-background">
          <PreviewSwitcher />
        </div>

        {/* ── Right Panel: Style Controls ──────────────────── */}
        <div className="w-[260px] border-l shrink-0">
          <ScrollArea className="h-[calc(100vh-3.5rem)]">
            <StyleControls />
          </ScrollArea>
        </div>
      </div>

      <ThemeImportModal
        open={importModalOpen}
        onOpenChange={setImportModalOpen}
        onImport={handleImportTheme}
      />
      <Toaster />
    </div>
  );
}

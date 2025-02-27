'use client';

import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HslColorPicker } from 'react-colorful';
import ColorPicker from '@/components/picker/color-picker';
import { ThemeMode, ThemeColors, EditorMode } from '@/lib/picker/theme-utils';
import { useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Import custom CSS for the hue picker
import './hue-picker.css';

// Token category enum
export type TokenCategory = 'core' | 'components' | 'sidebar';

// Helper function to determine token category
const getTokenCategory = (key: string): TokenCategory => {
  // Sidebar tokens
  if (key.startsWith('sidebar-')) {
    return 'sidebar';
  }

  // Component tokens
  const componentTokens = [
    'muted',
    'muted-foreground',
    'accent',
    'accent-foreground',
    'destructive',
    'destructive-foreground',
    'border',
    'input',
    'ring',
    'radius',
  ];

  if (componentTokens.some(token => key === token)) {
    return 'components';
  }

  // Core tokens (default)
  return 'core';
};

interface ThemeEditorProps {
  themeColors: Record<ThemeMode, ThemeColors>;
  activeMode: ThemeMode;
  currentHue: number;
  editorMode: EditorMode;
  currentTheme: string | undefined;
  onColorChange: (key: string, value: string, mode: ThemeMode) => void;
  onHueChange: (newHue: number) => void;
  onRandomizeTheme: () => void;
  onEditorModeChange: (mode: EditorMode) => void;
  onThemeToggle: () => void;
}

// Helper to convert HSL to hex
const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export default function ThemeEditor({
  themeColors,
  activeMode,
  currentHue,
  editorMode,
  currentTheme,
  onColorChange,
  onHueChange,
  onRandomizeTheme,
  onEditorModeChange,
  onThemeToggle,
}: ThemeEditorProps) {
  // Use a ref for the current hue to enable direct DOM updates
  const hueValueRef = useRef<HTMLSpanElement>(null);

  // Update the DOM directly when currentHue changes
  useEffect(() => {
    if (hueValueRef.current) {
      hueValueRef.current.textContent = `${Math.round(currentHue)}°`;
    }
  }, [currentHue]);

  // Handler for color picker changes
  const handleColorChange = (color: { h: number; s: number; l: number }) => {
    // Make sure we have a valid color object with a numeric hue value
    if (color && typeof color.h === 'number') {
      // Round the hue value for consistency
      const newHue = Math.round(color.h);

      // Important: Pass the hue value to the parent component
      onHueChange(newHue);

      // Update the hue value display
      if (hueValueRef.current) {
        hueValueRef.current.textContent = `${newHue}°`;
      }
    }
  };

  return (
    <div className='w-full md:w-1/3 border-r'>
      <div className='p-4'>
        {/* Mode toggle */}
        <div className='flex items-center justify-between mb-6 border-b pb-4'>
          <Label className='text-base font-medium'>Editor Mode</Label>
          <div className='flex items-center space-x-2'>
            <Label htmlFor='editor-mode' className='text-sm cursor-pointer'>
              Simple
            </Label>
            <Switch
              id='editor-mode'
              checked={editorMode === 'advanced'}
              onCheckedChange={checked => onEditorModeChange(checked ? 'advanced' : 'simple')}
            />
            <Label htmlFor='editor-mode' className='text-sm cursor-pointer'>
              Advanced
            </Label>
          </div>
        </div>

        {/* Simple Mode UI */}
        {editorMode === 'simple' && (
          <div className='space-y-6 mb-6'>
            <div className='space-y-4'>
              <div className='flex justify-between items-center'>
                <Label className='text-base font-medium'>Theme Hue</Label>
                <span ref={hueValueRef} className='text-sm font-mono'>
                  {Math.round(currentHue)}°
                </span>
              </div>
              {/* Custom styled HSL color picker */}
              <div className='hue-slider-only'>
                <HslColorPicker
                  color={{ h: currentHue, s: 100, l: 50 }}
                  onChange={handleColorChange}
                />
              </div>
              <div className='flex w-full justify-center mt-2'>
                <Button onClick={onRandomizeTheme} className='w-full' variant='outline'>
                  <RefreshCw className='w-4 h-4 mr-2' />
                  Randomize Theme
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Mode UI */}
        {editorMode === 'advanced' && (
          <>
            <ScrollArea>
              <div className='space-y-4 pr-4'>
                <Accordion type='single' collapsible defaultValue='core-theme' className='w-full'>
                  {/* Core Theme Colors */}
                  <AccordionItem value='core-theme'>
                    <AccordionTrigger className='py-2'>
                      <span className='text-base font-medium'>Core Theme</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Separator className='my-2' />

                      <div className='space-y-3'>
                        {Object.entries(themeColors[activeMode])
                          .filter(([key]) => getTokenCategory(key) === 'core')
                          .map(([key, value]) => (
                            <ColorPicker
                              key={`${activeMode}-${key}`}
                              label={key}
                              value={value}
                              onChange={newValue => onColorChange(key, newValue, activeMode)}
                            />
                          ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* UI Component Colors */}
                  <AccordionItem value='component-theme'>
                    <AccordionTrigger className='py-2'>
                      <span className='text-base font-medium'>UI Components</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Separator className='my-2' />
                      <div className='space-y-3'>
                        {Object.entries(themeColors[activeMode])
                          .filter(([key]) => getTokenCategory(key) === 'components')
                          .map(([key, value]) => (
                            <ColorPicker
                              key={`${activeMode}-${key}`}
                              label={key}
                              value={value}
                              onChange={newValue => onColorChange(key, newValue, activeMode)}
                            />
                          ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Sidebar Theme Colors */}
                  <AccordionItem value='sidebar-theme'>
                    <AccordionTrigger className='py-2'>
                      <span className='text-base font-medium'>Sidebar Theme</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Separator className='my-2' />
                      <div className='space-y-3'>
                        {Object.entries(themeColors[activeMode])
                          .filter(([key]) => getTokenCategory(key) === 'sidebar')
                          .map(([key, value]) => (
                            <ColorPicker
                              key={`${activeMode}-${key}`}
                              label={key}
                              value={value}
                              onChange={newValue => onColorChange(key, newValue, activeMode)}
                            />
                          ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </ScrollArea>
          </>
        )}
      </div>
    </div>
  );
}

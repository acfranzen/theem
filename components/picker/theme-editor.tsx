'use client';

import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import ColorPicker from '@/components/picker/color-picker';
import { ThemeMode, ThemeColors, EditorMode } from '@/lib/picker/theme-utils';

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
  return (
    <div className='w-full md:w-1/3 border-r'>
      <div className='p-4'>
        <h2 className='text-xl font-bold mb-4'>Theme Properties</h2>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold'>Editing {activeMode} theme</h3>
          <Button variant='outline' onClick={onThemeToggle}>
            Switch to {currentTheme === 'dark' ? 'Light' : 'Dark'} Mode
          </Button>
        </div>

        {/* Mode toggle */}
        <div className='flex items-center justify-between mb-6 border-b pb-4'>
          <Label htmlFor='editor-mode' className='text-base font-medium'>
            Editor Mode
          </Label>
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
                <span className='text-sm font-mono'>{currentHue}°</span>
              </div>
              <Slider
                value={[currentHue]}
                min={0}
                max={360}
                step={1}
                onValueChange={value => onHueChange(value[0])}
                className='py-2'
              />
              <div className='flex w-full justify-center mt-2'>
                <Button onClick={onRandomizeTheme} className='w-full' variant='outline'>
                  <RefreshCw className='w-4 h-4 mr-2' />
                  Randomize Theme
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className='text-base font-medium mb-2'>Theme Description</h3>
              <Textarea
                className='mb-4 h-24 font-mono text-sm'
                placeholder='Theme description...'
                defaultValue='A theme inspired by modern design principles. Clean and professional with a touch of personality.'
              />
            </div>
          </div>
        )}

        {/* Advanced Mode UI */}
        {editorMode === 'advanced' && (
          <>
            <Textarea
              className='mb-4 h-24 font-mono text-sm'
              placeholder='Theme description...'
              defaultValue='A theme inspired by modern design principles. Clean and professional with a touch of personality.'
            />

            <ScrollArea className='h-[calc(100vh-250px)]'>
              <div className='space-y-4 pr-4'>
                {/* Color pickers */}
                {Object.entries(themeColors[activeMode]).map(([key, value]) => (
                  <ColorPicker
                    key={`${activeMode}-${key}`}
                    label={key}
                    value={value}
                    onChange={newValue => onColorChange(key, newValue, activeMode)}
                  />
                ))}
              </div>
            </ScrollArea>
          </>
        )}
      </div>
    </div>
  );
}

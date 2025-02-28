'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  oceanTheme,
  mintTheme,
  themeDescriptions,
  latteTheme,
  retroTerminalTheme,
  aquaClassicTheme,
  twoToneTheme,
} from './defaults/themeOptions';
import { Button } from '@/components/ui/button';
import { ThemeMode } from '@/lib/picker/theme-utils';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

// Swatch component to display theme colors
interface ThemeSwatchProps {
  themeName: string;
  theme: any;
  onClick: () => void;
}

const ThemeSwatch = ({ themeName, theme, onClick }: ThemeSwatchProps) => {
  // Get the colors needed for the swatch
  const primaryColor = `hsl(${theme.light.primary})`;
  const secondaryColor = `hsl(${theme.light.secondary})`;
  const backgroundColor = `hsl(${theme.light.background})`;
  const foregroundColor = `hsl(${theme.light.foreground})`;

  // Format the theme name for display
  const formattedThemeName = themeName
    .replace('Theme', '')
    .replace(/([A-Z])/g, ' $1')
    .trim();

  return (
    <Card
      className='p-4 cursor-pointer hover:shadow-md transition-shadow duration-300 border-2 border-transparent hover:border-primary/50'
      onClick={onClick}
    >
      <div className='mb-3'>
        <h3 className='text-lg font-semibold'>{formattedThemeName}</h3>
      </div>

      <div className='flex space-x-2 mb-3'>
        {/* Primary color swatch */}
        <div className='flex flex-col items-center'>
          <div className='w-12 h-12 rounded-md border' style={{ backgroundColor: primaryColor }} />
          <span className='text-xs mt-1'>Primary</span>
        </div>

        {/* Secondary color swatch */}
        <div className='flex flex-col items-center'>
          <div
            className='w-12 h-12 rounded-md border'
            style={{ backgroundColor: secondaryColor }}
          />
          <span className='text-xs mt-1'>Secondary</span>
        </div>

        {/* Background/Foreground color swatch */}
        <div className='flex flex-col items-center'>
          <div className='w-12 h-12 rounded-md border overflow-hidden'>
            <div className='w-full h-1/2' style={{ backgroundColor: backgroundColor }}></div>
            <div className='w-full h-1/2' style={{ backgroundColor: foregroundColor }}></div>
          </div>
          <span className='text-xs mt-1'>Bg/Fg</span>
        </div>
      </div>

      {/* Dark mode preview */}
      <div className='flex space-x-2'>
        <div className='flex flex-col items-center'>
          <div
            className='w-8 h-8 rounded-md border'
            style={{ backgroundColor: `hsl(${theme.dark.primary})` }}
          />
          <span className='text-xs mt-1'>Dark</span>
        </div>
        <div className='flex flex-col items-center'>
          <div
            className='w-8 h-8 rounded-md border'
            style={{ backgroundColor: `hsl(${theme.dark.secondary})` }}
          />
        </div>
        <div className='flex flex-col items-center'>
          <div className='w-8 h-8 rounded-md border overflow-hidden'>
            <div
              className='w-full h-1/2'
              style={{ backgroundColor: `hsl(${theme.dark.background})` }}
            ></div>
            <div
              className='w-full h-1/2'
              style={{ backgroundColor: `hsl(${theme.dark.foreground})` }}
            ></div>
          </div>
        </div>
      </div>
    </Card>
  );
};

interface ThemeDefaultsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTheme: (themeName: string, theme: any) => void;
  activeMode: ThemeMode;
}

export default function ThemeDefaultsModal({
  open,
  onOpenChange,
  onSelectTheme,
  activeMode,
}: ThemeDefaultsModalProps) {
  // All available themes
  const themes = {
    oceanTheme,
    mintTheme,
    latteTheme,
    retroTerminalTheme,
    aquaClassicTheme,
    twoToneTheme,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Choose a Theme</DialogTitle>
        </DialogHeader>

        <ScrollArea className='max-h-[500px] pr-4'>
          <div className='grid grid-cols-2 gap-4 py-4'>
            {Object.entries(themes).map(([themeName, theme]) => (
              <ThemeSwatch
                key={themeName}
                themeName={themeName}
                theme={theme}
                onClick={() => {
                  onSelectTheme(themeName, theme);
                  onOpenChange(false);
                }}
              />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

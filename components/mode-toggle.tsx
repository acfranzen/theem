'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show the toggle after component has mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className='w-8 h-8' />; // Placeholder with same dimensions
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            className='rounded-full w-8 h-8 bg-background'
            variant='outline'
            size='icon'
            onClick={() => {
              setTheme(theme === 'dark' ? 'light' : 'dark');
            }}
          >
            <SunIcon className='w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100 text-muted-foreground hover:text-foreground' />
            <MoonIcon className='absolute w-[1.2rem] h-[1.2rem] rotate-0 scale-100 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0 text-muted-foreground hover:text-foreground' />
            <span className='sr-only'>Switch Theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side='bottom'>Switch Theme</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

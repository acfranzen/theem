'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // Only execute this effect on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a placeholder with the same structure during SSR
  if (!mounted) {
    return <div suppressHydrationWarning>{children}</div>;
  }

  return (
    <NextThemesProvider attribute='class' defaultTheme='system' enableSystem {...props}>
      {children}
    </NextThemesProvider>
  );
}

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { FontOption, fontOptions } from '@/lib/picker/font-utils';

interface FontContextType {
  currentFont: string;
  setFont: (font: FontOption) => void;
}

const FontContext = createContext<FontContextType>({
  currentFont: 'Manrope',
  setFont: () => {},
});

export function useFontContext() {
  return useContext(FontContext);
}

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [currentFont, setCurrentFont] = useState<string>('Manrope');

  // Apply font changes by setting a className on the document root
  const setFont = (font: FontOption) => {
    setCurrentFont(font.family);

    // Remove any existing font classes
    const classesToRemove = fontOptions.map(
      font => `font-${font.family.toLowerCase().replace(/\s+/g, '-')}`
    );
    document.documentElement.classList.remove(...classesToRemove);

    // Add the new font class
    const fontClass = `font-${font.family.toLowerCase().replace(/\s+/g, '-')}`;
    document.documentElement.classList.add(fontClass);

    // Apply global style to ensure font is inherited by all elements
    document.documentElement.style.setProperty('--font-family', `var(${font.cssVariable})`);
  };

  // Initialize with default font
  useEffect(() => {
    const defaultFont = fontOptions.find(font => font.family === 'Manrope');
    if (defaultFont) {
      setFont(defaultFont);
    }
  }, []);

  return <FontContext.Provider value={{ currentFont, setFont }}>{children}</FontContext.Provider>;
}

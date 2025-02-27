import { Manrope } from 'next/font/google';
// Define font options structure
export interface FontOption {
  name: string;
  family: string;
  weights: string[];
  category: 'serif' | 'sans-serif' | 'monospace' | 'display' | 'handwriting';
  cssVariable: string;
  cssClass: string;
}

// Define font options with corresponding CSS variables and classes
export const fontOptions: FontOption[] = [
  {
    name: 'Manrope',
    family: 'Manrope',
    weights: ['400', '500', '600', '700'],
    category: 'sans-serif',
    cssVariable: '--font-manrope',
    cssClass: 'font-manrope',
  },
  {
    name: 'Inter',
    family: 'Inter',
    weights: ['400', '500', '600', '700'],
    category: 'sans-serif',
    cssVariable: '--font-inter',
    cssClass: 'font-inter',
  },
  {
    name: 'Roboto',
    family: 'Roboto',
    weights: ['400', '500', '700'],
    category: 'sans-serif',
    cssVariable: '--font-roboto',
    cssClass: 'font-roboto',
  },
  {
    name: 'Open Sans',
    family: 'Open Sans',
    weights: ['400', '500', '600', '700'],
    category: 'sans-serif',
    cssVariable: '--font-open-sans',
    cssClass: 'font-open-sans',
  },
  {
    name: 'Playfair Display',
    family: 'Playfair Display',
    weights: ['400', '500', '700'],
    category: 'serif',
    cssVariable: '--font-playfair',
    cssClass: 'font-playfair-display',
  },
  {
    name: 'Montserrat',
    family: 'Montserrat',
    weights: ['400', '500', '600', '700'],
    category: 'sans-serif',
    cssVariable: '--font-montserrat',
    cssClass: 'font-montserrat',
  },
  {
    name: 'Lato',
    family: 'Lato',
    weights: ['400', '700'],
    category: 'sans-serif',
    cssVariable: '--font-lato',
    cssClass: 'font-lato',
  },
  {
    name: 'Merriweather',
    family: 'Merriweather',
    weights: ['400', '700'],
    category: 'serif',
    cssVariable: '--font-merriweather',
    cssClass: 'font-merriweather',
  },
  {
    name: 'Fira Code',
    family: 'Fira Code',
    weights: ['400', '500', '700'],
    category: 'monospace',
    cssVariable: '--font-fira-code',
    cssClass: 'font-fira-code',
  },
];

// Function to get CSS variable for font family
export function getFontCssVariable(font: FontOption): string {
  return `var(${font.cssVariable})`;
}

// Function to apply the selected font to the document using CSS classes
export function applyFontToDocument(font: FontOption): void {
  // Remove all font classes
  fontOptions.forEach(f => {
    document.documentElement.classList.remove(f.cssClass);
  });

  // Add the selected font class
  document.documentElement.classList.add(font.cssClass);
}

// Legacy functions kept for compatibility
export function getGoogleFontUrl(font: FontOption): string {
  return ''; // No longer needed with Next.js font system
}

export function getFontFamilyCSS(font: FontOption): string {
  return getFontCssVariable(font);
}

export function loadGoogleFont(font: FontOption): void {
  // No longer needed with Next.js font system
}

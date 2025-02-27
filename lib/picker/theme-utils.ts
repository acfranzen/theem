import { toast } from 'sonner';

// Type definitions for theme values
export type ThemeMode = 'light' | 'dark';
export type ThemeColors = Record<string, string>;
export type EditorMode = 'simple' | 'advanced';

/**
 * Updates all theme colors with a new hue value
 * @param themeColors Current theme colors for both light and dark modes
 * @param newHue New hue value to apply (0-360)
 * @returns Updated theme colors with new hue
 */
export const updateAllHues = (
  themeColors: Record<ThemeMode, ThemeColors>,
  newHue: number
): Record<ThemeMode, ThemeColors> => {
  const updatedThemes = { ...themeColors };
  const modes: ThemeMode[] = ['light', 'dark'];

  modes.forEach(mode => {
    Object.entries(themeColors[mode]).forEach(([key, value]) => {
      if (key !== 'radius') {
        // Only modify the hue part of the HSL value
        const parts = value.split(' ');
        if (parts.length >= 1) {
          parts[0] = newHue.toString();
          updatedThemes[mode][key] = parts.join(' ');
        }
      }
    });
  });

  return updatedThemes;
};

/**
 * Generate a random hue value and update the theme
 * @returns A random hue value from aesthetically pleasing ranges
 */
export const getRandomHue = (): number => {
  // Avoid certain hue ranges that might not work well
  // These are subjectively chosen ranges that often look good
  const hueRanges = [
    [0, 40], // Reds to oranges
    [45, 70], // Yellows
    [80, 160], // Greens
    [170, 210], // Teals and light blues
    [220, 280], // Blues and purples
    [290, 330], // Magentas and pinks
  ];

  // Select a random range and then a random value within that range
  const randomRange = hueRanges[Math.floor(Math.random() * hueRanges.length)];
  return Math.floor(Math.random() * (randomRange[1] - randomRange[0] + 1)) + randomRange[0];
};

/**
 * Randomize theme colors by selecting a random hue
 * @param themeColors Current theme colors
 * @returns Updated theme colors with random hue
 */
export const randomizeTheme = (
  themeColors: Record<ThemeMode, ThemeColors>
): { updatedThemes: Record<ThemeMode, ThemeColors>; newHue: number } => {
  const newHue = getRandomHue();
  const updatedThemes = updateAllHues(themeColors, newHue);
  toast(`Theme randomized! New hue: ${newHue}`);

  return { updatedThemes, newHue };
};

/**
 * Generates CSS code for the current theme
 * @param themeColors Current theme colors for both light and dark modes
 * @returns CSS code as a string
 */
export const generateThemeCode = (themeColors: Record<ThemeMode, ThemeColors>): string => {
  let code = `:root {\n`;
  // Light theme
  Object.entries(themeColors.light).forEach(([key, value]) => {
    if (key === 'radius') {
      code += `  --${key}: ${value};\n`;
    } else {
      code += `  --${key}: hsl(${value});\n`;
    }
  });
  code += `}\n\n`;

  // Dark theme
  code += `.dark {\n`;
  Object.entries(themeColors.dark).forEach(([key, value]) => {
    if (key === 'radius') {
      code += `  --${key}: ${value};\n`;
    } else {
      code += `  --${key}: hsl(${value});\n`;
    }
  });
  code += `}\n`;

  return code;
};

/**
 * Extract and parse hue value from a color string
 * @param colorValue HSL color value as string (e.g. "295 37.9% 31.6%")
 * @returns The hue value as a number
 */
export const extractHueFromColor = (colorValue: string): number => {
  const parts = colorValue.split(' ');
  return parts.length > 0 ? parseInt(parts[0]) : 0;
};

/**
 * Generate inline styles for the preview container based on current theme
 * @param themeColors Current theme colors
 * @param activeMode Current theme mode (light or dark)
 * @returns Object with CSS variables for inline styling
 */
export const getThemePreviewStyles = (
  themeColors: Record<ThemeMode, ThemeColors>,
  activeMode: ThemeMode
): Record<string, string> => {
  const activeTheme = themeColors[activeMode];

  return Object.entries(activeTheme).reduce(
    (styles, [key, value]) => {
      if (key === 'radius') {
        styles[`--${key}`] = value;
      } else {
        // Format as hsl() for CSS variables
        styles[`--${key}`] = `hsl(${value})`;
      }
      return styles;
    },
    {} as Record<string, string>
  );
};

/**
 * Determine the active theme mode based on current settings
 * @param currentTheme The current theme from next-themes
 * @returns The active theme mode (light or dark)
 */
export const getActiveThemeMode = (currentTheme: string | undefined): ThemeMode => {
  return currentTheme === 'dark' ||
    (currentTheme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
    ? 'dark'
    : 'light';
};

/**
 * Apply theme colors directly to DOM without requiring a React re-render
 * This provides better performance for frequent color changes
 * @param themeColors Current theme colors
 * @param mode Current theme mode (light or dark)
 * @param targetElement Optional element to apply styles to (defaults to document.documentElement)
 */
export const applyThemeToDOM = (
  themeColors: Record<ThemeMode, ThemeColors>,
  mode: ThemeMode,
  targetElement: HTMLElement = document.documentElement
): void => {
  if (typeof window === 'undefined') return; // Guard for SSR

  const activeTheme = themeColors[mode];
  Object.entries(activeTheme).forEach(([key, value]) => {
    if (key === 'radius') {
      targetElement.style.setProperty(`--${key}`, value);
    } else {
      targetElement.style.setProperty(`--${key}`, `hsl(${value})`);
    }
  });
};

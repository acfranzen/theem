import { toast } from 'sonner';
import React from 'react';

// Type definitions for theme values
export type ThemeMode = 'light' | 'dark';
export type ThemeColors = Record<string, string>;
export type EditorMode = 'simple' | 'advanced';

// Define HSL color type
export type HSLColor = {
  h: number;
  s: number;
  l: number;
};

/**
 * Updates all theme colors with new HSL values
 * @param themeColors Current theme colors for both light and dark modes
 * @param newColor New HSL color values to apply
 * @param targetKey Optional specific color key to update (if not provided, updates all colors)
 * @returns Updated theme colors with new HSL values
 */
export const updateAllHues = (
  themeColors: Record<ThemeMode, ThemeColors>,
  newColor: HSLColor | number,
  targetKey?: string
): Record<ThemeMode, ThemeColors> => {
  const updatedThemes = { ...themeColors };
  const modes: ThemeMode[] = ['light', 'dark'];

  // Handle both legacy number input (just hue) and new HSL object
  const isHueOnly = typeof newColor === 'number';
  const hslColor = isHueOnly ? { h: newColor, s: 0, l: 0 } : (newColor as HSLColor);

  modes.forEach(mode => {
    Object.entries(themeColors[mode]).forEach(([key, value]) => {
      // Skip non-color properties like radius
      if (key !== 'radius') {
        // If targetKey is specified, only update that specific color
        if (targetKey && key !== targetKey) {
          return;
        }

        const parts = value.split(' ');

        if (isHueOnly) {
          // Legacy behavior: only update the hue
          if (parts.length >= 1) {
            parts[0] = hslColor.h.toString();
            updatedThemes[mode][key] = parts.join(' ');
          }
        } else {
          // New behavior: update the complete HSL value
          if (parts.length >= 3) {
            // Update HSL components while preserving any existing format
            parts[0] = hslColor.h.toString();
            // Replace percentage symbol if it exists
            parts[1] = parts[1].includes('%') ? `${hslColor.s.toFixed(1)}%` : hslColor.s.toString();
            parts[2] = parts[2].includes('%') ? `${hslColor.l.toFixed(1)}%` : hslColor.l.toString();

            updatedThemes[mode][key] = parts.join(' ');
          }
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

  // Create a deep copy of the theme colors
  const updatedThemes: Record<ThemeMode, ThemeColors> = JSON.parse(JSON.stringify(themeColors));

  // Update all themes with the new hue
  (Object.keys(themeColors) as ThemeMode[]).forEach(mode => {
    Object.entries(themeColors[mode]).forEach(([key, value]) => {
      if (key !== 'radius') {
        const parts = value.split(' ');
        if (parts.length >= 1) {
          parts[0] = newHue.toString();
          updatedThemes[mode][key] = parts.join(' ');
        }
      }
    });
  });

  // Display a toast notification
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
 * Extract and parse all HSL components from a color string
 * @param colorValue HSL color value as string (e.g. "295 37.9% 31.6%")
 * @returns An HSLColor object with h, s, and l values
 */
export const extractHSLFromColor = (colorValue: string): HSLColor => {
  const parts = colorValue.split(' ');

  // Default values if parsing fails
  let h = 0,
    s = 0,
    l = 0;

  if (parts.length > 0) {
    h = parseInt(parts[0]);
  }

  if (parts.length > 1) {
    // Strip percentage sign if present
    s = parseFloat(parts[1].replace('%', ''));
  }

  if (parts.length > 2) {
    // Strip percentage sign if present
    l = parseFloat(parts[2].replace('%', ''));
  }

  return { h, s, l };
};

/**
 * Helper function to convert hyphenated keys to camelCase for dataset properties
 */
export const toCamelCase = (str: string): string => {
  return str.replace(/-([a-z])/g, (match, group) => group.toUpperCase());
};

/**
 * Check if a key is a sidebar-related theme variable
 */
export const isSidebarKey = (key: string): boolean => {
  return key.startsWith('sidebar-');
};

/**
 * Handle color change for a specific color with complete HSL values
 * This is a utility function intended to be used with useCallback in components
 *
 * @param params Object containing necessary parameters
 * @param params.themeColorsRef Reference to theme colors object
 * @param params.key Color key to update
 * @param params.value New color value
 * @param params.mode Theme mode (light/dark)
 * @param params.currentTheme Current active theme
 * @param params.currentHueRef Reference to current hue value
 * @param params.setForceEditorUpdate Function to trigger UI updates
 */
export const updateThemeColor = (params: {
  themeColorsRef: React.MutableRefObject<Record<ThemeMode, ThemeColors>>;
  key: string;
  value: string;
  mode: ThemeMode;
  currentTheme: string | undefined;
  currentHueRef: React.MutableRefObject<number>;
  setForceEditorUpdate: React.Dispatch<React.SetStateAction<number>>;
}): void => {
  const { themeColorsRef, key, value, mode, currentTheme, currentHueRef, setForceEditorUpdate } =
    params;

  // Extract HSL components from the value string
  const parts = value.split(' ');
  if (parts.length >= 3) {
    const h = parseFloat(parts[0]);

    // Update the current hue reference
    currentHueRef.current = h;

    // Create a new copy of the theme colors
    const updatedThemes = { ...themeColorsRef.current };

    // Update the specific color in the given mode
    updatedThemes[mode][key] = value;

    // Update the ref with the new theme colors
    themeColorsRef.current = updatedThemes;

    // Apply the updated theme to DOM
    const activeMode = getActiveThemeMode(currentTheme);
    applyThemeToDOM(updatedThemes, activeMode, document.documentElement, false);

    // Also update the inactive theme in data attributes
    const inactiveMode: ThemeMode = activeMode === 'light' ? 'dark' : 'light';
    const inactiveTheme = updatedThemes[inactiveMode];

    Object.entries(inactiveTheme).forEach(([themeKey, themeValue]) => {
      const dataKey = toCamelCase(`${inactiveMode}-${themeKey}`);

      if (themeKey === 'radius') {
        document.documentElement.dataset[dataKey] = themeValue;
      } else {
        // Special handling for sidebar background
        if (themeKey === 'sidebar-background') {
          const sidebarKey = toCamelCase(`${inactiveMode}-sidebar`);
          document.documentElement.dataset[sidebarKey] = `hsl(${themeValue})`;
        } else {
          document.documentElement.dataset[dataKey] = `hsl(${themeValue})`;
        }
      }
    });

    // Force UI update
    setForceEditorUpdate(prev => prev + 1);
  }
};

/**
 * Handle hue change by updating all theme colors
 * This is a utility function intended to be used with useCallback in components
 *
 * @param params Object containing necessary parameters
 * @param params.newHue New hue value
 * @param params.themeColorsRef Reference to theme colors object
 * @param params.currentTheme Current active theme
 * @param params.currentHueRef Reference to current hue value
 * @param params.setForceEditorUpdate Function to trigger UI updates
 */
export const updateAllThemeHues = (params: {
  newHue: number;
  themeColorsRef: React.MutableRefObject<Record<ThemeMode, ThemeColors>>;
  currentTheme: string | undefined;
  currentHueRef: React.MutableRefObject<number>;
  setForceEditorUpdate: React.Dispatch<React.SetStateAction<number>>;
}): void => {
  const { newHue, themeColorsRef, currentTheme, currentHueRef, setForceEditorUpdate } = params;

  // Store the new hue value
  currentHueRef.current = newHue;

  // Create a copy of the theme colors to work with
  const updatedThemes: Record<ThemeMode, ThemeColors> = JSON.parse(
    JSON.stringify(themeColorsRef.current)
  );

  // Update both themes (light and dark) with the new hue
  (Object.keys(themeColorsRef.current) as ThemeMode[]).forEach(mode => {
    Object.entries(themeColorsRef.current[mode]).forEach(([key, value]) => {
      if (key !== 'radius') {
        const parts = value.split(' ');
        if (parts.length >= 1) {
          parts[0] = newHue.toString();
          updatedThemes[mode][key] = parts.join(' ');
        }
      }
    });
  });

  // Update the reference with our changes
  themeColorsRef.current = updatedThemes;

  // Get current active theme mode
  const activeMode = getActiveThemeMode(currentTheme);

  // Apply the updated theme to DOM
  applyThemeToDOM(updatedThemes, activeMode, document.documentElement, false);

  // Update the inactive theme data attributes
  const inactiveMode: ThemeMode = activeMode === 'light' ? 'dark' : 'light';
  Object.entries(updatedThemes[inactiveMode]).forEach(([key, value]) => {
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

  // Force UI update
  setForceEditorUpdate(prev => prev + 1);
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
 * @param forceApply Optional flag to force apply even if mode conditions aren't met
 */
export const applyThemeToDOM = (
  themeColors: Record<ThemeMode, ThemeColors>,
  mode: ThemeMode,
  targetElement: HTMLElement = document.documentElement,
  forceApply: boolean = false
): void => {
  if (typeof window === 'undefined') return; // Guard for SSR

  const activeTheme = themeColors[mode];

  // Apply theme colors based on theme type
  if (mode === 'light' || forceApply) {
    // For light theme, apply directly to document root
    Object.entries(activeTheme).forEach(([key, value]) => {
      if (key === 'radius') {
        targetElement.style.setProperty(`--${key}`, value);
      } else {
        // Handle the special case for sidebar background
        if (key === 'sidebar-background') {
          targetElement.style.setProperty('--sidebar', `hsl(${value})`);
        } else {
          // Format properly as HSL for all other properties
          targetElement.style.setProperty(`--${key}`, `hsl(${value})`);
        }
      }
    });
  }

  // For dark theme, only apply if dark mode is active or force apply is true
  if (mode === 'dark') {
    if (document.documentElement.classList.contains('dark') || forceApply) {
      Object.entries(activeTheme).forEach(([key, value]) => {
        if (key === 'radius') {
          targetElement.style.setProperty(`--${key}`, value);
        } else {
          // Handle the special case for sidebar background
          if (key === 'sidebar-background') {
            targetElement.style.setProperty('--sidebar', `hsl(${value})`);
          } else {
            // Format properly as HSL
            targetElement.style.setProperty(`--${key}`, `hsl(${value})`);
          }
        }
      });
    } else {
      // Store dark theme values in data attributes for later use
      // This avoids applying them directly when not in dark mode
      Object.entries(activeTheme).forEach(([key, value]) => {
        // Convert key to camelCase for dataset property
        const dataKey = toCamelCase(`dark-${key}`);

        if (key === 'radius') {
          targetElement.dataset[dataKey] = value;
        } else {
          if (key === 'sidebar-background') {
            // Store the sidebar background correctly in data attributes
            const sidebarKey = toCamelCase('dark-sidebar');
            targetElement.dataset[sidebarKey] = `hsl(${value})`;
          } else {
            targetElement.dataset[dataKey] = `hsl(${value})`;
          }
        }
      });
    }
  }
};

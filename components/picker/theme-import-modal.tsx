'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { HSLColor, ThemeColors, ThemeMode } from '@/lib/picker/theme-utils';
import { AlertCircle, Check, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

// Simplified placeholder that gives the idea without overwhelming
const SIMPLIFIED_PLACEHOLDER = `@layer base {
  :root {
    --background: hsl(295 29.4% 96.7%);
    --foreground: hsl(295 37.9% 31.6%);
    --primary: hsl(295 37.9% 31.6%);
    /* ...other light theme variables... */
    --radius: 0.5rem;
  }

  .dark {
    --background: hsl(295 0% 13%);
    --foreground: hsl(295 29.4% 96.7%);
    --primary: hsl(295 38.2% 89.2%);
    /* ...other dark theme variables... */
    --radius: 0.5rem;
  }
}`;

interface ThemeImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (importedTheme: Record<ThemeMode, ThemeColors>) => void;
}

export default function ThemeImportModal({ open, onOpenChange, onImport }: ThemeImportModalProps) {
  const [themeCode, setThemeCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [validationState, setValidationState] = useState<
    'idle' | 'validating' | 'valid' | 'invalid'
  >('idle');
  const [validationDetails, setValidationDetails] = useState<{
    lightVarsCount?: number;
    darkVarsCount?: number;
    missingVars?: string[];
  }>({});

  // Reset error and theme code when modal opens/closes
  useEffect(() => {
    if (open) {
      setThemeCode('');
      setError(null);
      setValidationState('idle');
      setValidationDetails({});
    }
  }, [open]);

  // Progressive validation as user types
  useEffect(() => {
    // Debounce validation to avoid excessive processing on each keystroke
    const timeoutId = setTimeout(() => {
      if (!themeCode.trim()) {
        setValidationState('idle');
        setValidationDetails({});
        return;
      }

      setValidationState('validating');

      try {
        // Quick validation checks
        if (
          !themeCode.includes('@layer base') &&
          !themeCode.includes(':root') &&
          !themeCode.includes('.dark')
        ) {
          setValidationState('invalid');
          setValidationDetails({ missingVars: ['Basic theme structure'] });
          return;
        }

        const rootMatch = themeCode.match(/:root\s*{([^}]*)}/s);
        const darkMatch = themeCode.match(/\.dark\s*{([^}]*)}/s);

        if (!rootMatch || !darkMatch) {
          setValidationState('invalid');
          const missing = [];
          if (!rootMatch) missing.push(':root section');
          if (!darkMatch) missing.push('.dark section');
          setValidationDetails({ missingVars: missing });
          return;
        }

        // Count variables
        const rootVars = (rootMatch[1].match(/--([a-zA-Z0-9-]+):/g) || []).length;
        const darkVars = (darkMatch[1].match(/--([a-zA-Z0-9-]+):/g) || []).length;

        setValidationDetails({
          lightVarsCount: rootVars,
          darkVarsCount: darkVars,
        });

        // Basic validation passed
        if (rootVars > 0 && darkVars > 0) {
          setValidationState('valid');
        } else {
          setValidationState('invalid');
        }

        // Clear any previous errors
        setError(null);
      } catch (err) {
        setValidationState('invalid');
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [themeCode]);

  const handleImport = () => {
    if (!themeCode.trim()) {
      setError('Please enter theme code');
      return;
    }

    try {
      const parsedTheme = parseThemeCode(themeCode);

      // Instead of directly replacing with onImport(parsedTheme),
      // we'll use a merging approach where the function can merge with existing values
      onImport(parsedTheme);
      onOpenChange(false);
      toast('Theme imported successfully');
    } catch (err) {
      setError((err as Error).message);
      setValidationState('invalid');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col'>
        <DialogHeader className='flex-shrink-0'>
          <DialogTitle>Import Theme</DialogTitle>
          <DialogDescription>Paste your theme code in the format shown below</DialogDescription>
        </DialogHeader>

        {/* Quick guide - fixed at top */}
        <Alert variant='outline' className='mb-3 flex-shrink-0'>
          <Info className='h-4 w-4' />
          <AlertTitle>Import Format</AlertTitle>
          <AlertDescription className='text-xs'>
            Your theme should be in the globals.css format below, containing CSS variables like{' '}
            <code>--background: hsl(295 29.4% 96.7%)</code>
          </AlertDescription>
        </Alert>

        {/* Scrollable content area */}
        <div className='py-2 overflow-y-auto flex-grow pr-2'>
          {/* Validation status badges */}
          <div className='flex flex-wrap gap-2 mb-2 sticky top-0 z-10 bg-background pb-2'>
            {validationState === 'validating' && (
              <div className='text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-md'>
                Validating...
              </div>
            )}

            {validationState === 'valid' && (
              <div className='text-xs px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-md flex items-center gap-1'>
                <Check className='h-3 w-3' /> Valid Theme
              </div>
            )}

            {validationState === 'invalid' && (
              <div className='text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-md'>
                Invalid Format
              </div>
            )}

            {validationDetails.lightVarsCount && (
              <div className='text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-md'>
                Light: {validationDetails.lightVarsCount} vars
              </div>
            )}

            {validationDetails.darkVarsCount && (
              <div className='text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-md'>
                Dark: {validationDetails.darkVarsCount} vars
              </div>
            )}
          </div>

          <Textarea
            value={themeCode}
            onChange={e => {
              setThemeCode(e.target.value);
              if (error) setError(null);
            }}
            placeholder={SIMPLIFIED_PLACEHOLDER}
            className='min-h-[200px] max-h-[40vh] w-full font-mono text-sm resize-none placeholder:text-muted'
            spellCheck={false}
          />

          {error && (
            <Alert variant='destructive' className='mt-3'>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {validationState === 'invalid' && validationDetails.missingVars && (
            <Alert variant='destructive' className='mt-3'>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>Missing Elements</AlertTitle>
              <AlertDescription>
                <ul className='list-disc list-inside'>
                  {validationDetails.missingVars.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Fixed footer */}
        <DialogFooter className='flex-shrink-0 mt-2 pt-2 border-t'>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            disabled={validationState === 'invalid' || validationState === 'idle'}
          >
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Parse theme code and extract theme colors
 * @param themeCode CSS code containing theme variables
 * @returns Parsed theme colors for light and dark modes
 */
function parseThemeCode(themeCode: string): Record<ThemeMode, ThemeColors> {
  // Initialize result structure
  const result: Record<ThemeMode, ThemeColors> = {
    light: {},
    dark: {},
  };

  // Regular expressions to extract root and dark sections
  const rootMatch = themeCode.match(/:root\s*{([^}]*)}/s);
  const darkMatch = themeCode.match(/\.dark\s*{([^}]*)}/s);

  if (!rootMatch) {
    throw new Error('Could not find root theme variables');
  }

  if (!darkMatch) {
    throw new Error('Could not find dark theme variables');
  }

  // Extract and parse variables from root (:root)
  const rootContent = rootMatch[1];
  const rootVars = rootContent.match(/--([a-zA-Z0-9-]+):\s*(.*?)(?:;|$)/g);

  if (!rootVars || rootVars.length === 0) {
    throw new Error('No valid variables found in root theme');
  }

  // Extract and parse variables from dark theme (.dark)
  const darkContent = darkMatch[1];
  const darkVars = darkContent.match(/--([a-zA-Z0-9-]+):\s*(.*?)(?:;|$)/g);

  if (!darkVars || darkVars.length === 0) {
    throw new Error('No valid variables found in dark theme');
  }

  // Helper function to process variables
  const processVars = (vars: RegExpMatchArray, mode: ThemeMode) => {
    vars.forEach(varLine => {
      // Extract variable name and value
      const match = varLine.match(/--([a-zA-Z0-9-]+):\s*(.*?)(?:;|$)/);
      if (match) {
        const [, name, rawValue] = match;
        const value = rawValue.trim();

        // Special handling for radius
        if (name === 'radius') {
          result[mode][name] = value;
        } else {
          // Handle HSL values with or without the hsl() function
          let hslValue = value;

          // If it has hsl() wrapper, remove it
          if (value.startsWith('hsl(') && value.endsWith(')')) {
            hslValue = value.substring(4, value.length - 1);
          }

          result[mode][name] = hslValue;
        }
      }
    });
  };

  // Process both theme modes
  processVars(rootVars, 'light');
  processVars(darkVars, 'dark');

  // Validation: ensure we have at least some key variables
  const requiredVars = ['background', 'foreground', 'primary'];
  const missingVars: string[] = [];

  for (const mode of ['light', 'dark'] as ThemeMode[]) {
    for (const requiredVar of requiredVars) {
      if (!result[mode][requiredVar]) {
        missingVars.push(`${requiredVar} (${mode})`);
      }
    }
  }

  if (missingVars.length > 0) {
    throw new Error(`Missing required variables: ${missingVars.join(', ')}`);
  }

  return result;
}

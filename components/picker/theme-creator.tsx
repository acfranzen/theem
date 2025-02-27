'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import ColorPicker from '@/components/picker/color-picker';
import { ModeToggle } from '@/components/mode-toggle';
import { useTheme } from 'next-themes';
import React from 'react';

// Default theme values
const defaultTheme = {
  light: {
    background: '295 29.4% 96.7%',
    foreground: '295 37.9% 31.6%',
    card: '295 0% 100%',
    'card-foreground': '295 37.9% 31.6%',
    popover: '0 0% 100%',
    'popover-foreground': '240 10% 3.9%',
    primary: '295 37.9% 31.6%',
    'primary-foreground': '295 0% 100%',
    secondary: '295 38.2% 89.2%',
    'secondary-foreground': '295 33.8% 26.1%',
    muted: '295 37% 84%',
    'muted-foreground': '295 31.5% 21.8%',
    accent: '295 38.2% 89.2%',
    'accent-foreground': '295 27.8% 19%',
    destructive: '0 72% 51%',
    'destructive-foreground': '0 0% 98%',
    border: '295 34.1% 64.3%',
    input: '295 36.9% 78.2%',
    ring: '295 35.8% 41.6%',
    radius: '0.5rem',
  },
  dark: {
    background: '295 0% 13%',
    foreground: '295 29.4% 96.7%',
    card: '295 7% 16%',
    'card-foreground': '295 29.4% 96.7%',
    popover: '295 27.8% 19%',
    'popover-foreground': '295 29.4% 96.7%',
    primary: '295 38.2% 89.2%',
    'primary-foreground': '295 33.8% 26.1%',
    secondary: '295 42% 34%',
    'secondary-foreground': '295 29.4% 96.7%',
    muted: '295 44% 33%',
    'muted-foreground': '295 29.4% 96.7%',
    accent: '295 31.5% 21.8%',
    'accent-foreground': '295 29.4% 96.7%',
    destructive: '0 72% 51%',
    'destructive-foreground': '0 0% 98%',
    border: '295 29.6% 35.4%',
    input: '295 37.9% 31.6%',
    ring: '295 29.6% 50.4%',
    radius: '0.5rem',
  },
};

// Type definitions for theme values
type ThemeMode = 'light' | 'dark';
type ThemeColorKey = keyof typeof defaultTheme.light;
type ThemeColorValue = string;
type ThemeColors = Record<ThemeColorKey, ThemeColorValue>;

export default function ThemeCreator() {
  const [themeColors, setThemeColors] = useState<Record<ThemeMode, ThemeColors>>({
    light: { ...defaultTheme.light },
    dark: { ...defaultTheme.dark },
  });
  const [copied, setCopied] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { theme: currentTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // When component mounts, apply the theme styles to document.documentElement
  useEffect(() => {
    if (!mounted) return;

    const mode =
      currentTheme === 'dark' ||
      (currentTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ? 'dark'
        : 'light';

    // Apply active theme colors
    const activeTheme = themeColors[mode];
    Object.entries(activeTheme).forEach(([key, value]) => {
      if (key === 'radius') {
        document.documentElement.style.setProperty(`--${key}`, value);
      } else {
        document.documentElement.style.setProperty(`--${key}`, `hsl(${value})`);
      }
    });

    // Cleanup function
    return () => {
      // Reset to default theme or clean up as needed
      Object.keys(themeColors[mode]).forEach(key => {
        document.documentElement.style.removeProperty(`--${key}`);
      });
    };
  }, [themeColors, currentTheme, mounted]);

  const handleColorChange = (key: ThemeColorKey, value: string, mode: ThemeMode) => {
    setThemeColors(prev => ({
      ...prev,
      [mode]: {
        ...prev[mode],
        [key]: value,
      },
    }));
  };

  const generateThemeCode = () => {
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateThemeCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast('Theme code has been copied to your clipboard');
  };

  // Generate inline styles for the preview container based on current theme
  const getPreviewStyles = () => {
    if (!mounted) return {};

    const mode =
      currentTheme === 'dark' ||
      (currentTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ? 'dark'
        : 'light';

    const activeTheme = themeColors[mode];

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

  if (!mounted) {
    return <div>Loading...</div>;
  }

  const activeMode =
    currentTheme === 'dark' ||
    (currentTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? 'dark'
      : 'light';

  return (
    <div className='flex flex-col min-h-screen' style={getPreviewStyles()}>
      <header className='border-b'>
        <div className='container flex items-center justify-between h-16 px-4'>
          <h1 className='text-2xl font-bold'>ShadCN Theme Creator</h1>
          <div className='flex items-center gap-4'>
            <Button onClick={copyToClipboard} variant='outline' size='sm'>
              {copied ? <Check className='w-4 h-4 mr-2' /> : <Copy className='w-4 h-4 mr-2' />}
              Copy Code
            </Button>
            <Button size='sm'>Generate Theme</Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      <div className='flex flex-col md:flex-row flex-1'>
        {/* Left side - Color pickers */}
        <div className='w-full md:w-1/3 border-r'>
          <div className='p-4'>
            <h2 className='text-xl font-bold mb-4'>Theme Properties</h2>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-semibold'>Editing {activeMode} theme</h3>
              <Button
                variant='outline'
                onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
              >
                Switch to {currentTheme === 'dark' ? 'Light' : 'Dark'} Mode
              </Button>
            </div>

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
                    label={key as string}
                    value={value}
                    onChange={newValue =>
                      handleColorChange(key as ThemeColorKey, newValue, activeMode)
                    }
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Right side - Component preview */}
        <div className='w-full md:w-2/3'>
          <div className='p-6'>
            <h2 className='text-2xl font-bold mb-6'>Component Preview</h2>

            {/* Apply the theme to this container */}
            <div className='space-y-10'>
              <section>
                <h3 className='text-lg font-medium mb-4'>Buttons</h3>
                <div className='flex flex-wrap gap-4'>
                  <Button>Primary</Button>
                  <Button variant='secondary'>Secondary</Button>
                  <Button variant='outline'>Outline</Button>
                  <Button variant='ghost'>Ghost</Button>
                  <Button variant='link'>Link</Button>
                  <Button variant='destructive'>Destructive</Button>
                </div>
              </section>

              <Separator />

              <section>
                <h3 className='text-lg font-medium mb-4'>Cards</h3>
                <div className='grid md:grid-cols-2 gap-6'>
                  <Card>
                    <CardHeader>
                      <CardTitle>Card Title</CardTitle>
                      <CardDescription>Card description goes here</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Card content and information displayed here.</p>
                    </CardContent>
                    <CardFooter className='flex justify-between'>
                      <Button variant='ghost'>Cancel</Button>
                      <Button>Submit</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Settings</CardTitle>
                      <CardDescription>Manage how you receive notifications.</CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <div className='flex items-center justify-between'>
                        <Label htmlFor='email'>Email notifications</Label>
                        <Switch id='email' />
                      </div>
                      <div className='flex items-center justify-between'>
                        <Label htmlFor='sms'>SMS notifications</Label>
                        <Switch id='sms' />
                      </div>
                      <div className='flex items-center justify-between'>
                        <Label htmlFor='push'>Push notifications</Label>
                        <Switch id='push' />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <Separator />

              <section>
                <h3 className='text-lg font-medium mb-4'>Alerts</h3>
                <div className='space-y-4'>
                  <Alert>
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>
                      This is an informational alert to notify you about something important.
                    </AlertDescription>
                  </Alert>

                  <Alert variant='destructive'>
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      Something went wrong. Please try again later.
                    </AlertDescription>
                  </Alert>
                </div>
              </section>

              <Separator />

              <section>
                <h3 className='text-lg font-medium mb-4'>Form Elements</h3>
                <div className='grid md:grid-cols-2 gap-6'>
                  <div className='space-y-4'>
                    <div className='grid gap-2'>
                      <Label htmlFor='name'>Name</Label>
                      <Input id='name' placeholder='Enter your name' />
                    </div>

                    <div className='grid gap-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input id='email' type='email' placeholder='Enter your email' />
                    </div>

                    <div className='grid gap-2'>
                      <Label htmlFor='message'>Message</Label>
                      <Textarea id='message' placeholder='Type your message here' />
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <div className='grid gap-2'>
                      <Label>Subscription</Label>
                      <RadioGroup defaultValue='monthly'>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem value='monthly' id='monthly' />
                          <Label htmlFor='monthly'>Monthly</Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <RadioGroupItem value='yearly' id='yearly' />
                          <Label htmlFor='yearly'>Yearly</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className='grid gap-2'>
                      <Label htmlFor='country'>Country</Label>
                      <Select>
                        <SelectTrigger id='country'>
                          <SelectValue placeholder='Select a country' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='us'>United States</SelectItem>
                          <SelectItem value='ca'>Canada</SelectItem>
                          <SelectItem value='uk'>United Kingdom</SelectItem>
                          <SelectItem value='au'>Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='grid gap-2'>
                      <Label>Price Range</Label>
                      <Slider defaultValue={[50]} max={100} step={1} />
                    </div>
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h3 className='text-lg font-medium mb-4'>Calendar</h3>
                <div className='inline-block rounded-md border'>
                  <Calendar mode='single' selected={date} onSelect={setDate} />
                </div>
              </section>

              <Separator />

              <section>
                <h3 className='text-lg font-medium mb-4'>Dialogs & Popovers</h3>
                <div className='flex flex-wrap gap-4'>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant='outline'>Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent className='w-auto max-w-md mx-auto'>
                      <DialogHeader>
                        <DialogTitle>Dialog Title</DialogTitle>
                        <DialogDescription>
                          This is a dialog description. It provides more context about the dialog
                          content.
                        </DialogDescription>
                      </DialogHeader>
                      <div className='py-4'>
                        <p>
                          Dialog content goes here. This could be a form, information, or any other
                          content.
                        </p>
                      </div>
                      <DialogFooter>
                        <Button type='submit'>Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant='outline'>Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-80'>
                      <div className='grid gap-4'>
                        <div className='space-y-2'>
                          <h4 className='font-medium leading-none'>Dimensions</h4>
                          <p className='text-sm text-muted-foreground'>
                            Set the dimensions for the layer.
                          </p>
                        </div>
                        <div className='grid gap-2'>
                          <div className='grid grid-cols-3 items-center gap-4'>
                            <Label htmlFor='width'>Width</Label>
                            <Input id='width' defaultValue='100%' className='col-span-2 h-8' />
                          </div>
                          <div className='grid grid-cols-3 items-center gap-4'>
                            <Label htmlFor='height'>Height</Label>
                            <Input id='height' defaultValue='25px' className='col-span-2 h-8' />
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </section>

              <Separator />

              <section>
                <h3 className='text-lg font-medium mb-4'>Badges</h3>
                <div className='flex flex-wrap gap-2'>
                  <Badge>Default</Badge>
                  <Badge variant='secondary'>Secondary</Badge>
                  <Badge variant='outline'>Outline</Badge>
                  <Badge variant='destructive'>Destructive</Badge>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

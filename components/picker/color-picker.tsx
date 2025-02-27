'use client';

import { useState, useEffect, useRef } from 'react';
import { HslColorPicker } from 'react-colorful';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  // Parse the HSL string into an object
  const parseHslString = (hslStr: string) => {
    const [h = 0, s = 0, l = 0] = hslStr.split(' ').map(v => Number.parseFloat(v.replace('%', '')));
    return { h, s, l };
  };

  // Use refs to store current values without causing re-renders
  const hslRef = useRef(parseHslString(value));

  // State is only used for initial rendering and forced updates
  const [_, forceUpdate] = useState(0);
  const colorDisplayRef = useRef<HTMLButtonElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const colorLabelRef = useRef<HTMLSpanElement>(null);

  // Initialize the refs and DOM elements on mount
  useEffect(() => {
    hslRef.current = parseHslString(value);
    updateDOMElements();
  }, [value]);

  // Update DOM elements directly to avoid re-renders
  const updateDOMElements = () => {
    const { h, s, l } = hslRef.current;
    const formattedValue = `${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%`;
    const colorCSS = `hsl(${formattedValue})`;

    // Update DOM elements directly
    if (colorDisplayRef.current) {
      colorDisplayRef.current.style.backgroundColor = colorCSS;
    }

    if (colorInputRef.current) {
      colorInputRef.current.value = formattedValue;
    }

    if (colorLabelRef.current) {
      colorLabelRef.current.textContent = formattedValue;
    }
  };

  const handleHslChange = (newHsl: { h: number; s: number; l: number }) => {
    // Update the ref
    hslRef.current = newHsl;

    // Update DOM directly
    updateDOMElements();

    // Format the HSL values correctly for the CSS variable and call onChange
    const formattedValue = `${Math.round(newHsl.h)} ${Math.round(newHsl.s)}% ${Math.round(newHsl.l)}%`;
    onChange(formattedValue);
  };

  // Format initial display value
  const { h, s, l } = hslRef.current;
  const initialDisplayValue = `${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%`;

  return (
    <div className='grid gap-1.5'>
      <div className='flex justify-between items-center'>
        <Label className='text-sm'>{label}</Label>
        <span ref={colorLabelRef} className='text-xs text-muted-foreground font-mono'>
          {initialDisplayValue}
        </span>
      </div>
      <div className='flex gap-2 items-center'>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              ref={colorDisplayRef}
              variant='outline'
              className='w-8 h-8 p-0 border-2 rounded-md'
              style={{ backgroundColor: `hsl(${initialDisplayValue})` }}
              aria-label={`Pick color for ${label}`}
            >
              <span className='sr-only'>Pick color</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-3'>
            <HslColorPicker color={hslRef.current} onChange={handleHslChange} />
          </PopoverContent>
        </Popover>
        <Input
          ref={colorInputRef}
          defaultValue={initialDisplayValue}
          onChange={e => {
            try {
              const newHsl = parseHslString(e.target.value);
              handleHslChange(newHsl);
            } catch (error) {
              // Handle invalid input
              console.error('Invalid HSL format');
            }
          }}
          className='font-mono text-xs h-8'
        />
      </div>
    </div>
  );
}

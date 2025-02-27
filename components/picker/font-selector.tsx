'use client';

import { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FontOption, fontOptions, applyFontToDocument } from '@/lib/picker/font-utils';
import { useFontContext } from '@/lib/providers/font-provider';

interface FontSelectorProps {
  value: string;
  onValueChange: (value: FontOption) => void;
}

export default function FontSelector({ value, onValueChange }: FontSelectorProps) {
  const { setFont } = useFontContext();

  // Apply the current font on initial load
  useEffect(() => {
    const currentFont = fontOptions.find(font => font.family === value) || fontOptions[0];
    setFont(currentFont);
    // Also apply the font using the direct function to ensure it's applied properly
    applyFontToDocument(currentFont);
  }, [value, setFont]);

  // Find the currently selected font
  const selectedFont = fontOptions.find(font => font.family === value) || fontOptions[0];

  return (
    <Select
      value={selectedFont.family}
      onValueChange={value => {
        const font = fontOptions.find(f => f.family === value);
        if (font) {
          // Apply the selected font to the document immediately using both methods
          setFont(font);
          applyFontToDocument(font);
          // Then notify parent component
          onValueChange(font);
        }
      }}
    >
      <SelectTrigger className='w-full'>
        <SelectValue>
          <span className={selectedFont.cssClass}>{selectedFont.name}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {fontOptions.map(font => (
          <SelectItem key={font.family} value={font.family} className={font.cssClass}>
            <div className='flex justify-between items-center w-full'>
              <span>{font.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

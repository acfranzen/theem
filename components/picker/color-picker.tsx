"use client";

import { useState, useEffect } from "react";
import { HslColorPicker } from "react-colorful";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function ColorPicker({
  label,
  value,
  onChange,
}: ColorPickerProps) {
  // Parse the HSL string into an object
  const parseHslString = (hslStr: string) => {
    const [h = 0, s = 0, l = 0] = hslStr
      .split(" ")
      .map((v) => Number.parseFloat(v.replace("%", "")));
    return { h, s, l };
  };

  const [hsl, setHsl] = useState(() => parseHslString(value));

  useEffect(() => {
    setHsl(parseHslString(value));
  }, [value]); // Removed parseHslString from dependencies

  const handleHslChange = (newHsl: { h: number; s: number; l: number }) => {
    setHsl(newHsl);
    // Format the HSL values correctly for the CSS variable
    onChange(
      `${Math.round(newHsl.h)} ${Math.round(newHsl.s)}% ${Math.round(
        newHsl.l
      )}%`
    );
  };

  return (
    <div className="grid gap-1.5">
      <div className="flex justify-between items-center">
        <Label className="text-sm">{label}</Label>
        <span className="text-xs text-muted-foreground font-mono">
          {Math.round(hsl.h)} {Math.round(hsl.s)}% {Math.round(hsl.l)}%
        </span>
      </div>
      <div className="flex gap-2 items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-8 h-8 p-0 border-2 rounded-md"
              style={{ backgroundColor: `hsl(${hsl.h} ${hsl.s}% ${hsl.l}%)` }}
              aria-label={`Pick color for ${label}`}
            >
              <span className="sr-only">Pick color</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3">
            <HslColorPicker color={hsl} onChange={handleHslChange} />
          </PopoverContent>
        </Popover>
        <Input
          value={`${Math.round(hsl.h)} ${Math.round(hsl.s)}% ${Math.round(
            hsl.l
          )}%`}
          onChange={(e) => {
            try {
              const newHsl = parseHslString(e.target.value);
              handleHslChange(newHsl);
            } catch (error) {
              // Handle invalid input
              console.error("Invalid HSL format");
            }
          }}
          className="font-mono text-xs h-8"
        />
      </div>
    </div>
  );
}

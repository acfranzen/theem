import * as React from 'react';

import { cn } from '@/lib/utils';
import { StyleProfileId } from '@/lib/style-system/types';
import { resolveComponentRecipe } from '@/lib/style-system/component-recipes';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  styleProfile?: StyleProfileId;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, styleProfile, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-[transform,box-shadow,background-color,color,border-color] duration-[var(--style-duration-base)] ease-[var(--style-easing-standard)] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          resolveComponentRecipe('input', { styleProfile }),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };

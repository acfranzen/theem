'use client';

import { useStyleContext } from '@/lib/picker/style-context';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface StyleRendererProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps content with style-specific classes and CSS custom properties.
 * This is the main bridge between the style system and the preview/UI.
 */
export default function StyleRenderer({ children, className }: StyleRendererProps) {
  const { activeStyle, profile, resolvedSurface } = useStyleContext();

  // Build the style-specific wrapper class
  const styleClass = `style-${activeStyle}`;

  // Surface-level inline styles that can't be expressed as classes
  const surfaceStyles: React.CSSProperties = {
    '--style-blur': resolvedSurface.backdropBlur,
    '--style-border-width': resolvedSurface.borderWidth,
    '--style-shadow': resolvedSurface.shadowStyle,
    '--style-opacity': String(resolvedSurface.backgroundOpacity),
    '--style-duration': profile.motion.duration,
    '--style-easing': profile.motion.easing,
  } as React.CSSProperties;

  return (
    <div
      className={cn(styleClass, className)}
      style={surfaceStyles}
      data-style={activeStyle}
    >
      {children}
    </div>
  );
}

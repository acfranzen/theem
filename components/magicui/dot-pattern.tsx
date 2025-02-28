'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React, { useEffect, useId, useRef, useState } from 'react';

/**
 *  DotPattern Component Props
 *
 * @param {number} [width=16] - The horizontal spacing between dots
 * @param {number} [height=16] - The vertical spacing between dots
 * @param {number} [x=0] - The x-offset of the entire pattern
 * @param {number} [y=0] - The y-offset of the entire pattern
 * @param {number} [cx=1] - The x-offset of individual dots
 * @param {number} [cy=1] - The y-offset of individual dots
 * @param {number} [cr=1] - The radius of each dot
 * @param {string} [className] - Additional CSS classes to apply to the SVG container
 * @param {boolean} [glow=false] - Whether dots should have a glowing animation effect
 * @param {number} [rippleDuration=4] - Duration of the ripple animation in seconds
 * @param {number} [rippleSpeed=0.3] - Speed of the ripple expansion
 * @param {number} [maxScale=1.5] - Maximum scale for dots during animation
 * @param {number} [rippleCount=3] - Number of concurrent ripple rings
 */
interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
  glow?: boolean;
  rippleDuration?: number;
  rippleSpeed?: number;
  maxScale?: number;
  rippleCount?: number;
  [key: string]: unknown;
}

/**
 * DotPattern Component
 *
 * A React component that creates an animated or static dot pattern background using SVG.
 * The pattern automatically adjusts to fill its container and can optionally display a ripple effect
 * that starts from the center point and expands outward in distinct rings.
 *
 * @component
 *
 * @see DotPatternProps for the props interface.
 *
 * @example
 * // Basic usage
 * <DotPattern />
 *
 * // With ripple effect and custom spacing
 * <DotPattern
 *   width={20}
 *   height={20}
 *   glow={true}
 *   rippleDuration={5}
 *   maxScale={1.8}
 *   rippleCount={4}
 *   className="opacity-50"
 * />
 *
 * @notes
 * - The component is client-side only ("use client")
 * - Automatically responds to container size changes
 * - When glow is enabled, dots animate in distinct ripple rings from the center
 * - Both opacity and scale changes follow the ripple wave pattern
 * - Uses Motion for animations
 * - Dots color can be controlled via the text color utility classes
 */

export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow = false,
  rippleDuration = 4,
  rippleSpeed = 2,
  maxScale = 2,
  rippleCount = 1,
  ...props
}: DotPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const dots = Array.from(
    {
      length: Math.ceil(dimensions.width / width) * Math.ceil(dimensions.height / height),
    },
    (_, i) => {
      const col = i % Math.ceil(dimensions.width / width);
      const row = Math.floor(i / Math.ceil(dimensions.width / width));
      const dotX = col * width + cx;
      const dotY = row * height + cy;

      // Calculate center of the container
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;

      // Calculate distance from center (for ripple effect)
      const distanceFromCenter = Math.sqrt(
        Math.pow(dotX - centerX, 2) + Math.pow(dotY - centerY, 2)
      );

      // Calculate normalized distance (0-1 range based on max possible distance)
      const maxDistance = Math.sqrt(
        Math.pow(dimensions.width / 2, 2) + Math.pow(dimensions.height / 2, 2)
      );
      const normalizedDistance = distanceFromCenter / maxDistance;

      return {
        x: dotX,
        y: dotY,
        distance: distanceFromCenter,
        normalizedDistance,
      };
    }
  );

  return (
    <svg
      ref={containerRef}
      aria-hidden='true'
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      {...props}
    >
      <defs>
        <radialGradient id={`${id}-gradient`}>
          <stop offset='0%' stopColor='currentColor' stopOpacity='1' />
          <stop offset='100%' stopColor='currentColor' stopOpacity='0' />
        </radialGradient>
      </defs>
      {dots.map((dot, index) => {
        return (
          <motion.circle
            key={`${dot.x}-${dot.y}`}
            cx={dot.x}
            cy={dot.y}
            r={cr}
            fill={glow ? `url(#${id}-gradient)` : 'currentColor'}
            className='text-neutral-400/80'
            initial={glow ? { opacity: 0.7, scale: 1 } : {}}
            custom={glow ? dot.normalizedDistance : undefined}
            variants={
              glow
                ? {
                    ripple: distance => ({
                      opacity: [0.7, 1, 0.7],
                      scale: [1, maxScale, 1],
                      transition: {
                        repeat: Infinity,
                        duration: rippleDuration,
                        // Use staggered delays for ripple effect
                        // This creates distinct ripple rings based on distance
                        delay: (distance * rippleDuration) % (rippleDuration / rippleCount),
                        ease: 'easeInOut',
                      },
                    }),
                  }
                : undefined
            }
            animate={glow ? 'ripple' : undefined}
          />
        );
      })}
    </svg>
  );
}

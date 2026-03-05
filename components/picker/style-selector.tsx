'use client';

import { useStyleContext } from '@/lib/picker/style-context';
import { styleProfileList } from '@/lib/picker/style-profiles';
import { StyleId } from '@/lib/picker/style-types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

// Visual identity icons per style — rendered as small abstract compositions
function SwissIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
      <rect x="4" y="4" width="18" height="18" fill="currentColor" opacity="0.9" />
      <rect x="26" y="4" width="18" height="8" fill="currentColor" opacity="0.4" />
      <rect x="26" y="16" width="18" height="6" fill="currentColor" opacity="0.2" />
      <rect x="4" y="26" width="40" height="2" fill="currentColor" opacity="0.6" />
      <rect x="4" y="32" width="28" height="2" fill="currentColor" opacity="0.3" />
      <rect x="4" y="38" width="16" height="2" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

function GlassIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <rect x="4" y="6" width="40" height="36" rx="8" fill="url(#glassGrad)" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
      <rect x="10" y="12" width="14" height="10" rx="4" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeOpacity="0.15" strokeWidth="0.5" />
      <rect x="28" y="12" width="10" height="10" rx="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.15" strokeWidth="0.5" />
      <rect x="10" y="26" width="28" height="4" rx="2" fill="currentColor" fillOpacity="0.12" />
      <rect x="10" y="34" width="18" height="3" rx="1.5" fill="currentColor" fillOpacity="0.08" />
    </svg>
  );
}

function NeubrutalIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
      <rect x="4" y="4" width="20" height="16" fill="hsl(50, 100%, 60%)" stroke="currentColor" strokeWidth="2.5" />
      <rect x="6.5" y="6.5" width="20" height="16" fill="hsl(340, 82%, 55%)" stroke="currentColor" strokeWidth="2.5" transform="translate(20, 0)" />
      <rect x="4" y="24" width="40" height="4" fill="currentColor" />
      <rect x="4" y="32" width="18" height="12" fill="hsl(160, 85%, 45%)" stroke="currentColor" strokeWidth="2.5" />
      <rect x="26" y="32" width="18" height="12" fill="hsl(263, 70%, 55%)" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

const styleIcons: Record<StyleId, () => React.ReactElement> = {
  swiss: SwissIcon,
  glass: GlassIcon,
  neubrutalism: NeubrutalIcon,
};

export default function StyleSelector() {
  const { activeStyle, setActiveStyle } = useStyleContext();

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-1">
        Styles
      </h2>
      <div className="flex flex-col gap-2">
        {styleProfileList.map(profile => {
          const isActive = activeStyle === profile.id;
          const Icon = styleIcons[profile.id];
          return (
            <motion.button
              key={profile.id}
              onClick={() => setActiveStyle(profile.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'relative flex items-center gap-3 rounded-lg border p-3 text-left transition-colors',
                isActive
                  ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                  : 'border-border bg-card hover:bg-accent/50'
              )}
            >
              {/* Style icon */}
              <div
                className={cn(
                  'flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center p-1',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <Icon />
              </div>

              {/* Style info */}
              <div className="flex-1 min-w-0">
                <div
                  className={cn(
                    'text-sm font-semibold truncate',
                    isActive ? 'text-primary' : 'text-foreground'
                  )}
                >
                  {profile.name}
                </div>
                <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                  {profile.description}
                </div>
              </div>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeStyleIndicator"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

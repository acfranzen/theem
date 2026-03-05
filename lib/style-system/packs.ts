import { StyleProfile, StyleProfileId } from '@/lib/style-system/types';

const baseLight = {
  token: {
    color: {
      'surface-base': '0 0% 100%',
      'surface-elevated': '220 14% 97%',
      text: '222 40% 10%',
      accent: '222 47% 21%',
      border: '220 14% 86%',
      focus: '220 74% 51%',
    },
    radius: {
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '18px',
      xl: '26px',
    },
    border: {
      width: '1px',
      panel: '1px',
      control: '1px',
      style: 'solid',
    },
    opacity: {
      overlay: '0.6',
      disabled: '0.45',
      ghost: '0.08',
    },
    blur: {
      sm: '4px',
      md: '8px',
      lg: '14px',
    },
    elevation: {
      low: '0 1px 2px hsl(220 40% 2% / 0.08)',
      mid: '0 6px 14px hsl(220 40% 2% / 0.12)',
      high: '0 12px 28px hsl(220 40% 2% / 0.18)',
    },
  },
  composition: {
    density: 'comfortable' as const,
    spacing: {
      xs: '0.35rem',
      sm: '0.6rem',
      md: '0.95rem',
      lg: '1.4rem',
      xl: '2rem',
    },
    panel: {
      padding: '1rem',
      gap: '0.75rem',
      inset: '1.25rem',
    },
  },
  motion: {
    duration: {
      fast: '120ms',
      base: '180ms',
      slow: '260ms',
    },
    easing: {
      standard: 'cubic-bezier(0.2, 0, 0, 1)',
      entrance: 'cubic-bezier(0.15, 1, 0.3, 1)',
      exit: 'cubic-bezier(0.3, 0, 1, 1)',
      emphasis: 'cubic-bezier(0.25, 0.85, 0.25, 1)',
    },
    choreography: 'subtle' as const,
  },
  surfaceFx: {
    family: 'plain' as const,
    tokens: {
      'panel-bg': 'hsl(var(--card))',
      'panel-border': 'hsl(var(--border))',
      'panel-shadow': 'var(--style-elevation-mid)',
      'panel-blur': '0px',
      'noise-opacity': '0',
      'highlight-opacity': '0',
    },
  },
};

export const STYLE_PROFILES: Record<StyleProfileId, StyleProfile> = {
  'minimal-swiss': {
    id: 'minimal-swiss',
    name: 'Minimal Swiss',
    description: 'Strict rhythm, quiet elevation, restrained type and spacing.',
    layers: {
      light: {
        ...baseLight,
        composition: {
          ...baseLight.composition,
          density: 'compact',
          spacing: {
            xs: '0.25rem',
            sm: '0.5rem',
            md: '0.75rem',
            lg: '1.1rem',
            xl: '1.7rem',
          },
        },
        component: {
          button: {
            base: 'uppercase tracking-[0.06em] font-semibold rounded-[var(--style-radius-sm)]',
            variants: {
              default: 'shadow-none',
              secondary: 'shadow-none',
              outline: 'shadow-none',
            },
          },
          card: {
            base: 'rounded-[var(--style-radius-md)] shadow-[var(--style-elevation-low)]',
          },
          input: {
            base: 'rounded-[var(--style-radius-sm)] shadow-none',
          },
          sidebar: {
            base: 'shadow-none',
          },
          dialog: {
            base: 'rounded-[var(--style-radius-md)] shadow-[var(--style-elevation-mid)]',
            slots: {
              overlay: 'bg-black/60',
            },
          },
          tabs: {
            slots: {
              list: 'rounded-[var(--style-radius-sm)] bg-muted/70',
              trigger: 'rounded-[var(--style-radius-sm)]',
            },
          },
        },
      },
      dark: {
        ...baseLight,
        token: {
          ...baseLight.token,
          color: {
            'surface-base': '222 24% 10%',
            'surface-elevated': '222 20% 14%',
            text: '210 24% 92%',
            accent: '206 80% 64%',
            border: '222 17% 28%',
            focus: '210 88% 66%',
          },
          elevation: {
            low: '0 1px 2px hsl(0 0% 0% / 0.3)',
            mid: '0 8px 18px hsl(0 0% 0% / 0.36)',
            high: '0 14px 32px hsl(0 0% 0% / 0.44)',
          },
        },
        component: {
          button: {
            base: 'uppercase tracking-[0.06em] font-semibold rounded-[var(--style-radius-sm)]',
            variants: {
              default: 'shadow-none',
              secondary: 'shadow-none',
              outline: 'shadow-none',
            },
          },
          card: {
            base: 'rounded-[var(--style-radius-md)] shadow-[var(--style-elevation-low)]',
          },
          input: {
            base: 'rounded-[var(--style-radius-sm)] shadow-none',
          },
          sidebar: {
            base: 'shadow-none',
          },
          dialog: {
            base: 'rounded-[var(--style-radius-md)] shadow-[var(--style-elevation-mid)]',
            slots: {
              overlay: 'bg-black/70',
            },
          },
          tabs: {
            slots: {
              list: 'rounded-[var(--style-radius-sm)] bg-muted/60',
              trigger: 'rounded-[var(--style-radius-sm)]',
            },
          },
        },
      },
    },
  },
  glassmorphism: {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    description: 'Translucent layers, blur depth, floating surfaces, soft glow.',
    layers: {
      light: {
        ...baseLight,
        token: {
          ...baseLight.token,
          radius: {
            xs: '8px',
            sm: '12px',
            md: '18px',
            lg: '24px',
            xl: '30px',
          },
          opacity: {
            overlay: '0.44',
            disabled: '0.36',
            ghost: '0.15',
          },
          blur: {
            sm: '8px',
            md: '18px',
            lg: '28px',
          },
          elevation: {
            low: '0 8px 18px hsl(220 40% 4% / 0.08)',
            mid: '0 16px 32px hsl(220 40% 4% / 0.14)',
            high: '0 28px 60px hsl(220 40% 4% / 0.2)',
          },
        },
        composition: {
          ...baseLight.composition,
          density: 'airy',
          panel: {
            padding: '1.1rem',
            gap: '0.9rem',
            inset: '1.3rem',
          },
        },
        motion: {
          ...baseLight.motion,
          duration: {
            fast: '140ms',
            base: '220ms',
            slow: '340ms',
          },
          choreography: 'expressive',
        },
        surfaceFx: {
          family: 'glass',
          tokens: {
            'panel-bg': 'hsl(var(--card) / 0.58)',
            'panel-border': 'hsl(var(--border) / 0.56)',
            'panel-shadow': 'var(--style-elevation-high)',
            'panel-blur': 'var(--style-blur-lg)',
            'noise-opacity': '0.04',
            'highlight-opacity': '0.42',
          },
        },
        component: {
          button: {
            base: 'rounded-[var(--style-radius-md)] backdrop-blur-md border-white/30',
            variants: {
              default: 'shadow-[var(--style-elevation-mid)]',
              secondary: 'bg-secondary/55 border-border/60',
              outline: 'bg-background/35',
            },
          },
          card: {
            base: 'rounded-[var(--style-radius-lg)] backdrop-blur-xl border-white/25 shadow-[var(--style-elevation-high)]',
          },
          input: {
            base: 'rounded-[var(--style-radius-md)] bg-background/35 backdrop-blur-sm',
          },
          sidebar: {
            base: 'backdrop-blur-xl shadow-[var(--style-elevation-high)]',
          },
          dialog: {
            base: 'rounded-[var(--style-radius-lg)] backdrop-blur-xl border-white/30 shadow-[var(--style-elevation-high)]',
            slots: {
              overlay: 'bg-black/45 backdrop-blur-[2px]',
            },
          },
          tabs: {
            slots: {
              list: 'rounded-[var(--style-radius-md)] bg-muted/50 backdrop-blur-md',
              trigger: 'rounded-[var(--style-radius-sm)]',
            },
          },
        },
      },
      dark: {
        ...baseLight,
        token: {
          ...baseLight.token,
          color: {
            'surface-base': '228 24% 12%',
            'surface-elevated': '230 20% 18%',
            text: '210 33% 94%',
            accent: '191 95% 66%',
            border: '220 20% 35%',
            focus: '191 95% 66%',
          },
          radius: {
            xs: '8px',
            sm: '12px',
            md: '18px',
            lg: '24px',
            xl: '30px',
          },
          opacity: {
            overlay: '0.44',
            disabled: '0.36',
            ghost: '0.15',
          },
          blur: {
            sm: '8px',
            md: '18px',
            lg: '28px',
          },
          elevation: {
            low: '0 10px 22px hsl(0 0% 0% / 0.28)',
            mid: '0 22px 40px hsl(0 0% 0% / 0.34)',
            high: '0 34px 72px hsl(0 0% 0% / 0.48)',
          },
        },
        composition: {
          ...baseLight.composition,
          density: 'airy',
        },
        motion: {
          ...baseLight.motion,
          duration: {
            fast: '140ms',
            base: '220ms',
            slow: '340ms',
          },
          choreography: 'expressive',
        },
        surfaceFx: {
          family: 'glass',
          tokens: {
            'panel-bg': 'hsl(var(--card) / 0.48)',
            'panel-border': 'hsl(var(--border) / 0.45)',
            'panel-shadow': 'var(--style-elevation-high)',
            'panel-blur': 'var(--style-blur-lg)',
            'noise-opacity': '0.06',
            'highlight-opacity': '0.28',
          },
        },
        component: {
          button: {
            base: 'rounded-[var(--style-radius-md)] backdrop-blur-md border-white/20',
            variants: {
              default: 'shadow-[var(--style-elevation-mid)]',
              secondary: 'bg-secondary/45 border-border/50',
              outline: 'bg-background/30',
            },
          },
          card: {
            base: 'rounded-[var(--style-radius-lg)] backdrop-blur-xl border-white/20 shadow-[var(--style-elevation-high)]',
          },
          input: {
            base: 'rounded-[var(--style-radius-md)] bg-background/25 backdrop-blur-sm',
          },
          sidebar: {
            base: 'backdrop-blur-xl shadow-[var(--style-elevation-high)]',
          },
          dialog: {
            base: 'rounded-[var(--style-radius-lg)] backdrop-blur-xl border-white/20 shadow-[var(--style-elevation-high)]',
            slots: {
              overlay: 'bg-black/55 backdrop-blur-[2px]',
            },
          },
          tabs: {
            slots: {
              list: 'rounded-[var(--style-radius-md)] bg-muted/45 backdrop-blur-md',
              trigger: 'rounded-[var(--style-radius-sm)]',
            },
          },
        },
      },
    },
  },
  neubrutalism: {
    id: 'neubrutalism',
    name: 'Neubrutalism',
    description: 'Hard borders, flat fills, offset shadows, direct interactions.',
    layers: {
      light: {
        ...baseLight,
        token: {
          ...baseLight.token,
          radius: {
            xs: '2px',
            sm: '4px',
            md: '6px',
            lg: '8px',
            xl: '10px',
          },
          border: {
            width: '2px',
            panel: '3px',
            control: '2px',
            style: 'solid',
          },
          blur: {
            sm: '0px',
            md: '0px',
            lg: '0px',
          },
          elevation: {
            low: '4px 4px 0 0 hsl(222 84% 5% / 1)',
            mid: '6px 6px 0 0 hsl(222 84% 5% / 1)',
            high: '8px 8px 0 0 hsl(222 84% 5% / 1)',
          },
        },
        composition: {
          ...baseLight.composition,
          density: 'compact',
          spacing: {
            xs: '0.25rem',
            sm: '0.45rem',
            md: '0.75rem',
            lg: '1rem',
            xl: '1.4rem',
          },
        },
        motion: {
          ...baseLight.motion,
          duration: {
            fast: '90ms',
            base: '130ms',
            slow: '200ms',
          },
          choreography: 'none',
        },
        surfaceFx: {
          family: 'brutal',
          tokens: {
            'panel-bg': 'hsl(var(--card))',
            'panel-border': 'hsl(var(--foreground))',
            'panel-shadow': 'var(--style-elevation-mid)',
            'panel-blur': '0px',
            'noise-opacity': '0',
            'highlight-opacity': '0',
          },
        },
        component: {
          button: {
            base: 'rounded-[var(--style-radius-xs)] border-2 border-foreground font-bold uppercase tracking-[0.04em]',
            variants: {
              default: 'shadow-[var(--style-elevation-mid)] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none',
              secondary: 'shadow-[var(--style-elevation-low)]',
              outline: 'bg-background shadow-[var(--style-elevation-low)]',
            },
          },
          card: {
            base: 'rounded-[var(--style-radius-sm)] border-[3px] border-foreground shadow-[var(--style-elevation-mid)]',
          },
          input: {
            base: 'rounded-[var(--style-radius-xs)] border-2 border-foreground shadow-[var(--style-elevation-low)] focus-visible:translate-x-[1px] focus-visible:translate-y-[1px] focus-visible:shadow-none',
          },
          sidebar: {
            base: 'border-r-[3px] border-foreground shadow-[var(--style-elevation-high)]',
          },
          dialog: {
            base: 'rounded-[var(--style-radius-sm)] border-[3px] border-foreground shadow-[var(--style-elevation-high)]',
            slots: {
              overlay: 'bg-black/70',
            },
          },
          tabs: {
            slots: {
              list: 'rounded-[var(--style-radius-xs)] border-2 border-foreground bg-secondary shadow-[var(--style-elevation-low)]',
              trigger:
                'rounded-[2px] data-[state=active]:border-2 data-[state=active]:border-foreground data-[state=active]:shadow-[var(--style-elevation-low)]',
            },
          },
        },
      },
      dark: {
        ...baseLight,
        token: {
          ...baseLight.token,
          color: {
            'surface-base': '222 28% 9%',
            'surface-elevated': '222 22% 14%',
            text: '210 22% 92%',
            accent: '44 100% 58%',
            border: '210 22% 92%',
            focus: '44 100% 58%',
          },
          radius: {
            xs: '2px',
            sm: '4px',
            md: '6px',
            lg: '8px',
            xl: '10px',
          },
          border: {
            width: '2px',
            panel: '3px',
            control: '2px',
            style: 'solid',
          },
          blur: {
            sm: '0px',
            md: '0px',
            lg: '0px',
          },
          elevation: {
            low: '4px 4px 0 0 hsl(50 100% 50% / 1)',
            mid: '6px 6px 0 0 hsl(50 100% 50% / 1)',
            high: '8px 8px 0 0 hsl(50 100% 50% / 1)',
          },
        },
        composition: {
          ...baseLight.composition,
          density: 'compact',
        },
        motion: {
          ...baseLight.motion,
          duration: {
            fast: '90ms',
            base: '130ms',
            slow: '200ms',
          },
          choreography: 'none',
        },
        surfaceFx: {
          family: 'brutal',
          tokens: {
            'panel-bg': 'hsl(var(--card))',
            'panel-border': 'hsl(var(--foreground))',
            'panel-shadow': 'var(--style-elevation-mid)',
            'panel-blur': '0px',
            'noise-opacity': '0',
            'highlight-opacity': '0',
          },
        },
        component: {
          button: {
            base: 'rounded-[var(--style-radius-xs)] border-2 border-foreground font-bold uppercase tracking-[0.04em]',
            variants: {
              default: 'shadow-[var(--style-elevation-mid)] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none',
              secondary: 'shadow-[var(--style-elevation-low)]',
              outline: 'bg-background shadow-[var(--style-elevation-low)]',
            },
          },
          card: {
            base: 'rounded-[var(--style-radius-sm)] border-[3px] border-foreground shadow-[var(--style-elevation-mid)]',
          },
          input: {
            base: 'rounded-[var(--style-radius-xs)] border-2 border-foreground shadow-[var(--style-elevation-low)] focus-visible:translate-x-[1px] focus-visible:translate-y-[1px] focus-visible:shadow-none',
          },
          sidebar: {
            base: 'border-r-[3px] border-foreground shadow-[var(--style-elevation-high)]',
          },
          dialog: {
            base: 'rounded-[var(--style-radius-sm)] border-[3px] border-foreground shadow-[var(--style-elevation-high)]',
            slots: {
              overlay: 'bg-black/75',
            },
          },
          tabs: {
            slots: {
              list: 'rounded-[var(--style-radius-xs)] border-2 border-foreground bg-secondary shadow-[var(--style-elevation-low)]',
              trigger:
                'rounded-[2px] data-[state=active]:border-2 data-[state=active]:border-foreground data-[state=active]:shadow-[var(--style-elevation-low)]',
            },
          },
        },
      },
    },
  },
};

export const DEFAULT_STYLE_PROFILE_ID: StyleProfileId = 'minimal-swiss';

export const STYLE_PROFILE_OPTIONS = Object.values(STYLE_PROFILES).map(profile => ({
  id: profile.id,
  name: profile.name,
  description: profile.description,
}));

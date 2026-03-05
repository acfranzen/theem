import { ThemeColors, ThemeMode } from './theme-utils';

// ─── Style Identity ───────────────────────────────────────────────
export type StyleId = 'swiss' | 'glass' | 'neubrutalism';

// ─── Layer 1: Token Bundle ────────────────────────────────────────
export interface TokenBundle {
  light: ThemeColors;
  dark: ThemeColors;
  // Extended tokens beyond the flat HSL color set
  borderWidth: string;
  opacity: number; // 0–1
  blur: string; // backdrop-blur value
  elevation: number; // 0–5 shadow level
}

// ─── Layer 2: Composition ─────────────────────────────────────────
export interface CompositionConfig {
  spacingUnit: number; // base unit in px
  density: 'compact' | 'comfortable' | 'spacious';
  panelGap: string;
  cardPadding: string;
  sectionGap: string;
  layoutMode: 'grid' | 'stack' | 'loose';
}

// ─── Layer 3: Component Overrides ─────────────────────────────────
export interface ComponentOverrides {
  card: string; // extra CSS classes
  button: string;
  input: string;
  badge: string;
  nav: string;
  tab: string;
  separator: string;
}

// ─── Layer 4: Motion ──────────────────────────────────────────────
export interface MotionConfig {
  enabled: boolean;
  duration: string; // e.g. "150ms"
  easing: string; // CSS easing
  stagger: number; // ms between staggered items
  hoverScale: number; // scale on hover (1 = none)
  enterAnimation: 'fade' | 'slide-up' | 'scale' | 'none';
}

// ─── Layer 5: Surface FX ─────────────────────────────────────────
export interface SurfaceConfig {
  backdropBlur: string;
  borderStyle: string;
  borderWidth: string;
  shadowStyle: string; // CSS box-shadow value
  backgroundOpacity: number; // 0–1
  noise: boolean;
  glowEffect: boolean;
  borderColor: string; // override for border color
}

// ─── Composite Style Profile ──────────────────────────────────────
export interface StyleProfile {
  id: StyleId;
  name: string;
  description: string;
  tokens: TokenBundle;
  composition: CompositionConfig;
  components: ComponentOverrides;
  motion: MotionConfig;
  surface: SurfaceConfig;
  // Font recommendations per style
  fontFamily: string;
  fontDisplay: string; // display/heading font
}

// ─── Runtime state ────────────────────────────────────────────────
export interface StyleState {
  activeStyle: StyleId;
  profile: StyleProfile;
  // Token overrides applied by user (persisted separately)
  tokenOverrides: Partial<TokenBundle>;
  // Composition overrides
  compositionOverrides: Partial<CompositionConfig>;
  // Surface overrides
  surfaceOverrides: Partial<SurfaceConfig>;
}

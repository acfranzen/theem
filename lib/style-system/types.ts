export type ThemeMode = 'light' | 'dark';
export type ThemeColors = Record<string, string>;

export type StyleProfileId = 'minimal-swiss' | 'glassmorphism' | 'neubrutalism';

export type TokenNamespace =
  | 'color'
  | 'radius'
  | 'border'
  | 'opacity'
  | 'blur'
  | 'elevation'
  | 'spacing'
  | 'motion'
  | 'surfaceFx';

export type TokenMap = Record<string, string>;

export interface TokenLayer {
  color: TokenMap;
  radius: TokenMap;
  border: TokenMap;
  opacity: TokenMap;
  blur: TokenMap;
  elevation: TokenMap;
}

export interface CompositionLayer {
  density: 'compact' | 'comfortable' | 'airy';
  spacing: TokenMap;
  panel: TokenMap;
}

export interface MotionLayer {
  duration: TokenMap;
  easing: TokenMap;
  choreography: 'none' | 'subtle' | 'expressive';
}

export interface SurfaceFxLayer {
  family: 'plain' | 'glass' | 'brutal';
  tokens: TokenMap;
}

export interface ComponentRecipe {
  base?: string;
  slots?: Record<string, string>;
  variants?: Record<string, string>;
}

export interface ComponentLayer {
  button: ComponentRecipe;
  card: ComponentRecipe;
  input: ComponentRecipe;
  sidebar: ComponentRecipe;
  dialog: ComponentRecipe;
  tabs: ComponentRecipe;
}

export interface StyleLayerBundle {
  token: TokenLayer;
  composition: CompositionLayer;
  component: ComponentLayer;
  motion: MotionLayer;
  surfaceFx: SurfaceFxLayer;
}

export interface StyleProfile {
  id: StyleProfileId;
  name: string;
  description: string;
  layers: Record<ThemeMode, StyleLayerBundle>;
}

export interface StyleInstance {
  schemaVersion: number;
  styleId: StyleProfileId;
  overrides?: Partial<Record<TokenNamespace, TokenMap>>;
}

export interface StyleResolverInput {
  styleId: StyleProfileId;
  mode: ThemeMode;
  themeColors?: Record<ThemeMode, ThemeColors>;
  overrides?: StyleInstance['overrides'];
  reducedMotion?: boolean;
}

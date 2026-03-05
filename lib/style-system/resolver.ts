import { STYLE_PROFILES } from '@/lib/style-system/packs';
import type { StyleResolverInput, TokenMap } from '@/lib/style-system/types';

const appendNamespace = (namespace: string, tokens: TokenMap): Record<string, string> =>
  Object.entries(tokens).reduce(
    (acc, [key, value]) => {
      acc[`--style-${namespace}-${key}`] = value;
      return acc;
    },
    {} as Record<string, string>
  );

const mergeTokens = (...tokenMaps: Array<TokenMap | undefined>): TokenMap => {
  return tokenMaps.reduce<TokenMap>((acc, tokenMap) => {
    if (!tokenMap) return acc;
    Object.assign(acc, tokenMap);
    return acc;
  }, {} as TokenMap);
};

export const resolveStyleVariables = ({
  styleId,
  mode,
  overrides,
  reducedMotion = false,
}: StyleResolverInput): Record<string, string> => {
  const profile = STYLE_PROFILES[styleId];
  const layers = profile.layers[mode];

  const color = mergeTokens(layers.token.color, overrides?.color);
  const radius = mergeTokens(layers.token.radius, overrides?.radius);
  const border = mergeTokens(layers.token.border, overrides?.border);
  const opacity = mergeTokens(layers.token.opacity, overrides?.opacity);
  const blur = mergeTokens(layers.token.blur, overrides?.blur);
  const elevation = mergeTokens(layers.token.elevation, overrides?.elevation);
  const spacing = mergeTokens(layers.composition.spacing, overrides?.spacing);
  const panel = mergeTokens(layers.composition.panel);

  const duration = reducedMotion
    ? { fast: '1ms', base: '1ms', slow: '1ms' }
    : layers.motion.duration;

  const resolved = {
    '--style-profile': styleId,
    '--style-density': layers.composition.density,
    '--style-choreography': reducedMotion ? 'none' : layers.motion.choreography,
    '--style-surface-family': layers.surfaceFx.family,
    ...appendNamespace('color', color),
    ...appendNamespace('radius', radius),
    ...appendNamespace('border', border),
    ...appendNamespace('opacity', opacity),
    ...appendNamespace('blur', blur),
    ...appendNamespace('elevation', elevation),
    ...appendNamespace('spacing', spacing),
    ...appendNamespace('panel', panel),
    ...appendNamespace('duration', duration),
    ...appendNamespace('easing', layers.motion.easing),
    ...appendNamespace('fx', layers.surfaceFx.tokens),

    // Compatibility aliases for current behavior and utility classes.
    '--style-radius-xs': radius.xs,
    '--style-radius-sm': radius.sm,
    '--style-radius-md': radius.md,
    '--style-radius-lg': radius.lg,
    '--style-radius-xl': radius.xl,
    '--style-border-width': border.width,
    '--style-panel-border-width': border.panel,
    '--style-control-border-width': border.control,
    '--style-blur-sm': blur.sm,
    '--style-blur-md': blur.md,
    '--style-blur-lg': blur.lg,
    '--style-elevation-low': elevation.low,
    '--style-elevation-mid': elevation.mid,
    '--style-elevation-high': elevation.high,
  };

  return resolved;
};

import { StyleProfile, SurfaceConfig, CompositionConfig } from './style-types';
import { ThemeMode, applyThemeToDOM } from './theme-utils';

/**
 * Apply the extended style tokens (beyond color) to the DOM as CSS custom properties.
 * This extends the existing applyThemeToDOM flow.
 */
export function resolveStyleToDOM(
  profile: StyleProfile,
  mode: ThemeMode,
  surface: SurfaceConfig,
  composition: CompositionConfig,
  target: HTMLElement = document.documentElement
): void {
  if (typeof window === 'undefined') return;

  // Layer 1: Apply color tokens via existing mechanism
  applyThemeToDOM(
    { light: profile.tokens.light, dark: profile.tokens.dark },
    mode,
    target,
    true
  );

  // Extended token vars
  target.style.setProperty('--style-border-width', surface.borderWidth);
  target.style.setProperty('--style-opacity', String(surface.backgroundOpacity));
  target.style.setProperty('--style-blur', surface.backdropBlur);
  target.style.setProperty('--style-shadow', surface.shadowStyle);
  target.style.setProperty('--style-border-style', surface.borderStyle);
  target.style.setProperty('--style-border-color', surface.borderColor);

  // Composition vars
  target.style.setProperty('--style-spacing', `${composition.spacingUnit}px`);
  target.style.setProperty('--style-panel-gap', composition.panelGap);
  target.style.setProperty('--style-card-padding', composition.cardPadding);
  target.style.setProperty('--style-section-gap', composition.sectionGap);
  target.style.setProperty('--style-density', composition.density);

  // Motion vars
  target.style.setProperty('--style-duration', profile.motion.duration);
  target.style.setProperty('--style-easing', profile.motion.easing);

  // Style identity attribute
  target.setAttribute('data-style', profile.id);
}

/**
 * Remove all style-specific custom properties from the DOM.
 * Used when falling back to legacy token-only behavior.
 */
export function clearStyleFromDOM(
  target: HTMLElement = document.documentElement
): void {
  const styleProps = [
    '--style-border-width',
    '--style-opacity',
    '--style-blur',
    '--style-shadow',
    '--style-border-style',
    '--style-border-color',
    '--style-spacing',
    '--style-panel-gap',
    '--style-card-padding',
    '--style-section-gap',
    '--style-density',
    '--style-duration',
    '--style-easing',
  ];
  styleProps.forEach(prop => target.style.removeProperty(prop));
  target.removeAttribute('data-style');
}

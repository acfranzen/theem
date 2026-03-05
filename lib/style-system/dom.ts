import { ThemeMode } from '@/lib/picker/theme-utils';
import { resolveStyleVariables } from '@/lib/style-system/resolver';
import { StyleInstance, StyleProfileId } from '@/lib/style-system/types';

interface ApplyStyleInput {
  styleId: StyleProfileId;
  mode: ThemeMode;
  targetElement?: HTMLElement;
  overrides?: StyleInstance['overrides'];
}

export const applyStyleProfileToDOM = ({
  styleId,
  mode,
  targetElement = document.documentElement,
  overrides,
}: ApplyStyleInput): void => {
  if (typeof window === 'undefined') return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const resolved = resolveStyleVariables({ styleId, mode, overrides, reducedMotion });

  targetElement.dataset.styleProfile = styleId;
  targetElement.dataset.styleDensity = resolved['--style-density'];
  targetElement.dataset.styleSurface = resolved['--style-surface-family'];

  Object.entries(resolved).forEach(([key, value]) => {
    targetElement.style.setProperty(key, value);
  });
};

import { DEFAULT_STYLE_PROFILE_ID } from '@/lib/style-system/packs';
import { StyleProfileId } from '@/lib/style-system/types';

export const STYLE_STORAGE_KEY = 'theem.style.profile';

export const loadStyleProfile = (): StyleProfileId => {
  if (typeof window === 'undefined') return DEFAULT_STYLE_PROFILE_ID;
  const saved = window.localStorage.getItem(STYLE_STORAGE_KEY);
  if (!saved) return DEFAULT_STYLE_PROFILE_ID;
  if (saved === 'minimal-swiss' || saved === 'glassmorphism' || saved === 'neubrutalism') {
    return saved;
  }

  return DEFAULT_STYLE_PROFILE_ID;
};

export const persistStyleProfile = (styleId: StyleProfileId): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STYLE_STORAGE_KEY, styleId);
};

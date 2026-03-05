import { STYLE_PROFILES } from '@/lib/style-system/packs';
import { StyleProfileId } from '@/lib/style-system/types';

export type StyledComponent = 'button' | 'card' | 'input' | 'sidebar' | 'dialog' | 'tabs';

interface RecipeInput {
  styleProfile?: StyleProfileId;
  mode?: 'light' | 'dark';
  variant?: string;
  slot?: string;
}

export const resolveComponentRecipe = (
  component: StyledComponent,
  { styleProfile, mode = 'light', variant, slot }: RecipeInput
): string => {
  if (!styleProfile) return '';

  const profile = STYLE_PROFILES[styleProfile];
  const recipe = profile.layers[mode].component[component];

  if (!recipe) return '';

  if (slot) {
    return recipe.slots?.[slot] ?? '';
  }

  if (variant) {
    const variantClass = recipe.variants?.[variant] ?? '';
    return [recipe.base ?? '', variantClass].filter(Boolean).join(' ');
  }

  return recipe.base ?? '';
};

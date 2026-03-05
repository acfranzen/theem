import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveStyleVariables } from '../lib/style-system/resolver';
import { resolveComponentRecipe } from '../lib/style-system/component-recipes';

test('resolves layered style variables for minimal swiss', () => {
  const vars = resolveStyleVariables({ styleId: 'minimal-swiss', mode: 'light' });

  assert.equal(vars['--style-profile'], 'minimal-swiss');
  assert.equal(vars['--style-density'], 'compact');
  assert.equal(vars['--style-radius-sm'], '8px');
  assert.ok(vars['--style-elevation-mid'].includes('hsl('));
});

test('reduced motion forces near-zero durations', () => {
  const vars = resolveStyleVariables({
    styleId: 'glassmorphism',
    mode: 'dark',
    reducedMotion: true,
  });

  assert.equal(vars['--style-duration-fast'], '1ms');
  assert.equal(vars['--style-duration-base'], '1ms');
  assert.equal(vars['--style-duration-slow'], '1ms');
  assert.equal(vars['--style-choreography'], 'none');
});

test('component recipe resolves neubrutalism button variant', () => {
  const recipe = resolveComponentRecipe('button', {
    styleProfile: 'neubrutalism',
    variant: 'default',
  });

  assert.match(recipe, /border-2/);
  assert.match(recipe, /shadow-\[var\(--style-elevation-mid\)\]/);
  assert.match(recipe, /active:shadow-none/);
});

test('component recipe falls back when style profile is missing', () => {
  const recipe = resolveComponentRecipe('card', {});
  assert.equal(recipe, '');
});

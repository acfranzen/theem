# Style Picker Overhaul Plan

## Objective
Evolve Theem from color-first theme switching into a **Style Picker** that can switch entire visual systems (not only color tokens) while preserving current behavior during rollout.

This plan incorporates guidance from `~/.codex/skills/ui-ux-pro-max-skill` (README/CLAUDE + style datasets): style systems must define concrete layout, typography, depth, motion, and interaction characteristics; avoid superficial “same UI + different color” outcomes.

## Current Baseline (What Exists Today)
- Theme model is mostly HSL tokens (`background`, `primary`, etc.) + `radius`.
- Runtime applies CSS custom properties directly on `document.documentElement` (`applyThemeToDOM`).
- Picker supports simple hue randomization and advanced per-token editing.
- `next-themes` controls light/dark mode state.
- Font selection exists, but typography scale/composition does not.
- No persisted style entities in DB yet (current schema has no theme/style tables).

## Non-Goals For This Pass
- No runtime refactor in this planning pass.
- No breaking changes to current `/picker` behavior.
- No forced migration of existing theme exports.

## Target Product Model

### Style Engine Architecture
Implement a layered engine that resolves final CSS variables from multiple sources:

1. `core tokens`
- Semantic color roles, typography primitives, spacing, radii, shadows, opacities, motion primitives.
2. `style profile`
- Visual grammar for a style family (glassmorphism, neubrutalism, etc.).
3. `layout preset`
- Density/grid/card rhythm and section composition defaults.
4. `component recipe set`
- Component-specific variants and composition rules.
5. `user overrides`
- User custom edits on top of a style.
6. `state overlays`
- Light/dark, reduced motion, high contrast.

Resolution order: base system -> style profile -> preset -> component recipes -> user overrides -> accessibility/system overlays.

### Data Model (Versioned)
Add versioned JSON documents (initially file/local storage, then DB):

- `style_pack` (immutable preset pack)
- `style_instance` (user-selected style + overrides)
- `token_bundle` with namespaces:
  - `color`
  - `spacing`
  - `typography`
  - `radius`
  - `shadow`
  - `opacity`
  - `motion`
  - `layout`
  - `interaction`
  - `component`

Each document includes `schemaVersion` and `migrations[]`.

## Token Layer Design

### 1) Foundation Tokens
- Color roles: `surface`, `surface-elevated`, `text`, `accent`, `border`, `focus`, etc.
- Spacing scale: compact/comfortable/airy ramps.
- Typography scale: explicit step scale (xs -> 5xl), line-height and letter-spacing.
- Radius model: `none | crisp | rounded | pill | organic`.
- Shadow model: `none | hard-offset | soft-layered | glow`.
- Opacity model: overlays, disabled, ghost surfaces.
- Motion primitives: durations, easings, spring presets.

### 2) Semantic Tokens
- Map foundation to app semantics (`card`, `popover`, `sidebar`, `input`, `ring`).
- Keep compatibility aliases for current CSS vars (`--primary`, `--radius`, etc.).

### 3) Component Tokens
- Component-specific recipe hooks, e.g.:
  - `button.surface`, `button.border`, `button.shadow`, `button.pressScale`
  - `card.blur`, `card.noise`, `card.elevation`

## Style Families (Initial Pack)
Each family ships as a full bundle (layout + motion + component rules), not just colors.

- `glassmorphism`
  - High blur, translucent surfaces, layered depth, softer borders.
- `claymorphism`
  - Rounded chunky radii, pastel surfaces, dual soft shadows, playful press motion.
- `neubrutalism`
  - Hard 2-4px borders, hard offset shadows, flat high-contrast blocks, minimal blur.
- `bento`
  - Modular card grid system, variable card spans, dense information composition.
- `cyberpunk`
  - Dark-biased neon accents, glow/sharp typography, scanline/glitch optional effects.
- `minimal-swiss`
  - Strict grid rhythm, restrained palette, strong type hierarchy, minimal decoration.

## Motion System
- Define motion tokens:
  - `duration.fast|base|slow`
  - `easing.standard|entrance|exit|emphasis`
  - `spring.snappy|gentle`
- Define choreography presets:
  - `none`, `subtle`, `expressive`.
- Component motion mapping:
  - hover, press, focus, overlay enter/exit, page transition.
- Accessibility:
  - automatic reduced-motion fallback (`prefers-reduced-motion`) with token substitution.

## Layout Presets
Add reusable layout modes orthogonal to style family:
- `editorial` (strong type hierarchy, wider measure)
- `dashboard-dense` (tight spacing, compact controls)
- `marketing-bento` (asymmetric feature cards)
- `app-comfortable` (balanced defaults)

Each preset controls grid columns, gutters, section spacing, content width, card density.

## Component Variant Strategy
- Keep existing `shadcn/ui` components intact.
- Introduce variant recipes by semantic intent, not ad-hoc class forks.
- Strategy:
  - Add style-aware variant resolver (`resolveComponentRecipe(component, styleContext)`).
  - Start with high-impact components: `Button`, `Card`, `Input`, `Sidebar`, `Dialog`, `Tabs`.
  - Maintain fallback path to current behavior when no style recipe exists.

## Plugin API (Future-Proof, Small-Team Friendly)
Define a minimal plugin contract:

```ts
export interface StylePlugin {
  id: string;
  version: string;
  supports: { light: boolean; dark: boolean };
  tokens: Partial<TokenBundle>;
  layouts?: Record<string, LayoutPreset>;
  components?: Record<string, ComponentRecipe>;
  guards?: AccessibilityGuard[];
}
```

Loading model:
- Internal registry first.
- External/community plugins later (signed JSON package + schema validation).

## Persistence and Migration

### Phase 1 (non-breaking)
- Persist selected style id + overrides in local storage.
- Keep existing theme export/import format; add new format alongside it.

### Phase 2
- Add DB table(s): `style_profiles`, `style_instances` (team/user scope).
- Add migration pipeline:
  - `theme_v1` -> `style_instance_v1` adapter.
  - Preserve existing color tokens as overrides under a default style profile.

### Versioning Rules
- Every stored style payload must include `schemaVersion`.
- App boots through `migrateStylePayload(payload)` before use.

## Accessibility Guardrails
- Enforce contrast checks for generated semantic pairs (`text/surface`, `primary/on-primary`).
- Motion safety:
  - auto-downgrade high-motion presets under reduced-motion.
- Interaction minimums:
  - visible focus ring
  - 44x44 touch targets
  - non-color state distinction where relevant.
- Style-level risk flags:
  - e.g., cyberpunk/glass require stricter contrast validation.

## Performance Strategy
- Token application only through CSS variables; avoid large rerenders.
- Minimize expensive effects:
  - blur/glow bounded by token caps.
  - no unbounded animated shadows/filters in large lists.
- Split style bundles:
  - lazy-load heavy style recipes.
- Add performance budgets:
  - style switch latency target < 50ms on modern desktop.
  - no additional layout shift from style swap.

## 30/60/90 Day Roadmap

### 0-30 Days (Foundation + Compatibility)
- Define `TokenBundle` and `StyleProfile` schemas.
- Build resolver pipeline with compatibility aliases to current CSS vars.
- Introduce 3 starter styles: `minimal-swiss`, `neubrutalism`, `glassmorphism`.
- Add style selection state (local storage) without removing current theme controls.
- Ship docs and internal QA matrix.

### 31-60 Days (Productize Picker)
- Expand style library with `claymorphism`, `bento`, `cyberpunk`.
- Add layout presets and typography scale controls.
- Implement style-aware variants for top 6 components.
- Add accessibility validation panel in picker.
- Add migration adapter for legacy theme exports/imports.

### 61-90 Days (Scale + Team Persistence)
- Add DB persistence for style instances (user/team scope).
- Add plugin registry interface and one internal plugin example.
- Add motion choreography presets + reduced-motion auto-downgrade.
- Complete performance hardening and visual regression tests.
- Mark Style Picker as default, keep legacy “Theme Mode” as fallback.

## Team/Ownership Plan (Small Team)
- Engineer 1: style engine, resolver, persistence/migrations.
- Engineer 2: picker UX + component recipe rollout.
- Designer/PM (part-time): style pack curation, QA rubric, accessibility review.

## Risks and Mitigations
- Risk: visual inconsistency during mixed rollout.
  - Mitigation: compatibility alias layer + per-component fallback.
- Risk: accessibility regressions in expressive styles.
  - Mitigation: automated contrast/motion checks + style risk flags.
- Risk: performance cost of blur/glow-heavy styles.
  - Mitigation: token caps, lazy bundles, perf budgets in CI.

## Definition of Done (Overhaul Milestone)
- Users can switch between at least 6 materially different style systems.
- Style switch modifies layout/motion/typography/depth, not just color.
- Legacy theme data still loads correctly via adapter.
- Accessibility and performance checks run in CI for every style pack.

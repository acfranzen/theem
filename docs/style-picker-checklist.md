# Style Picker Execution Checklist

## 0-30 Days
- [ ] Define `TokenBundle`, `StyleProfile`, `StyleInstance` TypeScript schemas.
- [ ] Implement token resolver pipeline with compatibility aliases to current CSS vars.
- [ ] Add Style Picker state (selected style + overrides) in local storage.
- [ ] Ship 3 robust starter styles: minimal swiss, glassmorphism, neubrutalism.
- [ ] Keep existing theme editor behavior intact behind compatibility layer.
- [ ] Add baseline tests for style resolution + variable output.

## 31-60 Days
- [ ] Add style packs: claymorphism, bento, cyberpunk.
- [ ] Add layout presets (editorial, dashboard-dense, marketing-bento, app-comfortable).
- [ ] Add typography scale and motion preset controls in picker.
- [ ] Implement style-aware variants for Button/Card/Input/Sidebar/Dialog/Tabs.
- [ ] Add legacy theme import adapter (`theme_v1` -> `style_instance_v1`).
- [ ] Add accessibility checks (contrast, focus visibility, reduced-motion behavior).

## 61-90 Days
- [ ] Add DB persistence for style instances (user/team scope).
- [ ] Add migration pipeline with `schemaVersion`.
- [ ] Add plugin interface and one internal plugin example.
- [ ] Add performance budgets and style-switch latency instrumentation.
- [ ] Add visual regression coverage across all shipped style packs.
- [ ] Make Style Picker default while retaining legacy Theme Mode fallback.

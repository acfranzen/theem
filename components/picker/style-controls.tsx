'use client';

import { useStyleContext } from '@/lib/picker/style-context';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Grid3X3,
  Move,
  Circle,
  Layers,
  SunDim,
  Square,
} from 'lucide-react';

export default function StyleControls() {
  const {
    profile,
    resolvedSurface,
    resolvedComposition,
    setSurfaceOverrides,
    setCompositionOverrides,
    surfaceOverrides,
    compositionOverrides,
  } = useStyleContext();

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Tokens & Controls
        </h2>

        {/* ── Layout Spacing ────────────────────────────────── */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Grid3X3 className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold uppercase tracking-wide">Layout Spacing</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Density</Label>
              <Select
                value={resolvedComposition.density}
                onValueChange={(val: 'compact' | 'comfortable' | 'spacious') =>
                  setCompositionOverrides({ ...compositionOverrides, density: val })
                }
              >
                <SelectTrigger className="w-[120px] h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="comfortable">Comfortable</SelectItem>
                  <SelectItem value="spacious">Spacious</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground">Spacing Unit</Label>
                <span className="text-xs font-mono text-muted-foreground">
                  {resolvedComposition.spacingUnit}px
                </span>
              </div>
              <Slider
                value={[resolvedComposition.spacingUnit]}
                min={2}
                max={16}
                step={1}
                onValueChange={([val]) =>
                  setCompositionOverrides({ ...compositionOverrides, spacingUnit: val })
                }
              />
            </div>
          </div>
        </section>

        <Separator />

        {/* ── Motion Curves ──────────────────────────────────── */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Move className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold uppercase tracking-wide">Motion</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Animations</Label>
              <Switch
                checked={profile.motion.enabled}
                disabled
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground">Duration</Label>
                <span className="text-xs font-mono text-muted-foreground">
                  {profile.motion.duration}
                </span>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground">Easing</Label>
                <span className="text-xs font-mono text-muted-foreground truncate max-w-[140px]">
                  {profile.motion.easing}
                </span>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* ── Corner Radius ──────────────────────────────────── */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Circle className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold uppercase tracking-wide">Corner Radius</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Radius</Label>
              <span className="text-xs font-mono text-muted-foreground">
                {profile.tokens.light.radius}
              </span>
            </div>
          </div>
        </section>

        <Separator />

        {/* ── Shadow / Elevation ─────────────────────────────── */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold uppercase tracking-wide">Shadow</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Elevation</Label>
              <span className="text-xs font-mono text-muted-foreground">
                {profile.tokens.elevation}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Shadow</Label>
              <span className="text-xs font-mono text-muted-foreground truncate max-w-[140px]">
                {resolvedSurface.shadowStyle}
              </span>
            </div>
          </div>
        </section>

        <Separator />

        {/* ── Surface FX ─────────────────────────────────────── */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <SunDim className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold uppercase tracking-wide">Surface</span>
          </div>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground">Opacity</Label>
                <span className="text-xs font-mono text-muted-foreground">
                  {Math.round(resolvedSurface.backgroundOpacity * 100)}%
                </span>
              </div>
              <Slider
                value={[resolvedSurface.backgroundOpacity * 100]}
                min={20}
                max={100}
                step={5}
                onValueChange={([val]) =>
                  setSurfaceOverrides({
                    ...surfaceOverrides,
                    backgroundOpacity: val / 100,
                  })
                }
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground">Backdrop Blur</Label>
                <span className="text-xs font-mono text-muted-foreground">
                  {resolvedSurface.backdropBlur}
                </span>
              </div>
              <Slider
                value={[parseInt(resolvedSurface.backdropBlur) || 0]}
                min={0}
                max={40}
                step={2}
                onValueChange={([val]) =>
                  setSurfaceOverrides({
                    ...surfaceOverrides,
                    backdropBlur: `${val}px`,
                  })
                }
              />
            </div>
          </div>
        </section>

        <Separator />

        {/* ── Border ─────────────────────────────────────────── */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Square className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold uppercase tracking-wide">Border</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Width</Label>
              <span className="text-xs font-mono text-muted-foreground">
                {resolvedSurface.borderWidth}
              </span>
            </div>
            <Slider
              value={[parseInt(resolvedSurface.borderWidth) || 1]}
              min={0}
              max={5}
              step={1}
              onValueChange={([val]) =>
                setSurfaceOverrides({
                  ...surfaceOverrides,
                  borderWidth: `${val}px`,
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Noise Texture</Label>
            <Switch
              checked={resolvedSurface.noise}
              onCheckedChange={(checked) =>
                setSurfaceOverrides({ ...surfaceOverrides, noise: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Glow Effect</Label>
            <Switch
              checked={resolvedSurface.glowEffect}
              onCheckedChange={(checked) =>
                setSurfaceOverrides({ ...surfaceOverrides, glowEffect: checked })
              }
            />
          </div>
        </section>
      </div>
    </ScrollArea>
  );
}

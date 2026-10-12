"use client";

import * as React from "react";
import { Shuffle } from "@/components/ui/icons";
import { PixelButton } from "@/components/ui/button";
import { PixelInput } from "@/components/ui/input";
import { PixelLabel } from "@/components/ui/label";
import {
  ITEM_LABELS,
  ITEM_SIZE,
  ITEM_TONES,
  ITEM_TYPES,
  generateItem,
  itemToSvg,
  pixelVar,
  type ItemPixel,
  type ItemTone,
  type ItemType,
} from "@/lib/item-generator";
import { cn } from "@/lib/utils";

// Re-render when the theme changes (Display menu writes these attributes).
function subscribeTheme(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "data-mode"] });
  return () => mo.disconnect();
}
const themeKey = () => `${document.documentElement.dataset.theme}/${document.documentElement.dataset.mode}`;

/** Resolves pixelcn CSS variables to hex colors (for canvas, PNG and SVG). */
function useThemeColors() {
  const key = React.useSyncExternalStore(subscribeTheme, themeKey, () => "");
  return React.useMemo(() => {
    if (!key) return null;
    const probe = document.createElement("canvas").getContext("2d", { willReadFrequently: true })!;
    const styles = getComputedStyle(document.documentElement);
    const cache = new Map<string, string>();
    return (p: NonNullable<ItemPixel>) => {
      const v = pixelVar(p);
      if (!cache.has(v)) {
        probe.clearRect(0, 0, 1, 1);
        probe.fillStyle = styles.getPropertyValue(v).trim() || "#000";
        probe.fillRect(0, 0, 1, 1);
        const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
        cache.set(v, `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`);
      }
      return cache.get(v)!;
    };
  }, [key]);
}

function ItemCanvas({ pixels, color, scale, className }: { pixels: ItemPixel[][]; color: ((p: NonNullable<ItemPixel>) => string) | null; scale: number; className?: string }) {
  const ref = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const ctx = ref.current?.getContext("2d");
    if (!ctx || !color) return;
    ctx.clearRect(0, 0, ITEM_SIZE * scale, ITEM_SIZE * scale);
    pixels.forEach((line, y) =>
      line.forEach((p, x) => {
        if (!p) return;
        ctx.fillStyle = color(p);
        ctx.fillRect(x * scale, y * scale, scale, scale);
      })
    );
  }, [pixels, color, scale]);
  return <canvas ref={ref} width={ITEM_SIZE * scale} height={ITEM_SIZE * scale} className={cn("[image-rendering:pixelated]", className)} />;
}

function download(name: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), { href: url, download: name });
  a.click();
  URL.revokeObjectURL(url);
}

const SCALES = [1, 2, 4, 8, 16];

export function ItemGenerator() {
  const [type, setType] = React.useState<ItemType>("sword");
  const [tone, setTone] = React.useState<ItemTone>("primary");
  const [seed, setSeed] = React.useState(1);
  const [scale, setScale] = React.useState(8);
  const color = useThemeColors();
  const pixels = React.useMemo(() => generateItem(type, seed, tone), [type, seed, tone]);
  const variations = React.useMemo(() => Array.from({ length: 8 }, (_, i) => seed + 1 + i), [seed]);
  const base = `${type}-${tone}-${seed}`;

  const savePng = () => {
    if (!color) return;
    const c = document.createElement("canvas");
    c.width = c.height = ITEM_SIZE * scale;
    const ctx = c.getContext("2d")!;
    pixels.forEach((line, y) => line.forEach((p, x) => { if (p) { ctx.fillStyle = color(p); ctx.fillRect(x * scale, y * scale, scale, scale); } }));
    c.toBlob((b) => b && download(`${base}@${scale}x.png`, b), "image/png");
  };
  const saveSvg = () => color && download(`${base}.svg`, new Blob([itemToSvg(pixels, color, scale)], { type: "image/svg+xml" }));

  return (
    <div className="grid gap-6 md:grid-cols-[auto_minmax(0,1fr)]">
      <div className="space-y-3">
        <div className="pixel-sunken flex items-center justify-center bg-muted p-4">
          <ItemCanvas pixels={pixels} color={color} scale={8} className="h-32 w-32" />
        </div>
        <div className="flex flex-wrap gap-2">
          <PixelButton size="sm" onClick={savePng} disabled={!color}>PNG {scale}x</PixelButton>
          <PixelButton size="sm" variant="outline" onClick={saveSvg} disabled={!color}>SVG</PixelButton>
        </div>
      </div>

      <div className="min-w-0 space-y-4 text-xs">
        <fieldset className="space-y-2">
          <legend className="mb-2 text-[0.65rem] uppercase tracking-widest text-muted-foreground">Item</legend>
          <div className="flex flex-wrap gap-1.5">
            {ITEM_TYPES.map((t) => (
              <PixelButton key={t} size="sm" variant={t === type ? "default" : "outline"} aria-pressed={t === type} onClick={() => setType(t)}>
                {ITEM_LABELS[t]}
              </PixelButton>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-2">
          <legend className="mb-2 text-[0.65rem] uppercase tracking-widest text-muted-foreground">Color (theme tone)</legend>
          <div className="flex flex-wrap gap-1.5">
            {ITEM_TONES.map((t) => (
              <PixelButton key={t} size="sm" variant={t === tone ? "default" : "outline"} aria-pressed={t === tone} onClick={() => setTone(t)}>
                <span aria-hidden className="inline-block h-3 w-3 border-[length:var(--pixel-line,2px)] border-current" style={{ background: `var(--${t})` }} />
                {t}
              </PixelButton>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-wrap items-end gap-3">
          <div className="space-y-1">
            <PixelLabel htmlFor="item-seed">Seed</PixelLabel>
            <PixelInput id="item-seed" type="number" min={0} value={seed} onChange={(e) => setSeed(Math.max(0, Number(e.target.value) || 0))} className="w-28" />
          </div>
          <PixelButton size="sm" variant="secondary" onClick={() => setSeed(Math.floor(Math.random() * 100000))}>
            <Shuffle className="h-3.5 w-3.5" /> Randomize
          </PixelButton>
          <div className="space-y-1">
            <PixelLabel htmlFor="item-scale">PNG scale</PixelLabel>
            <select
              id="item-scale"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="pixel-sunken block bg-transparent px-2 py-1.5 text-xs"
            >
              {SCALES.map((s) => <option key={s} value={s}>{s}x ({ITEM_SIZE * s}px)</option>)}
            </select>
          </div>
        </div>

        <div>
          <div className="mb-2 text-[0.65rem] uppercase tracking-widest text-muted-foreground">Variations (click to pick)</div>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(3.5rem,1fr))] gap-2">
            {variations.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => setSeed(s)}
                  aria-label={`${ITEM_LABELS[type]} seed ${s}`}
                  className="flex w-full items-center justify-center border-[length:var(--pixel-line,2px)] border-border bg-muted p-1.5 hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ItemCanvas pixels={generateItem(type, s, tone)} color={color} scale={2} className="h-8 w-8" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-[0.65rem] text-muted-foreground">
          Colors come from the active theme: change it in the Display menu and every item is redrawn in that palette.
        </p>
      </div>
    </div>
  );
}

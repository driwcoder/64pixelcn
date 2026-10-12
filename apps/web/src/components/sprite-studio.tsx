"use client";

// One UI for every rule-based sprite generator (items, characters, enemies):
// pick a type and a theme tone, browse seeds, export PNG or SVG. Colors are
// read from the active theme, so sprites redraw when the theme changes.

import * as React from "react";
import { Shuffle } from "@/components/ui/icons";
import { PixelButton } from "@/components/ui/button";
import { PixelInput } from "@/components/ui/input";
import { PixelLabel } from "@/components/ui/label";
import { CHARACTER_CLASSES, CHARACTER_LABELS, CHARACTER_SIZE, SKIN_OPTIONS, generateCharacter } from "@/lib/character-generator";
import { ENEMY_LABELS, ENEMY_SIZE, ENEMY_TYPES, generateEnemy } from "@/lib/enemy-generator";
import { ITEM_LABELS, ITEM_SIZE, ITEM_TYPES, generateItem } from "@/lib/item-generator";
import { SPRITE_TONES, pixelSource, spriteToSvg, type SpritePixel, type SpriteTone } from "@/lib/sprite-core";
import { cn } from "@/lib/utils";

type ColorFn = (p: NonNullable<SpritePixel>) => string;

// Re-resolve colors when the theme changes (the Display menu writes these).
function subscribeTheme(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "data-mode"] });
  return () => mo.disconnect();
}
const themeKey = () => `${document.documentElement.dataset.theme}/${document.documentElement.dataset.mode}`;

/** pixelcn CSS variables (or fixed colors) -> hex, for canvas, PNG and SVG. */
function useSpriteColors(): ColorFn | null {
  const key = React.useSyncExternalStore(subscribeTheme, themeKey, () => "");
  return React.useMemo(() => {
    if (!key) return null;
    const probe = document.createElement("canvas").getContext("2d", { willReadFrequently: true })!;
    const styles = getComputedStyle(document.documentElement);
    const cache = new Map<string, string>();
    return (p) => {
      const src = pixelSource(p);
      if ("hex" in src) return src.hex;
      if (!cache.has(src.cssVar)) {
        probe.clearRect(0, 0, 1, 1);
        probe.fillStyle = styles.getPropertyValue(src.cssVar).trim() || "#000";
        probe.fillRect(0, 0, 1, 1);
        const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
        cache.set(src.cssVar, `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`);
      }
      return cache.get(src.cssVar)!;
    };
  }, [key]);
}

function paint(ctx: CanvasRenderingContext2D, pixels: SpritePixel[][], color: ColorFn, scale: number) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  pixels.forEach((line, y) =>
    line.forEach((p, x) => {
      if (!p) return;
      ctx.fillStyle = color(p);
      ctx.fillRect(x * scale, y * scale, scale, scale);
    })
  );
}

function SpriteCanvas({ pixels, color, scale, className }: { pixels: SpritePixel[][]; color: ColorFn | null; scale: number; className?: string }) {
  const ref = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const ctx = ref.current?.getContext("2d");
    if (ctx && color) paint(ctx, pixels, color, scale);
  }, [pixels, color, scale]);
  const px = pixels.length * scale;
  return <canvas ref={ref} width={px} height={px} className={cn("[image-rendering:pixelated]", className)} />;
}

function download(name: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  Object.assign(document.createElement("a"), { href: url, download: name }).click();
  URL.revokeObjectURL(url);
}

interface Choice<T extends string | number> {
  id: T;
  label: string;
  swatch?: string;
}

function ChoiceRow<T extends string | number>({ legend, choices, value, onChange }: { legend: string; choices: Choice<T>[]; value: T; onChange: (v: T) => void }) {
  return (
    <fieldset className="space-y-2">
      <legend className="mb-2 text-[0.65rem] uppercase tracking-widest text-muted-foreground">{legend}</legend>
      <div className="flex flex-wrap gap-1.5">
        {choices.map((c) => (
          <PixelButton key={c.id} size="sm" variant={c.id === value ? "default" : "outline"} aria-pressed={c.id === value} onClick={() => onChange(c.id)}>
            {c.swatch && <span aria-hidden className="inline-block h-3 w-3 border-[length:var(--pixel-line,2px)] border-current" style={{ background: c.swatch }} />}
            {c.label}
          </PixelButton>
        ))}
      </div>
    </fieldset>
  );
}

const SCALES = [1, 2, 4, 8, 16];
const TONE_CHOICES: Choice<SpriteTone>[] = SPRITE_TONES.map((t) => ({ id: t, label: t, swatch: `var(--${t})` }));

interface StudioProps {
  name: string;
  size: number;
  types: Choice<string>[];
  generate: (type: string, seed: number, tone: SpriteTone, extra: number) => SpritePixel[][];
  extra?: { legend: string; choices: Choice<number>[] };
}

function SpriteStudio({ name, size, types, generate, extra }: StudioProps) {
  const [type, setType] = React.useState(types[0].id);
  const [tone, setTone] = React.useState<SpriteTone>("primary");
  const [extraValue, setExtraValue] = React.useState(extra?.choices[0].id ?? 0);
  const [seed, setSeed] = React.useState(1);
  const [scale, setScale] = React.useState(8);
  const color = useSpriteColors();
  const pixels = React.useMemo(() => generate(type, seed, tone, extraValue), [generate, type, seed, tone, extraValue]);
  const file = `${name}-${type}-${tone}-${seed}`;
  const previewScale = Math.max(4, Math.round(128 / size));

  const savePng = () => {
    if (!color) return;
    const c = document.createElement("canvas");
    c.width = c.height = size * scale;
    paint(c.getContext("2d")!, pixels, color, scale);
    c.toBlob((b) => b && download(`${file}@${scale}x.png`, b), "image/png");
  };
  const saveSvg = () => color && download(`${file}.svg`, new Blob([spriteToSvg(pixels, color, scale)], { type: "image/svg+xml" }));

  return (
    <div className="grid gap-6 md:grid-cols-[auto_minmax(0,1fr)]">
      <div className="space-y-3">
        <div className="pixel-sunken flex items-center justify-center bg-muted p-4">
          <SpriteCanvas pixels={pixels} color={color} scale={previewScale} className="h-36 w-36" />
        </div>
        <div className="flex flex-wrap gap-2">
          <PixelButton size="sm" onClick={savePng} disabled={!color}>PNG {scale}x</PixelButton>
          <PixelButton size="sm" variant="outline" onClick={saveSvg} disabled={!color}>SVG</PixelButton>
        </div>
      </div>

      <div className="min-w-0 space-y-4 text-xs">
        <ChoiceRow legend="Type" choices={types} value={type} onChange={setType} />
        <ChoiceRow legend="Color (theme tone)" choices={TONE_CHOICES} value={tone} onChange={setTone} />
        {extra && <ChoiceRow legend={extra.legend} choices={extra.choices} value={extraValue} onChange={setExtraValue} />}

        <div className="flex flex-wrap items-end gap-3">
          <div className="space-y-1">
            <PixelLabel htmlFor={`${name}-seed`}>Seed</PixelLabel>
            <PixelInput id={`${name}-seed`} type="number" min={0} value={seed} onChange={(e) => setSeed(Math.max(0, Number(e.target.value) || 0))} className="w-28" />
          </div>
          <PixelButton size="sm" variant="secondary" onClick={() => setSeed(Math.floor(Math.random() * 100000))}>
            <Shuffle className="h-3.5 w-3.5" /> Randomize
          </PixelButton>
          <div className="space-y-1">
            <PixelLabel htmlFor={`${name}-scale`}>PNG scale</PixelLabel>
            <select id={`${name}-scale`} value={scale} onChange={(e) => setScale(Number(e.target.value))} className="pixel-sunken block bg-transparent px-2 py-1.5 text-xs">
              {SCALES.map((s) => <option key={s} value={s}>{s}x ({size * s}px)</option>)}
            </select>
          </div>
        </div>

        <div>
          <div className="mb-2 text-[0.65rem] uppercase tracking-widest text-muted-foreground">Variations (click to pick)</div>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(3.75rem,1fr))] gap-2">
            {Array.from({ length: 8 }, (_, i) => seed + 1 + i).map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => setSeed(s)}
                  aria-label={`${type} seed ${s}`}
                  className="flex w-full items-center justify-center border-[length:var(--pixel-line,2px)] border-border bg-muted p-1.5 hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <SpriteCanvas pixels={generate(type, s, tone, extraValue)} color={color} scale={2} className="h-10 w-10" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-[0.65rem] text-muted-foreground">Colors come from the active theme: change it in the Display menu and everything is redrawn in that palette.</p>
      </div>
    </div>
  );
}

const asChoices = (ids: readonly string[], labels: Record<string, string>) => ids.map((id) => ({ id, label: labels[id] }));

const generateItemFn = (type: string, seed: number, tone: SpriteTone) => generateItem(type as (typeof ITEM_TYPES)[number], seed, tone);
const generateCharacterFn = (type: string, seed: number, tone: SpriteTone, skin: number) =>
  generateCharacter(type as (typeof CHARACTER_CLASSES)[number], seed, tone, skin);
const generateEnemyFn = (type: string, seed: number, tone: SpriteTone) => generateEnemy(type as (typeof ENEMY_TYPES)[number], seed, tone);

export function ItemGenerator() {
  return <SpriteStudio name="item" size={ITEM_SIZE} types={asChoices(ITEM_TYPES, ITEM_LABELS)} generate={generateItemFn} />;
}

export function CharacterGenerator() {
  return (
    <SpriteStudio
      name="character"
      size={CHARACTER_SIZE}
      types={asChoices(CHARACTER_CLASSES, CHARACTER_LABELS)}
      generate={generateCharacterFn}
      extra={{ legend: "Skin", choices: SKIN_OPTIONS }}
    />
  );
}

export function EnemyGenerator() {
  return <SpriteStudio name="enemy" size={ENEMY_SIZE} types={asChoices(ENEMY_TYPES, ENEMY_LABELS)} generate={generateEnemyFn} />;
}

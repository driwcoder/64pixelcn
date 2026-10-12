// Shared engine for pixelcn's rule-based sprites (items, characters,
// enemies). Pure functions, no DOM. A generator paints a grid of materials;
// shadeSprite() then shades each material from its silhouette (light from the
// top-left) and adds a selective outline. Colors resolve later: theme tones
// (--primary, --primary-lo-1...) or fixed ramps for skin, eyes and teeth.

export type Shade = "outline" | "lo-2" | "lo-1" | "base" | "hi-1" | "hi-2";
/** One pixel: the ramp ("primary", "metal", "skin-2", "eye"...) and shade. */
export type SpritePixel = { tone: string; shade: Shade } | null;
export type Grid = (string | null)[][];

/** pixelcn tones a generator can color with. */
export const SPRITE_TONES = ["primary", "accent", "destructive", "secondary"] as const;
export type SpriteTone = (typeof SPRITE_TONES)[number];

// ── Seeded random (mulberry32) ───────────────────────────────────────
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export const int = (r: () => number, min: number, max: number) => min + Math.floor(r() * (max - min + 1));
export const pick = <T>(r: () => number, list: readonly T[]) => list[Math.floor(r() * list.length)];

// ── Painting ─────────────────────────────────────────────────────────
/** A blank grid plus drawing helpers bound to it. */
export function painter(size: number) {
  const g: Grid = Array.from({ length: size }, () => Array<string | null>(size).fill(null));
  const inside = (x: number, y: number) => x >= 0 && y >= 0 && x < size && y < size;
  const put = (x: number, y: number, m: string | null) => {
    if (inside(x, y)) g[y][x] = m;
  };
  return {
    g,
    size,
    put,
    get: (x: number, y: number) => (inside(x, y) ? g[y][x] : null),
    /** Horizontal run centered on `cx` (default: grid center). */
    row(y: number, width: number, m: string | null, cx = size / 2) {
      const start = Math.round(cx - width / 2);
      for (let x = start; x < start + width; x++) put(x, y, m);
    },
    rect(x: number, y: number, w: number, h: number, m: string | null) {
      for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) put(i, j, m);
    },
    disc(cx: number, cy: number, r: number, m: string | null) {
      for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if ((x + 0.5 - cx) ** 2 + (y + 0.5 - cy) ** 2 <= r * r) put(x, y, m);
    },
    /** Copies the left half onto the right half (symmetric bodies). */
    mirror() {
      for (let y = 0; y < size; y++) for (let x = 0; x < size / 2; x++) g[y][size - 1 - x] = g[y][x];
    },
  };
}

// ── Shading and outline ──────────────────────────────────────────────
/**
 * Shades each filled cell from its same-material neighbors (top/left edges
 * light, bottom/right dark), and turns empty cells touching the shape into an
 * outline in the ramp of the material they touch. `flat` materials (eyes,
 * teeth) keep one color. `ramp` maps a material to its ramp name.
 */
export function shadeSprite(g: Grid, ramp: (material: string) => string, flat: readonly string[] = []): SpritePixel[][] {
  const size = g.length;
  const at = (x: number, y: number) => (x >= 0 && y >= 0 && x < size && y < size ? g[y][x] : null);
  return g.map((line, y) =>
    line.map((m, x): SpritePixel => {
      if (m) {
        if (flat.includes(m)) return { tone: ramp(m), shade: "base" };
        const same = (dx: number, dy: number) => at(x + dx, y + dy) === m;
        let shade: Shade = "base";
        if (!same(-1, 0) || !same(0, -1)) shade = "hi-1";
        if (!same(-1, -1) && !same(-1, 0) && !same(0, -1)) shade = "hi-2";
        if (!same(1, 0) || !same(0, 1)) shade = shade === "base" ? "lo-1" : shade;
        if (!same(1, 1) && !same(1, 0) && !same(0, 1)) shade = "lo-2";
        if (m === "glass") shade = shade === "hi-2" || shade === "hi-1" ? "hi-2" : "hi-1";
        return { tone: ramp(m), shade };
      }
      const touching = [at(x - 1, y), at(x + 1, y), at(x, y - 1), at(x, y + 1)].find(Boolean);
      return touching ? { tone: ramp(touching), shade: "outline" } : null;
    })
  );
}

// ── Colors ───────────────────────────────────────────────────────────
// Metal follows the text colors, so it contrasts with the background in both
// light and dark modes (a card ramp would vanish on a dark theme).
const METAL: Record<Shade, string> = {
  "hi-2": "--foreground",
  "hi-1": "--foreground",
  base: "--muted-foreground",
  "lo-1": "--border",
  "lo-2": "--border",
  outline: "--surface-outline",
};

const RAMP_ORDER: Shade[] = ["outline", "lo-2", "lo-1", "base", "hi-1", "hi-2"];

/** Natural skin ramps (outline, lo-2, lo-1, base, hi-1, hi-2), theme-independent. */
export const SKINS = [
  { label: "Light", ramp: ["#4a2a20", "#b06b52", "#d18b6c", "#ecb393", "#f6cdb2", "#fde4d2"] },
  { label: "Medium", ramp: ["#3d2216", "#8f5233", "#b06c46", "#cf8d62", "#e2a97f", "#efc39d"] },
  { label: "Tan", ramp: ["#2f1a10", "#6e3c22", "#8c5030", "#a86a43", "#c2865a", "#d6a273"] },
  { label: "Dark", ramp: ["#1c100b", "#40241a", "#573222", "#704530", "#8a5b40", "#a37452"] },
] as const;

const FIXED: Record<string, readonly string[]> = {
  eye: ["#120c18", "#120c18", "#120c18", "#1b1325", "#1b1325", "#1b1325"],
  white: ["#3a3440", "#b9b3b0", "#d8d3cf", "#f2efe9", "#ffffff", "#ffffff"],
};

/**
 * Where a pixel's color comes from: a pixelcn CSS variable (resolved against
 * the active theme) or a fixed hex (skin, eyes, teeth).
 */
export function pixelSource(p: NonNullable<SpritePixel>): { cssVar: string } | { hex: string } {
  const i = RAMP_ORDER.indexOf(p.shade);
  if (p.tone.startsWith("skin-")) return { hex: SKINS[Number(p.tone.slice(5))].ramp[i] };
  if (FIXED[p.tone]) return { hex: FIXED[p.tone][i] };
  if (p.tone === "metal") return { cssVar: METAL[p.shade] };
  return { cssVar: p.shade === "base" ? `--${p.tone === "surface" ? "card" : p.tone}` : `--${p.tone}-${p.shade}` };
}

/** SVG markup, one <rect> per horizontal run of the same color. */
export function spriteToSvg(pixels: SpritePixel[][], color: (p: NonNullable<SpritePixel>) => string, scale = 1) {
  const size = pixels.length;
  const rects: string[] = [];
  pixels.forEach((line, y) => {
    let x = 0;
    while (x < line.length) {
      const p = line[x];
      if (!p) {
        x++;
        continue;
      }
      const fill = color(p);
      let end = x + 1;
      while (end < line.length && line[end] && color(line[end]!) === fill) end++;
      rects.push(`<rect x="${x}" y="${y}" width="${end - x}" height="1" fill="${fill}"/>`);
      x = end;
    }
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size * scale}" height="${size * scale}" shape-rendering="crispEdges">${rects.join("")}</svg>`;
}

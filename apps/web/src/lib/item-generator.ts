// Rule-based pixel art item icons. Pure functions (no DOM): each item type
// draws a 16x16 silhouette from a seed, made of materials; shading (light
// from the top-left) and a selective outline are then derived from the shape.
// Colors are resolved later from a pixelcn theme's tone ramps, so every item
// lands in the active palette.

export const ITEM_SIZE = 16;

export const ITEM_TYPES = ["sword", "potion", "coin", "shield", "key", "gem"] as const;
export type ItemType = (typeof ITEM_TYPES)[number];

export const ITEM_LABELS: Record<ItemType, string> = {
  sword: "Sword",
  potion: "Potion",
  coin: "Coin",
  shield: "Shield",
  key: "Key",
  gem: "Gem",
};

/** pixelcn tones whose ramps color an item (--{tone}, --{tone}-lo-1...). */
export const ITEM_TONES = ["primary", "accent", "destructive", "secondary"] as const;
export type ItemTone = (typeof ITEM_TONES)[number];

/** A material: which ramp it uses. "main" follows the chosen tone. */
type Material = "main" | "metal" | "wood" | "glass";
export type Shade = "outline" | "lo-2" | "lo-1" | "base" | "hi-1" | "hi-2";
/** One pixel: the ramp to use and the shade, or null if empty. */
export type ItemPixel = { tone: string; shade: Shade } | null;

type Grid = (Material | null)[][];

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
const int = (r: () => number, min: number, max: number) => min + Math.floor(r() * (max - min + 1));

// ── Drawing helpers ──────────────────────────────────────────────────
const blank = (): Grid => Array.from({ length: ITEM_SIZE }, () => Array<Material | null>(ITEM_SIZE).fill(null));
function put(g: Grid, x: number, y: number, m: Material) {
  if (x >= 0 && y >= 0 && x < ITEM_SIZE && y < ITEM_SIZE) g[y][x] = m;
}
/** A horizontal run centered on the 16px grid (width counts pixels). */
function row(g: Grid, y: number, width: number, m: Material) {
  const start = Math.round((ITEM_SIZE - width) / 2);
  for (let x = start; x < start + width; x++) put(g, x, y, m);
}
function disc(g: Grid, cx: number, cy: number, r: number, m: Material) {
  for (let y = 0; y < ITEM_SIZE; y++)
    for (let x = 0; x < ITEM_SIZE; x++) if ((x + 0.5 - cx) ** 2 + (y + 0.5 - cy) ** 2 <= r * r) put(g, x, y, m);
}

// ── Item silhouettes ─────────────────────────────────────────────────
function sword(r: () => number): Grid {
  const g = blank();
  const len = int(r, 7, 10); // blade length along the diagonal
  const guard = int(r, 2, 3);
  // Blade: 2px wide diagonal from the guard up to the top-right.
  for (let i = 0; i < len; i++) {
    put(g, 5 + i, 10 - i, "metal");
    put(g, 6 + i, 10 - i, "metal");
  }
  // Guard: perpendicular bar across the blade's base.
  for (let i = -guard; i <= guard; i++) put(g, 5 + i, 10 + i, "main");
  // Grip and pommel.
  put(g, 4, 11, "wood");
  put(g, 3, 12, "wood");
  put(g, 2, 13, "main");
  if (r() > 0.5) put(g, 1, 14, "main");
  return g;
}

function potion(r: () => number): Grid {
  const g = blank();
  const shape = int(r, 0, 2); // 0 round, 1 square, 2 flask
  const fill = int(r, 4, 7); // liquid rows from the bottom of the body
  row(g, 2, 4, "wood"); // cork
  row(g, 3, 2, "glass");
  row(g, 4, 2, "glass");
  const widths =
    shape === 0 ? [6, 8, 10, 10, 10, 10, 8, 6] : shape === 1 ? [8, 10, 10, 10, 10, 10, 10, 10] : [4, 6, 8, 10, 10, 12, 12, 10];
  widths.forEach((w, i) => {
    const y = 5 + i;
    row(g, y, w, i >= widths.length - fill ? "main" : "glass");
  });
  return g;
}

function coin(r: () => number): Grid {
  const g = blank();
  const radius = int(r, 5, 6) + 0.5;
  disc(g, 8, 8, radius, "main");
  // Emblem: a darker-ramp mark in the middle (bar, cross or diamond).
  const emblem = int(r, 0, 2);
  const mark = (x: number, y: number) => put(g, x, y, "metal");
  if (emblem === 0) for (let y = 5; y <= 10; y++) { mark(7, y); mark(8, y); }
  else if (emblem === 1) { for (let i = 5; i <= 10; i++) { mark(7, i); mark(8, i); } for (let i = 5; i <= 10; i++) { mark(i, 7); mark(i, 8); } }
  else for (const [x, y] of [[7, 5], [8, 5], [6, 6], [9, 6], [5, 7], [10, 7], [5, 8], [10, 8], [6, 9], [9, 9], [7, 10], [8, 10]]) mark(x, y);
  return g;
}

function shield(r: () => number): Grid {
  const g = blank();
  const widths = [12, 12, 12, 12, 12, 12, 10, 10, 8, 6, 4, 2];
  widths.forEach((w, i) => row(g, 2 + i, w, "metal"));
  // Inner field in the main tone, with an optional stripe or boss.
  widths.forEach((w, i) => {
    if (i > 0 && w > 4) row(g, 2 + i, w - 4, "main");
  });
  const deco = int(r, 0, 2);
  if (deco === 0) for (let y = 3; y <= 11; y++) { put(g, 7, y, "metal"); put(g, 8, y, "metal"); }
  if (deco === 1) disc(g, 8, 6.5, 1.6, "metal");
  return g;
}

function key(r: () => number): Grid {
  const g = blank();
  // Ring (bow) on the left, shaft to the right, teeth hanging down.
  disc(g, 4.5, 7.5, 3.6, "main");
  // Hole in the ring.
  for (let y = 0; y < ITEM_SIZE; y++) for (let x = 0; x < ITEM_SIZE; x++) if ((x + 0.5 - 4.5) ** 2 + (y + 0.5 - 7.5) ** 2 <= 1.6 ** 2) g[y][x] = null;
  for (let x = 8; x <= 14; x++) { put(g, x, 7, "main"); put(g, x, 8, "main"); }
  const teeth = int(r, 1, 3);
  for (let t = 0; t < teeth; t++) {
    const x = 14 - t * 2;
    put(g, x, 9, "main");
    put(g, x, 10, "main");
  }
  return g;
}

function gem(r: () => number): Grid {
  const g = blank();
  const shapes = [
    [4, 8, 10, 12, 10, 8, 6, 4, 2], // tall cut
    [6, 10, 12, 12, 10, 8, 6, 4, 2], // brilliant
    [4, 6, 8, 10, 10, 10, 8, 6, 4], // oval
    [2, 4, 6, 8, 10, 8, 6, 4, 2], // rhombus
  ];
  const widths = shapes[int(r, 0, shapes.length - 1)];
  widths.forEach((w, i) => row(g, 3 + i, w, "main"));
  // A glint of glass on an upper facet.
  const y = 3 + int(r, 1, 3);
  const half = Math.floor(widths[y - 3] / 2) - 1;
  if (half > 0) put(g, 8 - int(r, 1, half), y, "glass");
  return g;
}

const SILHOUETTES: Record<ItemType, (r: () => number) => Grid> = { sword, potion, coin, shield, key, gem };

// ── Shading and outline ──────────────────────────────────────────────
const RAMP: Record<Material, (tone: ItemTone) => string> = {
  main: (tone) => tone,
  metal: () => "metal",
  wood: () => "secondary",
  glass: () => "surface",
};

/**
 * The item as pixels: each filled cell gets its material's ramp and a shade
 * from its neighbors (lit from the top-left), and empty cells touching the
 * shape become the outline (in the ramp of the material they touch).
 */
export function generateItem(type: ItemType, seed: number, tone: ItemTone): ItemPixel[][] {
  const g = SILHOUETTES[type](rng(seed * 7919 + ITEM_TYPES.indexOf(type)));
  const at = (x: number, y: number) => (x >= 0 && y >= 0 && x < ITEM_SIZE && y < ITEM_SIZE ? g[y][x] : null);
  const out: ItemPixel[][] = [];
  for (let y = 0; y < ITEM_SIZE; y++) {
    const line: ItemPixel[] = [];
    for (let x = 0; x < ITEM_SIZE; x++) {
      const m = g[y][x];
      if (m) {
        const same = (dx: number, dy: number) => at(x + dx, y + dy) === m;
        let shade: Shade = "base";
        if (!same(-1, 0) || !same(0, -1)) shade = "hi-1";
        if (!same(-1, -1) && !same(-1, 0) && !same(0, -1)) shade = "hi-2";
        if (!same(1, 0) || !same(0, 1)) shade = shade === "base" ? "lo-1" : shade;
        if (!same(1, 1) && !same(1, 0) && !same(0, 1)) shade = "lo-2";
        if (m === "glass") shade = shade === "hi-2" || shade === "hi-1" ? "hi-2" : "hi-1";
        line.push({ tone: RAMP[m](tone), shade });
      } else {
        const touching = [at(x - 1, y), at(x + 1, y), at(x, y - 1), at(x, y + 1)].find(Boolean);
        line.push(touching ? { tone: RAMP[touching](tone), shade: "outline" } : null);
      }
    }
    out.push(line);
  }
  return out;
}

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

/** CSS variable for a pixel (pixelcn names: --primary, --primary-lo-1...). */
export function pixelVar(p: NonNullable<ItemPixel>) {
  if (p.tone === "metal") return METAL[p.shade];
  return p.shade === "base" ? `--${p.tone === "surface" ? "card" : p.tone}` : `--${p.tone}-${p.shade}`;
}

/** SVG markup, one <rect> per horizontal run of the same color. */
export function itemToSvg(pixels: ItemPixel[][], color: (p: NonNullable<ItemPixel>) => string, scale = 1) {
  const rects: string[] = [];
  pixels.forEach((line, y) => {
    let x = 0;
    while (x < line.length) {
      const p = line[x];
      if (!p) { x++; continue; }
      const fill = color(p);
      let end = x + 1;
      while (end < line.length && line[end] && color(line[end]!) === fill) end++;
      rects.push(`<rect x="${x}" y="${y}" width="${end - x}" height="1" fill="${fill}"/>`);
      x = end;
    }
  });
  const size = ITEM_SIZE * scale;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ITEM_SIZE} ${ITEM_SIZE}" width="${size}" height="${size}" shape-rendering="crispEdges">${rects.join("")}</svg>`;
}

// Rule-based pixel art item icons on a 16x16 grid. Each item type paints a
// silhouette from a seed; shading, outline and colors come from sprite-core.

import { int, painter, rng, shadeSprite, type SpritePixel, type SpriteTone } from "@/lib/sprite-core";

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

export { SPRITE_TONES as ITEM_TONES, type SpriteTone as ItemTone, type SpritePixel as ItemPixel } from "@/lib/sprite-core";

/** Materials: "main" follows the chosen tone. */
type Material = "main" | "metal" | "wood" | "glass";
type Paint = ReturnType<typeof painter>;

function canvas() {
  return painter(ITEM_SIZE);
}

// ── Item silhouettes ─────────────────────────────────────────────────
function sword(r: () => number): Paint {
  const c = canvas();
  const len = int(r, 7, 10); // blade length along the diagonal
  const guard = int(r, 2, 3);
  // Blade: 2px wide diagonal from the guard up to the top-right.
  for (let i = 0; i < len; i++) {
    c.put(5 + i, 10 - i, "metal");
    c.put(6 + i, 10 - i, "metal");
  }
  // Guard: perpendicular bar across the blade's base.
  for (let i = -guard; i <= guard; i++) c.put(5 + i, 10 + i, "main");
  // Grip and pommel.
  c.put(4, 11, "wood");
  c.put(3, 12, "wood");
  c.put(2, 13, "main");
  if (r() > 0.5) c.put(1, 14, "main");
  return c;
}

function potion(r: () => number): Paint {
  const c = canvas();
  const shape = int(r, 0, 2); // 0 round, 1 square, 2 flask
  const fill = int(r, 4, 7); // liquid rows from the bottom of the body
  c.row(2, 4, "wood"); // cork
  c.row(3, 2, "glass");
  c.row(4, 2, "glass");
  const widths =
    shape === 0 ? [6, 8, 10, 10, 10, 10, 8, 6] : shape === 1 ? [8, 10, 10, 10, 10, 10, 10, 10] : [4, 6, 8, 10, 10, 12, 12, 10];
  widths.forEach((w, i) => {
    const y = 5 + i;
    c.row(y, w, i >= widths.length - fill ? "main" : "glass");
  });
  return c;
}

function coin(r: () => number): Paint {
  const c = canvas();
  const radius = int(r, 5, 6) + 0.5;
  c.disc(8, 8, radius, "main");
  // Emblem: a darker-ramp mark in the middle (bar, cross or diamond).
  const emblem = int(r, 0, 2);
  const mark = (x: number, y: number) => c.put(x, y, "metal");
  if (emblem === 0) for (let y = 5; y <= 10; y++) { mark(7, y); mark(8, y); }
  else if (emblem === 1) { for (let i = 5; i <= 10; i++) { mark(7, i); mark(8, i); } for (let i = 5; i <= 10; i++) { mark(i, 7); mark(i, 8); } }
  else for (const [x, y] of [[7, 5], [8, 5], [6, 6], [9, 6], [5, 7], [10, 7], [5, 8], [10, 8], [6, 9], [9, 9], [7, 10], [8, 10]]) mark(x, y);
  return c;
}

function shield(r: () => number): Paint {
  const c = canvas();
  const widths = [12, 12, 12, 12, 12, 12, 10, 10, 8, 6, 4, 2];
  widths.forEach((w, i) => c.row(2 + i, w, "metal"));
  // Inner field in the main tone, with an optional stripe or boss.
  widths.forEach((w, i) => {
    if (i > 0 && w > 4) c.row(2 + i, w - 4, "main");
  });
  const deco = int(r, 0, 2);
  if (deco === 0) for (let y = 3; y <= 11; y++) { c.put(7, y, "metal"); c.put(8, y, "metal"); }
  if (deco === 1) c.disc(8, 6.5, 1.6, "metal");
  return c;
}

function key(r: () => number): Paint {
  const c = canvas();
  // Ring (bow) on the left, shaft to the right, teeth hanging down.
  c.disc(4.5, 7.5, 3.6, "main");
  // Hole in the ring.
  c.disc(4.5, 7.5, 1.6, null);
  for (let x = 8; x <= 14; x++) { c.put(x, 7, "main"); c.put(x, 8, "main"); }
  const teeth = int(r, 1, 3);
  for (let t = 0; t < teeth; t++) {
    const x = 14 - t * 2;
    c.put(x, 9, "main");
    c.put(x, 10, "main");
  }
  return c;
}

function gem(r: () => number): Paint {
  const c = canvas();
  const shapes = [
    [4, 8, 10, 12, 10, 8, 6, 4, 2], // tall cut
    [6, 10, 12, 12, 10, 8, 6, 4, 2], // brilliant
    [4, 6, 8, 10, 10, 10, 8, 6, 4], // oval
    [2, 4, 6, 8, 10, 8, 6, 4, 2], // rhombus
  ];
  const widths = shapes[int(r, 0, shapes.length - 1)];
  widths.forEach((w, i) => c.row(3 + i, w, "main"));
  // A glint of glass on an upper facet.
  const y = 3 + int(r, 1, 3);
  const half = Math.floor(widths[y - 3] / 2) - 1;
  if (half > 0) c.put(8 - int(r, 1, half), y, "glass");
  return c;
}

const SILHOUETTES: Record<ItemType, (r: () => number) => Paint> = { sword, potion, coin, shield, key, gem };

// ── Colors ───────────────────────────────────────────────────────────
const RAMP: Record<Material, (tone: SpriteTone) => string> = {
  main: (tone) => tone,
  metal: () => "metal",
  wood: () => "secondary",
  glass: () => "surface",
};

/** The item as shaded, outlined pixels in the given tone. */
export function generateItem(type: ItemType, seed: number, tone: SpriteTone): SpritePixel[][] {
  const c = SILHOUETTES[type](rng(seed * 7919 + ITEM_TYPES.indexOf(type)));
  return shadeSprite(c.g, (m) => RAMP[m as Material](tone));
}

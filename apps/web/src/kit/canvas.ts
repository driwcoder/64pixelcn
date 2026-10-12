// Canvas renderer: draws the same panels the CSS engine draws (stepped
// corners, border, ramp shading, hard/extruded shadow), pixel for pixel, for
// games that render UI on a <canvas> (vanilla, Phaser, PixiJS...).
//
// Shapes are drawn as horizontal runs (one fillRect per row segment), so
// every edge lands on whole pixels and nothing is anti-aliased.

import { paletteTokens, SHADINGS, SIZE_TOKENS, RADII, DEFAULT_APPEARANCE, type Appearance, type Tokens } from "../lib/tokens.ts";
import { BANDS } from "../lib/pixel-engine.ts";
import type { Tone } from "../lib/palette-theme.ts";

export type PanelRole = "raised" | "surface" | "sunken";

export interface PanelOptions extends Partial<Pick<Appearance, "theme" | "mode" | "size" | "radius" | "shading" | "border">> {
  x: number;
  y: number;
  width: number;
  height: number;
  role?: PanelRole;
  /** Which ramp shades the panel (default "surface", the card ramp). */
  tone?: Tone;
  /** Fill color; defaults to the tone's color (card for surface). */
  fill?: string;
}

/** Content box inside the border, to place text or sprites in. */
export interface PanelContent {
  x: number;
  y: number;
  width: number;
  height: number;
}

const TONE_FILL: Record<Tone, string> = { surface: "card", primary: "primary", secondary: "secondary", accent: "accent", destructive: "destructive" };

/** Resolves var(--x) references (classic themes mix colors from other tokens). */
export function resolveColor(value: string, tokens: Tokens, depth = 0): string {
  if (depth > 8) return value;
  return value.replace(/var\(--([\w-]+)(?:,\s*([^()]*))?\)/g, (_, name: string, fallback?: string) =>
    tokens[name] !== undefined ? resolveColor(tokens[name], tokens, depth + 1) : (fallback ?? "transparent")
  );
}

const px = (v: string) => parseFloat(v);

/** Row spans [left, right) of a stepped box, in box coordinates. */
function outerSpan(y: number, w: number, h: number, k: number, s: number): [number, number] | null {
  if (y < 0 || y >= h) return null;
  const band = (d: number) => (d < k * s ? k - Math.floor(d / s) : 0); // stair steps cut at distance d from an edge
  const cut = Math.max(band(y), band(h - 1 - y)) * s;
  return [cut, w - cut];
}

/**
 * Row spans of the area inside the border, matching the CSS: straight
 * border lines plus, on each stair, a riser (border-wide) and a tread
 * (border-tall) of border color.
 */
function innerSpan(y: number, w: number, h: number, k: number, s: number, b: number): [number, number] | null {
  if (y < b || y >= h - b) return null;
  const fromEdge = Math.min(y, h - 1 - y);
  let left = b;
  if (fromEdge < k * s) {
    const i = Math.floor(fromEdge / s); // stair band
    left = Math.max(left, (k - i) * s + b);
    if (fromEdge - i * s < b && i >= 1) left = Math.max(left, (k - i + 1) * s);
  } else if (fromEdge - k * s < b && k > 0) {
    left = Math.max(left, s); // the last tread
  }
  return left < w - left ? [left, w - left] : null;
}

type SpanFn = (y: number) => [number, number] | null;

function fillSpans(ctx: CanvasRenderingContext2D, x: number, y: number, h: number, span: SpanFn, color: string) {
  ctx.fillStyle = color;
  for (let row = 0; row < h; row++) {
    const s = span(row);
    if (s && s[1] > s[0]) ctx.fillRect(x + s[0], y + row, s[1] - s[0], 1);
  }
}

/** Band = shape minus the shape shifted by (dx, dy), like a CSS inset box-shadow. */
function fillBand(ctx: CanvasRenderingContext2D, x: number, y: number, h: number, span: SpanFn, dx: number, dy: number, color: string) {
  ctx.fillStyle = color;
  for (let row = 0; row < h; row++) {
    const s = span(row);
    if (!s) continue;
    const sh = span(row - dy);
    const shifted: [number, number] | null = sh ? [sh[0] + dx, sh[1] + dx] : null;
    const segs: [number, number][] = !shifted
      ? [s]
      : [
          [s[0], Math.min(s[1], shifted[0])],
          [Math.max(s[0], shifted[1]), s[1]],
        ];
    for (const [a, z] of segs) if (z > a) ctx.fillRect(x + a, y + row, z - a, 1);
  }
}

/**
 * Draws a pixelcn panel and returns its content box. Options default to
 * the library defaults (Nintendo, 64x, square, hard drop, solid border).
 */
export function drawPanel(ctx: CanvasRenderingContext2D, options: PanelOptions): PanelContent {
  const o = { ...DEFAULT_APPEARANCE, role: "raised" as PanelRole, tone: "surface" as Tone, ...options };
  const x = Math.round(o.x);
  const y = Math.round(o.y);
  const w = Math.round(o.width);
  const h = Math.round(o.height);
  const tokens: Tokens = { ...paletteTokens(o.theme, o.mode), ...SIZE_TOKENS[o.size] };
  const color = (name: string) => resolveColor(`var(--${name})`, tokens);
  const ramp = (step: string) => color(`${o.tone}-${step}`);

  const b = Math.max(1, Math.round(px(tokens["pixel-line"])));
  const off = Math.round(px(tokens["pixel-shadow-offset"]));
  const s = Math.round(px(tokens["pixel-corner"]));
  const k = RADII[o.radius].steps;
  const fill = o.fill ?? color(TONE_FILL[o.tone]);
  const edge =
    o.border === "none" ? "transparent" : o.border === "selout" ? ramp("outline") : o.role === "sunken" ? color("input") : color("foreground");

  const outer: SpanFn = (row) => outerSpan(row, w, h, k, s);
  const inner: SpanFn = (row) => innerSpan(row, w, h, k, s, b);

  // Shadow: the same shape, shifted. Extruded = side (ramp, 2 steps darker) + outline.
  if (o.role === "raised" && o.shading !== "flat") {
    const reach = SHADINGS[o.shading].reach;
    if (o.shading === "deep") {
      fillSpans(ctx, x + 2 * off, y + 2 * off, h, outer, color("foreground"));
      fillSpans(ctx, x + off, y + off, h, outer, ramp("lo-2"));
    } else if (reach) {
      fillSpans(ctx, x + off, y + off, h, outer, color("foreground"));
    }
  }

  // Border, then the fill inside it.
  fillSpans(ctx, x, y, h, outer, edge);
  fillSpans(ctx, x, y, h, inner, fill);

  // Ramp bands: widest first, the outermost (most extreme step) on top.
  if (o.shading !== "flat" && o.role !== "surface") {
    const { hi, lo, unit } = BANDS[o.size];
    const u = Math.round(px(unit));
    const top = o.shading === "toplit";
    const invert = o.role === "sunken";
    const hard = o.shading === "hard";
    if (!(hard && o.role === "raised")) {
      const sides: ["hi" | "lo", number, 1 | -1][] = invert ? [["lo", hard ? 1 : lo, 1], ["hi", hard ? 0 : hi, -1]] : [["hi", hi, 1], ["lo", lo, -1]];
      for (const [kind, n, sign] of sides) {
        for (let kk = n; kk >= 1; kk--) {
          const d = u * kk * sign;
          fillBand(ctx, x, y, h, inner, top ? 0 : d, d, ramp(`${kind}-${Math.min(3, n - kk + 1)}`));
        }
      }
    }
  }

  // Double frame: a second line one border-width inside.
  if (o.border === "frame") {
    const g = 3 * b;
    ctx.fillStyle = edge;
    for (let row = 0; row < h; row++) {
      const span = outer(row);
      if (!span) continue;
      const onH = (row >= g && row < g + b) || (row >= h - g - b && row < h - g);
      const inV = row >= g && row < h - g;
      const runs: [number, number][] = onH ? [[g, w - g]] : inV ? [[g, g + b], [w - g - b, w - g]] : [];
      for (const [a, z] of runs) {
        const l = Math.max(a, span[0]);
        const r = Math.min(z, span[1]);
        if (r > l) ctx.fillRect(x + l, y + row, r - l, 1);
      }
    }
  }

  return { x: x + b, y: y + b, width: w - 2 * b, height: h - 2 * b };
}

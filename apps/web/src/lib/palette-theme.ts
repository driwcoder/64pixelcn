// Turns a pixel-art palette (a list of hex colors, e.g. a Lospec .hex file)
// into a pixelcn theme using only the palette's own colors:
//  - shadcn color roles (background, foreground, primary...) picked so every
//    text/surface pair passes WCAG AA (tests/contrast.spec.ts checks them);
//  - shading ramps: for each role, the palette colors of its hue family
//    ordered dark -> light, which the bevel/outline styles step through.
// Plain TypeScript with no dependencies, so it also works outside React
// (canvas games, vanilla JS).

export type Hex = string;

export interface PaletteColor {
  hex: Hex;
  /** OKLCH lightness (0-1), chroma and hue (degrees). */
  l: number;
  c: number;
  h: number;
  /** WCAG relative luminance. */
  y: number;
  /** Not in the palette: lightened/darkened from `from` to reach a contrast. */
  extendedFrom?: Hex;
}

/** Tones whose ramps drive shading: the roles that are drawn as filled boxes. */
export const TONES = ["surface", "primary", "secondary", "accent", "destructive"] as const;
export type Tone = (typeof TONES)[number];

/** Ramp steps exposed per tone: hi-1..3 lighter, lo-1..3 darker than the fill. */
export const RAMP_STEPS = 3;

function linear(c: number) {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

export function parseHex(hex: Hex): PaletteColor {
  const h6 = hex.replace(/^#/, "").toLowerCase();
  const [r, g, b] = [0, 2, 4].map((i) => linear(parseInt(h6.slice(i, i + 2), 16)));
  const l_ = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m_ = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s_ = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
  return {
    hex: `#${h6}`,
    l: L,
    c: Math.hypot(A, B),
    h: ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360,
    y: 0.2126 * r + 0.7152 * g + 0.0722 * b,
  };
}

/** OKLCH -> hex (gamut clipped). */
export function oklchToHex(l: number, c: number, h: number): Hex {
  const A = c * Math.cos((h * Math.PI) / 180);
  const B = c * Math.sin((h * Math.PI) / 180);
  const l_ = (l + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m_ = (l - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s_ = (l - 0.0894841775 * A - 1.291485548 * B) ** 3;
  const rgb = [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ].map((v) => {
    const x = Math.min(1, Math.max(0, v));
    const srgb = x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
    return Math.round(srgb * 255).toString(16).padStart(2, "0");
  });
  return `#${rgb.join("")}`;
}

/**
 * When a palette can't reach a contrast, the closest thing that can: the same
 * hue and chroma, lighter (dir 1) or darker (dir -1), just enough.
 */
export function extendUntil(p: PaletteColor, against: PaletteColor, ratio: number, dir: 1 | -1): PaletteColor {
  if (contrast(p, against) >= ratio) return p;
  for (let l = p.l; l >= 0 && l <= 1; l += 0.01 * dir) {
    const q = parseHex(oklchToHex(l, p.c, p.h));
    if (contrast(q, against) >= ratio) return { ...q, extendedFrom: p.hex };
  }
  return p;
}

export function contrast(a: PaletteColor, b: PaletteColor) {
  const [hi, lo] = a.y > b.y ? [a.y, b.y] : [b.y, a.y];
  return (hi + 0.05) / (lo + 0.05);
}

const hueDistance = (a: number, b: number) => Math.min(Math.abs(a - b), 360 - Math.abs(a - b));
const NEUTRAL = 0.04;

/** Palette colors of the same family as `base`, dark -> light. */
export function rampFor(base: PaletteColor, palette: PaletteColor[]): PaletteColor[] {
  const family = palette.filter((p) =>
    base.c < NEUTRAL ? p.c < NEUTRAL + 0.02 : p.c >= 0.02 && hueDistance(p.h, base.h) <= 50
  );
  if (!family.some((p) => p.hex === base.hex)) family.push(base); // an extended color joins its family
  return family.sort((a, b) => a.l - b.l);
}

export type Mode = "dark" | "light";

export interface PaletteThemeOptions {
  /** Force a role to a palette color (hex) instead of the automatic pick. */
  overrides?: Partial<Record<Mode, Partial<Record<string, Hex>>>>;
}

/**
 * Picks the shadcn roles for a palette in a mode. Returns null when the
 * palette can't make that mode (e.g. no light color for a light background).
 */
export function pickRoles(colors: Hex[], mode: Mode, options: PaletteThemeOptions = {}): Record<string, PaletteColor> | null {
  // (Text colors are chosen between the background and the main text color,
  // so every role passes WCAG AA; see tests/contrast.spec.ts.)
  const pal = colors.map(parseHex);
  const byL = [...pal].sort((a, b) => a.l - b.l);
  const dir = mode === "dark" ? 1 : -1;
  const over = options.overrides?.[mode] ?? {};
  const find = (hex: Hex | undefined) => (hex ? pal.find((p) => p.hex === `#${hex.replace(/^#/, "").toLowerCase()}`) : undefined);

  // Background: the darkest (or lightest) color, preferring low chroma.
  const ends = mode === "dark" ? byL.slice(0, 3) : byL.slice(-3).reverse();
  const bg = find(over.background) ?? ends.reduce((best, p) => (p.c < best.c - 0.02 && Math.abs(p.l - ends[0].l) < 0.06 ? p : best), ends[0]);
  if (mode === "light" && bg.l < 0.75) return null;

  // Text: the highest-contrast color, preferring a neutral one when it's
  // nearly as good; lightened/darkened past the palette only if it must be.
  const byContrast = [...pal].sort((a, b) => contrast(b, bg) - contrast(a, bg));
  const best = find(over.foreground) ?? byContrast.find((p) => p.c < 0.06 && contrast(p, bg) >= contrast(byContrast[0], bg) * 0.85) ?? byContrast[0];
  // Low-contrast palettes get extra room so a card step still carries text.
  const fg = contrast(best, bg) >= 4.5 ? best : extendUntil(best, bg, 5.5, dir);

  /** Whichever of the text colors reads best on `fill`. */
  const textOn = (fill: PaletteColor) => [fg, bg].sort((a, b) => contrast(b, fill) - contrast(a, fill))[0];
  const readable = (fill: PaletteColor) => contrast(textOn(fill), fill) >= 4.5;
  const towardFg = (p: PaletteColor) => (p.l - bg.l) * dir > 0;
  const neutralFirst = (a: PaletteColor, b: PaletteColor) => Number(a.c >= 0.06) - Number(b.c >= 0.06);

  // Cards sit one step from the background toward the text, preferably neutral.
  const steps = pal
    .filter((p) => towardFg(p) && Math.abs(p.l - bg.l) >= 0.02 && contrast(fg, p) >= 4.5)
    .sort((a, b) => neutralFirst(a, b) || Math.abs(a.l - bg.l) - Math.abs(b.l - bg.l));
  const card = find(over.card) ?? steps[0] ?? bg;
  const muted = find(over.muted) ?? steps.find((p) => p !== card && (p.l - card.l) * dir >= 0) ?? card;
  const softText = pal
    .filter((p) => p.hex !== fg.hex && [bg, card, muted].every((s) => contrast(p, s) >= 4.5))
    .sort((a, b) => contrast(a, bg) - contrast(b, bg));
  const mutedFg = find(over["muted-foreground"]) ?? softText[0] ?? fg;

  // Fills: chromatic colors that carry readable text, distinct from each other.
  // Low-contrast palettes get their most saturated colors pushed just far
  // enough (same hue) to carry text.
  const notPage = (p: PaletteColor) => p.hex !== bg.hex && p.hex !== fg.hex;
  let fills = pal.filter((p) => notPage(p) && p.c >= 0.03 && readable(p)).sort((a, b) => b.c - a.c);
  if (fills.length < 3) {
    const extra = pal
      .filter((p) => notPage(p) && p.c >= 0.02 && !fills.includes(p))
      .sort((a, b) => b.c - a.c)
      .slice(0, 4)
      .map((p) => extendUntil(p, bg, 4.6, dir));
    fills = [...fills, ...extra.filter((p) => readable(p))];
  }
  const standOut = fills.filter((p) => contrast(p, bg) >= 3);
  const primary = find(over.primary) ?? standOut[0] ?? fg;
  const differs = (p: PaletteColor, ...others: PaletteColor[]) => others.every((o) => o.hex !== p.hex);
  const accent =
    find(over.accent) ??
    fills.find((p) => differs(p, primary) && hueDistance(p.h, primary.h) >= 50) ??
    fills.find((p) => differs(p, primary)) ??
    primary;
  const reddish = (p: PaletteColor) => p.c >= 0.02 && (p.h <= 45 || p.h >= 330);
  // Destructive wants a red the palette can make readable, distinct from the others.
  const reds = [
    ...fills.filter(reddish),
    ...pal.filter((p) => notPage(p) && reddish(p)).sort((a, b) => b.c - a.c).map((p) => extendUntil(p, textOn(p), 4.6, (p.l - textOn(p).l) > 0 ? 1 : -1)),
  ].filter((p) => readable(p) && notPage(p));
  const destructive =
    find(over.destructive) ??
    reds.find((p) => differs(p, primary, accent)) ??
    fills.find((p) => differs(p, primary, accent)) ??
    primary;
  const secondary =
    find(over.secondary) ??
    pal
      .filter((p) => p !== bg && readable(p) && towardFg(p))
      .sort((a, b) => neutralFirst(a, b) || Math.abs(a.l - (bg.l + dir * 0.15)) - Math.abs(b.l - (bg.l + dir * 0.15)))[0] ??
    muted;

  // Lines: a soft border, and input borders strong enough to find (3:1).
  const border = find(over.border) ?? [...pal].filter((p) => p !== bg).sort((a, b) => Math.abs(contrast(a, bg) - 2) - Math.abs(contrast(b, bg) - 2))[0];
  const input =
    find(over.input) ??
    pal.filter((p) => contrast(p, bg) >= 3).sort((a, b) => contrast(a, bg) - contrast(b, bg))[0] ??
    extendUntil(border, bg, 3.1, dir);
  const ring = contrast(primary, bg) >= 3 ? primary : fg;

  return {
    background: bg,
    foreground: fg,
    card,
    "card-foreground": textOn(card),
    popover: card,
    "popover-foreground": textOn(card),
    primary,
    "primary-foreground": textOn(primary),
    secondary,
    "secondary-foreground": textOn(secondary),
    muted,
    "muted-foreground": mutedFg,
    accent,
    "accent-foreground": textOn(accent),
    destructive,
    "destructive-foreground": textOn(destructive),
    border,
    input,
    ring,
  };
}

/** Five chart colors: the most saturated colors of clearly different hues. */
export function chartColors(colors: Hex[]): Hex[] {
  const pal = colors.map(parseHex).sort((a, b) => b.c - a.c);
  const out: PaletteColor[] = [];
  for (const p of pal) if (out.length < 5 && out.every((o) => hueDistance(o.h, p.h) >= 30 || p.c < 0.03)) out.push(p);
  for (const p of pal) if (out.length < 5 && !out.includes(p)) out.push(p);
  return out.map((p) => p.hex);
}

/** hi-1..3 / lo-1..3 / outline for a fill color, stepping through its ramp. */
export function rampSteps(base: PaletteColor, palette: PaletteColor[]): Record<string, Hex> {
  const ramp = rampFor(base, palette);
  const i = ramp.findIndex((p) => p.hex === base.hex);
  const at = (k: number) => ramp[Math.max(0, Math.min(ramp.length - 1, k))].hex;
  const out: Record<string, Hex> = {};
  for (let k = 1; k <= RAMP_STEPS; k++) {
    out[`hi-${k}`] = at(i + k);
    out[`lo-${k}`] = at(i - k);
  }
  // Selective outline: two steps darker than the fill (the darkest it has).
  out.outline = at(i - 2);
  return out;
}

/** Every CSS token a palette theme defines for a mode, or null if it can't do the mode. */
export function paletteThemeTokens(colors: Hex[], mode: Mode, options: PaletteThemeOptions = {}): Record<string, string> | null {
  const roles = pickRoles(colors, mode, options);
  if (!roles) return null;
  const pal = colors.map(parseHex);
  const tokens: Record<string, string> = Object.fromEntries(Object.entries(roles).map(([k, v]) => [k, v.hex]));
  pal.push(...Object.values(roles).filter((r) => r.extendedFrom && !pal.some((p) => p.hex === r.hex)));
  chartColors(colors).forEach((hex, i) => (tokens[`chart-${i + 1}`] = hex));
  const fills: Record<Tone, PaletteColor> = {
    surface: roles.card,
    primary: roles.primary,
    secondary: roles.secondary,
    accent: roles.accent,
    destructive: roles.destructive,
  };
  for (const tone of TONES) {
    for (const [k, v] of Object.entries(rampSteps(fills[tone], pal))) tokens[`${tone}-${k}`] = v;
  }
  return tokens;
}

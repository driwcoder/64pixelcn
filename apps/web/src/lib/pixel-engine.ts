// pixelcn's style engine: turns the Appearance settings into CSS.
//
// Components only declare a role, and the engine decides how it looks:
//  - .pixel-raised   a box that stands out (button, card, popover): border,
//                    stepped corners and the theme's shading;
//  - .pixel-surface  a flat box (badge, tabs list): border and corners;
//  - .pixel-sunken   a box pressed into the page (input, textarea): border,
//                    corners and inverted shading;
//  - .pixel-tone-{primary|secondary|accent|destructive}: which color ramp the
//    shading steps through (default: the surface/card ramp).
// .pixel-rounded and .pixel-shadow are the older opt-in classes, still
// honored for corners and shadows.
//
// Shading is drawn with the element's own ramp (palette colors from the
// darkest to the lightest of its hue family, see lib/palette-theme.ts), with
// more bands as the pixel size grows, so a palette with long ramps shades
// with more tones at 128x than at 8x.

import {
  APPEARANCE_ATTRS,
  BORDER_IDS,
  DEFAULT_APPEARANCE,
  FONT_IDS,
  FONTS,
  PIXEL_SIZES,
  RADII,
  RADIUS_IDS,
  SHADINGS,
  SHADING_IDS,
  SIZE_TOKENS,
  TEXT_SCALES,
  TEXT_SCALE_IDS,
  THEME_IDS,
  fontFamily,
  fontHasCaps,
  paletteTokens,
  themeHasMode,
  type Appearance,
  type Border,
  type PixelFont,
  type PixelSize,
  type Radius,
  type Shading,
  type Tokens,
} from "@/lib/tokens";
import { RAMP_STEPS, TONES } from "@/lib/palette-theme";

export type CssDecls = Record<string, string>;
export type Rule = [selector: string, decls: CssDecls];

const RAISED = ":is(.pixel-raised, .pixel-shadow)";
const ROUNDED_RAISED = ":is(.pixel-raised, .pixel-rounded.pixel-shadow)";
const SUNKEN = ".pixel-sunken";
const BOXED = ":is(.pixel-raised, .pixel-surface, .pixel-sunken, .pixel-rounded)";
const ROLES = ":is(.pixel-raised, .pixel-surface, .pixel-sunken)";
/** Large panels that get the double (RPG window) frame. */
const FRAMED = ':is([data-slot="card"], [data-slot="dialog-content"], [data-slot="alert-dialog-content"], [data-slot="popover-content"], [data-slot="hover-card-content"], [data-slot="dialogue-box"], [data-slot="scoreboard"], [data-slot="toast"])';

// ── Shading ──────────────────────────────────────────────────────────

/**
 * Bands per pixel size: how many highlight and shadow tones a box gets and
 * how wide each band is. A low-res (8x) sprite has room for one tone each
 * side; a high-res one (128x) for three. Shadows get a tone more than
 * highlights in between, as pixel artists usually spend more tones on shade.
 */
export const BANDS: Record<PixelSize, { hi: number; lo: number; unit: string }> = {
  8: { hi: 1, lo: 1, unit: "1px" },
  16: { hi: 1, lo: 2, unit: "1px" },
  32: { hi: 2, lo: 2, unit: "1px" },
  64: { hi: 2, lo: 3, unit: "2px" },
  128: { hi: 3, lo: 3, unit: "2px" },
};

const O = "var(--pixel-shadow-offset)";
const t = (name: string) => `var(--t-${name})`;

/**
 * Inset bands, outermost first: the band at the very edge is the most
 * extreme ramp step and the inner ones step back toward the fill, so the
 * edge reads as a smooth ramp. `light` is where the light comes from.
 */
function bands(size: PixelSize, light: "top-left" | "top", invert = false): string[] {
  const { hi, lo, unit } = BANDS[size];
  const side = (k: number, sign: 1 | -1, color: string) => {
    const d = `calc(${unit} * ${k * sign})`;
    return light === "top" ? `inset 0 ${d} 0 0 ${color}` : `inset ${d} ${d} 0 0 ${color}`;
  };
  const out: string[] = [];
  const [first, second] = invert ? (["lo", "hi"] as const) : (["hi", "lo"] as const);
  const count = { hi, lo };
  for (const [kind, sign] of [[first, 1], [second, -1]] as const) {
    const n = count[kind];
    for (let k = 1; k <= n; k++) out.push(side(k, sign, t(`${kind}-${Math.min(RAMP_STEPS, n - k + 1)}`)));
  }
  return out;
}

const drop = (k: number, color: string) => `calc(${O} * ${k}) calc(${O} * ${k}) 0 0 ${color}`;

/**
 * Extruded: the block's side (its ramp, two steps darker) one offset out,
 * outlined one more offset out. The side is a right strip and a bottom strip
 * that stop `cut` short of the bottom-right corner, so with stepped corners
 * it follows the stair (a single box-shadow is always a rectangle).
 */
function extruded(size: PixelSize, cut: string): string {
  const side = t("lo-2");
  return [
    ...bands(size, "top-left"),
    `calc(${O} + ${cut}) ${O} 0 calc(${cut} * -1) ${side}`,
    `${O} calc(${O} + ${cut}) 0 calc(${cut} * -1) ${side}`,
    drop(2, "var(--foreground)"),
  ].join(", ");
}

/** The box-shadow of a raised element. */
export function raisedShadow(shading: Shading, size: PixelSize, cut = "0px"): string {
  const fg = "var(--foreground)";
  switch (shading) {
    case "flat":
      return "0 0 #0000";
    case "hard":
      return drop(1, fg);
    case "bevel":
      return [...bands(size, "top-left"), drop(1, fg)].join(", ");
    case "toplit":
      return [...bands(size, "top"), drop(1, fg)].join(", ");
    case "deep":
      return extruded(size, cut);
  }
}

/** The box-shadow of a sunken element: the bevel turned inside out, no drop. */
export function sunkenShadow(shading: Shading, size: PixelSize): string {
  if (shading === "flat") return "0 0 #0000";
  if (shading === "hard") return `inset ${BANDS[size].unit} ${BANDS[size].unit} 0 0 ${t("lo-1")}`;
  return bands(size, shading === "toplit" ? "top" : "top-left", true).join(", ");
}

/** Per-element shading declarations for a raised element. */
function raisedDecls(shading: Shading, size: PixelSize, cut?: string): CssDecls {
  const { reach } = SHADINGS[shading];
  const dropColor = shading === "flat" ? "transparent" : shading === "deep" ? t("lo-2") : "var(--foreground)";
  return {
    "--pixel-shadow": raisedShadow(shading, size, cut),
    "--pixel-shadow-reach": `calc(${O} * ${reach})`,
    // Colors seen through a stepped corner's cut-away pixels.
    "--pixel-drop-color": dropColor,
    "--pixel-drop-outer": shading === "deep" ? "var(--foreground)" : dropColor,
  };
}

// ── Stepped corners ──────────────────────────────────────────────────

const MAX_REACH = Math.max(...Object.values(SHADINGS).map((x) => x.reach));

/**
 * Stepped (pixel-art) corners of `steps` stairs. One stair step is one
 * shadow offset (--pixel-corner), so corners and shadow share a pixel grid:
 * a shadow `n` steps away extends the top-right and bottom-left stairs by
 * `n` steps, and its bottom-right corner is the box's stair moved out.
 *  - clip-path: that staircase outline, with a fixed point count (extra
 *    points collapse onto the last one via min());
 *  - background layers: the border pixels on each stair's inner diagonal
 *    (the CSS border stays straight) and the cut-away bottom-right pixels
 *    the shadow shows through.
 */
export function roundedCornerDecls(steps: number): CssDecls | null {
  if (steps === 0) return null;
  const k = steps;
  const s = "var(--pixel-corner)";
  const r = "var(--pixel-reach, 0px)";
  const b = "var(--pixel-line, 2px)";
  const m = (n: number) => (n === 0 ? "0px" : `${s} * ${n}`);
  const c = (expr: string) => `calc(${expr})`;
  const minc = (a: string, z: string) => `min(${a}, ${z})`;
  const pts: [string, string][] = [];
  pts.push(["0px", c(m(k))]);
  for (let i = k - 1; i >= 0; i--) pts.push([c(m(k - i)), c(m(i + 1))], [c(m(k - i)), c(m(i))]);
  const xEnd = c(`100% + ${r}`);
  const yEnd = c(`${m(k)} + ${r}`);
  for (let j = 0; j < k + MAX_REACH; j++) {
    const x0 = minc(c(`100% - ${m(k)} + ${m(j)}`), xEnd);
    const x1 = minc(c(`100% - ${m(k)} + ${m(j + 1)}`), xEnd);
    pts.push([x0, minc(c(m(j)), yEnd)], [x0, minc(c(m(j + 1)), yEnd)], [x1, minc(c(m(j + 1)), yEnd)]);
  }
  pts.push([xEnd, c(`100% + ${r} - ${m(k)}`)]);
  for (let i = k - 1; i >= 0; i--) {
    pts.push([c(`100% + ${r} - ${m(k - i)}`), c(`100% + ${r} - ${m(i + 1)}`)], [c(`100% + ${r} - ${m(k - i)}`), c(`100% + ${r} - ${m(i)}`)]);
  }
  const bl: [string, string][] = [];
  for (let j = 0; j < k + MAX_REACH; j++) {
    const y0 = minc(c(`100% - ${m(k)} + ${m(j)}`), c(`100% + ${r}`));
    const y1 = minc(c(`100% - ${m(k)} + ${m(j + 1)}`), c(`100% + ${r}`));
    bl.push([minc(c(m(j)), yEnd), y0], [minc(c(m(j + 1)), yEnd), y0], [minc(c(m(j + 1)), yEnd), y1]);
  }
  pts.push(...bl.reverse());

  type Layer = { x: string; y: string; w: string; h: string; color: string; pos?: string };
  const edge = "var(--pixel-corner-color, var(--pixel-edge, var(--foreground)))";
  const stair: Layer[] = [];
  for (let i = 0; i < k; i++) stair.push({ x: c(m(k - i)), y: c(m(i)), w: b, h: s, color: edge });
  for (let i = 1; i <= k; i++) stair.push({ x: c(m(k - i)), y: c(m(i)), w: s, h: b, color: edge });
  const all: Layer[] = (["left", "right"] as const).flatMap((h) =>
    (["top", "bottom"] as const).flatMap((v) => stair.map((l) => ({ ...l, pos: `${h} ${l.x} ${v} ${l.y}` })))
  );
  const outer = "var(--pixel-corner-shadow-outer, var(--pixel-corner-shadow, transparent))";
  for (let i = 0; i < k - 2; i++) all.push({ x: "0px", y: c(m(i)), w: c(m(k - 2 - i)), h: s, color: outer, pos: `right 0px bottom ${c(m(i))}` });
  const behind = "var(--pixel-corner-shadow, transparent)";
  for (let i = 0; i < k; i++) all.push({ x: "0px", y: c(m(i)), w: c(m(k - i)), h: s, color: behind, pos: `right 0px bottom ${c(m(i))}` });

  return {
    "clip-path": `polygon(${pts.map(([x, y]) => `${x} ${y}`).join(", ")})`,
    "background-image": all.map((l) => `linear-gradient(${l.color}, ${l.color})`).join(", "),
    "background-position": all.map((l) => l.pos).join(", "),
    "background-size": all.map((l) => `${l.w} ${l.h}`).join(", "),
    "background-repeat": "no-repeat",
    "background-origin": "border-box",
  };
}

/** Per-element variables that must not inherit (a button in a card isn't the card). */
export const NON_INHERITED_VARS = ["--pixel-reach", "--pixel-corner-shadow", "--pixel-corner-shadow-outer", "--pixel-corner-color"] as const;

const ROUNDED_SHADOW_DECLS: CssDecls = {
  "--pixel-reach": "var(--pixel-shadow-reach)",
  "--pixel-corner-shadow": "var(--pixel-drop-color)",
  "--pixel-corner-shadow-outer": "var(--pixel-drop-outer)",
};
const PRESSED_DECLS: CssDecls = { "--pixel-reach": "0px", "--pixel-corner-shadow": "transparent", "--pixel-corner-shadow-outer": "transparent" };

/** Focus ring drawn inside the box, since stepped corners clip outer rings. */
const FOCUS_DECLS: CssDecls = {
  "--tw-ring-shadow": "0 0 #0000",
  "--tw-ring-offset-shadow": "0 0 #0000",
  outline: "2px solid var(--ring)",
  "outline-offset": "calc(-2px - var(--pixel-line, 2px))",
};

function cornerRules(radius: Radius): Rule[] {
  const decls = roundedCornerDecls(RADII[radius].steps);
  if (!decls) return [];
  return [
    [BOXED, decls],
    [ROUNDED_RAISED, ROUNDED_SHADOW_DECLS],
    [`${ROUNDED_RAISED}[class*="active:shadow-none"]:active`, PRESSED_DECLS],
  ];
}

// ── Borders ──────────────────────────────────────────────────────────

function borderRules(border: Border): Rule[] {
  switch (border) {
    case "solid":
    case "frame": {
      const rules: Rule[] = [
        [":is(.pixel-raised, .pixel-surface)", { "--pixel-edge": "var(--foreground)" }],
        [SUNKEN, { "--pixel-edge": "var(--input)" }],
      ];
      // RPG window: a second line, one line-width in, inside large panels.
      if (border === "frame") {
        rules.push([`${ROLES}${FRAMED}`, { outline: "var(--pixel-line, 2px) solid var(--pixel-edge, var(--foreground))", "outline-offset": "calc(var(--pixel-line, 2px) * -3)" }]);
      }
      return rules;
    }
    case "selout":
      // Selective outline: each box is outlined in its own ramp's dark end
      // instead of one outline color for everything.
      return [[ROLES, { "--pixel-edge": t("outline") }]];
    case "none":
      return [[ROLES, { "--pixel-edge": "transparent" }]];
  }
}

// ── Roles (static) ───────────────────────────────────────────────────

const tw = (shadow: string) => ({
  "--tw-shadow": shadow,
  "box-shadow":
    "var(--tw-inset-shadow, 0 0 #0000), var(--tw-inset-ring-shadow, 0 0 #0000), var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
});

function toneVars(tone: string): CssDecls {
  const out: CssDecls = { "--t-outline": `var(--${tone}-outline, var(--foreground))` };
  for (let k = 1; k <= RAMP_STEPS; k++) {
    out[`--t-hi-${k}`] = `var(--${tone}-hi-${k}, transparent)`;
    out[`--t-lo-${k}`] = `var(--${tone}-lo-${k}, transparent)`;
  }
  return out;
}

/**
 * Role classes. They only read variables, with fallbacks, so a component
 * installed without a pixelcn preset still gets a 2px border and a hard drop.
 */
export const ROLE_RULES: Rule[] = [
  [
    ROLES,
    {
      border: "var(--pixel-line, 2px) solid var(--pixel-edge, var(--foreground))",
      "--pixel-corner-color": "var(--pixel-edge, var(--foreground))",
    },
  ],
  [`${ROLES}, .pixel-shadow, .pixel-rounded`, toneVars("surface")],
  ...TONES.filter((x) => x !== "surface").map((tone): Rule => [`.pixel-tone-${tone}`, toneVars(tone)]),
  [".pixel-raised", tw("var(--pixel-shadow, var(--pixel-shadow-offset, 3px) var(--pixel-shadow-offset, 3px) 0 0 var(--foreground))")],
  [SUNKEN, tw("var(--pixel-sunken, 0 0 #0000)")],
];

// ── Assembly ─────────────────────────────────────────────────────────

/** Rules for one combination of settings (a registry preset). */
export function engineRules(a: Pick<Appearance, "size" | "shading" | "radius" | "border">): { layered: Rule[]; unlayered: Rule[] } {
  const steps = RADII[a.radius].steps;
  const layered: Rule[] = [
    ...ROLE_RULES,
    [RAISED, raisedDecls(a.shading, a.size)],
    [SUNKEN, { "--pixel-sunken": sunkenShadow(a.shading, a.size) }],
    ...borderRules(a.border),
    ...cornerRules(a.radius),
  ];
  if (a.shading === "deep" && steps) layered.push([ROUNDED_RAISED, { "--pixel-shadow": raisedShadow("deep", a.size, `calc(var(--pixel-corner) * ${steps})`) }]);
  const unlayered: Rule[] = steps ? [[`${BOXED}:focus-visible`, FOCUS_DECLS]] : [];
  return { layered, unlayered };
}

/** Every combination, scoped by the <html> attributes (the site). */
function scopedEngineRules(): { layered: Rule[]; unlayered: Rule[] } {
  const attr = (k: keyof Appearance, v: string | number) => `[${APPEARANCE_ATTRS[k]}="${v}"]`;
  const layered: Rule[] = [...ROLE_RULES];
  const unlayered: Rule[] = [];
  for (const size of PIXEL_SIZES) {
    for (const shading of SHADING_IDS) {
      const scope = `${attr("size", size)}${attr("shading", shading)}`;
      layered.push([`${scope} ${RAISED}`, raisedDecls(shading, size)], [`${scope} ${SUNKEN}`, { "--pixel-sunken": sunkenShadow(shading, size) }]);
      if (shading === "deep") {
        for (const radius of RADIUS_IDS) {
          const steps = RADII[radius].steps;
          if (steps) {
            layered.push([`${scope}${attr("radius", radius)} ${ROUNDED_RAISED}`, { "--pixel-shadow": raisedShadow("deep", size, `calc(var(--pixel-corner) * ${steps})`) }]);
          }
        }
      }
    }
  }
  for (const border of BORDER_IDS) layered.push(...borderRules(border).map(([sel, d]): Rule => [`${attr("border", border)} ${sel}`, d]));
  for (const radius of RADIUS_IDS) {
    layered.push(...cornerRules(radius).map(([sel, d]): Rule => [`${attr("radius", radius)} ${sel}`, d]));
    if (RADII[radius].steps) unlayered.push([`${attr("radius", radius)} ${BOXED}:focus-visible`, FOCUS_DECLS]);
  }
  return { layered, unlayered };
}

// ── CSS output ───────────────────────────────────────────────────────

function varRule(selector: string, vars: Tokens) {
  return `${selector}{${Object.entries(vars).map(([k, v]) => `--${k}:${v};`).join("")}}`;
}
export function cssRule([selector, decls]: Rule) {
  return `${selector}{${Object.entries(decls).map(([k, v]) => `${k}:${v};`).join("")}}`;
}

export const PROPERTY_RULES = NON_INHERITED_VARS.map((name) => `@property ${name}{syntax:"*";inherits:false;}`).join("\n");

/**
 * For fonts with `caps: false` (blackletter): `uppercase` text keeps its
 * written case and Tailwind's tracking scale is brought close to normal.
 */
export const NO_CAPS_TRACKING: Tokens = { "tracking-wide": "0.01em", "tracking-wider": "0.015em", "tracking-widest": "0.02em" };
export const NO_CAPS_DECLS: CssDecls = { "text-transform": "none" };

/**
 * The site's theme CSS: tokens for every Appearance value on <html>, then
 * the engine's element rules in the `components` layer (so utilities in a
 * component's className still win), then the few rules that must beat
 * utilities. The layer order statement comes first so this inline style,
 * parsed before Tailwind's stylesheet, can't reorder the layers.
 */
export function buildThemeCss() {
  const d = DEFAULT_APPEARANCE;
  const fontVars = (f: PixelFont) => ({ "pixel-font": fontFamily(f), "pixel-font-adjust": FONTS[f].adjust });
  const { layered, unlayered } = scopedEngineRules();
  return [
    "@layer theme, base, components, utilities;",
    PROPERTY_RULES,
    varRule(":root", {
      radius: "0px",
      ...paletteTokens(d.theme, d.mode),
      ...SIZE_TOKENS[d.size],
      ...fontVars(d.font),
      "pixel-text-scale": TEXT_SCALES[d.textScale].value,
    }),
    // Dark is the default when data-mode is missing or the theme has no light mode.
    ...THEME_IDS.map((x) => varRule(`[data-theme="${x}"]`, paletteTokens(x, "dark"))),
    ...THEME_IDS.filter((x) => themeHasMode(x, "light")).map((x) => varRule(`[data-theme="${x}"][data-mode="light"]`, paletteTokens(x, "light"))),
    ...PIXEL_SIZES.map((s) => varRule(`[data-size="${s}"]`, SIZE_TOKENS[s])),
    ...TEXT_SCALE_IDS.map((x) => varRule(`[data-text-scale="${x}"]`, { "pixel-text-scale": TEXT_SCALES[x].value })),
    ...FONT_IDS.map((f) => varRule(`[data-font="${f}"]`, fontVars(f))),
    ...FONT_IDS.filter((f) => !fontHasCaps(f)).flatMap((f) => [varRule(`[data-font="${f}"]`, NO_CAPS_TRACKING), cssRule([`[data-font="${f}"] .uppercase`, NO_CAPS_DECLS])]),
    `@layer components{${layered.map(cssRule).join("")}}`,
    ...unlayered.map(cssRule),
  ].join("\n");
}

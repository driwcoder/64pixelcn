// Single source of truth for pixelcn's design tokens: color presets (light
// and dark), pixel sizes, shading, stepped corners, text scales and fonts.
// Everything else derives from here:
//  - the site's theme CSS (buildThemeCss, injected by app/layout.tsx),
//  - the Display menu and /create options (labels, swatches),
//  - the shadcn registry presets served under /r (lib/preset-registry.ts).
// The only other place font names appear is the next/font loaders in
// app/layout.tsx, which next/font requires to be literal calls.

export type Tokens = Record<string, string>;

export const PRESETS = {
  nintendo: { label: "Nintendo", swatch: "#ff5f6d" },
  gameboy: { label: "GameBoy", swatch: "#8bac0f" },
  neon: { label: "Neon", swatch: "#f0f" },
  sepia: { label: "Sepia", swatch: "#c08552" },
  mono: { label: "Mono", swatch: "#e0e0e0" },
} as const;
export type Preset = keyof typeof PRESETS;

export const MODES = {
  dark: { label: "Dark" },
  light: { label: "Light" },
} as const;
export type Mode = keyof typeof MODES;

/**
 * Full palette for every preset in both modes. Besides the shadcn color
 * tokens each palette carries its pixel-art shading ramp (see SHADINGS):
 *  - shade-hi / shade-hi-2: highlight bands (top-left light source), warm
 *    hue-shifted tints rather than plain white;
 *  - shade-lo / shade-lo-2: shadow bands (bottom-right), cool hue-shifted
 *    tints rather than plain black;
 *  - shade-drop: the extruded side of a block (Extruded shading).
 * GameBoy uses only its 4 DMG shades, opaque, with no second band: the
 * hardware had 4 colors, so its ramps can't have more steps.
 * Contrast of every text/surface pair is checked by tests/contrast.spec.ts.
 */
export const PALETTES: Record<Preset, Record<Mode, Tokens>> = {
  nintendo: {
    dark: {
      background: "oklch(0.09 0.014 285)",
      foreground: "oklch(0.95 0.02 100)",
      card: "oklch(0.13 0.02 285)",
      "card-foreground": "oklch(0.95 0.02 100)",
      popover: "oklch(0.11 0.02 285)",
      "popover-foreground": "oklch(0.95 0.02 100)",
      primary: "oklch(0.78 0.2 355)",
      "primary-foreground": "oklch(0.1 0.02 355)",
      secondary: "oklch(0.25 0.03 285)",
      "secondary-foreground": "oklch(0.95 0.02 100)",
      muted: "oklch(0.2 0.02 285)",
      "muted-foreground": "oklch(0.7 0.02 285)",
      accent: "oklch(0.8 0.18 220)",
      "accent-foreground": "oklch(0.1 0.02 285)",
      destructive: "oklch(0.68 0.22 25)",
      "destructive-foreground": "oklch(0.1 0.02 25)",
      border: "oklch(0.3 0.03 285)",
      input: "oklch(0.48 0.03 285)",
      ring: "oklch(0.78 0.2 355)",
      "shade-hi": "oklch(0.98 0.05 85 / 0.35)",
      "shade-hi-2": "oklch(0.98 0.05 85 / 0.15)",
      "shade-lo": "oklch(0.12 0.08 290 / 0.6)",
      "shade-lo-2": "oklch(0.12 0.08 290 / 0.3)",
      "shade-drop": "oklch(0.38 0.12 300)",
    },
    light: {
      background: "oklch(0.97 0.01 285)",
      foreground: "oklch(0.2 0.03 285)",
      card: "oklch(0.995 0.004 285)",
      "card-foreground": "oklch(0.2 0.03 285)",
      popover: "oklch(0.995 0.004 285)",
      "popover-foreground": "oklch(0.2 0.03 285)",
      primary: "oklch(0.55 0.22 10)",
      "primary-foreground": "oklch(0.99 0.005 10)",
      secondary: "oklch(0.9 0.02 285)",
      "secondary-foreground": "oklch(0.2 0.03 285)",
      muted: "oklch(0.92 0.015 285)",
      "muted-foreground": "oklch(0.45 0.03 285)",
      accent: "oklch(0.5 0.15 240)",
      "accent-foreground": "oklch(0.99 0.005 240)",
      destructive: "oklch(0.52 0.22 25)",
      "destructive-foreground": "oklch(0.99 0.005 25)",
      border: "oklch(0.72 0.03 285)",
      input: "oklch(0.63 0.03 285)",
      ring: "oklch(0.55 0.22 10)",
      "shade-hi": "oklch(1 0.03 90 / 0.7)",
      "shade-hi-2": "oklch(1 0.03 90 / 0.35)",
      "shade-lo": "oklch(0.35 0.1 290 / 0.35)",
      "shade-lo-2": "oklch(0.35 0.1 290 / 0.15)",
      "shade-drop": "oklch(0.72 0.08 300)",
    },
  },
  gameboy: {
    dark: {
      background: "oklch(0.22 0.05 125)",
      foreground: "oklch(0.88 0.08 120)",
      card: "oklch(0.27 0.05 125)",
      "card-foreground": "oklch(0.9 0.08 120)",
      popover: "oklch(0.25 0.05 125)",
      "popover-foreground": "oklch(0.9 0.08 120)",
      primary: "oklch(0.75 0.12 120)",
      "primary-foreground": "oklch(0.18 0.05 125)",
      secondary: "oklch(0.35 0.06 125)",
      "secondary-foreground": "oklch(0.9 0.08 120)",
      muted: "oklch(0.3 0.05 125)",
      "muted-foreground": "oklch(0.74 0.07 120)",
      accent: "oklch(0.62 0.1 120)",
      "accent-foreground": "oklch(0.15 0.04 125)",
      destructive: "oklch(0.68 0.17 25)",
      "destructive-foreground": "oklch(0.15 0.04 125)",
      border: "oklch(0.5 0.08 120)",
      input: "oklch(0.52 0.08 120)",
      ring: "oklch(0.75 0.12 120)",
      "shade-hi": "oklch(0.75 0.12 120)",
      "shade-hi-2": "transparent",
      "shade-lo": "oklch(0.15 0.04 125)",
      "shade-lo-2": "transparent",
      "shade-drop": "oklch(0.35 0.06 125)",
    },
    light: {
      background: "oklch(0.88 0.06 120)",
      foreground: "oklch(0.2 0.05 120)",
      card: "oklch(0.9 0.05 120)",
      "card-foreground": "oklch(0.15 0.04 120)",
      popover: "oklch(0.9 0.05 120)",
      "popover-foreground": "oklch(0.15 0.04 120)",
      primary: "oklch(0.35 0.06 120)",
      "primary-foreground": "oklch(0.9 0.05 120)",
      secondary: "oklch(0.75 0.06 120)",
      "secondary-foreground": "oklch(0.2 0.04 120)",
      muted: "oklch(0.8 0.05 120)",
      "muted-foreground": "oklch(0.4 0.04 120)",
      accent: "oklch(0.45 0.08 120)",
      "accent-foreground": "oklch(0.95 0.04 120)",
      destructive: "oklch(0.5 0.18 25)",
      "destructive-foreground": "oklch(0.95 0.04 120)",
      border: "oklch(0.3 0.05 120)",
      input: "oklch(0.3 0.05 120)",
      ring: "oklch(0.35 0.06 120)",
      "shade-hi": "oklch(0.95 0.06 120)",
      "shade-hi-2": "transparent",
      "shade-lo": "oklch(0.35 0.06 120)",
      "shade-lo-2": "transparent",
      "shade-drop": "oklch(0.35 0.06 120)",
    },
  },
  neon: {
    dark: {
      background: "oklch(0.08 0.03 300)",
      foreground: "oklch(0.92 0.1 300)",
      card: "oklch(0.12 0.05 300)",
      "card-foreground": "oklch(0.92 0.1 300)",
      popover: "oklch(0.11 0.02 285)",
      "popover-foreground": "oklch(0.95 0.02 100)",
      primary: "oklch(0.85 0.25 340)",
      "primary-foreground": "oklch(0.1 0.02 340)",
      secondary: "oklch(0.2 0.08 300)",
      "secondary-foreground": "oklch(0.92 0.1 300)",
      muted: "oklch(0.2 0.02 285)",
      "muted-foreground": "oklch(0.72 0.06 300)",
      accent: "oklch(0.85 0.25 180)",
      "accent-foreground": "oklch(0.1 0.02 300)",
      destructive: "oklch(0.68 0.24 25)",
      "destructive-foreground": "oklch(0.1 0.02 25)",
      border: "oklch(0.4 0.15 300)",
      input: "oklch(0.49 0.15 300)",
      ring: "oklch(0.85 0.25 340)",
      "shade-hi": "oklch(0.85 0.25 340 / 0.55)",
      "shade-hi-2": "oklch(0.85 0.2 180 / 0.25)",
      "shade-lo": "oklch(0.05 0.06 290 / 0.7)",
      "shade-lo-2": "oklch(0.05 0.06 290 / 0.35)",
      "shade-drop": "oklch(0.5 0.25 340)",
    },
    light: {
      background: "oklch(0.96 0.02 320)",
      foreground: "oklch(0.22 0.1 300)",
      card: "oklch(0.99 0.01 320)",
      "card-foreground": "oklch(0.22 0.1 300)",
      popover: "oklch(0.99 0.01 320)",
      "popover-foreground": "oklch(0.22 0.1 300)",
      primary: "oklch(0.55 0.26 340)",
      "primary-foreground": "oklch(0.99 0.01 340)",
      secondary: "oklch(0.88 0.06 300)",
      "secondary-foreground": "oklch(0.22 0.1 300)",
      muted: "oklch(0.92 0.04 310)",
      "muted-foreground": "oklch(0.45 0.1 300)",
      accent: "oklch(0.5 0.13 200)",
      "accent-foreground": "oklch(0.99 0.01 200)",
      destructive: "oklch(0.52 0.22 25)",
      "destructive-foreground": "oklch(0.99 0.01 25)",
      border: "oklch(0.7 0.12 300)",
      input: "oklch(0.64 0.12 300)",
      ring: "oklch(0.55 0.26 340)",
      "shade-hi": "oklch(1 0.05 340 / 0.7)",
      "shade-hi-2": "oklch(1 0.05 200 / 0.35)",
      "shade-lo": "oklch(0.4 0.2 300 / 0.35)",
      "shade-lo-2": "oklch(0.4 0.2 300 / 0.15)",
      "shade-drop": "oklch(0.75 0.15 340)",
    },
  },
  sepia: {
    dark: {
      background: "oklch(0.2 0.03 60)",
      foreground: "oklch(0.9 0.04 75)",
      card: "oklch(0.25 0.035 60)",
      "card-foreground": "oklch(0.9 0.04 75)",
      popover: "oklch(0.23 0.03 60)",
      "popover-foreground": "oklch(0.9 0.04 75)",
      primary: "oklch(0.72 0.12 55)",
      "primary-foreground": "oklch(0.18 0.03 60)",
      secondary: "oklch(0.32 0.04 60)",
      "secondary-foreground": "oklch(0.9 0.04 75)",
      muted: "oklch(0.28 0.03 60)",
      "muted-foreground": "oklch(0.72 0.04 70)",
      accent: "oklch(0.7 0.13 30)",
      "accent-foreground": "oklch(0.15 0.03 60)",
      destructive: "oklch(0.68 0.19 25)",
      "destructive-foreground": "oklch(0.15 0.03 60)",
      border: "oklch(0.45 0.05 60)",
      input: "oklch(0.51 0.05 60)",
      ring: "oklch(0.72 0.12 55)",
      "shade-hi": "oklch(0.95 0.06 85 / 0.3)",
      "shade-hi-2": "oklch(0.95 0.06 85 / 0.12)",
      "shade-lo": "oklch(0.1 0.03 40 / 0.6)",
      "shade-lo-2": "oklch(0.1 0.03 40 / 0.3)",
      "shade-drop": "oklch(0.35 0.06 45)",
    },
    light: {
      background: "oklch(0.9 0.05 60)",
      foreground: "oklch(0.2 0.04 60)",
      card: "oklch(0.88 0.05 60)",
      "card-foreground": "oklch(0.18 0.04 60)",
      popover: "oklch(0.9 0.05 60)",
      "popover-foreground": "oklch(0.2 0.04 60)",
      primary: "oklch(0.48 0.1 30)",
      "primary-foreground": "oklch(0.95 0.03 60)",
      secondary: "oklch(0.8 0.04 60)",
      "secondary-foreground": "oklch(0.2 0.04 60)",
      muted: "oklch(0.85 0.05 60)",
      "muted-foreground": "oklch(0.4 0.04 60)",
      accent: "oklch(0.5 0.12 20)",
      "accent-foreground": "oklch(0.95 0.03 60)",
      destructive: "oklch(0.48 0.2 25)",
      "destructive-foreground": "oklch(0.95 0.03 60)",
      border: "oklch(0.55 0.05 60)",
      input: "oklch(0.55 0.05 60)",
      ring: "oklch(0.48 0.1 30)",
      "shade-hi": "oklch(0.99 0.04 90 / 0.65)",
      "shade-hi-2": "oklch(0.99 0.04 90 / 0.3)",
      "shade-lo": "oklch(0.35 0.07 40 / 0.35)",
      "shade-lo-2": "oklch(0.35 0.07 40 / 0.15)",
      "shade-drop": "oklch(0.6 0.08 45)",
    },
  },
  mono: {
    dark: {
      background: "oklch(0.1 0 0)",
      foreground: "oklch(0.95 0 0)",
      card: "oklch(0.15 0 0)",
      "card-foreground": "oklch(0.95 0 0)",
      popover: "oklch(0.11 0 0)",
      "popover-foreground": "oklch(0.95 0 0)",
      primary: "oklch(0.95 0 0)",
      "primary-foreground": "oklch(0.1 0 0)",
      secondary: "oklch(0.2 0 0)",
      "secondary-foreground": "oklch(0.95 0 0)",
      muted: "oklch(0.18 0 0)",
      "muted-foreground": "oklch(0.68 0 0)",
      accent: "oklch(0.3 0 0)",
      "accent-foreground": "oklch(0.95 0 0)",
      destructive: "oklch(0.68 0.2 25)",
      "destructive-foreground": "oklch(0.1 0 0)",
      border: "oklch(0.35 0 0)",
      input: "oklch(0.48 0 0)",
      ring: "oklch(0.95 0 0)",
      "shade-hi": "oklch(1 0 0 / 0.3)",
      "shade-hi-2": "oklch(1 0 0 / 0.12)",
      "shade-lo": "oklch(0 0 0 / 0.6)",
      "shade-lo-2": "oklch(0 0 0 / 0.3)",
      "shade-drop": "oklch(0.4 0 0)",
    },
    light: {
      background: "oklch(0.97 0 0)",
      foreground: "oklch(0.15 0 0)",
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.15 0 0)",
      popover: "oklch(1 0 0)",
      "popover-foreground": "oklch(0.15 0 0)",
      primary: "oklch(0.15 0 0)",
      "primary-foreground": "oklch(0.97 0 0)",
      secondary: "oklch(0.9 0 0)",
      "secondary-foreground": "oklch(0.15 0 0)",
      muted: "oklch(0.93 0 0)",
      "muted-foreground": "oklch(0.42 0 0)",
      accent: "oklch(0.85 0 0)",
      "accent-foreground": "oklch(0.15 0 0)",
      destructive: "oklch(0.5 0.2 25)",
      "destructive-foreground": "oklch(0.99 0 0)",
      border: "oklch(0.7 0 0)",
      input: "oklch(0.63 0 0)",
      ring: "oklch(0.15 0 0)",
      "shade-hi": "oklch(1 0 0 / 0.8)",
      "shade-hi-2": "oklch(1 0 0 / 0.4)",
      "shade-lo": "oklch(0 0 0 / 0.25)",
      "shade-lo-2": "oklch(0 0 0 / 0.1)",
      "shade-drop": "oklch(0.75 0 0)",
    },
  },
};

/** Chart colors are shared by every palette. */
export const CHART_COLORS: Tokens = {
  "chart-1": "oklch(0.7 0.2 35)",
  "chart-2": "oklch(0.7 0.2 200)",
  "chart-3": "oklch(0.7 0.2 120)",
  "chart-4": "oklch(0.7 0.2 300)",
  "chart-5": "oklch(0.7 0.2 60)",
};

/** Every color token for a preset in a mode. */
export function paletteTokens(preset: Preset, mode: Mode): Tokens {
  return { ...PALETTES[preset][mode], ...CHART_COLORS };
}

export const PIXEL_SIZES = [8, 16, 32, 64, 128] as const;
export type PixelSize = (typeof PIXEL_SIZES)[number];

/**
 * Per pixel size ("8x" is a low-res sprite, "128x" a high-res one):
 *  - pixel-shadow-offset: hard drop-shadow offset;
 *  - pixel-corner: one step of a stepped (rounded) corner. Always equal to the
 *    offset, so corners and shadow share one pixel grid (see
 *    roundedCornerDecls); never below the 2px component border;
 *  - pixel-bevel: highlight/shadow bands. Low-res sprites only have room for
 *    a 2-tone ramp (1 band each side); from 32x up there's room for a 4-tone
 *    ramp (2 bands each side).
 */
const bevel = (unit: string, bands: 1 | 2) => {
  const band = (n: number, hi: string, lo: string) =>
    `inset calc(${unit} * ${n}) calc(${unit} * ${n}) 0 0 var(${hi}), inset calc(${unit} * ${-n}) calc(${unit} * ${-n}) 0 0 var(${lo})`;
  return bands === 1 ? band(1, "--shade-hi", "--shade-lo") : `${band(1, "--shade-hi", "--shade-lo")}, ${band(2, "--shade-hi-2", "--shade-lo-2")}`;
};

export const SIZE_TOKENS: Record<PixelSize, Tokens> = {
  128: { "pixel-size": "8px", "pixel-border": "4px", "pixel-shadow-offset": "4px", "pixel-corner": "4px", "pixel-bevel": bevel("2px", 2) },
  64: { "pixel-size": "4px", "pixel-border": "3px", "pixel-shadow-offset": "3px", "pixel-corner": "3px", "pixel-bevel": bevel("2px", 2) },
  32: { "pixel-size": "2px", "pixel-border": "2px", "pixel-shadow-offset": "2px", "pixel-corner": "2px", "pixel-bevel": bevel("1px", 2) },
  16: { "pixel-size": "1px", "pixel-border": "1px", "pixel-shadow-offset": "2px", "pixel-corner": "2px", "pixel-bevel": bevel("1px", 1) },
  8: { "pixel-size": "0.5px", "pixel-border": "1px", "pixel-shadow-offset": "2px", "pixel-corner": "2px", "pixel-bevel": bevel("1px", 1) },
};

/**
 * Pixel-art shading styles. The light source is top-left, as in most 2D
 * games; shadows are hard (no blur) and offset by whole pixels.
 * `reach` is how far the shadow extends past the box, in offsets; stepped
 * corners clip to it. `drop` is the shadow color right behind the box.
 */
const OFFSET = "var(--pixel-shadow-offset)";
export const SHADINGS = {
  flat: { label: "Flat", shadow: "0 0 #0000", reach: 0, drop: "transparent" },
  hard: { label: "Hard drop", shadow: `${OFFSET} ${OFFSET} 0 0 var(--foreground)`, reach: 1, drop: "var(--foreground)" },
  bevel: { label: "Bevel", shadow: `var(--pixel-bevel), ${OFFSET} ${OFFSET} 0 0 var(--foreground)`, reach: 1, drop: "var(--foreground)" },
  deep: {
    label: "Extruded",
    shadow: `var(--pixel-bevel), ${OFFSET} ${OFFSET} 0 0 var(--shade-drop), calc(${OFFSET} * 2) calc(${OFFSET} * 2) 0 0 var(--foreground)`,
    reach: 2,
    drop: "var(--shade-drop)",
  },
} as const;
export type Shading = keyof typeof SHADINGS;

/** Stepped corners: number of 1-step stairs cut from each corner. */
export const RADII = {
  none: { label: "Square", steps: 0 },
  sm: { label: "Notched", steps: 1 },
  md: { label: "Rounded", steps: 2 },
  lg: { label: "Round", steps: 3 },
} as const;
export type Radius = keyof typeof RADII;

export const TEXT_SCALES = {
  xs: { label: "XS", value: "0.8" },
  sm: { label: "Small", value: "0.9" },
  md: { label: "Medium", value: "1" },
  lg: { label: "Large", value: "1.15" },
  xl: { label: "XL", value: "1.3" },
} as const;
export type TextScale = keyof typeof TEXT_SCALES;

export interface FontSpec {
  label: string;
  /** CSS variable set by the next/font loader in app/layout.tsx. */
  cssVar?: string;
  /** Google Fonts family + next/font import name, used by the registry. */
  google?: { family: string; import: string; subsets: string[] };
  fallback: string;
  /**
   * font-size-adjust value that normalizes the visual size across fonts.
   * Measured cap-height / advance (em): Press Start 2P 1.00/1.00, VT323
   * 0.56/0.40, Silkscreen 0.63/0.73, Pixelify 0.63/0.56, DotGothic16
   * 0.82/0.50, Jacquard 12 0.58/0.40, Jacquard 24 0.59/0.38, Handjet
   * 0.65/0.40, system mono 0.70/0.59.
   */
  adjust: string;
}

export const FONTS = {
  "press-start": { label: "Press Start 2P", cssVar: "--font-press-start", google: { family: "Press Start 2P", import: "Press_Start_2P", subsets: ["latin"] }, fallback: "monospace", adjust: "cap-height 0.72" },
  vt323: { label: "VT323", cssVar: "--font-vt323", google: { family: "VT323", import: "VT323", subsets: ["latin"] }, fallback: "monospace", adjust: "cap-height 0.7" },
  silkscreen: { label: "Silkscreen", cssVar: "--font-silkscreen", google: { family: "Silkscreen", import: "Silkscreen", subsets: ["latin"] }, fallback: "monospace", adjust: "none" },
  pixelify: { label: "Pixelify Sans", cssVar: "--font-pixelify", google: { family: "Pixelify Sans", import: "Pixelify_Sans", subsets: ["latin"] }, fallback: "monospace", adjust: "cap-height 0.68" },
  dotgothic: { label: "DotGothic16", cssVar: "--font-dotgothic", google: { family: "DotGothic16", import: "DotGothic16", subsets: ["latin", "latin-ext"] }, fallback: "monospace", adjust: "cap-height 0.7" },
  jacquard: { label: "Jacquard 12", cssVar: "--font-jacquard", google: { family: "Jacquard 12", import: "Jacquard_12", subsets: ["latin", "latin-ext"] }, fallback: "serif", adjust: "cap-height 0.72" },
  jacquard24: { label: "Jacquard 24", cssVar: "--font-jacquard24", google: { family: "Jacquard 24", import: "Jacquard_24", subsets: ["latin", "latin-ext"] }, fallback: "serif", adjust: "cap-height 0.72" },
  handjet: { label: "Handjet", cssVar: "--font-handjet", google: { family: "Handjet", import: "Handjet", subsets: ["latin", "latin-ext"] }, fallback: "monospace", adjust: "cap-height 0.7" },
  system: { label: "System Mono", fallback: 'ui-monospace, "Cascadia Code", "Courier New", monospace', adjust: "none" },
} satisfies Record<string, FontSpec>;
export type PixelFont = keyof typeof FONTS;

export const ICON_SETS = {
  pixelarticons: { label: "Pixelarticons", attribution: "pixelarticons by Gerrit Halfmann (MIT)", url: "https://pixelarticons.com" },
  hackernoon: {
    label: "HackerNoon Pixel",
    attribution: "Pixel Icon Library by HackerNoon (CC BY 4.0)",
    url: "https://pixeliconlibrary.com",
  },
  lucide: { label: "Lucide (vector)", attribution: "Lucide (ISC)", url: "https://lucide.dev" },
} as const;
export type IconSet = keyof typeof ICON_SETS;

export const PRESET_IDS = Object.keys(PRESETS) as Preset[];
export const MODE_IDS = Object.keys(MODES) as Mode[];
export const ICON_SET_IDS = Object.keys(ICON_SETS) as IconSet[];
export const FONT_IDS = Object.keys(FONTS) as PixelFont[];
export const TEXT_SCALE_IDS = Object.keys(TEXT_SCALES) as TextScale[];
export const RADIUS_IDS = Object.keys(RADII) as Radius[];
export const SHADING_IDS = Object.keys(SHADINGS) as Shading[];

export interface Appearance {
  preset: Preset;
  mode: Mode;
  font: PixelFont;
  size: PixelSize;
  textScale: TextScale;
  icons: IconSet;
  radius: Radius;
  shading: Shading;
}

export const DEFAULT_APPEARANCE: Appearance = {
  preset: "nintendo",
  mode: "dark",
  font: "silkscreen",
  size: 64,
  textScale: "md",
  icons: "pixelarticons",
  radius: "none",
  shading: "hard",
};

/** Allowed values of every Appearance field (validation, selects, codes). */
export const APPEARANCE_VALUES: { [K in keyof Appearance]: readonly Appearance[K][] } = {
  preset: PRESET_IDS,
  mode: MODE_IDS,
  font: FONT_IDS,
  size: PIXEL_SIZES,
  textScale: TEXT_SCALE_IDS,
  icons: ICON_SET_IDS,
  radius: RADIUS_IDS,
  shading: SHADING_IDS,
};

/** <html> attribute that carries each Appearance field. */
export const APPEARANCE_ATTRS: { [K in keyof Appearance]: string } = {
  preset: "data-preset",
  mode: "data-mode",
  font: "data-font",
  size: "data-size",
  textScale: "data-text-scale",
  icons: "data-icons",
  radius: "data-radius",
  shading: "data-shading",
};

/** CSS value of --pixel-font for a font, given the variable holding the family. */
export function fontFamily(font: PixelFont, familyVar?: string) {
  const spec: FontSpec = FONTS[font];
  const v = familyVar ?? spec.cssVar;
  return v && spec.google ? `var(${v}), ${spec.fallback}` : spec.fallback;
}

export function shadingTokens(shading: Shading): Tokens {
  const { shadow, reach, drop } = SHADINGS[shading];
  return { "pixel-shadow": shadow, "pixel-shadow-reach": `calc(var(--pixel-shadow-offset) * ${reach})`, "pixel-drop-color": drop };
}

export type CssDecls = Record<string, string>;

/** Most shadow reach (in steps) any shading has; sizes the corner polygons. */
const MAX_REACH = Math.max(...Object.values(SHADINGS).map((x) => x.reach));

/**
 * Declarations that give `.pixel-rounded` elements stepped (pixel-art)
 * corners of `steps` stairs. One stair step is one shadow offset
 * (--pixel-corner), so the corners and the drop shadow sit on the same pixel
 * grid: a shadow `n` steps away just extends the top-right and bottom-left
 * stairs by `n` steps, and the shadow's bottom-right corner is the box's
 * stair moved out.
 *  - clip-path: that staircase outline. Its point count is fixed (enough for
 *    the largest reach), extra points collapse onto the last one via min();
 *  - background layers: the border pixels on the inner diagonal of each stair
 *    (the CSS border itself stays straight), in --pixel-corner-color, and the
 *    box's cut-away bottom-right pixels that the shadow shows through, in
 *    --pixel-corner-shadow.
 */
export function roundedCornerDecls(steps: number): CssDecls | null {
  if (steps === 0) return null;
  const k = steps;
  const s = "var(--pixel-corner)";
  const r = "var(--pixel-reach, 0px)";
  const b = "var(--pixel-corner-border, 2px)";
  const m = (n: number) => (n === 0 ? "0px" : `${s} * ${n}`);
  const c = (expr: string) => `calc(${expr})`;
  const minc = (a: string, z: string) => `min(${a}, ${z})`;
  const pts: [string, string][] = [];
  // Top-left: the box's stair.
  pts.push(["0px", c(m(k))]);
  for (let i = k - 1; i >= 0; i--) pts.push([c(m(k - i)), c(m(i + 1))], [c(m(k - i)), c(m(i))]);
  // Top-right: one stair from the box's top edge to the shadow's right edge.
  const xEnd = c(`100% + ${r}`);
  const yEnd = c(`${m(k)} + ${r}`);
  for (let j = 0; j < k + MAX_REACH; j++) {
    const x0 = minc(c(`100% - ${m(k)} + ${m(j)}`), xEnd);
    const x1 = minc(c(`100% - ${m(k)} + ${m(j + 1)}`), xEnd);
    pts.push([x0, minc(c(m(j)), yEnd)], [x0, minc(c(m(j + 1)), yEnd)], [x1, minc(c(m(j + 1)), yEnd)]);
  }
  // Bottom-right: the box's stair moved out with the shadow.
  pts.push([xEnd, c(`100% + ${r} - ${m(k)}`)]);
  for (let i = k - 1; i >= 0; i--) {
    pts.push([c(`100% + ${r} - ${m(k - i)}`), c(`100% + ${r} - ${m(i + 1)}`)], [c(`100% + ${r} - ${m(k - i)}`), c(`100% + ${r} - ${m(i)}`)]);
  }
  // Bottom-left: the top-right mirrored across the diagonal, walked backwards.
  const bl: [string, string][] = [];
  for (let j = 0; j < k + MAX_REACH; j++) {
    const y0 = minc(c(`100% - ${m(k)} + ${m(j)}`), c(`100% + ${r}`));
    const y1 = minc(c(`100% - ${m(k)} + ${m(j + 1)}`), c(`100% + ${r}`));
    bl.push([minc(c(m(j)), yEnd), y0], [minc(c(m(j + 1)), yEnd), y0], [minc(c(m(j + 1)), yEnd), y1]);
  }
  pts.push(...bl.reverse());

  // Layers in top-left coordinates, mirrored to the other corners.
  type Layer = { x: string; y: string; w: string; h: string; color: string };
  const edge = "var(--pixel-corner-color, var(--foreground))";
  const stair: Layer[] = [];
  for (let i = 0; i < k; i++) stair.push({ x: c(m(k - i)), y: c(m(i)), w: b, h: s, color: edge }); // risers
  for (let i = 1; i <= k; i++) stair.push({ x: c(m(k - i)), y: c(m(i)), w: s, h: b, color: edge }); // treads
  const all = (["left", "right"] as const).flatMap((h) =>
    (["top", "bottom"] as const).flatMap((v) => stair.map((l) => ({ ...l, pos: `${h} ${l.x} ${v} ${l.y}` })))
  );
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

/**
 * Per-element corner variables must not inherit: a rounded button inside a
 * rounded card would otherwise get the card's shadow reach and colors.
 */
export const NON_INHERITED_VARS = ["--pixel-reach", "--pixel-corner-shadow", "--pixel-corner-color"] as const;
export const PROPERTY_RULES = NON_INHERITED_VARS.map((name) => `@property ${name}{syntax:"*";inherits:false;}`).join("\n");

/** A `.pixel-shadow` element's clip makes room for its shadow. */
export const ROUNDED_SHADOW_DECLS: CssDecls = {
  "--pixel-reach": "var(--pixel-shadow-reach)",
  "--pixel-corner-shadow": "var(--pixel-drop-color)",
};

/** Pressed buttons drop their shadow (active:shadow-none), so the clip does too. */
export const ROUNDED_PRESSED_DECLS: CssDecls = {
  "--pixel-reach": "0px",
  "--pixel-corner-shadow": "transparent",
};

/** Focus ring drawn inside the box, since stepped corners clip outer rings. */
export const ROUNDED_FOCUS_DECLS: CssDecls = {
  "--tw-ring-shadow": "0 0 #0000",
  "--tw-ring-offset-shadow": "0 0 #0000",
  outline: "2px solid var(--ring)",
  "outline-offset": "calc(-2px - var(--pixel-corner-border, 2px))",
};

/** Selectors (relative to the radius scope) and declarations for a radius. */
export function roundedRules(radius: Radius): [selector: string, decls: CssDecls][] {
  const decls = roundedCornerDecls(RADII[radius].steps);
  if (!decls) return [];
  return [
    [".pixel-rounded", decls],
    [".pixel-rounded.pixel-shadow", ROUNDED_SHADOW_DECLS],
    ['.pixel-rounded.pixel-shadow[class*="active:shadow-none"]:active', ROUNDED_PRESSED_DECLS],
    [".pixel-rounded:focus-visible", ROUNDED_FOCUS_DECLS],
  ];
}

function rule(selector: string, vars: Tokens) {
  const body = Object.entries(vars).map(([k, v]) => `--${k}:${v};`).join("");
  return `${selector}{${body}}`;
}

function declRule(selector: string, decls: CssDecls) {
  return `${selector}{${Object.entries(decls).map(([k, v]) => `${k}:${v};`).join("")}}`;
}

/**
 * Theme CSS for the site: :root defaults plus one rule per value of every
 * Appearance attribute on <html> ([data-preset][data-mode], [data-size]...).
 */
export function buildThemeCss() {
  const d = DEFAULT_APPEARANCE;
  const fontVars = (f: PixelFont) => ({ "pixel-font": fontFamily(f), "pixel-font-adjust": FONTS[f].adjust });
  return [
    PROPERTY_RULES,
    rule(":root", {
      radius: "0px",
      ...paletteTokens(d.preset, d.mode),
      ...SIZE_TOKENS[d.size],
      ...shadingTokens(d.shading),
      ...fontVars(d.font),
      "pixel-text-scale": TEXT_SCALES[d.textScale].value,
    }),
    // A preset without data-mode (older saved settings) gets its dark palette.
    ...PRESET_IDS.map((p) => rule(`[data-preset="${p}"]`, paletteTokens(p, "dark"))),
    ...PRESET_IDS.map((p) => rule(`[data-preset="${p}"][data-mode="light"]`, paletteTokens(p, "light"))),
    ...PIXEL_SIZES.map((s) => rule(`[data-size="${s}"]`, SIZE_TOKENS[s])),
    ...TEXT_SCALE_IDS.map((t) => rule(`[data-text-scale="${t}"]`, { "pixel-text-scale": TEXT_SCALES[t].value })),
    ...FONT_IDS.map((f) => rule(`[data-font="${f}"]`, fontVars(f))),
    ...SHADING_IDS.map((s) => rule(`[data-shading="${s}"]`, shadingTokens(s))),
    ...RADIUS_IDS.flatMap((id) => roundedRules(id).map(([sel, decls]) => declRule(`[data-radius="${id}"] ${sel}`, decls))),
  ].join("\n");
}

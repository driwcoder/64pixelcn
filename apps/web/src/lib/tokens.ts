// Single source of truth for pixelcn's design tokens: color presets, pixel
// sizes, text scales and fonts. Everything else derives from here:
//  - the site's theme CSS (buildThemeCss, injected by app/layout.tsx),
//  - the Display menu and /create options (labels, swatches),
//  - the shadcn registry presets served under /r (lib/preset-registry.ts).
// The only other place font names appear is the next/font loaders in
// app/layout.tsx, which next/font requires to be literal calls.

export type Tokens = Record<string, string>;

export const BASE_COLORS: Tokens = {
  background: "oklch(0.09 0.014 285)",
  foreground: "oklch(0.95 0.02 100)",
  card: "oklch(0.13 0.02 285)",
  "card-foreground": "oklch(0.95 0.02 100)",
  popover: "oklch(0.11 0.02 285)",
  "popover-foreground": "oklch(0.95 0.02 100)",
  primary: "oklch(0.75 0.18 35)",
  "primary-foreground": "oklch(0.15 0.02 35)",
  secondary: "oklch(0.25 0.03 285)",
  "secondary-foreground": "oklch(0.95 0.02 100)",
  muted: "oklch(0.2 0.02 285)",
  "muted-foreground": "oklch(0.65 0.02 285)",
  accent: "oklch(0.8 0.15 200)",
  "accent-foreground": "oklch(0.15 0.02 285)",
  destructive: "oklch(0.6 0.22 25)",
  "destructive-foreground": "oklch(0.95 0.02 25)",
  border: "oklch(0.3 0.03 285)",
  input: "oklch(0.3 0.03 285)",
  ring: "oklch(0.75 0.18 35)",
  "chart-1": "oklch(0.7 0.2 35)",
  "chart-2": "oklch(0.7 0.2 200)",
  "chart-3": "oklch(0.7 0.2 120)",
  "chart-4": "oklch(0.7 0.2 300)",
  "chart-5": "oklch(0.7 0.2 60)",
};

export const PRESETS = {
  nintendo: { label: "Nintendo", swatch: "#ff5f6d" },
  gameboy: { label: "GameBoy", swatch: "#8bac0f" },
  neon: { label: "Neon", swatch: "#f0f" },
  sepia: { label: "Sepia", swatch: "#c08552" },
  mono: { label: "Mono", swatch: "#e0e0e0" },
} as const;
export type Preset = keyof typeof PRESETS;

/** Overrides on top of BASE_COLORS for each preset. */
export const PRESET_COLORS: Record<Preset, Tokens> = {
  nintendo: {
    primary: "oklch(0.78 0.2 355)",
    "primary-foreground": "oklch(0.1 0.02 355)",
    accent: "oklch(0.8 0.18 220)",
    "accent-foreground": "oklch(0.1 0.02 285)",
    ring: "oklch(0.78 0.2 355)",
  },
  gameboy: {
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
    "muted-foreground": "oklch(0.45 0.04 120)",
    accent: "oklch(0.5 0.08 120)",
    "accent-foreground": "oklch(0.95 0.04 120)",
    destructive: "oklch(0.55 0.18 25)",
    "destructive-foreground": "oklch(0.95 0.04 120)",
    border: "oklch(0.3 0.05 120)",
    input: "oklch(0.3 0.05 120)",
    ring: "oklch(0.35 0.06 120)",
  },
  neon: {
    background: "oklch(0.08 0.03 300)",
    foreground: "oklch(0.92 0.1 300)",
    card: "oklch(0.12 0.05 300)",
    "card-foreground": "oklch(0.92 0.1 300)",
    primary: "oklch(0.85 0.25 340)",
    "primary-foreground": "oklch(0.1 0.02 340)",
    secondary: "oklch(0.2 0.08 300)",
    "secondary-foreground": "oklch(0.92 0.1 300)",
    accent: "oklch(0.85 0.25 180)",
    "accent-foreground": "oklch(0.1 0.02 300)",
    border: "oklch(0.4 0.15 300)",
    input: "oklch(0.4 0.15 300)",
    ring: "oklch(0.85 0.25 340)",
  },
  sepia: {
    background: "oklch(0.9 0.05 60)",
    foreground: "oklch(0.2 0.04 60)",
    card: "oklch(0.88 0.05 60)",
    "card-foreground": "oklch(0.18 0.04 60)",
    popover: "oklch(0.9 0.05 60)",
    "popover-foreground": "oklch(0.2 0.04 60)",
    primary: "oklch(0.5 0.1 30)",
    "primary-foreground": "oklch(0.95 0.03 60)",
    secondary: "oklch(0.8 0.04 60)",
    "secondary-foreground": "oklch(0.2 0.04 60)",
    muted: "oklch(0.85 0.05 60)",
    "muted-foreground": "oklch(0.42 0.04 60)",
    accent: "oklch(0.6 0.12 20)",
    "accent-foreground": "oklch(0.95 0.03 60)",
    destructive: "oklch(0.55 0.2 25)",
    "destructive-foreground": "oklch(0.95 0.03 60)",
    border: "oklch(0.7 0.04 60)",
    input: "oklch(0.7 0.04 60)",
    ring: "oklch(0.5 0.1 30)",
  },
  mono: {
    background: "oklch(0.1 0 0)",
    foreground: "oklch(0.95 0 0)",
    card: "oklch(0.15 0 0)",
    "card-foreground": "oklch(0.95 0 0)",
    primary: "oklch(0.95 0 0)",
    "primary-foreground": "oklch(0.1 0 0)",
    secondary: "oklch(0.2 0 0)",
    "secondary-foreground": "oklch(0.95 0 0)",
    muted: "oklch(0.18 0 0)",
    "muted-foreground": "oklch(0.6 0 0)",
    accent: "oklch(0.3 0 0)",
    "accent-foreground": "oklch(0.95 0 0)",
    border: "oklch(0.35 0 0)",
    input: "oklch(0.35 0 0)",
    ring: "oklch(0.95 0 0)",
  },
};

export const PIXEL_SIZES = [8, 16, 32, 64, 128] as const;
export type PixelSize = (typeof PIXEL_SIZES)[number];

export const SIZE_TOKENS: Record<PixelSize, Tokens> = {
  128: { "pixel-size": "8px", "pixel-border": "4px", "pixel-shadow": "4px 4px 0px var(--foreground)" },
  64: { "pixel-size": "4px", "pixel-border": "3px", "pixel-shadow": "3px 3px 0px var(--foreground)" },
  32: { "pixel-size": "2px", "pixel-border": "2px", "pixel-shadow": "2px 2px 0px var(--foreground)" },
  16: { "pixel-size": "1px", "pixel-border": "1px", "pixel-shadow": "1px 1px 0px var(--foreground)" },
  8: { "pixel-size": "0.5px", "pixel-border": "1px", "pixel-shadow": "1px 1px 0px var(--foreground)" },
};

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
export const ICON_SET_IDS = Object.keys(ICON_SETS) as IconSet[];
export const FONT_IDS = Object.keys(FONTS) as PixelFont[];
export const TEXT_SCALE_IDS = Object.keys(TEXT_SCALES) as TextScale[];

export interface Appearance {
  preset: Preset;
  font: PixelFont;
  size: PixelSize;
  textScale: TextScale;
  icons: IconSet;
}

export const DEFAULT_APPEARANCE: Appearance = {
  preset: "nintendo",
  font: "silkscreen",
  size: 64,
  textScale: "md",
  icons: "pixelarticons",
};

/** CSS value of --pixel-font for a font, given the variable holding the family. */
export function fontFamily(font: PixelFont, familyVar?: string) {
  const spec: FontSpec = FONTS[font];
  const v = familyVar ?? spec.cssVar;
  return v && spec.google ? `var(${v}), ${spec.fallback}` : spec.fallback;
}

function rule(selector: string, vars: Tokens) {
  const body = Object.entries(vars).map(([k, v]) => `--${k}:${v};`).join("");
  return `${selector}{${body}}`;
}

/**
 * Theme CSS for the site: :root defaults plus one rule per
 * [data-preset] / [data-size] / [data-text-scale] / [data-font] value.
 */
export function buildThemeCss() {
  const d = DEFAULT_APPEARANCE;
  const fontVars = (f: PixelFont) => ({ "pixel-font": fontFamily(f), "pixel-font-adjust": FONTS[f].adjust });
  return [
    rule(":root", {
      radius: "0px",
      ...BASE_COLORS,
      ...PRESET_COLORS[d.preset],
      ...SIZE_TOKENS[d.size],
      ...fontVars(d.font),
      "pixel-text-scale": TEXT_SCALES[d.textScale].value,
    }),
    ...PRESET_IDS.map((p) => rule(`[data-preset="${p}"]`, { ...BASE_COLORS, ...PRESET_COLORS[p] })),
    ...PIXEL_SIZES.map((s) => rule(`[data-size="${s}"]`, SIZE_TOKENS[s])),
    ...TEXT_SCALE_IDS.map((t) => rule(`[data-text-scale="${t}"]`, { "pixel-text-scale": TEXT_SCALES[t].value })),
    ...FONT_IDS.map((f) => rule(`[data-font="${f}"]`, fontVars(f))),
  ].join("\n");
}


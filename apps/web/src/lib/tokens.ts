// Single source of truth for pixelcn's design tokens: color themes (light
// and dark), pixel sizes, shading, stepped corners, text scales and fonts.
// Everything else derives from here:
//  - the site's theme CSS (buildThemeCss, injected by app/layout.tsx),
//  - the Display menu and /create options (labels, swatches),
//  - the shadcn registry presets served under /r (lib/preset-registry.ts).
// The only other place font names appear is app/fonts.css, the @font-face
// rules for the self-hosted font files in public/fonts.

// Relative .ts imports: scripts/icons.mjs loads this file with plain Node.
import { LOSPEC_PALETTES, type LospecPalette } from "./palettes.ts";
import { TONES, paletteThemeTokens } from "./palette-theme.ts";

export type Tokens = Record<string, string>;

/** Hand-tuned themes (oklch, procedural shading ramps). */
export const CLASSIC_THEMES = {
  nintendo: { label: "Nintendo", swatch: "#ff5f6d" },
  gameboy: { label: "GameBoy", swatch: "#8bac0f" },
  neon: { label: "Neon", swatch: "#f0f" },
  sepia: { label: "Sepia", swatch: "#c08552" },
  mono: { label: "Mono", swatch: "#e0e0e0" },
} as const;
export type ClassicTheme = keyof typeof CLASSIC_THEMES;
export type Theme = ClassicTheme | LospecPalette;

const LOSPEC_IDS = Object.keys(LOSPEC_PALETTES) as LospecPalette[];
const isLospec = (theme: Theme): theme is LospecPalette => theme in LOSPEC_PALETTES;

/** Lospec palette themes, generated from the palette's colors only (lib/palette-theme.ts). */
const lospecTokens = new Map<string, Tokens | null>();
function lospecThemeTokens(theme: LospecPalette, mode: "dark" | "light"): Tokens | null {
  const key = `${theme}:${mode}`;
  if (!lospecTokens.has(key)) lospecTokens.set(key, paletteThemeTokens([...LOSPEC_PALETTES[theme].colors], mode));
  return lospecTokens.get(key)!;
}

export const THEMES: Record<Theme, { label: string; swatch: string; palette?: { url: string; colors: readonly string[] } }> = {
  ...CLASSIC_THEMES,
  ...(Object.fromEntries(
    LOSPEC_IDS.map((id) => {
      const p = LOSPEC_PALETTES[id];
      return [id, { label: p.label, swatch: lospecThemeTokens(id, "dark")!.primary, palette: { url: p.url, colors: p.colors } }];
    })
  ) as unknown as Record<LospecPalette, { label: string; swatch: string; palette: { url: string; colors: readonly string[] } }>),
};

export const MODES = {
  dark: { label: "Dark" },
  light: { label: "Light" },
} as const;
export type Mode = keyof typeof MODES;

/**
 * Colors of the classic themes in both modes. Their shading ramps are mixed
 * from these (proceduralRamps), except GameBoy's, which stay within its 4
 * DMG shades. Contrast of every text/surface pair is checked by
 * tests/contrast.spec.ts.
 */
export const PALETTES: Record<ClassicTheme, Record<Mode, Tokens>> = {
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

/**
 * Shading ramps for the classic themes, which aren't limited to a palette:
 * each step mixes the fill toward a warm light (highlights) or a cool dark
 * (shadows), the hue-shifted ramp a pixel artist would pick by hand.
 */
const TONE_FILL: Record<string, string> = { surface: "card", primary: "primary", secondary: "secondary", accent: "accent", destructive: "destructive" };
/** GameBoy: every ramp steps through the 4 DMG shades only, like the hardware. */
const GAMEBOY_SHADES = {
  dark: ["oklch(0.15 0.04 125)", "oklch(0.35 0.06 125)", "oklch(0.62 0.1 120)", "oklch(0.75 0.12 120)"],
  light: ["oklch(0.2 0.05 120)", "oklch(0.35 0.06 120)", "oklch(0.75 0.06 120)", "oklch(0.95 0.06 120)"],
};
function gameboyRamps(mode: Mode): Tokens {
  const [d0, d1, , l3] = GAMEBOY_SHADES[mode];
  const out: Tokens = {};
  for (const tone of TONES) {
    for (let k = 1; k <= 3; k++) {
      out[`${tone}-hi-${k}`] = l3;
      out[`${tone}-lo-${k}`] = k === 1 ? d1 : d0;
    }
    out[`${tone}-outline`] = d0;
  }
  return out;
}

export function proceduralRamps(): Tokens {
  const light = "oklch(0.97 0.06 85)";
  const dark = "oklch(0.13 0.07 285)";
  const out: Tokens = {};
  for (const tone of TONES) {
    const fill = `var(--${TONE_FILL[tone]})`;
    for (let k = 1; k <= 3; k++) {
      out[`${tone}-hi-${k}`] = `color-mix(in oklab, ${fill}, ${light} ${k * 18}%)`;
      out[`${tone}-lo-${k}`] = `color-mix(in oklab, ${fill}, ${dark} ${k * 20}%)`;
    }
    out[`${tone}-outline`] = `color-mix(in oklab, ${fill}, ${dark} 55%)`;
  }
  return out;
}

/** False when a theme has no colors for the mode (it then uses its dark mode). */
export function themeHasMode(theme: Theme, mode: Mode): boolean {
  return !isLospec(theme) || lospecThemeTokens(theme, mode) !== null;
}

/** Every color token (roles, charts, shading ramps) for a theme in a mode. */
export function paletteTokens(theme: Theme, mode: Mode): Tokens {
  if (isLospec(theme)) return (lospecThemeTokens(theme, mode) ?? lospecThemeTokens(theme, "dark"))!;
  const ramps = theme === "gameboy" ? gameboyRamps(mode) : proceduralRamps();
  return { ...PALETTES[theme][mode], ...CHART_COLORS, ...ramps };
}

export const PIXEL_SIZES = [8, 16, 32, 64, 128] as const;
export type PixelSize = (typeof PIXEL_SIZES)[number];

/**
 * Per pixel size ("8x" is a low-res sprite, "128x" a high-res one):
 *  - pixel-line: component border width (border-[length:var(--pixel-line,2px)]),
 *    thin on low-res sprites and chunky on high-res ones;
 *  - pixel-shadow-offset: hard drop-shadow offset;
 *  - pixel-corner: one step of a stepped (rounded) corner. Always equal to the
 *    offset, so corners and shadow share one pixel grid (see
 *    roundedCornerDecls); never thinner than the border (pixel-line);
 * Shading bands per size are in lib/pixel-engine.ts (BANDS).
 */
export const SIZE_TOKENS: Record<PixelSize, Tokens> = {
  128: { "pixel-size": "8px", "pixel-border": "4px", "pixel-line": "3px", "pixel-shadow-offset": "4px", "pixel-corner": "4px" },
  64: { "pixel-size": "4px", "pixel-border": "3px", "pixel-line": "2px", "pixel-shadow-offset": "3px", "pixel-corner": "3px" },
  32: { "pixel-size": "2px", "pixel-border": "2px", "pixel-line": "2px", "pixel-shadow-offset": "2px", "pixel-corner": "2px" },
  16: { "pixel-size": "1px", "pixel-border": "1px", "pixel-line": "1px", "pixel-shadow-offset": "2px", "pixel-corner": "2px" },
  8: { "pixel-size": "0.5px", "pixel-border": "1px", "pixel-line": "1px", "pixel-shadow-offset": "2px", "pixel-corner": "2px" },
};

/**
 * Pixel-art shading styles (drawn by lib/pixel-engine.ts). The light comes
 * from the top-left (Top-lit: from above); shadows are hard and offset by
 * whole pixels. `reach` is how far the shadow extends past the box, in
 * offsets; stepped corners clip to it.
 */
export const SHADINGS = {
  flat: { label: "Flat", reach: 0 },
  hard: { label: "Hard drop", reach: 1 },
  bevel: { label: "Bevel", reach: 1 },
  deep: { label: "Extruded", reach: 2 },
  toplit: { label: "Top-lit", reach: 1 },
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

/** Outline styles (lib/pixel-engine.ts). */
export const BORDERS = {
  solid: { label: "Solid" },
  selout: { label: "Selout" },
  frame: { label: "Double frame" },
  none: { label: "None" },
} as const;
export type Border = keyof typeof BORDERS;

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
  /** CSS variable holding the family, defined in app/fonts.css. */
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
  /**
   * false for scripts that can't be read in all caps (blackletter): text the
   * components set `uppercase` keeps its written case instead, and the wide
   * letter-spacing of uppercase labels is tightened. See NO_CAPS_DECLS.
   */
  caps?: boolean;
}

export const FONTS = {
  "press-start": { label: "Press Start 2P", cssVar: "--font-press-start", google: { family: "Press Start 2P", import: "Press_Start_2P", subsets: ["latin"] }, fallback: "monospace", adjust: "cap-height 0.72" },
  vt323: { label: "VT323", cssVar: "--font-vt323", google: { family: "VT323", import: "VT323", subsets: ["latin"] }, fallback: "monospace", adjust: "cap-height 0.7" },
  silkscreen: { label: "Silkscreen", cssVar: "--font-silkscreen", google: { family: "Silkscreen", import: "Silkscreen", subsets: ["latin"] }, fallback: "monospace", adjust: "none" },
  pixelify: { label: "Pixelify Sans", cssVar: "--font-pixelify", google: { family: "Pixelify Sans", import: "Pixelify_Sans", subsets: ["latin"] }, fallback: "monospace", adjust: "cap-height 0.68" },
  dotgothic: { label: "DotGothic16", cssVar: "--font-dotgothic", google: { family: "DotGothic16", import: "DotGothic16", subsets: ["latin", "latin-ext"] }, fallback: "monospace", adjust: "cap-height 0.7" },
  jacquard: { label: "Jacquard 12", cssVar: "--font-jacquard", google: { family: "Jacquard 12", import: "Jacquard_12", subsets: ["latin", "latin-ext"] }, fallback: "serif", adjust: "cap-height 0.72", caps: false },
  jacquard24: { label: "Jacquard 24", cssVar: "--font-jacquard24", google: { family: "Jacquard 24", import: "Jacquard_24", subsets: ["latin", "latin-ext"] }, fallback: "serif", adjust: "cap-height 0.72", caps: false },
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

export const THEME_IDS = Object.keys(THEMES) as Theme[];
export const BORDER_IDS = Object.keys(BORDERS) as Border[];
export const MODE_IDS = Object.keys(MODES) as Mode[];
export const ICON_SET_IDS = Object.keys(ICON_SETS) as IconSet[];
export const FONT_IDS = Object.keys(FONTS) as PixelFont[];
export const TEXT_SCALE_IDS = Object.keys(TEXT_SCALES) as TextScale[];
export const RADIUS_IDS = Object.keys(RADII) as Radius[];
export const SHADING_IDS = Object.keys(SHADINGS) as Shading[];

export interface Appearance {
  theme: Theme;
  mode: Mode;
  font: PixelFont;
  size: PixelSize;
  textScale: TextScale;
  icons: IconSet;
  radius: Radius;
  shading: Shading;
  border: Border;
}

export const DEFAULT_APPEARANCE: Appearance = {
  theme: "nintendo",
  mode: "dark",
  font: "silkscreen",
  size: 64,
  textScale: "md",
  icons: "pixelarticons",
  radius: "none",
  shading: "hard",
  border: "solid",
};

/** Allowed values of every Appearance field (validation, selects, codes). */
export const APPEARANCE_VALUES: { [K in keyof Appearance]: readonly Appearance[K][] } = {
  theme: THEME_IDS,
  mode: MODE_IDS,
  font: FONT_IDS,
  size: PIXEL_SIZES,
  textScale: TEXT_SCALE_IDS,
  icons: ICON_SET_IDS,
  radius: RADIUS_IDS,
  shading: SHADING_IDS,
  border: BORDER_IDS,
};

/** <html> attribute that carries each Appearance field. */
export const APPEARANCE_ATTRS: { [K in keyof Appearance]: string } = {
  theme: "data-theme",
  mode: "data-mode",
  font: "data-font",
  size: "data-size",
  textScale: "data-text-scale",
  icons: "data-icons",
  radius: "data-radius",
  shading: "data-shading",
  border: "data-border",
};

export function fontHasCaps(font: PixelFont) {
  return (FONTS[font] as FontSpec).caps !== false;
}

/** CSS value of --pixel-font for a font, given the variable holding the family. */
export function fontFamily(font: PixelFont, familyVar?: string) {
  const spec: FontSpec = FONTS[font];
  const v = familyVar ?? spec.cssVar;
  return v && spec.google ? `var(${v}), ${spec.fallback}` : spec.fallback;
}

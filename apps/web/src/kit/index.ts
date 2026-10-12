// pixelcn kit: the framework-free part of pixelcn for browser games and
// vanilla JS apps. Pair it with pixelcn.css (themes, role classes, fonts).
//
//   import { applyAppearance, drawPanel, paletteThemeTokens } from "./pixelcn.js";

import {
  APPEARANCE_ATTRS,
  APPEARANCE_VALUES,
  BORDERS,
  DEFAULT_APPEARANCE,
  MODES,
  RADII,
  SHADINGS,
  THEMES,
  THEME_IDS,
  PIXEL_SIZES,
  paletteTokens,
  themeHasMode,
  type Appearance,
  type Theme,
} from "../lib/tokens.ts";
import { LOSPEC_PALETTES } from "../lib/palettes.ts";
import { TONES, contrast, paletteThemeTokens, parseHex, pickRoles, rampFor } from "../lib/palette-theme.ts";

export { drawPanel, resolveColor, type PanelOptions, type PanelContent, type PanelRole } from "./canvas.ts";
export {
  APPEARANCE_VALUES,
  BORDERS,
  DEFAULT_APPEARANCE,
  LOSPEC_PALETTES,
  MODES,
  PIXEL_SIZES,
  RADII,
  SHADINGS,
  THEMES,
  THEME_IDS,
  TONES,
  contrast,
  paletteThemeTokens,
  paletteTokens,
  parseHex,
  pickRoles,
  rampFor,
  themeHasMode,
  type Appearance,
  type Theme,
};

/**
 * Applies settings to an element (default: <html>) through the data
 * attributes pixelcn.css reads. Unknown values are ignored.
 */
export function applyAppearance(settings: Partial<Appearance>, el: HTMLElement = document.documentElement) {
  for (const key of Object.keys(settings) as (keyof Appearance)[]) {
    const value = settings[key];
    if ((APPEARANCE_VALUES[key] as readonly unknown[]).includes(value)) el.setAttribute(APPEARANCE_ATTRS[key], String(value));
  }
  if (settings.mode) el.classList.toggle("dark", settings.mode === "dark");
}

/**
 * Turns any palette (hex colors, e.g. a Lospec .hex file) into CSS custom
 * properties on an element, so pixelcn.css draws with it.
 * Returns false when the palette can't make the mode.
 */
export function applyPalette(colors: string[], mode: "dark" | "light" = "dark", el: HTMLElement = document.documentElement): boolean {
  const tokens = paletteThemeTokens(colors, mode);
  if (!tokens) return false;
  for (const [k, v] of Object.entries(tokens)) el.style.setProperty(`--${k}`, v);
  return true;
}

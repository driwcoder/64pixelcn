// Builds the shadcn registry items behind the /create page's install command,
// from the same tokens the site's theme CSS is generated from (lib/tokens.ts).

import {
  BASE_COLORS,
  DEFAULT_APPEARANCE,
  FONT_IDS,
  FONTS,
  PIXEL_SIZES,
  PRESET_COLORS,
  PRESET_IDS,
  SIZE_TOKENS,
  TEXT_SCALE_IDS,
  TEXT_SCALES,
  ICON_SETS,
  ICON_SET_IDS,
  fontFamily,
  type IconSet,
  type FontSpec,
  type PixelFont,
  type PixelSize,
  type Preset,
  type TextScale,
  type Tokens,
} from "@/lib/tokens";
import { componentsMeta } from "@/lib/components";

export interface PresetChoice {
  preset: Preset;
  font: PixelFont;
  size: PixelSize;
  textScale: TextScale;
  icons: IconSet;
  /** Install every pixelcn component along with the preset. */
  components: boolean;
}

export const DEFAULT_CHOICE: PresetChoice = { ...DEFAULT_APPEARANCE, components: true };

// ── Encoding: nintendo_silkscreen_64_md_pixelarticons_all ─────────────
// (legacy 5-part codes without the icon set still decode, with the default set)
export function encodePreset(c: PresetChoice): string {
  return [c.preset, c.font, c.size, c.textScale, c.icons, c.components ? "all" : "none"].join("_");
}

export function decodePreset(code: string): PresetChoice | null {
  const parts = code.split("_");
  if (parts.length === 5) parts.splice(4, 0, DEFAULT_APPEARANCE.icons);
  const [preset, font, size, textScale, icons, components] = parts;
  if (!ICON_SET_IDS.includes(icons as IconSet)) return null;
  if (!PRESET_IDS.includes(preset as Preset)) return null;
  if (!FONT_IDS.includes(font as PixelFont)) return null;
  if (!PIXEL_SIZES.includes(Number(size) as PixelSize)) return null;
  if (!TEXT_SCALE_IDS.includes(textScale as TextScale)) return null;
  if (components !== "all" && components !== "none") return null;
  return {
    preset: preset as Preset,
    font: font as PixelFont,
    size: Number(size) as PixelSize,
    textScale: textScale as TextScale,
    icons: icons as IconSet,
    components: components === "all",
  };
}

/** CSS variable the font item exposes (next/font `variable`). */
const FONT_VARIABLE = "--font-pixel-family";

// ── Registry items ────────────────────────────────────────────────────
const SCHEMA = "https://ui.shadcn.com/schema/registry-item.json";

export function buildFontItem(font: PixelFont) {
  const spec: FontSpec = FONTS[font];
  if (!spec.google) return null;
  return {
    $schema: SCHEMA,
    name: `pixelcn-font-${font}`,
    type: "registry:font",
    title: spec.google.family,
    font: {
      family: `'${spec.google.family}', ${spec.fallback}`,
      provider: "google",
      import: spec.google.import,
      variable: FONT_VARIABLE,
      weight: ["400"],
      subsets: spec.google.subsets,
    },
  };
}

export function buildPresetItem(choice: PresetChoice, origin: string) {
  const spec: FontSpec = FONTS[choice.font];
  const vars: Tokens = {
    radius: "0px",
    ...BASE_COLORS,
    ...PRESET_COLORS[choice.preset],
    ...SIZE_TOKENS[choice.size],
    "pixel-font": fontFamily(choice.font, FONT_VARIABLE),
    "pixel-font-adjust": spec.adjust,
    "pixel-text-scale": TEXT_SCALES[choice.textScale].value,
  };

  const registryDependencies = [
    "utils",
    `${origin}/r/icons-${choice.icons}.json`,
    ...(spec.google ? [`${origin}/r/fonts/${choice.font}.json`] : []),
    ...(choice.components ? componentsMeta.map((c) => `${origin}/r/${c.name}.json`) : []),
  ];

  return {
    $schema: SCHEMA,
    name: `pixelcn-${encodePreset(choice)}`,
    type: "registry:base",
    title: "pixelcn preset",
    description: `pixelcn preset: ${choice.preset} colors, ${choice.font} font, ${choice.size}px pixels, ${choice.textScale} text.`,
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge", "tw-animate-css", ...(choice.icons === "lucide" ? ["lucide-react"] : [])],
    registryDependencies,
    // Pixel presets are single-mode: dark mirrors light so `.dark` keeps the look.
    cssVars: {
      theme: {
        "font-sans": "var(--pixel-font)",
        "font-pixel": "var(--pixel-font)",
      },
      light: vars,
      dark: vars,
    },
    css: {
      "@layer base": {
        "*": { "image-rendering": "pixelated" },
        html: {
          "font-family": "var(--pixel-font)",
          "font-size-adjust": "var(--pixel-font-adjust, none)",
          "font-size": "calc(100% * var(--pixel-text-scale, 1))",
        },
        body: {
          "background-color": "var(--background)",
          color: "var(--foreground)",
          "font-family": "var(--pixel-font)",
        },
      },
    },
    docs: `pixelcn preset installed. Icons: ${ICON_SETS[choice.icons].attribution} (${ICON_SETS[choice.icons].url}). Edit it any time at ${origin}/create`,
  };
}

// Builds the shadcn registry items behind the /create page's install command,
// from the same tokens the site's theme CSS is generated from (lib/tokens.ts).

import {
  FONTS,
  SIZE_TOKENS,
  TEXT_SCALES,
  ICON_SETS,
  fontFamily,
  paletteTokens,
  roundedRules,
  extrudedRoundedDecls,
  shadingTokens,
  fontHasCaps,
  NO_CAPS_DECLS,
  NO_CAPS_TRACKING,
  NON_INHERITED_VARS,
  type FontSpec,
  type PixelFont,
  type Tokens,
} from "@/lib/tokens";
import { componentsMeta } from "@/lib/components";
import { encodePreset, type PresetChoice } from "@/lib/preset-code";

export { DEFAULT_CHOICE, decodePreset, encodePreset, type PresetChoice } from "@/lib/preset-code";

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
      // Non-Next templates (Vite, React Router, Astro...) load the font from
      // Fontsource instead of next/font.
      dependency: `@fontsource/${spec.google.family.toLowerCase().replace(/\s+/g, "-")}`,
    },
  };
}

export function buildPresetItem(choice: PresetChoice, origin: string) {
  const spec: FontSpec = FONTS[choice.font];
  const shared: Tokens = {
    radius: "0px",
    ...SIZE_TOKENS[choice.size],
    ...shadingTokens(choice.shading),
    "pixel-font": fontFamily(choice.font, FONT_VARIABLE),
    "pixel-font-adjust": spec.adjust,
    "pixel-text-scale": TEXT_SCALES[choice.textScale].value,
  };
  // The chosen mode is the default (:root); the other one is still there
  // under .dark, so a dark-mode toggle in the app keeps working. For a light
  // pick :root is light and .dark is dark; for a dark pick both are dark.
  const light = { ...paletteTokens(choice.theme, choice.mode === "light" ? "light" : "dark"), ...shared };
  const dark = { ...paletteTokens(choice.theme, "dark"), ...shared };
  const rounded: Record<string, Record<string, string>> = Object.fromEntries(roundedRules(choice.radius));
  const extruded = choice.shading === "deep" ? extrudedRoundedDecls(choice.radius) : null;
  if (extruded) rounded[".pixel-rounded.pixel-shadow"] = { ...rounded[".pixel-rounded.pixel-shadow"], ...extruded };

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
    description: `pixelcn preset: ${choice.theme} ${choice.mode} theme, ${choice.font} font, ${choice.size}x pixels, ${choice.textScale} text, ${choice.radius} corners, ${choice.shading} shading.`,
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge", "tw-animate-css", ...(choice.icons === "lucide" ? ["lucide-react"] : [])],
    registryDependencies,
    cssVars: {
      theme: {
        "font-sans": "var(--pixel-font)",
        "font-pixel": "var(--pixel-font)",
        ...(fontHasCaps(choice.font) ? {} : NO_CAPS_TRACKING),
      },
      light,
      dark,
    },
    css: {
      "@utility pixel-shadow": { "box-shadow": "var(--pixel-shadow)" },
      // Blackletter can't be read in all caps (see NO_CAPS_DECLS).
      ...(fontHasCaps(choice.font) ? {} : { ".uppercase": NO_CAPS_DECLS }),
      ...Object.fromEntries(NON_INHERITED_VARS.map((name) => [`@property ${name}`, { syntax: '"*"', inherits: "false" }])),
      ...(Object.keys(rounded).length ? { "@layer components": rounded } : {}),
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

// Builds the shadcn registry items behind the /create page's install command,
// from the same tokens the site's theme CSS is generated from (lib/tokens.ts).

import {
  FONTS,
  SIZE_TOKENS,
  TEXT_SCALES,
  ICON_SETS,
  fontFamily,
  paletteTokens,
  fontHasCaps,
  type FontSpec,
  type PixelFont,
  type Tokens,
} from "@/lib/tokens";
import { componentsMeta } from "@/lib/components";
import { NO_CAPS_DECLS, NO_CAPS_TRACKING, NON_INHERITED_VARS, ROLE_RULES, engineRules, type Rule } from "@/lib/pixel-engine";
import { encodePreset, type PresetChoice } from "@/lib/preset-code";

export { DEFAULT_CHOICE, decodePreset, encodePreset, type PresetChoice } from "@/lib/preset-code";

/** shadcn `css` object from rules; rules sharing a selector are merged. */
function cssObject(rules: Rule[]): Record<string, Record<string, string>> {
  const out: Record<string, Record<string, string>> = {};
  for (const [sel, decls] of rules) out[sel] = { ...out[sel], ...decls };
  return out;
}

const PROPERTY_CSS = Object.fromEntries(NON_INHERITED_VARS.map((name) => [`@property ${name}`, { syntax: '"*"', inherits: "false" }]));

/**
 * pixelcn-roles: the role classes every component uses (.pixel-raised...),
 * with fallbacks, so a component added without a preset still renders.
 */
export function buildRolesItem() {
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "pixelcn-roles",
    type: "registry:style",
    title: "pixelcn roles",
    description: "Role classes (pixel-raised, pixel-surface, pixel-sunken, pixel-tone-*) used by every pixelcn component.",
    css: { ...PROPERTY_CSS, "@layer components": cssObject(ROLE_RULES) },
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
    "pixel-font": fontFamily(choice.font, FONT_VARIABLE),
    "pixel-font-adjust": spec.adjust,
    "pixel-text-scale": TEXT_SCALES[choice.textScale].value,
  };
  // The chosen mode is the default (:root); the other one is still there
  // under .dark, so a dark-mode toggle in the app keeps working. For a light
  // pick :root is light and .dark is dark; for a dark pick both are dark.
  const light = { ...paletteTokens(choice.theme, choice.mode === "light" ? "light" : "dark"), ...shared };
  const dark = { ...paletteTokens(choice.theme, "dark"), ...shared };
  // The engine's rules for exactly this combination (no <html> attributes).
  const engine = engineRules(choice);

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
    description: `pixelcn preset: ${choice.theme} ${choice.mode} theme, ${choice.font} font, ${choice.size}x pixels, ${choice.textScale} text, ${choice.radius} corners, ${choice.shading} shading, ${choice.border} border.`,
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
      "@utility pixel-shadow": {
        "--tw-shadow": "var(--pixel-shadow)",
        "box-shadow":
          "var(--tw-inset-shadow, 0 0 #0000), var(--tw-inset-ring-shadow, 0 0 #0000), var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
      },
      // Blackletter can't be read in all caps (see NO_CAPS_DECLS).
      ...(fontHasCaps(choice.font) ? {} : { ".uppercase": NO_CAPS_DECLS }),
      ...PROPERTY_CSS,
      "@layer components": cssObject(engine.layered),
      ...cssObject(engine.unlayered),
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

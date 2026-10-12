// Short, URL-safe preset codes ("1fK3a9Qx") for /create?preset= and
// /r/presets/<code>.json. Not a "use client" module: the server root layout
// inlines decodePresetCode into the anti-flash script (pixel-settings.ts).
import { APPEARANCE_VALUES, DEFAULT_APPEARANCE, type Appearance } from "@/lib/tokens";

export interface PresetChoice extends Appearance {
  /** Install every pixelcn component along with the preset. */
  components: boolean;
}

export const DEFAULT_CHOICE: PresetChoice = { ...DEFAULT_APPEARANCE, components: true };

/**
 * Field order of the code. Append new fields at the END only: each field is
 * a base-32 digit of one number (index into its option list), so existing
 * codes keep decoding, with index 0 for fields they predate.
 */
const FIELDS = ["preset", "mode", "font", "size", "textScale", "icons", "radius", "shading", "components"] as const;
const VALUES: Record<(typeof FIELDS)[number], readonly unknown[]> = { ...APPEARANCE_VALUES, components: [true, false] };
const VERSION = "1";
const DIGITS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function encodePreset(choice: PresetChoice): string {
  let n = 0;
  for (let i = FIELDS.length - 1; i >= 0; i--) {
    const f = FIELDS[i];
    n = n * 32 + Math.max(0, VALUES[f].indexOf(choice[f]));
  }
  let out = "";
  do {
    out = DIGITS[n % 62] + out;
    n = Math.floor(n / 62);
  } while (n > 0);
  return VERSION + out;
}

/**
 * Self-contained (no outer references) so its source can be inlined in the
 * <head> script. Returns null for anything that isn't a valid code.
 */
export function decodePresetCode(code: string | null, fields: readonly string[], values: Record<string, readonly unknown[]>): Record<string, unknown> | null {
  if (!code || !/^1[0-9A-Za-z]{1,10}$/.test(code)) return null;
  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let n = 0;
  for (let i = 1; i < code.length; i++) n = n * 62 + digits.indexOf(code[i]);
  const out: Record<string, unknown> = {};
  for (let i = 0; i < fields.length; i++) {
    const v = values[fields[i]][n % 32];
    if (v === undefined) return null;
    out[fields[i]] = v;
    n = Math.floor(n / 32);
  }
  return n === 0 ? out : null;
}

/** Codes from before short codes: nintendo_silkscreen_64_md[_pixelarticons]_all. */
function decodeLegacy(code: string): PresetChoice | null {
  const parts = code.split("_");
  if (parts.length === 5) parts.splice(4, 0, DEFAULT_APPEARANCE.icons);
  if (parts.length !== 6) return null;
  const [preset, font, size, textScale, icons, components] = parts;
  const choice = { ...DEFAULT_CHOICE, preset, font, size: Number(size), textScale, icons, components: components === "all" };
  const ok =
    (components === "all" || components === "none") &&
    (["preset", "font", "size", "textScale", "icons"] as const).every((f) => (APPEARANCE_VALUES[f] as readonly unknown[]).includes(choice[f]));
  return ok ? (choice as PresetChoice) : null;
}

export function decodePreset(code: string): PresetChoice | null {
  return (decodePresetCode(code, FIELDS, VALUES) as PresetChoice | null) ?? decodeLegacy(code);
}

/** Source of the inline decoder, with its field list and option lists. */
export const DECODER_JS = `var F=${JSON.stringify(FIELDS)},V=${JSON.stringify(VALUES)},decode=${decodePresetCode.toString()};`;

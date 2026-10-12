// Shared by the client provider and the server root layout (inline script),
// so it must not live in a "use client" module.

export const PRESETS = ["nintendo", "gameboy", "neon", "sepia", "mono"] as const;
export const PIXEL_FONTS = ["press-start", "vt323", "silkscreen", "pixelify", "dotgothic", "system"] as const;
export const PIXEL_SIZES = [8, 16, 32, 64, 128] as const;
export const TEXT_SCALES = ["xs", "sm", "md", "lg", "xl"] as const;

export type Preset = (typeof PRESETS)[number];
export type PixelFont = (typeof PIXEL_FONTS)[number];
export type PixelSize = (typeof PIXEL_SIZES)[number];
export type TextScale = (typeof TEXT_SCALES)[number];

export const STORAGE_KEY = "pixelcn-settings";

/**
 * Runs inline in <head> before first paint, so a returning visitor never sees
 * the default theme flash before React hydrates.
 */
export const PIXEL_SETTINGS_SCRIPT = `(function(){try{var s=JSON.parse(localStorage.getItem(${JSON.stringify(
  STORAGE_KEY
)})||"null");if(!s)return;var r=document.documentElement;if(s.preset)r.setAttribute("data-preset",s.preset);if(s.font)r.setAttribute("data-font",s.font);if(s.size)r.setAttribute("data-size",String(s.size));if(s.textScale)r.setAttribute("data-text-scale",s.textScale);}catch(e){}})();`;

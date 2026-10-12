// Shared by the client provider and the server root layout (inline script),
// so it must not live in a "use client" module.
import { DEFAULT_APPEARANCE } from "@/lib/tokens";

export const STORAGE_KEY = "pixelcn-settings";

const d = DEFAULT_APPEARANCE;
const DEFAULT_CODE = [d.preset, d.font, d.size, d.textScale, d.icons, "all"].join("_");

/**
 * Runs inline in <head> before first paint, so a returning visitor never sees
 * the default theme flash before React hydrates. On /create the preset being
 * built (?c=preset_font_size_scale_icons_...) wins over the saved Display settings,
 * mirroring what the builder applies once hydrated.
 */
export const PIXEL_SETTINGS_SCRIPT = `(function(){try{var r=document.documentElement,s;if(location.pathname.indexOf("/create")===0){var c=(new URLSearchParams(location.search).get("c")||${JSON.stringify(
  DEFAULT_CODE
)}).split("_");s={preset:c[0],font:c[1],size:c[2],textScale:c[3],icons:c.length>5?c[4]:""};}else{s=JSON.parse(localStorage.getItem(${JSON.stringify(
  STORAGE_KEY
)})||"null");}if(!s)return;if(s.preset)r.setAttribute("data-preset",s.preset);if(s.font)r.setAttribute("data-font",s.font);if(s.size)r.setAttribute("data-size",String(s.size));if(s.textScale)r.setAttribute("data-text-scale",s.textScale);if(s.icons)r.setAttribute("data-icons",s.icons);}catch(e){}})();`;

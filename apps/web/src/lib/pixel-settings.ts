// Shared by the client provider and the server root layout (inline script),
// so it must not live in a "use client" module.
import { APPEARANCE_ATTRS } from "@/lib/tokens";
import { DECODER_JS, DEFAULT_CHOICE, encodePreset } from "@/lib/preset-code";

export const STORAGE_KEY = "pixelcn-settings";

/**
 * Runs inline in <head> before first paint, so a returning visitor never sees
 * the default theme flash before React hydrates. On /create the preset being
 * built (?preset=<code>) wins over the saved Display settings, mirroring what
 * the builder applies once hydrated. Legacy ?c= links are upgraded by the
 * builder after hydration.
 */
export const PIXEL_SETTINGS_SCRIPT = `(function(){try{${DECODER_JS}var r=document.documentElement,A=${JSON.stringify(
  APPEARANCE_ATTRS
)},s;if(location.pathname.indexOf("/create")===0){s=decode(new URLSearchParams(location.search).get("preset")||${JSON.stringify(
  encodePreset(DEFAULT_CHOICE)
)},F,V);}else{s=JSON.parse(localStorage.getItem(${JSON.stringify(
  STORAGE_KEY
)})||"null");}if(!s)return;if(!s.theme)s.theme=s.preset;for(var k in A){if(s[k]!=null)r.setAttribute(A[k],String(s[k]));}r.classList.toggle("dark",s.mode!=="light");}catch(e){}})();`;

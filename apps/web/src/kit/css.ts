// pixelcn.css for the kit: everything the site's theme CSS has (themes,
// sizes, fonts, shading, borders, corners, role classes, all switchable by
// data attributes), plus the base styles and @font-face rules, as one file
// that needs no Tailwind or build step.

import { buildThemeCss } from "../lib/pixel-engine.ts";

export { buildThemeCss };

const BASE = `
@layer base {
  * { image-rendering: pixelated; -webkit-font-smoothing: none; }
  html {
    font-family: var(--pixel-font);
    font-size-adjust: var(--pixel-font-adjust, none);
    font-size: calc(100% * var(--pixel-text-scale, 1));
    -webkit-text-size-adjust: 100%;
  }
  body { background-color: var(--background); color: var(--foreground); font-family: var(--pixel-font); }
  /* Form controls don't inherit fonts by default. */
  button, input, select, textarea { font: inherit; color: inherit; }
}
/* A hard drop shadow for elements that don't use a role class. */
.pixel-shadow { box-shadow: var(--pixel-shadow); }
`;

export function buildKitCss(fontFaces: string) {
  return [`/* pixelcn kit - https://pixelcn.vercel.app/kits/html */`, fontFaces, buildThemeCss(), BASE].join("\n");
}

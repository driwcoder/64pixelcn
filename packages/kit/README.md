# pixelcn

Pixel-art UI for browser games and web apps, with no framework required:

- **14 themes**, 9 of them generated from [Lospec](https://lospec.com/palette-list) palettes using only the palette's colors (Waldgeist, Grim32, Darkseed 16, Vinik24, Lost Century, Lux2K, Mushroom, JustParchment8, Fading 16), light and dark, WCAG AA text contrast.
- **Turn any palette into a theme** (`applyPalette`, `paletteThemeTokens`).
- **Ramp shading**: each box shades with its own color's ramp, with more tones at bigger pixel sizes (8x to 128x). Flat, hard drop, bevel, top-lit and extruded.
- **Stepped corners** (square, notched, rounded, round) and **borders** (solid, selout, double frame, none).
- **Canvas renderer**: `drawPanel()` draws the same panels on a `<canvas>`, pixel for pixel (vanilla 2D, Phaser, PixiJS...).
- 9 self-hosted pixel fonts (SIL OFL).

Docs and live demo: https://pixelcn.vercel.app/docs/kit. React + shadcn/ui components: https://pixelcn.vercel.app

## Install

```bash
npm install pixelcn
```

Or without a bundler:

```html
<link rel="stylesheet" href="https://unpkg.com/pixelcn/dist/pixelcn.css">
<script type="module">
  import { applyAppearance } from "https://unpkg.com/pixelcn/dist/pixelcn.min.js";
</script>
```

## CSS

```js
import "pixelcn/pixelcn.css";
```

Settings are attributes on `<html>` (or any container); boxes take a role class:

```html
<html data-theme="waldgeist" data-mode="dark" data-size="64"
      data-radius="md" data-shading="bevel" data-border="solid">
  <div class="pixel-raised" style="background: var(--card); color: var(--card-foreground)">
    <button class="pixel-raised pixel-tone-primary"
            style="background: var(--primary); color: var(--primary-foreground)">Equip</button>
    <input class="pixel-sunken" placeholder="Search">
  </div>
</html>
```

| Attribute | Values |
|---|---|
| `data-theme` | `nintendo` `gameboy` `neon` `sepia` `mono` `waldgeist` `grim32` `darkseed16` `vinik24` `lostcentury` `lux2k` `mushroom` `justparchment8` `fading16` |
| `data-mode` | `dark` `light` |
| `data-size` | `8` `16` `32` `64` `128` |
| `data-radius` | `none` `sm` `md` `lg` |
| `data-shading` | `flat` `hard` `bevel` `toplit` `deep` |
| `data-border` | `solid` `selout` `frame` `none` |
| `data-font` | `press-start` `vt323` `silkscreen` `pixelify` `dotgothic` `jacquard` `jacquard24` `handjet` `system` |
| `data-text-scale` | `xs` `sm` `md` `lg` `xl` |

Roles: `pixel-raised` (stands out, with shadow), `pixel-surface` (flat), `pixel-sunken` (pressed in). Tones: `pixel-tone-primary`, `pixel-tone-secondary`, `pixel-tone-accent`, `pixel-tone-destructive` (default: the card ramp). Colors are CSS variables (`--background`, `--card`, `--primary`, `--primary-foreground`...).

## JavaScript

```js
import { applyAppearance, applyPalette, drawPanel, paletteThemeTokens, THEMES } from "pixelcn";

applyAppearance({ theme: "lux2k", size: 128, shading: "deep", border: "selout" });

// Any palette, e.g. a Lospec .hex file
applyPalette(["2e222f", "45293f", "7a3045", "993d41", "cd683d", "fbb954", "f2ec8b"]);

// Canvas
const ctx = canvas.getContext("2d");
const content = drawPanel(ctx, {
  x: 8, y: 8, width: 160, height: 64,
  theme: "vinik24", size: 64, radius: "md", shading: "bevel",
  role: "raised", tone: "primary",
});
ctx.fillText("Start", content.x + 8, content.y + 20);
```

| Export | |
|---|---|
| `applyAppearance(settings, el?)` | Sets the data attributes (theme, mode, font, size, textScale, icons, radius, shading, border). |
| `applyPalette(hexes, mode?, el?)` | Uses any palette as the theme. Returns `false` if it can't make that mode. |
| `paletteThemeTokens(hexes, mode)` | The generated tokens (roles, chart colors, shading ramps) as an object. |
| `drawPanel(ctx, options)` | Draws a panel on a canvas; returns its content box. |
| `paletteTokens(theme, mode)` | Tokens of a built-in theme. |
| `THEMES`, `LOSPEC_PALETTES`, `rampFor`, `contrast`, `parseHex` | Data and color helpers. |

The module has no dependencies and only touches the DOM when you call `applyAppearance`/`applyPalette`, so it also runs in Node (e.g. to generate themes at build time).

## Credits

Palettes from Lospec, credit to their authors. Fonts under the SIL Open Font License (license files in `dist/fonts`).

## License

MIT

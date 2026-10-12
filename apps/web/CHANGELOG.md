# Changelog

All notable changes to pixelcn. The version is in `apps/web/package.json` and
follows [Semantic Versioning](https://semver.org): while it is 0.x, a minor
bump may change component markup or tokens.

## 0.6.0 - 2026-10-12

### Added

- **Character generator** in Assets: knights, mages, rogues, archers and villagers on a 24x24 grid. The seed varies hair style, beard, cape, shield and the secondary colors; pick the outfit tone and one of four skin tones.
- **Enemy generator** in Assets: slimes, goblins, skeletons, bats, ghosts, floating eyes and mushrooms, each with its own variations (size, horns and ears, teeth, wings, eyestalks, spots...).
- Both share the item generator's look: theme tone ramps, top-left shading, selective outline, 8 variations per seed, PNG (1x to 16x) and SVG export.

### Changed

- Items, characters and enemies run on one engine, `lib/sprite-core.ts` (seeded random, painting helpers, shading, outline, colors, SVG), and one UI, `components/sprite-studio.tsx`. Item seeds produce the same icons as before.

## 0.5.0 - 2026-10-12

### Added

- Five areas in the top navigation: **Create**, **Components**, **Blocks**, **Engine kits** and **Assets**. Below 1024px they live in the menu button; the home page has a card per area.
- **Engine kits** (`/kits`), grouped by platform (browser now; PC and mobile planned):
  - HTML & JS kit at `/kits/html` (moved from `/docs/kit`, which redirects).
  - Text RPG (`/kits/text-rpg`): a complete text adventure in one HTML file using only the kit (story with choices, HP, gold, bag, shop, turn-based battle, autosave, theme picker).
  - Phaser (`/kits/phaser`): a Phaser 4 mini game whose HUD and dialogue are drawn with `drawPanel()` and whose colors follow the theme.
  - The examples live in `public/examples/` and their pages show the source read from those files.
- **Assets** (`/assets`): gallery of the 50 UI icons in the active icon set, and a rule-based **item icon generator** (sword, potion, coin, shield, key, gem) with seeds, variations, the theme's tone ramps, outline and top-left shading, PNG (1x to 16x) and SVG export. Characters and enemies are next.
- **Game screens** on the Blocks page, listed before the website blocks: Title Screen, Pause Menu, Story Log (text RPG choices), RPG Dialogue, Character Sheet, Inventory, Shop and Battle, grouped with the existing Main Menu, Save Slots, Loading, Party, Skill Tree, Victory, Game Over and Leaderboard.

## 0.4.0 - 2026-10-12

### Added

- 9 themes from Lospec palettes: Waldgeist, Grim32, Darkseed 16, Vinik24, Lost Century, Lux2K, Mushroom, JustParchment8 and Fading 16. Each uses only its palette's colors, picked so text passes WCAG AA; where a palette can't (Grim32's text, the reds of Lost Century and Fading 16) the nearest palette color is lightened or darkened along its own hue. Grim32 has no light colors, so its light mode is its dark mode.
- Shading follows each element's own color ramp (the palette colors of its hue family, dark to light) and gets more tones as the pixel size grows: 1 highlight and 1 shadow band at 8x, up to 3 and 3 at 128x.
- Border setting: Solid, Selout (each box outlined in its ramp's darkest color), Double frame (RPG window) and None.
- Top-lit shading (light from above).
- Kit for browser games and vanilla JS, at `/kit` (see `/docs/kit`): `pixelcn.css` (every theme and setting, role classes, fonts) and `pixelcn.js` (themes, palette-to-theme generator, `applyAppearance`, `applyPalette`, and `drawPanel` to draw the same panels on a canvas).

### Changed

- Components declare a role (`pixel-raised`, `pixel-surface`, `pixel-sunken`) and optionally a tone (`pixel-tone-primary`...), and the style engine (`lib/pixel-engine.ts`) draws borders, corners and shading. Classes in a component's `className` still override it. `pixel-rounded` and `pixel-shadow` keep working.
- Every component's registry item depends on `/r/roles.json` (the role classes), so it renders even without a preset.
- The engine CSS is generated into `app/theme.css` (and the kit) by `pnpm kit:build`, instead of being inlined in every page.

## 0.3.0 - 2026-10-12

### Changed

- Color presets are now called **themes**: the "Theme" select in Display and /create, `data-theme` on `<html>` (was `data-preset`) and the `theme` field in code. "Preset" now only means the whole /create configuration that `shadcn init --preset` installs.
- Old `?c=` preset links are no longer accepted; use `?preset=` codes.
- Jacquard 12 and Jacquard 24 (blackletter) are no longer set in all caps: with them, text the components make `uppercase` keeps the case it was written in, and the wide letter-spacing of labels is tightened, since blackletter capitals can't be read in runs. Presets with these fonts install the same rules.

## 0.2.1 - 2026-10-12

### Changed

- Border width follows the pixel size: 1px at 8x/16x, 2px at 32x/64x (default, unchanged) and 3px at 128x. Components use `border-[length:var(--pixel-line,2px)]`, so they still get 2px without a preset.
- Fonts are self-hosted from `public/fonts` with every character subset each font has (latin, latin-ext, cyrillic, greek, vietnamese...), so accented letters like Ł, Ő or Ğ render in the pixel font. Browsers only download the subsets a page uses. The build no longer fetches Google Fonts.

### Fixed

- Extruded shading with stepped corners: the block's side follows the corner stair instead of ending in a square corner.
- Long words in the accessibility notes could overflow their card.

## 0.2.0 - 2026-10-12

### Added

- Light and dark mode for every color preset (Nintendo, GameBoy, Neon, Sepia, Mono). Presets install both: the chosen mode as the default and dark under `.dark`.
- Corners setting: Square, Notched, Rounded and Round. Corners are pixel-art staircases on the same grid as the drop shadow, so the shadow follows them.
- Shading setting: Flat, Hard drop, Bevel and Extruded. Bevel uses hue-shifted ramps per palette (warm highlights, cool shadows) with 2 tones on 8x/16x and 4 tones from 32x up; GameBoy keeps to its 4 DMG shades.
- Icon set picker (Pixelarticons, HackerNoon Pixel, Lucide) in Display and /create.
- /create: every option is a select, like ui.shadcn.com/create, and links use a short `?preset=` code (old `?c=` links still open). New projects can start from Next.js, Vite, TanStack Start, React Router or Astro; fonts install through Fontsource outside Next.js.
- Game components: Dialogue Box, Inventory, Scoreboard, Coin Counter, Continue Screen and Achievement.
- API reference (exports, props, variants, data-slot hooks) and accessibility notes on every component page, generated from the component source.
- WCAG contrast audit of every preset in both modes (`tests/contrast.spec.ts`).
- Icon and font credits in the site footer and README.

### Changed

- Display menu uses the same selects as /create.
- `shadow-[var(--pixel-shadow)]` is now the `pixel-shadow` utility; its look comes from the Shading setting.
- 8x and 16x drop shadows are 2px (were 1px) so they match the 2px border.
- Input borders, muted text and destructive colors adjusted where they failed WCAG AA.

### Fixed

- Registry JSON is identical when built on Windows and Linux (LF line endings).
- Unused-variable lint warning in the generated icons module.

## 0.1.0 - 2026-10-11

- First release: 70 pixel art components on shadcn/ui and Radix, the docs site, blocks, presets (5 palettes, 9 fonts, 5 pixel sizes, 5 text sizes), the /create preset builder and the shadcn registry.

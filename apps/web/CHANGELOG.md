# Changelog

All notable changes to pixelcn. The version is in `apps/web/package.json` and
follows [Semantic Versioning](https://semver.org): while it is 0.x, a minor
bump may change component markup or tokens.

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

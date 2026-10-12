# 64pixelcn

A pixel art component library based on shadcn/ui. Retro gaming aesthetics with modern React + Tailwind v4.

## Quick Start

```bash
# New Next.js app with the default preset (Silkscreen, Nintendo dark) and every component
npx shadcn@latest init --template next --base radix --name my-app --preset https://pixelcn.vercel.app/r/pixelcn.json

# Existing project: apply the preset, then add components one by one
npx shadcn@latest init --force --no-reinstall --preset https://pixelcn.vercel.app/r/pixelcn.json
npx shadcn@latest add https://pixelcn.vercel.app/r/button.json
```

Prefer another look? Build it at [/create](https://pixelcn.vercel.app/create) and copy the generated command.

## Project Structure

Everything lives in one place, `apps/web`, which is both the docs site and the
registry server (the same layout shadcn/ui uses):

```
64pixelcn/
└── apps/web/
    ├── app/
    │   ├── (main)/page.tsx           # Home
    │   ├── (docs)/docs/...           # Get started, components, blocks
    │   ├── (create)/create/page.tsx  # Preset builder
    │   ├── r/presets/[file]/         # Preset registry items (shadcn init --preset)
    │   ├── r/fonts/[file]/           # registry:font items
    │   ├── r/pixelcn.json/           # Default preset (original install URL)
    │   ├── globals.css               # Base styles (no tokens)
    │   └── layout.tsx                # Fonts + generated theme CSS
    ├── src/
    │   ├── components/ui/            # The pixel art components (single copy)
    │   └── lib/
    │       ├── tokens.ts             # Single source of truth for presets, sizes, fonts
    │       ├── components.ts         # Component list (docs + registry build)
    │       ├── preset-code.ts        # Short preset codes (?preset=)
    │       ├── preset-registry.ts    # Builds registry items from tokens
    │       └── component-api.json    # Generated API + a11y docs
    ├── scripts/build-registry.mjs    # Writes public/r/<component>.json and the API docs
    └── public/r/                     # Generated registry JSON (served via HTTP)
```

## Development

```bash
# From repo root
pnpm install
pnpm dev              # Start Next.js dev server on :3000

# Rebuild registry after adding components
pnpm registry:build
```

## Components

76 components: every shadcn/ui component in pixel art plus game UI (Health/Mana/XP bars,
Enemy Health, Dialogue Box, Inventory, Scoreboard, Coin Counter, Continue Screen,
Achievement...). Each page under [/docs/components](https://pixelcn.vercel.app/docs/components)
has a live demo, the code, its API (exports, props, variants, `data-slot` hooks) and
accessibility notes, the last two generated from the component source.

## Presets

Every option comes from `apps/web/src/lib/tokens.ts`:

- **Colors**: nintendo, gameboy, neon, sepia, mono, each in **light** and **dark** mode
- **Fonts**: press-start, vt323, silkscreen (default), pixelify, dotgothic, jacquard (Jacquard 12), jacquard24, handjet, system
- **Pixel sizes**: 8x, 16x, 32x, 64x, 128x (shadow offset, corner step and shading bands)
- **Text sizes**: xs, sm, md, lg, xl
- **Icons**: pixelarticons (default), hackernoon, lucide
- **Corners**: square, notched, rounded, round. Stepped pixel-art corners on the same grid as the drop shadow
- **Shading**: flat, hard drop, bevel, extruded. Hue-shifted ramps per palette (warm light from the top-left, cool shadows), 2 tones up to 16x and 4 tones from 32x

Build a preset visually at `/create` (each option is a select, like ui.shadcn.com/create). The link
holds the whole preset in a short code, and the page generates a command such as:

```bash
npx shadcn@latest init --template vite --base radix --name my-app --preset https://pixelcn.vercel.app/r/presets/1bVT2R7.json
```

Templates: `next`, `vite`, `start` (TanStack Start), `react-router` and `astro`. Outside Next.js the
font is installed from Fontsource. The preset URL is served by
`apps/web/app/r/presets/[file]/route.ts` (a `registry:base` item with both color modes, the font,
sizes, shading, corners and, optionally, every component).

On the site the same settings are data attributes on `<html>`:

```html
<html data-preset="gameboy" data-mode="light" data-font="vt323" data-size="32" data-radius="md" data-shading="bevel">
```

Components opt into stepped corners with the `pixel-rounded` class and into the drop shadow with the
`pixel-shadow` utility.

## Testing

```bash
pnpm test:layout   # Playwright: builds the app, then checks every page and component
```

- `tests/layout.spec.ts`: every page and component demo with every font, at 375px and 1280px, the
  largest text size and the roundest corners, for text touching or crossing borders, boxes escaping
  their container, text cut by a corner and horizontal page scroll.
- `tests/contrast.spec.ts`: WCAG AA contrast of every palette in both modes.

CI (`.github/workflows/ci.yml`) also runs lint, typecheck and checks that the generated registry JSON
and component API docs are up to date.

## Versioning

The version lives in `apps/web/package.json`; see [CHANGELOG.md](apps/web/CHANGELOG.md), also shown at
`/docs/changelog`.

## Credits

- Icons: [pixelarticons](https://pixelarticons.com) by Gerrit Halfmann (MIT),
  [Pixel Icon Library](https://pixeliconlibrary.com) by HackerNoon
  ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/): keep this credit when you ship the
  HackerNoon set) and [Lucide](https://lucide.dev) (ISC)
- Fonts: Google Fonts, under the SIL Open Font License
- Built on [shadcn/ui](https://ui.shadcn.com) and [Radix UI](https://www.radix-ui.com)

## Deployment

Deploy `apps/web` to Vercel. The registry URLs default to `https://pixelcn.vercel.app`;
for another domain, build the registry with `PIXELCN_REGISTRY_URL=https://your-domain pnpm registry:build`
(preset and font items use the request origin automatically).

## Adding New Components

1. Create `apps/web/src/components/ui/<name>.tsx` (npm and registry dependencies are derived from its imports)
2. Add it to `apps/web/src/lib/components.ts` (docs page + registry entry)
3. Add a demo in `apps/web/src/components/component-demos.tsx` and a snippet in `src/lib/code-snippets.ts`
4. Optional: an accessibility note in `apps/web/scripts/component-api.mjs` (Radix-based components get one automatically)
5. Run `pnpm registry:build` (registry JSON + API docs)

## Tech Stack

- Next.js 16 + React 19
- Tailwind CSS v4
- Radix UI primitives
- class-variance-authority (CVA)
- Pixel fonts self-hosted with next/font/local from `apps/web/app/fonts` (default: Silkscreen)

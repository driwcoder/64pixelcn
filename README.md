# 64pixelcn

A pixel art component library based on shadcn/ui. Retro gaming aesthetics with modern React + Tailwind v4.

## Quick Start

```bash
# New Next.js app with the default preset (Silkscreen, Nintendo colors) and every component
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
    │       └── preset-registry.ts    # Builds registry items from tokens
    ├── scripts/build-registry.mjs    # Writes public/r/<component>.json
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

| Component | Status |
|-----------|--------|
| Button | Done |
| Card | Done |
| Input | Done |
| Badge | Done |
| Checkbox | Done |
| Switch | Done |
| Dialog | Done |
| Alert | Done |
| Tabs | Done |
| Progress | Done |

## Presets

The library supports 5 color presets, 9 fonts, 5 pixel sizes and 5 text sizes:

- **Colors**: nintendo, gameboy, neon, sepia, mono
- **Fonts**: press-start, vt323, silkscreen, pixelify, dotgothic, jacquard (Jacquard 12), jacquard24, handjet, system
- **Sizes**: 8px, 16px, 32px, 64px, 128px
- **Text sizes**: xs, sm, md, lg, xl

Build a preset visually at `/create`. It generates a command such as:

```bash
npx shadcn@latest init --template next --base radix --name my-app --preset https://pixelcn.vercel.app/r/presets/gameboy_vt323_32_md_all.json
```

The preset URL is served by `apps/web/app/r/presets/[file]/route.ts` (a `registry:base` item with the colors, font, sizes and, optionally, every component).

Change presets with data attributes:
```html
<html data-preset="gameboy" data-font="vt323" data-size="32">
```

## Deployment

Deploy `apps/web` to Vercel. The registry URLs default to `https://pixelcn.vercel.app`;
for another domain, build the registry with `PIXELCN_REGISTRY_URL=https://your-domain pnpm registry:build`
(preset and font items use the request origin automatically).

## Adding New Components

1. Create `apps/web/src/components/ui/<name>.tsx` (npm and registry dependencies are derived from its imports)
2. Add it to `apps/web/src/lib/components.ts` (docs page + registry entry)
3. Add a demo in `apps/web/src/components/component-demos.tsx` and a snippet in `src/lib/code-snippets.ts`
4. Run `pnpm registry:build`

## Tech Stack

- Next.js 16 + React 19
- Tailwind CSS v4
- Radix UI primitives
- class-variance-authority (CVA)
- Pixel fonts via next/font (default: Silkscreen)

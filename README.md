# 64pixelcn

A pixel art component library based on shadcn/ui. Retro gaming aesthetics with modern React + Tailwind v4.

## Quick Start

```bash
# Install the base preset
npx shadcn@latest init <your-deployed-url>/r/pixelcn.json

# Add components
npx shadcn@latest add <your-deployed-url>/r/button.json
npx shadcn@latest add <your-deployed-url>/r/card.json
npx shadcn@latest add <your-deployed-url>/r/input.json
```

## Project Structure

```
64pixelcn/
├── apps/
│   └── web/                    # Next.js 15 docs + preview + registry server
│       ├── app/
│       │   ├── (main)/
│       │   │   ├── page.tsx         # Home
│       │   │   ├── create/page.tsx  # Preset builder
│       │   │   └── docs/page.tsx    # Component showcase
│       │   ├── globals.css
│       │   └── layout.tsx
│       ├── public/r/           # Registry JSON files (served via HTTP)
│       └── next.config.ts      # CORS + cache headers for /r/*
├── packages/
│   └── registry/
│       ├── src/
│       │   ├── components/ui/  # All pixel art components
│       │   ├── lib/utils.ts
│       │   └── styles/globals.css
│       └── scripts/
│           └── build-registry.mjs  # Generates public/r/*.json
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

The library supports 5 color presets, 6 fonts, and 5 pixel sizes:

- **Colors**: nintendo, gameboy, neon, sepia, mono
- **Fonts**: press-start, vt323, silkscreen, pixelify, monogram, system
- **Sizes**: 8px, 16px, 32px, 64px, 128px

Change presets with data attributes:
```html
<html data-preset="gameboy" data-font="vt323" data-size="32">
```

## Deployment

Deploy `apps/web` to Vercel. After deployment, replace `<your-deployed-url>` with your Vercel URL:

```bash
npx shadcn@latest init https://your-app.vercel.app/r/pixelcn.json
```

## Adding New Components

1. Create `packages/registry/src/components/ui/<name>.tsx`
2. Add entry to `packages/registry/scripts/build-registry.mjs`
3. Run `pnpm registry:build`
4. Copy JSON to `apps/web/public/r/`
5. Add showcase in `apps/web/src/app/(main)/docs/page.tsx`

## Tech Stack

- Next.js 16 + React 19
- Tailwind CSS v4
- Radix UI primitives
- class-variance-authority (CVA)
- Pixel font: Press Start 2P

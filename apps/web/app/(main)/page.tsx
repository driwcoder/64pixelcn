import Link from "next/link";
import { PixelButton } from "@/components/ui/button";
import { PixelCard, PixelCardContent, PixelCardHeader, PixelCardTitle, PixelCardDescription, PixelCardFooter } from "@/components/ui/card";
import { PixelBadge } from "@/components/ui/badge";
import { ArrowRight } from "@/components/ui/icons";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Hero */}
        <div className="mb-16 text-center">
          <PixelBadge variant="outline" className="mb-6">v0.1.0</PixelBadge>
          <h1 className="mb-4 font-[family-name:var(--pixel-font)] text-3xl sm:text-4xl uppercase tracking-widest leading-tight break-words">
            64pixelcn
          </h1>
          <p className="mb-8 font-[family-name:var(--pixel-font)] text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            A pixel art component library based on shadcn/ui.
            70 components including gaming bars. Install, customize presets, and build retro UIs.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <PixelButton size="lg" asChild>
              <Link href="/docs/components">
                Browse Components <ArrowRight className="h-4 w-4" />
              </Link>
            </PixelButton>
            <PixelButton size="lg" variant="outline" asChild>
              <Link href="/docs/blocks">Browse Blocks</Link>
            </PixelButton>
          </div>
          <div className="mt-4">
            <a href="https://pixelcn.vercel.app" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
              pixelcn.vercel.app
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PixelCard>
            <PixelCardHeader>
              <PixelCardTitle>Shadcn Compatible</PixelCardTitle>
              <PixelCardDescription>
                Same CLI install flow. Copy-paste or npm install.
              </PixelCardDescription>
            </PixelCardHeader>
            <PixelCardContent>
              <code className="text-xs text-accent font-mono">npx shadcn@latest init</code>
            </PixelCardContent>
          </PixelCard>

          <PixelCard>
            <PixelCardHeader>
              <PixelCardTitle>70 Components + Blocks</PixelCardTitle>
              <PixelCardDescription>
                Every shadcn component plus gaming bars (HP, MP, XP).
              </PixelCardDescription>
            </PixelCardHeader>
            <PixelCardContent>
              <Link href="/docs/components" className="text-xs text-primary hover:underline">Browse all →</Link>
            </PixelCardContent>
          </PixelCard>

          <PixelCard>
            <PixelCardHeader>
              <PixelCardTitle>Multi-Size & Presets</PixelCardTitle>
              <PixelCardDescription>
                8px to 128px. Nintendo, GameBoy, Neon, Sepia, Mono themes.
              </PixelCardDescription>
            </PixelCardHeader>
            <PixelCardFooter>
              <Link href="/create" className="text-xs text-primary hover:underline">Customize →</Link>
            </PixelCardFooter>
          </PixelCard>
        </div>
      </div>
    </main>
  );
}

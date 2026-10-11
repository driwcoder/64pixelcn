import Link from "next/link";
import { PixelButton } from "@/components/ui/button";
import { PixelCard, PixelCardContent, PixelCardHeader, PixelCardTitle, PixelCardDescription, PixelCardFooter } from "@/components/ui/card";
import { PixelBadge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Hero */}
        <div className="mb-16 text-center">
          <PixelBadge variant="outline" className="mb-6">v0.1.0</PixelBadge>
          <h1 className="mb-4 font-[family-name:var(--pixel-font)] text-4xl uppercase tracking-widest leading-tight">
            64pixelcn
          </h1>
          <p className="mb-8 font-[family-name:var(--pixel-font)] text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            A pixel art component library based on shadcn/ui.
            62 components. Install, customize presets, and build retro UIs.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/docs/components">
              <PixelButton size="lg">
                Browse Components <ArrowRight className="ml-2 h-4 w-4" />
              </PixelButton>
            </Link>
            <Link href="/create">
              <PixelButton size="lg" variant="outline">
                Create Preset
              </PixelButton>
            </Link>
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
              <PixelCardTitle>62 Components</PixelCardTitle>
              <PixelCardDescription>
                Every shadcn component in pixel art form.
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

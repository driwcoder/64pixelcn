import Link from "next/link";
import { SECTIONS } from "@/lib/docs-sections";
import { PixelButton } from "@/components/ui/button";
import { PixelCard, PixelCardHeader, PixelCardTitle, PixelCardDescription, PixelCardFooter } from "@/components/ui/card";
import { PixelBadge } from "@/components/ui/badge";
import { ArrowRight } from "@/components/ui/icons";
import { SiteFooter } from "@/components/site-footer";
import { componentsMeta } from "@/lib/components";
import { VERSION } from "@/lib/version";

export default function Home() {
  return (
    <>
      <main className="min-h-screen px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          {/* Hero */}
          <div className="mb-16 text-center">
            <PixelBadge variant="outline" className="mb-6">v{VERSION}</PixelBadge>
            <h1 className="mb-4 font-[family-name:var(--pixel-font)] text-3xl sm:text-4xl uppercase tracking-widest leading-tight break-words">
              64pixelcn
            </h1>
            <p className="mb-8 font-[family-name:var(--pixel-font)] text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              A pixel art component library based on shadcn/ui.
              {componentsMeta.length} components including game UI. Install, pick a theme, and build retro UIs.
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

          {/* The five areas */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-6">
            {SECTIONS.map((area) => (
              <PixelCard key={area.href} className="flex flex-col">
                <PixelCardHeader>
                  <PixelCardTitle>{area.label}</PixelCardTitle>
                  <PixelCardDescription>{area.description}</PixelCardDescription>
                </PixelCardHeader>
                <PixelCardFooter className="mt-auto">
                  <Link href={area.href} className="text-xs text-primary hover:underline">Open {area.label} →</Link>
                </PixelCardFooter>
              </PixelCard>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

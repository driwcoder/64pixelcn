import type { Metadata } from "next";
import Link from "next/link";
import { PixelBadge } from "@/components/ui/badge";
import { PixelCard, PixelCardDescription, PixelCardHeader, PixelCardTitle } from "@/components/ui/card";
import { KIT_PLATFORMS } from "@/lib/kits";

export const metadata: Metadata = {
  title: "Engine kits — 64pixelcn",
  description: "pixelcn for games: the same themes and pixel panels in plain HTML, canvas and game engines.",
};

export default function KitsPage() {
  return (
    <div className="px-4 py-8 pb-24 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-10">
        <header>
          <h1 className="mb-2 text-xl uppercase tracking-widest">Engine kits</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            The same themes, pixel sizes, shading and panels you build in Create, ready for games: plain HTML for text RPGs and menus,
            and canvas renderers for game engines.
          </p>
        </header>

        {KIT_PLATFORMS.map((platform) => (
          <section key={platform.id} aria-labelledby={`kits-${platform.id}`} className="space-y-4">
            <div>
              <h2 id={`kits-${platform.id}`} className="text-sm uppercase tracking-widest text-primary">{platform.title}</h2>
              <p className="text-xs text-muted-foreground">{platform.description}</p>
            </div>
            {platform.kits.length === 0 ? (
              <p className="border-[length:var(--pixel-line,2px)] border-dashed border-border p-4 text-xs text-muted-foreground">Coming later.</p>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
                {platform.kits.map((kit) => {
                  const card = (
                    <PixelCard className="h-full">
                      <PixelCardHeader className="pb-[1.5em]">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <PixelCardTitle className="text-xs">{kit.title}</PixelCardTitle>
                          <PixelBadge variant={kit.status === "ready" ? "default" : "outline"}>{kit.status === "ready" ? "Ready" : "Soon"}</PixelBadge>
                        </div>
                        <PixelCardDescription className="text-[0.7rem]">{kit.description}</PixelCardDescription>
                      </PixelCardHeader>
                    </PixelCard>
                  );
                  return kit.status === "ready" ? (
                    <Link key={kit.slug} href={`/kits/${kit.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      {card}
                    </Link>
                  ) : (
                    <div key={kit.slug} aria-disabled="true" className="opacity-70">{card}</div>
                  );
                })}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

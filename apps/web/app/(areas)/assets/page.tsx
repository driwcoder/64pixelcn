import type { Metadata } from "next";
import { PixelBadge } from "@/components/ui/badge";
import { PixelCard, PixelCardContent, PixelCardDescription, PixelCardHeader, PixelCardTitle } from "@/components/ui/card";
import { IconGallery } from "@/components/icon-gallery";
import { CharacterGenerator, EnemyGenerator, ItemGenerator } from "@/components/sprite-studio";
import { ASSET_SECTIONS } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Assets — 64pixelcn",
  description: "Pixel art for your game in your theme's palette: icon sets and item, character and enemy generators.",
};

export default function AssetsPage() {
  return (
    <div className="px-4 py-8 pb-24 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-10">
        <header>
          <h1 className="mb-2 text-xl uppercase tracking-widest">Assets</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Pixel art for your game, in the palette of your theme. UI pieces like health bars and inventories live in Components and
            Blocks; this area is for images: icons, items, characters and enemies.
          </p>
        </header>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
          {ASSET_SECTIONS.map((s) => (
            <PixelCard key={s.slug} className={s.status === "ready" ? "h-full" : "h-full opacity-70"}>
              <PixelCardHeader className="pb-[1.5em]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <PixelCardTitle className="text-xs">{s.status === "ready" ? <a href={`#${s.slug}`}>{s.title}</a> : s.title}</PixelCardTitle>
                  <PixelBadge variant={s.status === "ready" ? "default" : "outline"}>{s.status === "ready" ? "Ready" : "Soon"}</PixelBadge>
                </div>
                <PixelCardDescription className="text-[0.7rem]">{s.description}</PixelCardDescription>
              </PixelCardHeader>
            </PixelCard>
          ))}
        </div>

        <PixelCard id="items">
          <PixelCardHeader>
            <PixelCardTitle className="text-xs">Item icons</PixelCardTitle>
          </PixelCardHeader>
          <PixelCardContent>
            <ItemGenerator />
          </PixelCardContent>
        </PixelCard>

        <PixelCard id="characters">
          <PixelCardHeader>
            <PixelCardTitle className="text-xs">Characters</PixelCardTitle>
          </PixelCardHeader>
          <PixelCardContent>
            <CharacterGenerator />
          </PixelCardContent>
        </PixelCard>

        <PixelCard id="enemies">
          <PixelCardHeader>
            <PixelCardTitle className="text-xs">Enemies</PixelCardTitle>
          </PixelCardHeader>
          <PixelCardContent>
            <EnemyGenerator />
          </PixelCardContent>
        </PixelCard>

        <PixelCard id="icons">
          <PixelCardHeader>
            <PixelCardTitle className="text-xs">Icon sets</PixelCardTitle>
          </PixelCardHeader>
          <PixelCardContent>
            <IconGallery />
          </PixelCardContent>
        </PixelCard>
      </div>
    </div>
  );
}

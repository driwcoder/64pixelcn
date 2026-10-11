"use client";

import { useRouter } from "next/navigation";
import { componentsMeta, categories } from "@/lib/components";
import { componentDemos } from "@/components/component-demos";
import { PixelCard, PixelCardContent, PixelCardHeader, PixelCardTitle, PixelCardDescription } from "@/components/ui/card";

export default function ComponentsPage() {
  const router = useRouter();

  return (
    <div className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-[family-name:var(--pixel-font)] text-2xl uppercase tracking-widest mb-2">Components</h1>
        <p className="text-sm text-muted-foreground mb-8">
          {componentsMeta.length} pixel art components. Click any component to see details and installation.
        </p>

        {categories.map((category) => {
          const items = componentsMeta.filter((c) => c.category === category);
          if (items.length === 0) return null;
          return (
            <section key={category} className="mb-12">
              <h2 className="font-[family-name:var(--pixel-font)] text-sm uppercase tracking-widest text-primary mb-4">
                {category} ({items.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((comp) => {
                  const Demo = componentDemos[comp.name];
                  return (
                    <div
                      key={comp.name}
                      role="button"
                      tabIndex={0}
                      onClick={() => router.push(`/docs/components/${comp.name}`)}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") router.push(`/docs/components/${comp.name}`); }}
                    >
                      <PixelCard className="h-full hover:border-primary transition-colors cursor-pointer">
                        <PixelCardHeader>
                          <PixelCardTitle className="text-xs">{comp.title}</PixelCardTitle>
                          <PixelCardDescription className="text-[10px]">{comp.description}</PixelCardDescription>
                        </PixelCardHeader>
                        <PixelCardContent>
                          <div className="flex min-h-[80px] items-center justify-center border-2 border-dashed border-border p-4 overflow-hidden">
                            {Demo ? <Demo /> : <span className="text-[10px] text-muted-foreground">No preview</span>}
                          </div>
                        </PixelCardContent>
                      </PixelCard>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { componentsMeta, categories } from "@/lib/components";
import { componentDemos } from "@/components/component-demos";
import { PixelCard, PixelCardContent, PixelCardHeader, PixelCardTitle, PixelCardDescription } from "@/components/ui/card";
import { PixelButton } from "@/components/ui/button";

export default function ComponentsPage() {
  return (
    <div className="px-4 py-12 pb-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-[family-name:var(--pixel-font)] text-2xl uppercase tracking-widest mb-2">Components</h1>
        <p className="text-sm text-muted-foreground mb-8">
          {componentsMeta.length} pixel art components. Try them live below, or open a component for code and details.
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
                    <PixelCard key={comp.name} className="h-full flex flex-col hover:border-primary transition-colors">
                      <PixelCardHeader className="pb-2">
                        <PixelCardTitle className="text-xs">{comp.title}</PixelCardTitle>
                        <PixelCardDescription className="text-[0.7rem] leading-relaxed">{comp.description}</PixelCardDescription>
                      </PixelCardHeader>

                      {/* Interactive preview — NOT wrapped in a nav handler so users can test it */}
                      <PixelCardContent className="flex-1">
                        <div className="pixel-demo flex min-h-[110px] min-w-0 items-center justify-center-safe border-2 border-dashed border-border p-4 overflow-x-auto">
                          {Demo ? <Demo /> : <span className="text-[0.7rem] text-muted-foreground">No preview</span>}
                        </div>
                      </PixelCardContent>

                      {/* Explicit navigation button */}
                      <div className="px-6 pb-5 pt-1">
                        <PixelButton
                          variant="ghost"
                          size="sm"
                          className="w-full justify-between text-left text-[0.7rem]"
                          asChild
                        >
                          <Link href={`/docs/components/${comp.name}`}>
                            <span className="min-w-0 break-words">View {comp.title}</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </Link>
                        </PixelButton>
                      </div>
                    </PixelCard>
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

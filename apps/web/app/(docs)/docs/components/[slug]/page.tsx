"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { getComponentMeta, componentsMeta } from "@/lib/components";
import { componentDemos } from "@/components/component-demos";
import { PixelBadge } from "@/components/ui/badge";
import { PixelCard, PixelCardContent, PixelCardHeader, PixelCardTitle } from "@/components/ui/card";
import { PixelButton } from "@/components/ui/button";

export default function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const meta = getComponentMeta(slug);

  // prev / next
  const idx = componentsMeta.findIndex((c) => c.name === slug);
  const prev = idx > 0 ? componentsMeta[idx - 1] : null;
  const next = idx < componentsMeta.length - 1 ? componentsMeta[idx + 1] : null;

  if (!meta) {
    return (
      <div className="px-6 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-[family-name:var(--pixel-font)] text-xl uppercase tracking-widest mb-4">Component not found</h1>
          <Link href="/docs/components">
            <PixelButton variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Components
            </PixelButton>
          </Link>
        </div>
      </div>
    );
  }

  const Demo = componentDemos[meta.name];
  const installCmd = `npx shadcn@latest init https://pixelcn.vercel.app/r/pixelcn.json && npx shadcn@latest add https://pixelcn.vercel.app/r/${meta.name}.json`;

  return (
    <div className="px-6 py-8">
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <Link href="/docs/components" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-3 w-3" /> All Components
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-[family-name:var(--pixel-font)] text-xl uppercase tracking-widest">{meta.title}</h1>
            <PixelBadge variant="outline">{meta.category}</PixelBadge>
          </div>
          <p className="text-sm text-muted-foreground">{meta.description}</p>
        </div>

        {/* Preview */}
        <PixelCard className="mb-6">
          <PixelCardHeader>
            <PixelCardTitle className="text-xs">Preview</PixelCardTitle>
          </PixelCardHeader>
          <PixelCardContent>
            <div className="flex min-h-[140px] items-center justify-center border-2 border-dashed border-border p-6 overflow-hidden">
              {Demo ? <Demo /> : <span className="text-xs text-muted-foreground">No preview available</span>}
            </div>
          </PixelCardContent>
        </PixelCard>

        {/* Install */}
        <PixelCard className="mb-6">
          <PixelCardHeader>
            <PixelCardTitle className="text-xs">Installation</PixelCardTitle>
          </PixelCardHeader>
          <PixelCardContent>
            <pre className="border-2 border-border bg-muted p-4 text-xs overflow-x-auto font-mono whitespace-pre-wrap">
              {installCmd}
            </pre>
            <p className="mt-2 text-[10px] text-muted-foreground">
              Registry hosted at{" "}
              <a href="https://pixelcn.vercel.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                pixelcn.vercel.app
              </a>
              . Requires shadcn/ui base configuration.
            </p>
          </PixelCardContent>
        </PixelCard>

        {/* Prev / Next */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t-2 border-border">
          {prev ? (
            <Link href={`/docs/components/${prev.name}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary">
              <ChevronLeft className="h-4 w-4" />
              <span className="uppercase tracking-widest">{prev.title}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/docs/components/${next.name}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary">
              <span className="uppercase tracking-widest">{next.title}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : <span />}
        </div>
      </div>
    </div>
  );
}

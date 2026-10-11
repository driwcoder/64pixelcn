"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getComponentMeta } from "@/lib/components";
import { componentDemos } from "@/components/component-demos";
import { PixelBadge } from "@/components/ui/badge";
import { PixelCard, PixelCardContent, PixelCardHeader, PixelCardTitle } from "@/components/ui/card";
import { PixelButton } from "@/components/ui/button";

export default function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const meta = getComponentMeta(slug);

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
  const installCmd = `npx shadcn@latest add <your-url>/r/${meta.name}.json`;

  return (
    <div className="px-6 py-12">
      <div className="mx-auto max-w-4xl">
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
            <div className="flex min-h-[120px] items-center justify-center border-2 border-dashed border-border p-6">
              {Demo ? <Demo /> : <span className="text-xs text-muted-foreground">No preview available</span>}
            </div>
          </PixelCardContent>
        </PixelCard>

        {/* Install */}
        <PixelCard>
          <PixelCardHeader>
            <PixelCardTitle className="text-xs">Installation</PixelCardTitle>
          </PixelCardHeader>
          <PixelCardContent>
            <pre className="border-2 border-border bg-muted p-4 text-xs overflow-x-auto font-mono">
              {installCmd}
            </pre>
            <p className="mt-2 text-[10px] text-muted-foreground">
              Replace &lt;your-url&gt; with your deployed registry URL. Requires shadcn/ui base configuration.
            </p>
          </PixelCardContent>
        </PixelCard>
      </div>
    </div>
  );
}

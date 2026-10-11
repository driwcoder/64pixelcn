"use client";

import * as React from "react";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Check, Copy } from "lucide-react";
import { getComponentMeta, componentsMeta } from "@/lib/components";
import { getCodeSnippet } from "@/lib/code-snippets";
import { componentDemos } from "@/components/component-demos";
import { PixelBadge } from "@/components/ui/badge";
import { PixelCard, PixelCardContent, PixelCardHeader, PixelCardTitle } from "@/components/ui/card";
import { PixelButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Tab = "preview" | "code";

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative">
      <button
        onClick={copy}
        aria-label="Copy code"
        className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center border-2 border-foreground bg-popover text-muted-foreground hover:text-primary transition-colors"
      >
        {copied ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <Copy className="h-3.5 w-3.5" strokeWidth={3} />}
      </button>
      <pre className="overflow-x-auto border-2 border-border bg-muted p-4 pr-12 font-mono text-[11px] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const meta = getComponentMeta(slug);
  const [tab, setTab] = React.useState<Tab>("preview");

  // prev / next
  const idx = componentsMeta.findIndex((c) => c.name === slug);
  const prev = idx > 0 ? componentsMeta[idx - 1] : null;
  const next = idx < componentsMeta.length - 1 ? componentsMeta[idx + 1] : null;

  if (!meta) {
    return (
      <div className="px-6 py-12 pb-24">
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
  const usageCode = getCodeSnippet(meta.name);

  return (
    <div className="px-6 pt-4 pb-24">
      <div className="mx-auto max-w-3xl">
        {/* ── Top prev / next ─────────────────────────────────── */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-border">
          {prev ? (
            <Link href={`/docs/components/${prev.name}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
              <ChevronLeft className="h-4 w-4" />
              <span className="uppercase tracking-widest">{prev.title}</span>
            </Link>
          ) : (
            <Link href="/docs/components" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
              <ChevronLeft className="h-4 w-4" />
              <span className="uppercase tracking-widest">All</span>
            </Link>
          )}
          {next ? (
            <Link href={`/docs/components/${next.name}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
              <span className="uppercase tracking-widest">{next.title}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link href="/docs/components" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
              <span className="uppercase tracking-widest">All</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-[family-name:var(--pixel-font)] text-xl uppercase tracking-widest">{meta.title}</h1>
            <PixelBadge variant="outline">{meta.category}</PixelBadge>
          </div>
          <p className="text-sm text-muted-foreground">{meta.description}</p>
        </div>

        {/* ── Preview / Code tabs ─────────────────────────────── */}
        <PixelCard className="mb-6">
          <div className="flex items-center gap-1 border-b-2 border-border px-4 pt-3">
            <button
              onClick={() => setTab("preview")}
              className={cn(
                "px-3 py-1.5 font-[family-name:var(--pixel-font)] text-[10px] uppercase tracking-widest transition-colors",
                tab === "preview" ? "bg-primary text-primary-foreground border-2 border-b-0 border-foreground" : "text-muted-foreground hover:text-primary"
              )}
            >
              Preview
            </button>
            <button
              onClick={() => setTab("code")}
              className={cn(
                "px-3 py-1.5 font-[family-name:var(--pixel-font)] text-[10px] uppercase tracking-widest transition-colors",
                tab === "code" ? "bg-primary text-primary-foreground border-2 border-b-0 border-foreground" : "text-muted-foreground hover:text-primary"
              )}
            >
              Code
            </button>
          </div>

          <PixelCardContent className="pt-6">
            {tab === "preview" ? (
              <div className="flex min-h-[180px] items-center justify-center border-2 border-dashed border-border p-6 overflow-hidden">
                {Demo ? <Demo /> : <span className="text-xs text-muted-foreground">No preview available</span>}
              </div>
            ) : (
              <CodeBlock code={usageCode} />
            )}
          </PixelCardContent>
        </PixelCard>

        {/* Install */}
        <PixelCard className="mb-6">
          <PixelCardHeader>
            <PixelCardTitle className="text-xs">Installation</PixelCardTitle>
          </PixelCardHeader>
          <PixelCardContent>
            <CodeBlock code={installCmd} />
            <p className="mt-2 text-[10px] text-muted-foreground">
              Registry hosted at{" "}
              <a href="https://pixelcn.vercel.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                pixelcn.vercel.app
              </a>
              . Requires shadcn/ui base configuration.
            </p>
          </PixelCardContent>
        </PixelCard>

        {/* ── Bottom prev / next ──────────────────────────────── */}
        <div className="flex items-center justify-between gap-4 pt-6 border-t-2 border-border">
          {prev ? (
            <Link href={`/docs/components/${prev.name}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
              <ChevronLeft className="h-4 w-4" />
              <span className="uppercase tracking-widest">{prev.title}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/docs/components/${next.name}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
              <span className="uppercase tracking-widest">{next.title}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : <span />}
        </div>
      </div>
    </div>
  );
}

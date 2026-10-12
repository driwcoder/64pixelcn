import { readFileSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { PixelCard, PixelCardContent, PixelCardHeader, PixelCardTitle } from "@/components/ui/card";

const pre =
  "max-h-[32rem] overflow-auto border-[length:var(--pixel-line,2px)] border-border bg-muted p-4 font-mono text-[0.6875rem] leading-relaxed";

/**
 * A playable example from public/examples/<slug>/index.html: the game in an
 * iframe plus its full source, read at build time so the two never drift.
 */
export function KitExample({
  slug,
  title,
  intro,
  steps,
  height = 520,
}: {
  slug: string;
  title: string;
  intro: React.ReactNode;
  steps: React.ReactNode[];
  height?: number;
}) {
  const src = `/examples/${slug}/index.html`;
  const code = readFileSync(join(process.cwd(), "public", "examples", slug, "index.html"), "utf8");
  return (
    <div className="px-4 py-8 pb-24 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-6 text-[0.75rem] leading-relaxed">
        <div>
          <Link href="/kits" className="mb-3 inline-block text-xs text-muted-foreground hover:text-primary">&larr; Engine kits</Link>
          <h1 className="mb-2 text-xl uppercase tracking-widest">{title}</h1>
          <div className="text-muted-foreground">{intro}</div>
        </div>

        <PixelCard>
          <PixelCardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <PixelCardTitle className="text-xs">Play</PixelCardTitle>
              <a className="text-xs text-primary underline underline-offset-4" href={src} target="_blank" rel="noopener noreferrer">Open full screen</a>
            </div>
          </PixelCardHeader>
          <PixelCardContent>
            <iframe src={src} title={`${title} demo`} className="block w-full border-[length:var(--pixel-line,2px)] border-border bg-background" style={{ height }} />
          </PixelCardContent>
        </PixelCard>

        <PixelCard>
          <PixelCardHeader>
            <PixelCardTitle className="text-xs">Make it yours</PixelCardTitle>
          </PixelCardHeader>
          <PixelCardContent>
            <ol className="list-decimal space-y-1 pl-5">{steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
          </PixelCardContent>
        </PixelCard>

        <PixelCard>
          <PixelCardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <PixelCardTitle className="text-xs">Source (one file)</PixelCardTitle>
              <a className="text-xs text-primary underline underline-offset-4" href={src} download="index.html">Download</a>
            </div>
          </PixelCardHeader>
          <PixelCardContent>
            <pre className={pre}><code>{code}</code></pre>
          </PixelCardContent>
        </PixelCard>
      </div>
    </div>
  );
}

import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — 64pixelcn",
  description: "What changed in each pixelcn release.",
};

/** Inline `code` and **bold** in a changelog line. */
function inline(text: string) {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    if (part.startsWith("`")) return <code key={i} className="inline-block max-w-full border-2 border-border bg-muted px-1 align-middle font-mono text-[0.9em] wrap-anywhere">{part.slice(1, -1)}</code>;
    if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={i} href={link[2]} className="text-primary underline underline-offset-4">{link[1]}</a>;
    return part;
  });
}

// Rendered at build time from apps/web/CHANGELOG.md (the source of truth), so
// the file is never read at runtime (it is not part of the serverless bundle).
export const dynamic = "force-static";

export default function ChangelogPage() {
  const md = readFileSync(join(process.cwd(), "CHANGELOG.md"), "utf-8").replace(/\r\n/g, "\n");
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  let para: string[] = [];
  const flush = () => {
    if (list.length) blocks.push(<ul key={blocks.length} className="mb-4 list-disc space-y-2 pl-5">{list.map((l, i) => <li key={i}>{inline(l)}</li>)}</ul>);
    if (para.length) blocks.push(<p key={blocks.length} className="mb-4">{inline(para.join(" "))}</p>);
    list = [];
    para = [];
  };
  for (const line of md.split("\n")) {
    if (line.startsWith("# ")) continue; // page title below
    if (line.startsWith("## ")) {
      flush();
      blocks.push(<h2 key={blocks.length} className="mb-3 mt-8 border-b-2 border-border pb-2 text-base uppercase tracking-widest">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      flush();
      blocks.push(<h3 key={blocks.length} className="mb-2 mt-4 text-xs uppercase tracking-widest text-muted-foreground">{line.slice(4)}</h3>);
    } else if (line.startsWith("- ")) {
      if (para.length) flush();
      list.push(line.slice(2));
    } else if (line.trim() === "") {
      flush();
    } else if (list.length) {
      list[list.length - 1] += ` ${line.trim()}`;
    } else {
      para.push(line.trim());
    }
  }
  flush();

  return (
    <div className="px-4 py-8 pb-24 sm:px-6">
      <div className="mx-auto max-w-3xl text-[0.75rem] leading-relaxed">
        <h1 className="mb-6 text-xl uppercase tracking-widest">Changelog</h1>
        {blocks}
      </div>
    </div>
  );
}

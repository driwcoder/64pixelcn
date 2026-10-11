import Link from "next/link";
import { PixelBadge } from "@/components/ui/badge";
import { componentsMeta } from "@/lib/components";
import { PixelNavButton } from "@/components/pixel-nav";

const SECTIONS = [
  { href: "/docs", label: "Get Started" },
  { href: "/docs/components", label: "Components" },
  { href: "/docs/blocks", label: "Blocks" },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* ── Top header ─────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b-2 border-foreground bg-background/95 backdrop-blur px-6 py-3">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="font-[family-name:var(--pixel-font)] text-lg uppercase tracking-widest">64pixelcn</span>
            <PixelBadge variant="outline" className="text-[8px]">v0.1.0</PixelBadge>
          </Link>
          <nav className="flex items-center gap-1">
            {SECTIONS.map((s) => (
              <PixelNavButton key={s.href} href={s.href}>{s.label}</PixelNavButton>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl flex">
        {/* ── Left sidebar (component list) ─────────────────── */}
        <aside className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-56 shrink-0 overflow-y-auto border-r-2 border-foreground px-4 py-6 lg:block">
          <div className="mb-3 font-[family-name:var(--pixel-font)] text-[10px] uppercase tracking-widest text-muted-foreground">
            Sections
          </div>
          <nav className="mb-6 flex flex-col gap-1">
            {SECTIONS.map((s) => (
              <PixelNavButton key={s.href} href={s.href} block>{s.label}</PixelNavButton>
            ))}
          </nav>

          <div className="mb-3 font-[family-name:var(--pixel-font)] text-[10px] uppercase tracking-widest text-muted-foreground">
            Components ({componentsMeta.length})
          </div>
          <nav className="flex flex-col gap-0.5">
            {componentsMeta.map((c) => (
              <PixelNavButton key={c.name} href={`/docs/components/${c.name}`} block small>
                {c.title}
              </PixelNavButton>
            ))}
          </nav>
        </aside>

        {/* ── Main content ──────────────────────────────────── */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

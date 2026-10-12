import Link from "next/link";
import { PixelBadge } from "@/components/ui/badge";
import { PixelNavButton } from "@/components/pixel-nav";
import { PixelControls } from "@/components/pixel-controls";
import { DocsMobileNav, DocsSidebarNav } from "@/components/docs-nav";
import { SECTIONS } from "@/lib/docs-sections";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* ── Top header (fixed). Height in rem so the sidebar offset below
             tracks it at every text size. ─────────────────────────── */}
      <header className="sticky top-0 z-40 h-14 shrink-0 border-b-2 border-foreground bg-background/95 backdrop-blur px-4 sm:px-6">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <DocsMobileNav />
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <span className="truncate font-[family-name:var(--pixel-font)] text-base sm:text-lg uppercase tracking-widest">64pixelcn</span>
              <PixelBadge variant="outline" className="hidden text-[0.6rem] sm:inline-flex">v0.1.0</PixelBadge>
            </Link>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            {SECTIONS.map((s) => (
              <PixelNavButton key={s.href} href={s.href}>{s.label}</PixelNavButton>
            ))}
          </nav>
          <div className="flex shrink-0 items-center">
            <PixelControls />
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1">
        {/* ── Left sidebar (scrolls independently) ───────────── */}
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-56 shrink-0 self-start overflow-y-auto border-r-2 border-foreground px-4 py-6 lg:block">
          <DocsSidebarNav />
        </aside>

        {/* ── Main content ───────────────────────────────────── */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

import Link from "next/link";
import { PixelBadge } from "@/components/ui/badge";
import { PixelNavButton } from "@/components/pixel-nav";
import { PixelControls } from "@/components/pixel-controls";
import { DocsMobileNav } from "@/components/docs-nav";
import { SECTIONS } from "@/lib/docs-sections";
import { VERSION } from "@/lib/version";

// Sticky top bar shared by the docs and /create layouts. Height is in rem
// (h-14) so offsets below it (top-14, 100dvh-3.5rem) track every text size.
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 h-14 shrink-0 border-b-[length:var(--pixel-line,2px)] border-foreground bg-background/95 backdrop-blur px-4 sm:px-6">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <DocsMobileNav />
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="truncate font-[family-name:var(--pixel-font)] text-base sm:text-lg uppercase tracking-widest">64pixelcn</span>
            <PixelBadge variant="outline" className="hidden text-[0.6rem] sm:inline-flex">v{VERSION}</PixelBadge>
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
  );
}

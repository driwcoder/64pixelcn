import { DocsSidebarNav } from "@/components/docs-nav";
import { SiteHeader } from "@/components/site-header";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

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

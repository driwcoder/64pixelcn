"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Menu } from "@/components/ui/icons";
import { componentsMeta } from "@/lib/components";
import { SECTIONS } from "@/lib/docs-sections";
import { PixelNavButton } from "@/components/pixel-nav";
import {
  PixelSheet,
  PixelSheetContent,
  PixelSheetTitle,
  PixelSheetTrigger,
} from "@/components/ui/sheet";

/** Section + component links; shared by the desktop sidebar and mobile sheet. */
export function DocsSidebarNav() {
  return (
    <>
      <div className="mb-2 font-[family-name:var(--pixel-font)] text-[0.7rem] uppercase tracking-widest text-muted-foreground">
        Sections
      </div>
      <nav className="mb-5 flex flex-col gap-1">
        {SECTIONS.map((s) => (
          <PixelNavButton key={s.href} href={s.href} block>{s.label}</PixelNavButton>
        ))}
        <PixelNavButton href="/docs/changelog" block>Changelog</PixelNavButton>
      </nav>

      <div className="mb-2 font-[family-name:var(--pixel-font)] text-[0.7rem] uppercase tracking-widest text-muted-foreground">
        Components ({componentsMeta.length})
      </div>
      <nav className="flex flex-col gap-0.5 pb-6">
        {componentsMeta.map((c) => (
          <PixelNavButton key={c.name} href={`/docs/components/${c.name}`} block small>
            {c.title}
          </PixelNavButton>
        ))}
      </nav>
    </>
  );
}

/** Hamburger + slide-in sheet, shown where the sidebar is hidden (< lg). */
export function DocsMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [lastPathname, setLastPathname] = React.useState(pathname);

  // Close once the navigation lands (the sheet stays up while it's pending,
  // so the optimistic highlight on the tapped link is visible).
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  return (
    <PixelSheet open={open} onOpenChange={setOpen}>
      <PixelSheetTrigger
        aria-label="Open navigation"
        className="flex h-9 w-9 shrink-0 items-center justify-center border-[length:var(--pixel-line,2px)] border-foreground text-foreground transition-colors hover:bg-accent hover:text-accent-foreground lg:hidden"
      >
        <Menu className="h-4 w-4" strokeWidth={3} />
      </PixelSheetTrigger>
      <PixelSheetContent side="left" className="flex w-[85vw] max-w-xs flex-col overflow-y-auto px-4 pt-6">
        <PixelSheetTitle className="mb-4 pr-8">64pixelcn</PixelSheetTitle>
        <DocsSidebarNav />
      </PixelSheetContent>
    </PixelSheet>
  );
}

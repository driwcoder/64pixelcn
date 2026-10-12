"use client";

import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface PixelNavButtonProps {
  href: string;
  children: React.ReactNode;
  block?: boolean;
  small?: boolean;
}

/** Marks the parent link as pending while its navigation is in flight. */
function PendingMarker() {
  const { pending } = useLinkStatus();
  return <span aria-hidden data-pending={pending || undefined} className="hidden" />;
}

export function PixelNavButton({ href, children, block, small }: PixelNavButtonProps) {
  const pathname = usePathname();
  // exact match for index, prefix for sub-routes
  const active = href === "/docs" ? pathname === "/docs" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "font-[family-name:var(--pixel-font)] uppercase tracking-widest leading-relaxed transition-colors break-words",
        small ? "px-2 py-1 text-[0.7rem]" : "px-3 py-2 text-[0.7rem]",
        block ? "block w-full text-left" : "inline-block",
        active
          ? "bg-primary text-primary-foreground border-[length:var(--pixel-line,2px)] border-foreground"
          : "text-muted-foreground hover:text-primary border-[length:var(--pixel-line,2px)] border-transparent hover:bg-accent/50",
        // Optimistic: highlight the clicked link immediately, before the
        // route finishes loading.
        "has-[[data-pending]]:bg-primary has-[[data-pending]]:text-primary-foreground has-[[data-pending]]:border-foreground"
      )}
    >
      {children}
      <PendingMarker />
    </Link>
  );
}

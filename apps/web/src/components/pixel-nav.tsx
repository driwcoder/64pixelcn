"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface PixelNavButtonProps {
  href: string;
  children: React.ReactNode;
  block?: boolean;
  small?: boolean;
}

export function PixelNavButton({ href, children, block, small }: PixelNavButtonProps) {
  const pathname = usePathname();
  // exact match for index, prefix for sub-routes
  const active = href === "/docs" ? pathname === "/docs" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "font-[family-name:var(--pixel-font)] uppercase tracking-widest transition-colors",
        small ? "px-2 py-1 text-[10px]" : "px-3 py-2 text-[10px]",
        block ? "block w-full text-left" : "inline-block",
        active
          ? "bg-primary text-primary-foreground border-2 border-foreground"
          : "text-muted-foreground hover:text-primary border-2 border-transparent",
        "hover:bg-accent/50"
      )}
    >
      {children}
    </Link>
  );
}

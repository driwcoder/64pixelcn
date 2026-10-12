import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { PixelButton } from "./button";

const PixelPagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav role="navigation" aria-label="pagination" data-slot="pagination" className={cn("mx-auto flex w-full justify-center font-[family-name:var(--pixel-font)]", className)} {...props} />
);
PixelPagination.displayName = "PixelPagination";

const PixelPaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} data-slot="pagination-content" className={cn("flex flex-row flex-wrap items-center justify-center gap-1", className)} {...props} />
  )
);
PixelPaginationContent.displayName = "PixelPaginationContent";

const PixelPaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => <li ref={ref} data-slot="pagination-item" className={cn("", className)} {...props} />
);
PixelPaginationItem.displayName = "PixelPaginationItem";

type PixelPaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof PixelButton>, "size"> & React.ComponentProps<"a">;

// Renders a real <a> (via asChild) so pages are links, not buttons with href.
const PixelPaginationLink = ({ className, isActive, size = "icon", ...props }: PixelPaginationLinkProps) => (
  <PixelButton asChild variant={isActive ? "default" : "ghost"} size={size} className={cn("min-w-9", className)}>
    <a aria-current={isActive ? "page" : undefined} {...props} />
  </PixelButton>
);
PixelPaginationLink.displayName = "PixelPaginationLink";

const PixelPaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PixelPaginationLink>) => (
  <PixelPaginationLink aria-label="Go to previous page" size="default" className={cn("gap-1 px-2.5", className)} {...props}>
    <ChevronLeft className="h-4 w-4" strokeWidth={3} />
    <span className="hidden sm:block">Prev</span>
  </PixelPaginationLink>
);
PixelPaginationPrevious.displayName = "PixelPaginationPrevious";

const PixelPaginationNext = ({ className, ...props }: React.ComponentProps<typeof PixelPaginationLink>) => (
  <PixelPaginationLink aria-label="Go to next page" size="default" className={cn("gap-1 px-2.5", className)} {...props}>
    <span className="hidden sm:block">Next</span>
    <ChevronRight className="h-4 w-4" strokeWidth={3} />
  </PixelPaginationLink>
);
PixelPaginationNext.displayName = "PixelPaginationNext";

const PixelPaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span aria-hidden data-slot="pagination-ellipsis" className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>
    <MoreHorizontal className="h-4 w-4" strokeWidth={3} />
    <span className="sr-only">More pages</span>
  </span>
);
PixelPaginationEllipsis.displayName = "PixelPaginationEllipsis";

export {
  PixelPagination, PixelPaginationContent, PixelPaginationLink, PixelPaginationItem,
  PixelPaginationPrevious, PixelPaginationNext, PixelPaginationEllipsis,
};

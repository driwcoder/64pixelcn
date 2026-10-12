import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "./icons";
import { cn } from "@/lib/utils";

const PixelBreadcrumb = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<"nav">>(({ ...props }, ref) => (
  <nav ref={ref} aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
));
PixelBreadcrumb.displayName = "PixelBreadcrumb";

const PixelBreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      data-slot="breadcrumb-list"
      className={cn("flex flex-wrap items-center gap-1.5 font-[family-name:var(--pixel-font)] text-xs", className)}
      {...props}
    />
  )
);
PixelBreadcrumbList.displayName = "PixelBreadcrumbList";

const PixelBreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} data-slot="breadcrumb-item" className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  )
);
PixelBreadcrumbItem.displayName = "PixelBreadcrumbItem";

const PixelBreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & { asChild?: boolean }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return <Comp ref={ref} data-slot="breadcrumb-link" className={cn("transition-colors hover:text-primary", className)} {...props} />;
});
PixelBreadcrumbLink.displayName = "PixelBreadcrumbLink";

const PixelBreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span ref={ref} data-slot="breadcrumb-page" role="link" aria-disabled="true" aria-current="page"
      className={cn("text-muted-foreground", className)} {...props} />
  )
);
PixelBreadcrumbPage.displayName = "PixelBreadcrumbPage";

const PixelBreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li data-slot="breadcrumb-separator" role="presentation" aria-hidden="true"
    className={cn("[&>svg]:size-3.5 text-muted-foreground", className)} {...props}>
    {children ?? <ChevronRight strokeWidth={3} />}
  </li>
);

const PixelBreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span data-slot="breadcrumb-ellipsis" role="presentation" aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);

export {
  PixelBreadcrumb, PixelBreadcrumbList, PixelBreadcrumbItem, PixelBreadcrumbLink,
  PixelBreadcrumbPage, PixelBreadcrumbSeparator, PixelBreadcrumbEllipsis,
};

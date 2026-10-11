import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const markerVariants = cva(
  "inline-block px-1 font-[family-name:var(--pixel-font)]",
  {
    variants: {
      variant: {
        highlight: "bg-primary/30",
        underline: "underline decoration-2 underline-offset-2 decoration-primary",
        strike: "line-through decoration-2",
      },
    },
    defaultVariants: { variant: "highlight" },
  }
);

const PixelMarker = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & VariantProps<typeof markerVariants>
>(({ className, variant, ...props }, ref) => (
  <mark ref={ref} data-slot="marker" className={cn(markerVariants({ variant }), className)} {...props} />
));
PixelMarker.displayName = "PixelMarker";

export { PixelMarker, markerVariants };

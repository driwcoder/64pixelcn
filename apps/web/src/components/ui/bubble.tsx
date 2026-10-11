import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bubbleVariants = cva(
  "inline-block border-2 border-foreground px-3 py-2 text-xs font-[family-name:var(--pixel-font)] break-words",
  {
    variants: {
      variant: { default: "bg-primary text-primary-foreground", secondary: "bg-muted text-muted-foreground", outline: "bg-transparent text-foreground" },
      side: { left: "self-start rounded-none", right: "self-end rounded-none" },
    },
    defaultVariants: { variant: "default", side: "left" },
  }
);

const PixelBubble = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof bubbleVariants>
>(({ className, variant, side, ...props }, ref) => (
  <div ref={ref} data-slot="bubble" className={cn(bubbleVariants({ variant, side }), className)} {...props} />
));
PixelBubble.displayName = "PixelBubble";

export { PixelBubble, bubbleVariants };

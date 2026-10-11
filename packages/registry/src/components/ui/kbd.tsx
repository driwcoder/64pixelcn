import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const kbdVariants = cva(
  "pointer-events-none inline-flex select-none items-center justify-center gap-1 border-2 border-foreground bg-muted font-[family-name:var(--pixel-font)] uppercase",
  {
    variants: {
      size: {
        default: "h-6 min-w-6 px-1 text-[10px]",
        sm: "h-5 min-w-5 px-0.5 text-[8px]",
        lg: "h-8 min-w-8 px-2 text-xs",
      },
    },
    defaultVariants: { size: "default" },
  }
);

const Kbd = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof kbdVariants>
>(({ className, size, ...props }, ref) => (
  <div ref={ref} data-slot="kbd" className={cn(kbdVariants({ size }), className)} {...props} />
));
Kbd.displayName = "Kbd";

const KbdGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} data-slot="kbd-group" className={cn("inline-flex items-center gap-1", className)} {...props} />
));
KbdGroup.displayName = "KbdGroup";

export { Kbd as PixelKbd, KbdGroup as PixelKbdGroup, kbdVariants };

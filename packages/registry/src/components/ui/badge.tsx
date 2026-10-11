import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pixelBadgeVariants = cva(
  "inline-flex items-center border-2 border-foreground px-2.5 py-0.5 font-[family-name:var(--pixel-font)] text-[10px] uppercase tracking-widest",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "bg-transparent text-foreground",
        muted: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface PixelBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pixelBadgeVariants> {}

function PixelBadge({ className, variant, ...props }: PixelBadgeProps) {
  return <div data-slot="badge" className={cn(pixelBadgeVariants({ variant }), className)} {...props} />;
}

export { PixelBadge, pixelBadgeVariants };

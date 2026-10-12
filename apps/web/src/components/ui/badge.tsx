import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pixelBadgeVariants = cva(
  "inline-flex items-center pixel-rounded border-[length:var(--pixel-line,2px)] border-foreground px-[0.9em] py-[0.3em] font-[family-name:var(--pixel-font)] text-[0.7rem] leading-normal uppercase tracking-widest",
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

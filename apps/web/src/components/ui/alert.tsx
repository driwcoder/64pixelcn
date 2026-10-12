import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pixelAlertVariants = cva(
  [
    "relative grid w-full grid-cols-[0_1fr] items-start gap-y-[0.35em] pixel-rounded border-2 border-foreground px-4 py-3 font-[family-name:var(--pixel-font)] pixel-shadow",
    // A direct child icon gets its own column on the left, with a gap that
    // scales with the font, instead of stacking on top of the title.
    "has-[>svg]:grid-cols-[1.25em_1fr] has-[>svg]:gap-x-[0.9em] [&>svg]:size-[1.25em] [&>svg]:translate-y-[0.05em] [&>svg]:text-current",
  ],
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        info: "bg-accent/20 text-accent-foreground border-accent",
        warning: "bg-yellow-500/20 text-yellow-200 border-yellow-500",
        destructive: "bg-destructive/20 text-destructive border-destructive",
        success: "bg-green-500/20 text-green-200 border-green-500",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

const PixelAlert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof pixelAlertVariants>>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} data-slot="alert" role="alert" className={cn(pixelAlertVariants({ variant }), className)} {...props} />
  )
);
PixelAlert.displayName = "PixelAlert";

const PixelAlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} data-slot="alert-title" className={cn("col-start-2 text-xs uppercase leading-snug tracking-widest", className)} {...props} />
  )
);
PixelAlertTitle.displayName = "PixelAlertTitle";

const PixelAlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="alert-description" className={cn("col-start-2 text-xs leading-relaxed [&_p]:leading-relaxed", className)} {...props} />
  )
);
PixelAlertDescription.displayName = "PixelAlertDescription";

export { PixelAlert, PixelAlertTitle, PixelAlertDescription, pixelAlertVariants };

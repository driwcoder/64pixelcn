import * as React from "react";
import { cn } from "@/lib/utils";

const PixelCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-4 border-2 border-foreground",
        "shadow-[var(--pixel-shadow)]",
        className
      )}
      {...props}
    />
  )
);
PixelCard.displayName = "PixelCard";

const PixelCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="card-header" className={cn("flex flex-col gap-1.5 px-6 pt-6", className)} {...props} />
  )
);
PixelCardHeader.displayName = "PixelCardHeader";

const PixelCardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-title"
      className={cn("font-[family-name:var(--pixel-font)] text-sm uppercase leading-none tracking-widest", className)}
      {...props}
    />
  )
);
PixelCardTitle.displayName = "PixelCardTitle";

const PixelCardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-description"
      className={cn("font-[family-name:var(--pixel-font)] text-xs text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  )
);
PixelCardDescription.displayName = "PixelCardDescription";

const PixelCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="card-content" className={cn("px-6", className)} {...props} />
  )
);
PixelCardContent.displayName = "PixelCardContent";

const PixelCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="card-footer" className={cn("flex items-center px-6 pb-6", className)} {...props} />
  )
);
PixelCardFooter.displayName = "PixelCardFooter";

export { PixelCard, PixelCardHeader, PixelCardTitle, PixelCardDescription, PixelCardContent, PixelCardFooter };

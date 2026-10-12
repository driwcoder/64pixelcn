import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

const PixelProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    data-slot="progress"
    className={cn("relative h-4 w-full overflow-hidden border-[length:var(--pixel-line,2px)] border-foreground bg-muted", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full bg-primary transition-all"
      style={{
        width: `${value || 0}%`,
        backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
      }}
    />
  </ProgressPrimitive.Root>
));
PixelProgress.displayName = "PixelProgress";

export { PixelProgress };

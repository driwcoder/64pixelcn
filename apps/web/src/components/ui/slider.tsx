import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

const PixelSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    data-slot="slider"
    className={cn("relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50", className)}
    {...props}
  >
    <SliderPrimitive.Track data-slot="slider-track" className="relative h-2 w-full grow overflow-hidden border-[length:var(--pixel-line,2px)] border-foreground bg-muted">
      <SliderPrimitive.Range data-slot="slider-range" className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      className="block h-5 w-5 border-[length:var(--pixel-line,2px)] border-foreground bg-background shadow-[1px_1px_0px_var(--foreground)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderPrimitive.Root>
));
PixelSlider.displayName = "PixelSlider";

export { PixelSlider };

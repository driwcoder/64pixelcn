import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const PixelTooltipProvider = TooltipPrimitive.Provider;
const PixelTooltip = TooltipPrimitive.Root;
const PixelTooltipTrigger = TooltipPrimitive.Trigger;

const PixelTooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      data-slot="tooltip-content"
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden pixel-rounded border-[length:var(--pixel-line,2px)] border-foreground bg-popover px-3 py-1.5 text-xs text-popover-foreground pixel-shadow",
        "font-[family-name:var(--pixel-font)]",
        "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
PixelTooltipContent.displayName = "PixelTooltipContent";

export { PixelTooltip, PixelTooltipTrigger, PixelTooltipContent, PixelTooltipProvider };

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

const PixelPopover = PopoverPrimitive.Root;
const PixelPopoverTrigger = PopoverPrimitive.Trigger;
const PixelPopoverAnchor = PopoverPrimitive.Anchor;

const PixelPopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      data-slot="popover-content"
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 pixel-rounded border-[length:var(--pixel-line,2px)] border-foreground bg-popover p-4 text-popover-foreground pixel-shadow outline-none",
        "font-[family-name:var(--pixel-font)]",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PixelPopoverContent.displayName = "PixelPopoverContent";

export { PixelPopover, PixelPopoverTrigger, PixelPopoverContent, PixelPopoverAnchor };

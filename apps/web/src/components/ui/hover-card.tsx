import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "@/lib/utils";

const PixelHoverCard = HoverCardPrimitive.Root;
const PixelHoverCardTrigger = HoverCardPrimitive.Trigger;

const PixelHoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content
      ref={ref}
      data-slot="hover-card-content"
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-64 pixel-rounded border-2 border-foreground bg-popover p-4 text-popover-foreground pixel-shadow outline-none",
        "font-[family-name:var(--pixel-font)]",
        className
      )}
      {...props}
    />
  </HoverCardPrimitive.Portal>
));
PixelHoverCardContent.displayName = "PixelHoverCardContent";

export { PixelHoverCard, PixelHoverCardTrigger, PixelHoverCardContent };

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";

const PixelDrawer = ({ shouldScaleBackground = true, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root data-slot="drawer" shouldScaleBackground={shouldScaleBackground} {...props} />
);
PixelDrawer.displayName = "PixelDrawer";

const PixelDrawerTrigger = DrawerPrimitive.Trigger;
const PixelDrawerPortal = DrawerPrimitive.Portal;
const PixelDrawerClose = DrawerPrimitive.Close;

const PixelDrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay ref={ref} data-slot="drawer-overlay" className={cn("fixed inset-0 z-50 bg-black/70", className)} {...props} />
));
PixelDrawerOverlay.displayName = "PixelDrawerOverlay";

const PixelDrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <PixelDrawerPortal>
    <PixelDrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      data-slot="drawer-content"
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col border-2 border-foreground bg-popover font-[family-name:var(--pixel-font)]",
        className
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-1 w-24 shrink-0 bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </PixelDrawerPortal>
));
PixelDrawerContent.displayName = "PixelDrawerContent";

const PixelDrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="drawer-header" className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />
);
PixelDrawerHeader.displayName = "PixelDrawerHeader";

const PixelDrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="drawer-footer" className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
);
PixelDrawerFooter.displayName = "PixelDrawerFooter";

const PixelDrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title ref={ref} data-slot="drawer-title" className={cn("text-sm uppercase tracking-widest leading-none", className)} {...props} />
));
PixelDrawerTitle.displayName = "PixelDrawerTitle";

const PixelDrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description ref={ref} data-slot="drawer-description" className={cn("text-xs text-muted-foreground", className)} {...props} />
));
PixelDrawerDescription.displayName = "PixelDrawerDescription";

export {
  PixelDrawer, PixelDrawerPortal, PixelDrawerOverlay, PixelDrawerTrigger,
  PixelDrawerClose, PixelDrawerContent, PixelDrawerHeader, PixelDrawerFooter,
  PixelDrawerTitle, PixelDrawerDescription,
};

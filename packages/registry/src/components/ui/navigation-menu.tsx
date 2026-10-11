import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const PixelNavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    data-slot="navigation-menu"
    className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center font-[family-name:var(--pixel-font)]", className)}
    {...props}
  >
    {children}
    <PixelNavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
PixelNavigationMenu.displayName = "PixelNavigationMenu";

const PixelNavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    data-slot="navigation-menu-list"
    className={cn("group flex flex-1 list-none items-center justify-center gap-1", className)}
    {...props}
  />
));
PixelNavigationMenuList.displayName = "PixelNavigationMenuList";

const PixelNavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-xs uppercase tracking-widest transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
);

const PixelNavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    data-slot="navigation-menu-trigger"
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180" strokeWidth={3} aria-hidden="true" />
  </NavigationMenuPrimitive.Trigger>
));
PixelNavigationMenuTrigger.displayName = "PixelNavigationMenuTrigger";

const PixelNavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    data-slot="navigation-menu-content"
    className={cn(
      "left-0 top-0 w-full border-2 border-foreground bg-popover p-4 text-popover-foreground shadow-[var(--pixel-shadow)]",
      "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
      className
    )}
    {...props}
  />
));
PixelNavigationMenuContent.displayName = "PixelNavigationMenuContent";

const PixelNavigationMenuLink = NavigationMenuPrimitive.Link;

const PixelNavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      data-slot="navigation-menu-viewport"
      className={cn("origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden border-2 border-foreground bg-popover shadow-[var(--pixel-shadow)]", className)}
      {...props}
    />
  </div>
));
PixelNavigationMenuViewport.displayName = "PixelNavigationMenuViewport";

const PixelNavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    data-slot="navigation-menu-indicator"
    className={cn("top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out", className)}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 border-2 border-foreground bg-popover" />
  </NavigationMenuPrimitive.Indicator>
));
PixelNavigationMenuIndicator.displayName = "PixelNavigationMenuIndicator";

export {
  navigationMenuTriggerStyle, PixelNavigationMenu, PixelNavigationMenuList, PixelNavigationMenuItem,
  PixelNavigationMenuTrigger, PixelNavigationMenuContent, PixelNavigationMenuIndicator,
  PixelNavigationMenuLink, PixelNavigationMenuViewport,
};

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const PixelTabs = TabsPrimitive.Root;

const PixelTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    data-slot="tabs-list"
    className={cn("inline-flex max-w-full flex-wrap items-center gap-1 pixel-rounded border-[length:var(--pixel-line,2px)] border-foreground bg-muted p-1", className)}
    {...props}
  />
));
PixelTabsList.displayName = "PixelTabsList";

const PixelTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    data-slot="tabs-trigger"
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap px-4 py-1.5",
      "font-[family-name:var(--pixel-font)] text-[0.7rem] uppercase tracking-widest",
      "transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-[length:var(--pixel-line,2px)] data-[state=active]:border-foreground data-[state=active]:shadow-[2px_2px_0px_var(--foreground)]",
      className
    )}
    {...props}
  />
));
PixelTabsTrigger.displayName = "PixelTabsTrigger";

const PixelTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-slot="tabs-content"
    className={cn("mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className)}
    {...props}
  />
));
PixelTabsContent.displayName = "PixelTabsContent";

export { PixelTabs, PixelTabsList, PixelTabsTrigger, PixelTabsContent };

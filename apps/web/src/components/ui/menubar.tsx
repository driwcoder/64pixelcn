import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const PixelMenubarMenu = MenubarPrimitive.Menu;
const PixelMenubarGroup = MenubarPrimitive.Group;
const PixelMenubarPortal = MenubarPrimitive.Portal;
const PixelMenubarSub = MenubarPrimitive.Sub;
const PixelMenubarRadioGroup = MenubarPrimitive.RadioGroup;

const PixelMenubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    data-slot="menubar"
    className={cn("flex h-10 items-center gap-1 border-2 border-foreground bg-muted p-1 font-[family-name:var(--pixel-font)]", className)}
    {...props}
  />
));
PixelMenubar.displayName = "PixelMenubar";

const PixelMenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    data-slot="menubar-trigger"
    className={cn(
      "flex cursor-default select-none items-center px-3 py-1.5 text-xs uppercase tracking-widest outline-none",
      "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  />
));
PixelMenubarTrigger.displayName = "PixelMenubarTrigger";

const PixelMenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    data-slot="menubar-sub-trigger"
    className={cn("flex cursor-default select-none items-center px-2 py-1.5 text-xs outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent", inset && "pl-8", className)}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" strokeWidth={3} />
  </MenubarPrimitive.SubTrigger>
));
PixelMenubarSubTrigger.displayName = "PixelMenubarSubTrigger";

const PixelMenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    data-slot="menubar-sub-content"
    className={cn("z-50 min-w-[8rem] border-2 border-foreground bg-popover p-1 text-popover-foreground shadow-[var(--pixel-shadow)]", className)}
    {...props}
  />
));
PixelMenubarSubContent.displayName = "PixelMenubarSubContent";

const PixelMenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      data-slot="menubar-content"
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn("z-50 min-w-[12rem] border-2 border-foreground bg-popover p-1 text-popover-foreground shadow-[var(--pixel-shadow)]", className)}
      {...props}
    />
  </MenubarPrimitive.Portal>
));
PixelMenubarContent.displayName = "PixelMenubarContent";

const PixelMenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & { inset?: boolean; variant?: "default" | "destructive" }
>(({ className, inset, variant, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    data-slot="menubar-item"
    data-variant={variant}
    className={cn(
      "relative flex cursor-default select-none items-center px-2 py-1.5 text-xs outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      variant === "destructive" && "text-destructive focus:bg-destructive focus:text-destructive-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
PixelMenubarItem.displayName = "PixelMenubarItem";

const PixelMenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    data-slot="menubar-checkbox-item"
    className={cn("relative flex cursor-default select-none items-center py-1.5 pl-8 pr-2 text-xs outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator><Check className="h-4 w-4" strokeWidth={3} /></MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
PixelMenubarCheckboxItem.displayName = "PixelMenubarCheckboxItem";

const PixelMenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    data-slot="menubar-radio-item"
    className={cn("relative flex cursor-default select-none items-center py-1.5 pl-8 pr-2 text-xs outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator><Circle className="h-2 w-2 fill-current" /></MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
PixelMenubarRadioItem.displayName = "PixelMenubarRadioItem";

const PixelMenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label ref={ref} data-slot="menubar-label" className={cn("px-2 py-1.5 text-[10px] uppercase tracking-widest text-muted-foreground", inset && "pl-8", className)} {...props} />
));
PixelMenubarLabel.displayName = "PixelMenubarLabel";

const PixelMenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator ref={ref} data-slot="menubar-separator" className={cn("-mx-1 my-1 h-0 border-b-2 border-foreground", className)} {...props} />
));
PixelMenubarSeparator.displayName = "PixelMenubarSeparator";

const PixelMenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span data-slot="menubar-shortcut" className={cn("ml-auto text-[10px] tracking-widest text-muted-foreground", className)} {...props} />
);
PixelMenubarShortcut.displayName = "PixelMenubarShortcut";

export {
  PixelMenubar, PixelMenubarMenu, PixelMenubarTrigger, PixelMenubarContent, PixelMenubarItem,
  PixelMenubarSeparator, PixelMenubarLabel, PixelMenubarCheckboxItem, PixelMenubarRadioGroup,
  PixelMenubarRadioItem, PixelMenubarPortal, PixelMenubarSubContent, PixelMenubarSubTrigger, PixelMenubarGroup,
  PixelMenubarSub, PixelMenubarShortcut,
};

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "./icons";
import { cn } from "@/lib/utils";

const PixelDropdownMenu = DropdownMenuPrimitive.Root;
const PixelDropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const PixelDropdownMenuGroup = DropdownMenuPrimitive.Group;
const PixelDropdownMenuPortal = DropdownMenuPrimitive.Portal;
const PixelDropdownMenuSub = DropdownMenuPrimitive.Sub;
const PixelDropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const PixelDropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    data-slot="dropdown-menu-sub-trigger"
    className={cn(
      "flex cursor-default select-none items-center px-2 py-1.5 text-xs font-[family-name:var(--pixel-font)] outline-none",
      "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" strokeWidth={3} />
  </DropdownMenuPrimitive.SubTrigger>
));
PixelDropdownMenuSubTrigger.displayName = "PixelDropdownMenuSubTrigger";

const PixelDropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    data-slot="dropdown-menu-sub-content"
    className={cn("z-50 min-w-[8rem] border-2 border-foreground bg-popover p-1 text-popover-foreground shadow-[var(--pixel-shadow)]", className)}
    {...props}
  />
));
PixelDropdownMenuSubContent.displayName = "PixelDropdownMenuSubContent";

const PixelDropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      data-slot="dropdown-menu-content"
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] border-2 border-foreground bg-popover p-1 text-popover-foreground shadow-[var(--pixel-shadow)]",
        "font-[family-name:var(--pixel-font)]",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
PixelDropdownMenuContent.displayName = "PixelDropdownMenuContent";

const PixelDropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { inset?: boolean; variant?: "default" | "destructive" }
>(({ className, inset, variant, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    data-slot="dropdown-menu-item"
    data-variant={variant}
    className={cn(
      "relative flex cursor-default select-none items-center px-2 py-1.5 text-xs outline-none transition-colors",
      "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      variant === "destructive" && "text-destructive focus:bg-destructive focus:text-destructive-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
PixelDropdownMenuItem.displayName = "PixelDropdownMenuItem";

const PixelDropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    data-slot="dropdown-menu-checkbox-item"
    className={cn(
      "relative flex cursor-default select-none items-center py-1.5 pl-8 pr-2 text-xs outline-none transition-colors",
      "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" strokeWidth={3} />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
PixelDropdownMenuCheckboxItem.displayName = "PixelDropdownMenuCheckboxItem";

const PixelDropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    data-slot="dropdown-menu-radio-item"
    className={cn(
      "relative flex cursor-default select-none items-center py-1.5 pl-8 pr-2 text-xs outline-none transition-colors",
      "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
PixelDropdownMenuRadioItem.displayName = "PixelDropdownMenuRadioItem";

const PixelDropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    data-slot="dropdown-menu-label"
    className={cn("px-2 py-1.5 text-[0.7rem] uppercase tracking-widest text-muted-foreground", inset && "pl-8", className)}
    {...props}
  />
));
PixelDropdownMenuLabel.displayName = "PixelDropdownMenuLabel";

const PixelDropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator ref={ref} data-slot="dropdown-menu-separator" className={cn("-mx-1 my-1 h-0 border-b-2 border-foreground", className)} {...props} />
));
PixelDropdownMenuSeparator.displayName = "PixelDropdownMenuSeparator";

const PixelDropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span data-slot="dropdown-menu-shortcut" className={cn("ml-auto text-[0.7rem] tracking-widest text-muted-foreground", className)} {...props} />
);
PixelDropdownMenuShortcut.displayName = "PixelDropdownMenuShortcut";

export {
  PixelDropdownMenu, PixelDropdownMenuTrigger, PixelDropdownMenuContent, PixelDropdownMenuItem,
  PixelDropdownMenuCheckboxItem, PixelDropdownMenuRadioItem, PixelDropdownMenuLabel,
  PixelDropdownMenuSeparator, PixelDropdownMenuShortcut, PixelDropdownMenuGroup, PixelDropdownMenuPortal,
  PixelDropdownMenuSub, PixelDropdownMenuSubContent, PixelDropdownMenuSubTrigger, PixelDropdownMenuRadioGroup,
};

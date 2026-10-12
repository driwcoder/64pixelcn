import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "./icons";
import { cn } from "@/lib/utils";

const PixelContextMenu = ContextMenuPrimitive.Root;
const PixelContextMenuTrigger = ContextMenuPrimitive.Trigger;
const PixelContextMenuSub = ContextMenuPrimitive.Sub;
const PixelContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const PixelContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    data-slot="context-menu-sub-trigger"
    className={cn(
      "flex cursor-default select-none items-center px-2 py-1.5 text-xs font-[family-name:var(--pixel-font)] outline-none",
      "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" strokeWidth={3} />
  </ContextMenuPrimitive.SubTrigger>
));
PixelContextMenuSubTrigger.displayName = "PixelContextMenuSubTrigger";

const PixelContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    data-slot="context-menu-sub-content"
    className={cn("z-50 min-w-[8rem] pixel-rounded border-[length:var(--pixel-line,2px)] border-foreground bg-popover p-1 text-popover-foreground pixel-shadow", className)}
    {...props}
  />
));
PixelContextMenuSubContent.displayName = "PixelContextMenuSubContent";

const PixelContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      data-slot="context-menu-content"
      className={cn(
        "z-50 min-w-[8rem] pixel-rounded border-[length:var(--pixel-line,2px)] border-foreground bg-popover p-1 text-popover-foreground pixel-shadow",
        "font-[family-name:var(--pixel-font)]",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
PixelContextMenuContent.displayName = "PixelContextMenuContent";

const PixelContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & { inset?: boolean; variant?: "default" | "destructive" }
>(({ className, inset, variant = "default", ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    data-slot="context-menu-item"
    data-variant={variant}
    className={cn(
      "relative flex cursor-default select-none items-center px-2 py-1.5 text-xs outline-none",
      "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      variant === "destructive" && "text-destructive focus:bg-destructive focus:text-destructive-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
PixelContextMenuItem.displayName = "PixelContextMenuItem";

const PixelContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    data-slot="context-menu-checkbox-item"
    className={cn(
      "relative flex cursor-default select-none items-center py-1.5 pl-8 pr-2 text-xs outline-none",
      "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" strokeWidth={3} />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
PixelContextMenuCheckboxItem.displayName = "PixelContextMenuCheckboxItem";

const PixelContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    data-slot="context-menu-radio-item"
    className={cn(
      "relative flex cursor-default select-none items-center py-1.5 pl-8 pr-2 text-xs outline-none",
      "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
PixelContextMenuRadioItem.displayName = "PixelContextMenuRadioItem";

const PixelContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    data-slot="context-menu-label"
    className={cn("px-2 py-1.5 text-[0.7rem] uppercase tracking-widest text-muted-foreground", inset && "pl-8", className)}
    {...props}
  />
));
PixelContextMenuLabel.displayName = "PixelContextMenuLabel";

const PixelContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator ref={ref} data-slot="context-menu-separator" className={cn("-mx-1 my-1 h-0 border-b-[length:var(--pixel-line,2px)] border-foreground", className)} {...props} />
));
PixelContextMenuSeparator.displayName = "PixelContextMenuSeparator";

const PixelContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span data-slot="context-menu-shortcut" className={cn("ml-auto text-[0.7rem] tracking-widest text-muted-foreground", className)} {...props} />
);
PixelContextMenuShortcut.displayName = "PixelContextMenuShortcut";

export {
  PixelContextMenu, PixelContextMenuTrigger, PixelContextMenuContent, PixelContextMenuItem,
  PixelContextMenuCheckboxItem, PixelContextMenuRadioItem, PixelContextMenuLabel,
  PixelContextMenuSeparator, PixelContextMenuShortcut, PixelContextMenuSub, PixelContextMenuSubTrigger,
  PixelContextMenuSubContent, PixelContextMenuRadioGroup,
};

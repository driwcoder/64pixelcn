import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const PixelSelect = SelectPrimitive.Root;
const PixelSelectGroup = SelectPrimitive.Group;
const PixelSelectValue = SelectPrimitive.Value;

const PixelSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    data-slot="select-trigger"
    className={cn(
      "flex h-10 w-full items-center justify-between border-2 border-foreground bg-transparent px-3 py-2",
      "font-[family-name:var(--pixel-font)] text-xs",
      "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" strokeWidth={3} />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
PixelSelectTrigger.displayName = "PixelSelectTrigger";

const PixelSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      data-slot="select-content"
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden border-2 border-foreground bg-popover text-popover-foreground shadow-[var(--pixel-shadow)]",
        "font-[family-name:var(--pixel-font)]",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
        <ChevronUp className="h-4 w-4" strokeWidth={3} />
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport className={cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]")}>
        {children}
      </SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
        <ChevronDown className="h-4 w-4" strokeWidth={3} />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
PixelSelectContent.displayName = "PixelSelectContent";

const PixelSelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} data-slot="select-label" className={cn("px-2 py-1.5 text-[0.7rem] uppercase tracking-widest text-muted-foreground", className)} {...props} />
));
PixelSelectLabel.displayName = "PixelSelectLabel";

const PixelSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    data-slot="select-item"
    className={cn(
      "relative flex w-full cursor-default select-none items-center py-1.5 pl-8 pr-2 text-xs outline-none",
      "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" strokeWidth={3} />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
PixelSelectItem.displayName = "PixelSelectItem";

const PixelSelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} data-slot="select-separator" className={cn("-mx-1 my-1 h-0 border-b-2 border-foreground", className)} {...props} />
));
PixelSelectSeparator.displayName = "PixelSelectSeparator";

export {
  PixelSelect, PixelSelectGroup, PixelSelectValue, PixelSelectTrigger, PixelSelectContent,
  PixelSelectLabel, PixelSelectItem, PixelSelectSeparator,
};

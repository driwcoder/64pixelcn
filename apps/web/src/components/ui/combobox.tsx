import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as CommandPrimitive from "cmdk";
import { ChevronsUpDown } from "./icons";
import { cn } from "@/lib/utils";

const PixelCombobox = PopoverPrimitive.Root;
const PixelComboboxTrigger = PopoverPrimitive.Trigger;
const PixelComboboxAnchor = PopoverPrimitive.Anchor;
const PixelComboboxCancel = PopoverPrimitive.Close;
const PixelComboboxContent = PopoverPrimitive.Content;
const PixelComboboxInput = CommandPrimitive.Command.Input;
const PixelComboboxList = CommandPrimitive.Command.List;
const PixelComboboxEmpty = CommandPrimitive.Command.Empty;
const PixelComboboxGroup = CommandPrimitive.Command.Group;
const PixelComboboxItem = CommandPrimitive.Command.Item;

const PixelComboboxButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <PopoverPrimitive.Trigger
    ref={ref}
    data-slot="combobox-button"
    className={cn(
      "flex h-10 w-full items-center justify-between border-2 border-foreground bg-transparent px-3 py-2",
      "font-[family-name:var(--pixel-font)] text-xs",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" strokeWidth={3} />
  </PopoverPrimitive.Trigger>
));
PixelComboboxButton.displayName = "PixelComboboxButton";

export { PixelCombobox, PixelComboboxTrigger, PixelComboboxButton, PixelComboboxAnchor, PixelComboboxCancel, PixelComboboxContent, PixelComboboxInput, PixelComboboxList, PixelComboboxEmpty, PixelComboboxGroup, PixelComboboxItem };

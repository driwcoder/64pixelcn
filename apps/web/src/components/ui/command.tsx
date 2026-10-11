import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { PixelDialog, PixelDialogContent } from "./dialog";

const PixelCommand = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    data-slot="command"
    className={cn("flex h-full w-full flex-col overflow-hidden border-2 border-foreground bg-popover text-popover-foreground font-[family-name:var(--pixel-font)]", className)}
    {...props}
  />
));
PixelCommand.displayName = "PixelCommand";

const PixelCommandDialog = ({ children, ...props }: DialogProps) => (
  <PixelDialog {...props}>
    <PixelDialogContent className="overflow-hidden p-0">
      <PixelCommand className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-4 [&_[cmdk-input-wrapper]_svg]:w-4 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-4 [&_[cmdk-item]_svg]:w-4">
        {children}
      </PixelCommand>
    </PixelDialogContent>
  </PixelDialog>
);

const PixelCommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div data-slot="command-input-wrapper" className="flex items-center border-b-2 border-foreground px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" strokeWidth={3} />
    <CommandPrimitive.Input
      ref={ref}
      data-slot="command-input"
      className={cn("flex h-10 w-full bg-transparent py-3 text-xs outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className)}
      {...props}
    />
  </div>
));
PixelCommandInput.displayName = "PixelCommandInput";

const PixelCommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List ref={ref} data-slot="command-list" className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)} {...props} />
));
PixelCommandList.displayName = "PixelCommandList";

const PixelCommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => <CommandPrimitive.Empty ref={ref} data-slot="command-empty" className="py-6 text-center text-xs" {...props} />);
PixelCommandEmpty.displayName = "PixelCommandEmpty";

const PixelCommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group ref={ref} data-slot="command-group" className={cn("overflow-hidden p-1 text-foreground", className)} {...props} />
));
PixelCommandGroup.displayName = "PixelCommandGroup";

const PixelCommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} data-slot="command-separator" className={cn("-mx-1 my-1 h-0 border-b-2 border-foreground", className)} {...props} />
));
PixelCommandSeparator.displayName = "PixelCommandSeparator";

const PixelCommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    data-slot="command-item"
    className={cn(
      "relative flex cursor-default select-none items-center px-2 py-1.5 text-xs outline-none",
      "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0",
      className
    )}
    {...props}
  />
));
PixelCommandItem.displayName = "PixelCommandItem";

const PixelCommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span data-slot="command-shortcut" className={cn("ml-auto text-[10px] tracking-widest text-muted-foreground", className)} {...props} />
);
PixelCommandShortcut.displayName = "PixelCommandShortcut";

export {
  PixelCommand, PixelCommandDialog, PixelCommandInput, PixelCommandList,
  PixelCommandEmpty, PixelCommandGroup, PixelCommandItem, PixelCommandShortcut, PixelCommandSeparator,
};

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "./icons";
import { cn } from "@/lib/utils";

const PixelDialog = DialogPrimitive.Root;
const PixelDialogTrigger = DialogPrimitive.Trigger;
const PixelDialogPortal = DialogPrimitive.Portal;
const PixelDialogClose = DialogPrimitive.Close;

const PixelDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-slot="dialog-overlay"
    className={cn("fixed inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className)}
    {...props}
  />
));
PixelDialogOverlay.displayName = "PixelDialogOverlay";

const PixelDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <PixelDialogPortal>
    <PixelDialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      data-slot="dialog-content"
      className={cn(
        "fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
        "bg-popover text-popover-foreground pixel-rounded border-[length:var(--pixel-line,2px)] border-foreground p-6",
        "pixel-shadow",
        "font-[family-name:var(--pixel-font)]",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 opacity-70 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <X className="h-4 w-4" strokeWidth={3} />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </PixelDialogPortal>
));
PixelDialogContent.displayName = "PixelDialogContent";

const PixelDialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5 text-center sm:text-left", className)} {...props} />
  )
);
PixelDialogHeader.displayName = "PixelDialogHeader";

const PixelDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    data-slot="dialog-title"
    className={cn("text-sm uppercase tracking-widest leading-none", className)}
    {...props}
  />
));
PixelDialogTitle.displayName = "PixelDialogTitle";

const PixelDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    data-slot="dialog-description"
    className={cn("text-xs text-muted-foreground leading-relaxed", className)}
    {...props}
  />
));
PixelDialogDescription.displayName = "PixelDialogDescription";

export {
  PixelDialog, PixelDialogPortal, PixelDialogOverlay, PixelDialogTrigger,
  PixelDialogClose, PixelDialogContent, PixelDialogHeader, PixelDialogTitle, PixelDialogDescription,
};

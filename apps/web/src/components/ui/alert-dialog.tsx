import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";
import { pixelButtonVariants } from "./button";

const PixelAlertDialog = AlertDialogPrimitive.Root;
const PixelAlertDialogTrigger = AlertDialogPrimitive.Trigger;
const PixelAlertDialogPortal = AlertDialogPrimitive.Portal;

const PixelAlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn("fixed inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className)}
    {...props}
    ref={ref}
  />
));
PixelAlertDialogOverlay.displayName = "PixelAlertDialogOverlay";

const PixelAlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Portal>
    <PixelAlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      data-slot="alert-dialog-content"
      className={cn(
        "pixel-raised fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-popover p-6",
        "font-[family-name:var(--pixel-font)] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  </AlertDialogPrimitive.Portal>
));
PixelAlertDialogContent.displayName = "PixelAlertDialogContent";

const PixelAlertDialogHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("flex flex-col gap-2 text-center sm:text-left", className)} {...props} />
);
PixelAlertDialogHeader.displayName = "PixelAlertDialogHeader";

const PixelAlertDialogFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
PixelAlertDialogFooter.displayName = "PixelAlertDialogFooter";

const PixelAlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title ref={ref} className={cn("text-sm uppercase tracking-widest", className)} {...props} />
));
PixelAlertDialogTitle.displayName = "PixelAlertDialogTitle";

const PixelAlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description ref={ref} className={cn("text-xs text-muted-foreground", className)} {...props} />
));
PixelAlertDialogDescription.displayName = "PixelAlertDialogDescription";

const PixelAlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} className={cn(pixelButtonVariants({ variant: "default" }), className)} {...props} />
));
PixelAlertDialogAction.displayName = "PixelAlertDialogAction";

const PixelAlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel ref={ref} className={cn(pixelButtonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)} {...props} />
));
PixelAlertDialogCancel.displayName = "PixelAlertDialogCancel";

export {
  PixelAlertDialog, PixelAlertDialogPortal, PixelAlertDialogOverlay, PixelAlertDialogTrigger,
  PixelAlertDialogContent, PixelAlertDialogHeader, PixelAlertDialogFooter, PixelAlertDialogTitle,
  PixelAlertDialogDescription, PixelAlertDialogAction, PixelAlertDialogCancel,
};

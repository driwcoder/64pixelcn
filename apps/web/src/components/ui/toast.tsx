import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "./icons";
import { cn } from "@/lib/utils";

const PixelToastProvider = ToastPrimitives.Provider;

const PixelToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    data-slot="toast-viewport"
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
));
PixelToastViewport.displayName = "PixelToastViewport";

const toastVariants = cva(
  "pixel-raised group pointer-events-auto relative flex w-full items-center justify-between gap-4 overflow-hidden p-4 pr-6 transition-all font-[family-name:var(--pixel-font)]",
  {
    variants: {
      variant: {
        default: "bg-popover text-popover-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
        success: "border-green-500 bg-green-600 text-white",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

const PixelToast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => (
  <ToastPrimitives.Root ref={ref} data-slot="toast" className={cn(toastVariants({ variant }), className)} {...props} />
));
PixelToast.displayName = "PixelToast";

const PixelToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    data-slot="toast-action"
    className={cn(
      "inline-flex h-8 shrink-0 items-center border-[length:var(--pixel-line,2px)] border-current bg-transparent px-3 text-[0.7rem] uppercase tracking-widest",
      "transition-colors hover:bg-current/10 focus:outline-none focus:ring-2 focus:ring-ring",
      className
    )}
    {...props}
  />
));
PixelToastAction.displayName = "PixelToastAction";

const PixelToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    data-slot="toast-close"
    className={cn("absolute right-1 top-1 p-1 text-current/50 opacity-0 transition-opacity hover:text-current focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100", className)}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" strokeWidth={3} />
  </ToastPrimitives.Close>
));
PixelToastClose.displayName = "PixelToastClose";

const PixelToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} data-slot="toast-title" className={cn("text-xs uppercase tracking-widest", className)} {...props} />
));
PixelToastTitle.displayName = "PixelToastTitle";

const PixelToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} data-slot="toast-description" className={cn("text-xs opacity-90", className)} {...props} />
));
PixelToastDescription.displayName = "PixelToastDescription";

export {
  PixelToastProvider, PixelToastViewport, PixelToast, PixelToastTitle,
  PixelToastDescription, PixelToastClose, PixelToastAction,
};

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "./icons";
import { cn } from "@/lib/utils";

const PixelSheet = DialogPrimitive.Root;
const PixelSheetTrigger = DialogPrimitive.Trigger;
const PixelSheetClose = DialogPrimitive.Close;
const PixelSheetPortal = DialogPrimitive.Portal;

const PixelSheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay className={cn("fixed inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className)} {...props} ref={ref} />
));
PixelSheetOverlay.displayName = "PixelSheetOverlay";

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-popover p-6 shadow-[var(--pixel-shadow)] transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 font-[family-name:var(--pixel-font)]",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b-2 border-foreground data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t-2 border-foreground data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r-2 border-foreground data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l-2 border-foreground data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: { side: "right" },
  }
);

interface PixelSheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const PixelSheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  PixelSheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <PixelSheetPortal>
    <PixelSheetOverlay />
    <DialogPrimitive.Content ref={ref} data-slot="sheet-content" className={cn(sheetVariants({ side }), className)} {...props}>
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring">
        <X className="h-4 w-4" strokeWidth={3} />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </PixelSheetPortal>
));
PixelSheetContent.displayName = "PixelSheetContent";

const PixelSheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="sheet-header" className={cn("flex flex-col gap-1.5 text-center sm:text-left", className)} {...props} />
);
PixelSheetHeader.displayName = "PixelSheetHeader";

const PixelSheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="sheet-footer" className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
PixelSheetFooter.displayName = "PixelSheetFooter";

const PixelSheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} data-slot="sheet-title" className={cn("text-sm uppercase tracking-widest text-foreground", className)} {...props} />
));
PixelSheetTitle.displayName = "PixelSheetTitle";

const PixelSheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} data-slot="sheet-description" className={cn("text-xs text-muted-foreground", className)} {...props} />
));
PixelSheetDescription.displayName = "PixelSheetDescription";

export {
  PixelSheet, PixelSheetPortal, PixelSheetOverlay, PixelSheetTrigger, PixelSheetClose,
  PixelSheetContent, PixelSheetHeader, PixelSheetFooter, PixelSheetTitle, PixelSheetDescription,
};

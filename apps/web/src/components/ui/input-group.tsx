import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputGroupVariants = cva(
  "flex w-full items-center border-[length:var(--pixel-line,2px)] border-foreground bg-transparent shadow-[inset_1px_1px_0px_var(--muted),inset_-1px_-1px_0px_var(--border)] focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1",
  {
    variants: {
      size: {
        default: "h-10",
        sm: "h-8 text-[0.7rem]",
        lg: "h-12",
      },
    },
    defaultVariants: { size: "default" },
  }
);

const PixelInputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof inputGroupVariants>
>(({ className, size, ...props }, ref) => (
  <div ref={ref} data-slot="input-group" className={cn(inputGroupVariants({ size }), className)} {...props} />
));
PixelInputGroup.displayName = "PixelInputGroup";

const PixelInputGroupInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    data-slot="input-group-input"
    className={cn(
      "h-full w-full bg-transparent px-3 font-[family-name:var(--pixel-font)] text-xs",
      "placeholder:text-muted-foreground focus-visible:outline-none",
      className
    )}
    {...props}
  />
));
PixelInputGroupInput.displayName = "PixelInputGroupInput";

const PixelInputGroupAddon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { align?: "inline-start" | "inline-end" | "block-start" | "block-end" }
>(({ className, align = "inline-start", ...props }, ref) => (
  <div
    ref={ref}
    data-slot="input-group-addon"
    data-align={align}
    className={cn(
      "flex items-center gap-2 border-foreground bg-muted px-3 text-[0.7rem] uppercase tracking-widest text-muted-foreground",
      align === "inline-start" && "border-r-[length:var(--pixel-line,2px)]",
      align === "inline-end" && "border-l-[length:var(--pixel-line,2px)]",
      align === "block-start" && "border-b-[length:var(--pixel-line,2px)] w-full",
      align === "block-end" && "border-t-[length:var(--pixel-line,2px)] w-full",
      className
    )}
    {...props}
  />
));
PixelInputGroupAddon.displayName = "PixelInputGroupAddon";

const PixelInputGroupText = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} data-slot="input-group-text" className={cn("text-[0.7rem] uppercase tracking-widest text-muted-foreground", className)} {...props} />
));
PixelInputGroupText.displayName = "PixelInputGroupText";

const PixelInputGroupTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    data-slot="input-group-textarea"
    className={cn(
      "min-h-[80px] w-full bg-transparent px-3 py-2 font-[family-name:var(--pixel-font)] text-xs",
      "placeholder:text-muted-foreground focus-visible:outline-none resize-none",
      className
    )}
    {...props}
  />
));
PixelInputGroupTextarea.displayName = "PixelInputGroupTextarea";

export { PixelInputGroup, PixelInputGroupInput, PixelInputGroupAddon, PixelInputGroupText, PixelInputGroupTextarea, inputGroupVariants };

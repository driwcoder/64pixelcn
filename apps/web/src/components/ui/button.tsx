import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pixelButtonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-[family-name:var(--pixel-font)] uppercase tracking-widest",
    "transition-all duration-75",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-x-[var(--pixel-border)] active:translate-y-[var(--pixel-border)] active:shadow-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:image-rendering-pixelated",
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-2 border-foreground shadow-[var(--pixel-shadow)]",
        secondary: "bg-secondary text-secondary-foreground border-2 border-foreground shadow-[var(--pixel-shadow)]",
        destructive: "bg-destructive text-destructive-foreground border-2 border-foreground shadow-[var(--pixel-shadow)]",
        outline: "bg-transparent text-foreground border-2 border-foreground shadow-[var(--pixel-shadow)]",
        ghost: "bg-transparent text-foreground border-2 border-transparent hover:border-foreground",
        link: "bg-transparent text-primary underline underline-offset-4 decoration-2",
      },
      size: {
        default: "h-10 px-6 py-2 text-xs",
        sm: "h-8 px-4 text-[10px]",
        lg: "h-12 px-8 text-sm",
        xl: "h-16 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface PixelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pixelButtonVariants> {
  asChild?: boolean;
}

const PixelButton = React.forwardRef<HTMLButtonElement, PixelButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(pixelButtonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
PixelButton.displayName = "PixelButton";

export { PixelButton, pixelButtonVariants };

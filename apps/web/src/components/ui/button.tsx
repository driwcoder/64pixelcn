import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pixelButtonVariants = cva(
  [
    // No whitespace-nowrap: long labels wrap between words instead of
    // spilling out of the button (and the button never exceeds its parent).
    "inline-flex max-w-full items-center justify-center gap-2 text-center wrap-anywhere",
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
        // Padding in em so it scales WITH the button's own font-size:
        // when text grows (bigger font / text-size), the breathing room
        // grows too, so text never touches the pixel border.
        default: "min-h-[2.6em] px-[1.6em] py-[0.55em] text-[0.8rem] leading-relaxed",
        sm: "min-h-[2.2em] px-[1.2em] py-[0.4em] text-[0.7rem] leading-relaxed",
        lg: "min-h-[3em] px-[2em] py-[0.65em] text-[0.95rem] leading-relaxed",
        xl: "min-h-[3.6em] px-[2.6em] py-[0.8em] text-[1.1rem] leading-relaxed",
        icon: "min-h-[2.6em] min-w-[2.6em]",
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

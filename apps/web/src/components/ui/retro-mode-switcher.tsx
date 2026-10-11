import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Monitor, Tv } from "lucide-react";

const retroModeSwitcherVariants = cva(
  "inline-flex items-center gap-2 border-2 border-foreground bg-card font-[family-name:var(--pixel-font)] shadow-[var(--pixel-shadow)] transition-all hover:bg-accent",
  {
    variants: {
      size: {
        default: "px-3 py-2 text-xs",
        sm: "px-2 py-1 text-[10px]",
      },
    },
    defaultVariants: { size: "default" },
  }
);

export interface PixelRetroModeSwitcherProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof retroModeSwitcherVariants> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const PixelRetroModeSwitcher = React.forwardRef<HTMLButtonElement, PixelRetroModeSwitcherProps>(
  ({ className, size, checked = false, onCheckedChange, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        data-slot="retro-mode-switcher"
        data-state={checked ? "on" : "off"}
        onClick={() => onCheckedChange?.(!checked)}
        className={cn(
          retroModeSwitcherVariants({ size }),
          checked && "bg-primary text-primary-foreground",
          className
        )}
        {...props}
      >
        {checked ? (
          <Tv className="h-4 w-4" strokeWidth={3} />
        ) : (
          <Monitor className="h-4 w-4" strokeWidth={3} />
        )}
        <span className="uppercase tracking-widest">
          {checked ? "Retro ON" : "Retro OFF"}
        </span>
      </button>
    );
  }
);
PixelRetroModeSwitcher.displayName = "PixelRetroModeSwitcher";

export { PixelRetroModeSwitcher, retroModeSwitcherVariants };

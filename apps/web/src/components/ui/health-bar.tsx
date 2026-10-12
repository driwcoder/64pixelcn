import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Heart } from "./icons";

const healthBarVariants = cva(
  "relative w-full overflow-hidden border-2 border-foreground bg-muted font-[family-name:var(--pixel-font)] shadow-[var(--pixel-shadow)]",
  {
    variants: {
      size: {
        sm: "h-3",
        default: "h-5",
        lg: "h-7",
      },
    },
    defaultVariants: { size: "default" },
  }
);

export interface PixelHealthBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof healthBarVariants> {
  value: number;
  max?: number;
  showLabel?: boolean;
  showIcon?: boolean;
}

const PixelHealthBar = React.forwardRef<HTMLDivElement, PixelHealthBarProps>(
  ({ className, value, max = 100, size, showLabel = true, showIcon = false, ...props }, ref) => {
    const pct = Math.max(0, Math.min(100, (value / max) * 100));
    const danger = pct < 25;

    return (
      <div ref={ref} data-slot="health-bar" className={cn("w-full", className)} {...props}>
        {showLabel && (
          <div className="mb-1 flex items-center justify-between text-[0.7rem] uppercase tracking-widest">
            <span className="flex items-center gap-1">
              {showIcon && <Heart className="h-3 w-3" strokeWidth={3} />} HP
            </span>
            <span className={danger ? "text-destructive" : "text-muted-foreground"}>
              {value} / {max}
            </span>
          </div>
        )}
        <div
          className={cn(healthBarVariants({ size }))}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          <div
            className={cn(
              "h-full transition-all duration-300",
              danger
                ? "bg-destructive"
                : pct < 60
                ? "bg-yellow-500"
                : "bg-green-500",
            )}
            style={{
              width: `${pct}%`,
              backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 4px)",
            }}
          />
          {/* segmented notches */}
          <div className="pointer-events-none absolute inset-0 flex justify-between px-0 opacity-40">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-px bg-foreground" />
            ))}
          </div>
        </div>
      </div>
    );
  }
);
PixelHealthBar.displayName = "PixelHealthBar";

export { PixelHealthBar, healthBarVariants };

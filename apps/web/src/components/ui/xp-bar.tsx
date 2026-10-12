import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Star } from "./icons";

const xpBarVariants = cva(
  "relative w-full overflow-hidden border-[length:var(--pixel-line,2px)] border-foreground bg-muted font-[family-name:var(--pixel-font)] pixel-shadow",
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

export interface PixelXpBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof xpBarVariants> {
  value: number;
  max?: number;
  level?: number;
  showLabel?: boolean;
  showIcon?: boolean;
}

const PixelXpBar = React.forwardRef<HTMLDivElement, PixelXpBarProps>(
  ({ className, value, max = 100, level, size, showLabel = true, showIcon = false, ...props }, ref) => {
    const pct = Math.max(0, Math.min(100, (value / max) * 100));

    return (
      <div ref={ref} data-slot="xp-bar" className={cn("w-full", className)} {...props}>
        {showLabel && (
          <div className="mb-1 flex items-center justify-between text-[0.7rem] uppercase tracking-widest">
            <span className="flex items-center gap-1">
              {showIcon && <Star className="h-3 w-3" strokeWidth={3} />}
              {level !== undefined ? `Lv ${level}` : "XP"}
            </span>
            <span className="text-muted-foreground">
              {value} / {max}
            </span>
          </div>
        )}
        <div
          className={cn(xpBarVariants({ size }))}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: `${pct}%`,
              backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.25) 3px, rgba(0,0,0,0.25) 4px)",
            }}
          />
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
PixelXpBar.displayName = "PixelXpBar";

export { PixelXpBar, xpBarVariants };

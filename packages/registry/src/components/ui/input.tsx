import * as React from "react";
import { cn } from "@/lib/utils";

const PixelInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full bg-transparent px-3 py-2",
        "border-2 border-input",
        "font-[family-name:var(--pixel-font)] text-xs",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:border-0 file:bg-transparent file:text-xs file:font-[family-name:var(--pixel-font)]",
        "shadow-[inset_1px_1px_0px_var(--muted),inset_-1px_-1px_0px_var(--border)]",
        className
      )}
      {...props}
    />
  )
);
PixelInput.displayName = "PixelInput";

export { PixelInput };

import * as React from "react";
import { cn } from "@/lib/utils";

const PixelTextarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(
        "flex min-h-[80px] w-full bg-transparent px-3 py-2",
        "pixel-sunken",
        "font-[family-name:var(--pixel-font)] text-xs",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
PixelTextarea.displayName = "PixelTextarea";

export { PixelTextarea };

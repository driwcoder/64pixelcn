import * as React from "react";
import { cn } from "@/lib/utils";

const PixelTextarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(
        "flex min-h-[80px] w-full bg-transparent px-3 py-2",
        "border-2 border-input",
        "font-[family-name:var(--pixel-font)] text-xs",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "shadow-[inset_1px_1px_0px_var(--muted),inset_-1px_-1px_0px_var(--border)]",
        className
      )}
      {...props}
    />
  )
);
PixelTextarea.displayName = "PixelTextarea";

export { PixelTextarea };

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Paperclip, X } from "./icons";
import { cn } from "@/lib/utils";

const attachmentVariants = cva(
  "inline-flex max-w-full min-w-0 items-center gap-2 pixel-rounded border-[length:var(--pixel-line,2px)] border-foreground bg-card px-3 py-1.5 text-xs font-[family-name:var(--pixel-font)]",
  {
    variants: {
      variant: { default: "pixel-shadow", ghost: "border-transparent bg-transparent shadow-none" },
    },
    defaultVariants: { variant: "default" },
  }
);

const PixelAttachment = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof attachmentVariants>
>(({ className, variant, ...props }, ref) => (
  <span ref={ref} data-slot="attachment" className={cn(attachmentVariants({ variant }), className)} {...props} />
));
PixelAttachment.displayName = "PixelAttachment";

interface PixelAttachmentInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  onRemove?: () => void;
}

const PixelAttachmentInfo = React.forwardRef<HTMLDivElement, PixelAttachmentInfoProps>(
  ({ className, children, onRemove, ...props }, ref) => (
    <div ref={ref} data-slot="attachment-info" className={cn("flex min-w-0 items-center gap-2", className)} {...props}>
      <Paperclip className="h-3.5 w-3.5 shrink-0" strokeWidth={3} />
      <span className="truncate">{children}</span>
      {onRemove && (
        <button type="button" onClick={onRemove} aria-label="Remove attachment" className="ml-1 shrink-0 hover:text-destructive">
          <X className="h-3.5 w-3.5" strokeWidth={3} />
        </button>
      )}
    </div>
  )
);
PixelAttachmentInfo.displayName = "PixelAttachmentInfo";

export { PixelAttachment, PixelAttachmentInfo, attachmentVariants };

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const messageVariants = cva(
  "pixel-raised flex gap-3 p-3 font-[family-name:var(--pixel-font)]",
  {
    variants: {
      variant: {
        contained: "bg-card text-card-foreground",
        flat: "bg-transparent border-transparent shadow-none",
        faded: "bg-muted/50 border-transparent shadow-none",
      },
      align: { start: "items-start", center: "items-center", end: "items-end" },
    },
    defaultVariants: { variant: "contained", align: "start" },
  }
);

const PixelMessage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof messageVariants>
>(({ className, variant, align, ...props }, ref) => (
  <div ref={ref} data-slot="message" className={cn(messageVariants({ variant, align }), className)} {...props} />
));
PixelMessage.displayName = "PixelMessage";

const PixelMessageAvatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="message-avatar" className={cn("shrink-0", className)} {...props} />
  )
);
PixelMessageAvatar.displayName = "PixelMessageAvatar";

const PixelMessageContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="message-content" className={cn("flex flex-1 flex-col gap-1 min-w-0", className)} {...props} />
  )
);
PixelMessageContent.displayName = "PixelMessageContent";

export { PixelMessage, PixelMessageAvatar, PixelMessageContent, messageVariants };

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const itemVariants = cva(
  "group/item flex items-center border-2 border-transparent text-xs outline-none transition-colors font-[family-name:var(--pixel-font)]",
  {
    variants: {
      variant: {
        default: "border-transparent",
        outline: "border-foreground",
        muted: "bg-muted/50",
      },
      size: {
        default: "gap-4 p-4",
        sm: "gap-2.5 px-3 py-2.5",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

function PixelItem({
  className, variant, size, asChild = false, ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";
  return <Comp data-slot="item" data-variant={variant} data-size={size} className={cn(itemVariants({ variant, size, className }))} {...props} />;
}

const pixelItemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-8 border-2 border-foreground [&_svg:not([class*='size-'])]:size-4",
        image: "size-10 overflow-hidden border-2 border-foreground [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

function PixelItemMedia({ className, variant = "default", ...props }: React.ComponentProps<"div"> & VariantProps<typeof pixelItemMediaVariants>) {
  return <div data-slot="item-media" data-variant={variant} className={cn(pixelItemMediaVariants({ variant, className }))} {...props} />;
}

function PixelItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-content" className={cn("flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none", className)} {...props} />;
}

function PixelItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-title" className={cn("flex w-fit items-center gap-2 text-xs uppercase tracking-widest", className)} {...props} />;
}

function PixelItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="item-description" className={cn("text-xs text-muted-foreground [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4", className)} {...props} />;
}

function PixelItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-actions" className={cn("flex items-center gap-2", className)} {...props} />;
}

function PixelItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-header" className={cn("flex basis-full items-center justify-between gap-2", className)} {...props} />;
}

function PixelItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-footer" className={cn("flex basis-full items-center justify-between gap-2", className)} {...props} />;
}

function PixelItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-group" className={cn("group/item-group flex flex-col", className)} {...props} />;
}

function PixelItemSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-separator" role="separator" className={cn("my-0 h-0.5 bg-foreground", className)} {...props} />;
}

export {
  PixelItem, PixelItemMedia, PixelItemContent, PixelItemActions, PixelItemGroup,
  PixelItemSeparator, PixelItemTitle, PixelItemDescription, PixelItemHeader, PixelItemFooter,
};

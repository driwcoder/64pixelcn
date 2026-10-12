import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonGroupVariants = cva(
  "flex w-fit items-stretch border-[length:var(--pixel-line,2px)] border-foreground pixel-shadow [&>*]:border-none [&>*]:shadow-none [&>*:not(:first-child)]:border-l-[length:var(--pixel-line,2px)] [&>*:not(:first-child)]:border-l-foreground [&>*]:rounded-none",
  {
    variants: {
      orientation: {
        horizontal: "flex-row [&>*:not(:first-child)]:border-l-[length:var(--pixel-line,2px)] [&>*:not(:first-child)]:border-l-foreground",
        vertical: "flex-col [&>*:not(:first-child)]:border-t-[length:var(--pixel-line,2px)] [&>*:not(:first-child)]:border-t-foreground",
      },
    },
    defaultVariants: { orientation: "horizontal" },
  }
);

function PixelButtonGroup({
  className, orientation, ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return <div data-slot="button-group" className={cn(buttonGroupVariants({ orientation }), className)} {...props} />;
}

export { PixelButtonGroup, buttonGroupVariants };

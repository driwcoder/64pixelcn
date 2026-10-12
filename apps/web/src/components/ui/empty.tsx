import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

function PixelEmpty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        // Padding follows the component width (not the viewport), so it stays
        // roomy on wide layouts without crushing the text in narrow cards.
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 pixel-rounded border-[length:var(--pixel-line,2px)] border-foreground p-[clamp(1rem,8%,3rem)] text-center",
        "font-[family-name:var(--pixel-font)]",
        className
      )}
      {...props}
    />
  );
}

function PixelEmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="empty-header" className={cn("flex min-w-0 max-w-sm flex-col items-center gap-2 text-center", className)} {...props} />
  );
}

const emptyMediaVariants = cva(
  "flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center border-[length:var(--pixel-line,2px)] border-foreground [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

function PixelEmptyMedia({
  className, variant = "default", ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div data-slot="empty-icon" data-variant={variant} className={cn(emptyMediaVariants({ variant, className }))} {...props} />
  );
}

function PixelEmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-title" className={cn("max-w-full text-sm uppercase tracking-widest wrap-anywhere", className)} {...props} />;
}

function PixelEmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={cn("max-w-full text-xs text-muted-foreground wrap-anywhere [&>a]:underline [&>a]:underline-offset-4 [&>a]:hover:text-primary", className)}
      {...props}
    />
  );
}

function PixelEmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn("flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-xs", className)}
      {...props}
    />
  );
}

export {
  PixelEmpty, PixelEmptyHeader, PixelEmptyTitle, PixelEmptyDescription,
  PixelEmptyContent, PixelEmptyMedia,
};

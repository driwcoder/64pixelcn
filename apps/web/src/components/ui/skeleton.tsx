import { cn } from "@/lib/utils";

function PixelSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "border-2 border-muted bg-muted/50",
        "animate-pulse",
        className
      )}
      {...props}
    />
  );
}

export { PixelSkeleton };

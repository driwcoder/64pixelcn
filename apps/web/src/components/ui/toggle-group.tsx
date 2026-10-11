import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { toggleVariants } from "./toggle";

const PixelToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({ size: "default", variant: "default" });

const PixelToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root ref={ref} data-slot="toggle-group" className={cn("flex items-center border-2 border-foreground [&>*:not(:first-child)]:border-l-2 [&>*:not(:first-child)]:border-l-foreground", className)} {...props}>
    <PixelToggleGroupContext.Provider value={{ variant, size }}>{children}</PixelToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));
PixelToggleGroup.displayName = "PixelToggleGroup";

const PixelToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(PixelToggleGroupContext);
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      data-slot="toggle-group-item"
      className={cn(
        toggleVariants({ variant: context.variant || variant, size: context.size || size }),
        "border-none shadow-none",
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});
PixelToggleGroupItem.displayName = "PixelToggleGroupItem";

export { PixelToggleGroup, PixelToggleGroupItem };

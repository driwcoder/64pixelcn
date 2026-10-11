import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

const PixelAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    data-slot="avatar"
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden border-2 border-foreground", className)}
    {...props}
  />
));
PixelAvatar.displayName = "PixelAvatar";

const PixelAvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    data-slot="avatar-image"
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
PixelAvatarImage.displayName = "PixelAvatarImage";

const PixelAvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    data-slot="avatar-fallback"
    className={cn("flex h-full w-full items-center justify-center bg-muted font-[family-name:var(--pixel-font)] text-xs uppercase", className)}
    {...props}
  />
));
PixelAvatarFallback.displayName = "PixelAvatarFallback";

export { PixelAvatar, PixelAvatarImage, PixelAvatarFallback };

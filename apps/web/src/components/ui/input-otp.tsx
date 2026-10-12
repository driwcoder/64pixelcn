import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "./icons";
import { cn } from "@/lib/utils";

const PixelInputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
));
PixelInputOTP.displayName = "PixelInputOTP";

const PixelInputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} data-slot="input-otp-group" className={cn("flex items-center", className)} {...props} />
));
PixelInputOTPGroup.displayName = "PixelInputOTPGroup";

const PixelInputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "pixel-sunken relative flex h-10 w-10 items-center justify-center text-sm font-[family-name:var(--pixel-font)]",
        "transition-all",
        isActive && "z-10 border-primary ring-2 ring-ring ring-offset-1 ring-offset-background",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
PixelInputOTPSlot.displayName = "PixelInputOTPSlot";

const PixelInputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} data-slot="input-otp-separator" role="separator" {...props}>
    <Minus strokeWidth={3} />
  </div>
));
PixelInputOTPSeparator.displayName = "PixelInputOTPSeparator";

export { PixelInputOTP, PixelInputOTPGroup, PixelInputOTPSlot, PixelInputOTPSeparator };

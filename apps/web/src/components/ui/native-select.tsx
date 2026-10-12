import * as React from "react";
import { ChevronDown } from "./icons";
import { cn } from "@/lib/utils";

const PixelNativeSelect = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <div className="relative w-full">
    <select
      ref={ref}
      data-slot="native-select"
      className={cn(
        "peer h-10 w-full appearance-none border-2 border-foreground bg-transparent px-3 py-2 pr-8",
        "font-[family-name:var(--pixel-font)] text-xs",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "[&>option]:bg-popover [&>option]:text-popover-foreground",
        className
      )}
      {...props}
    >
      {children}
    </select>
    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" strokeWidth={3} />
  </div>
));
PixelNativeSelect.displayName = "PixelNativeSelect";

const PixelNativeSelectOption = React.forwardRef<
  HTMLOptionElement,
  React.OptionHTMLAttributes<HTMLOptionElement>
>(({ className, ...props }, ref) => <option ref={ref} className={cn(className)} {...props} />);
PixelNativeSelectOption.displayName = "PixelNativeSelectOption";

const PixelNativeSelectOptGroup = React.forwardRef<
  HTMLOptGroupElement,
  React.OptgroupHTMLAttributes<HTMLOptGroupElement>
>(({ className, ...props }, ref) => <optgroup ref={ref} className={cn(className)} {...props} />);
PixelNativeSelectOptGroup.displayName = "PixelNativeSelectOptGroup";

export { PixelNativeSelect, PixelNativeSelectOption, PixelNativeSelectOptGroup };

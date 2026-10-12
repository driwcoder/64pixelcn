import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "./icons";
import { cn } from "@/lib/utils";

const PixelAccordion = AccordionPrimitive.Root;

const PixelAccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    data-slot="accordion-item"
    className={cn("border-b-2 border-foreground px-[1em]", className)}
    {...props}
  />
));
PixelAccordionItem.displayName = "PixelAccordionItem";

const PixelAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      data-slot="accordion-trigger"
      className={cn(
        "flex flex-1 items-center justify-between gap-[0.6em] py-[0.9em] text-left",
        "font-[family-name:var(--pixel-font)] text-[0.8rem] uppercase tracking-widest leading-relaxed",
        "transition-all hover:text-primary [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-[1em] w-[1em] shrink-0 transition-transform duration-200" strokeWidth={3} />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
PixelAccordionTrigger.displayName = "PixelAccordionTrigger";

const PixelAccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    data-slot="accordion-content"
    className="overflow-hidden text-[0.8rem] leading-relaxed data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pt-0 pb-[0.9em] leading-relaxed", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
PixelAccordionContent.displayName = "PixelAccordionContent";

export { PixelAccordion, PixelAccordionItem, PixelAccordionTrigger, PixelAccordionContent };

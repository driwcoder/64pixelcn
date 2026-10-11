import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PixelLabel } from "./label";
import { PixelSeparator } from "./separator";

function PixelFieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return <fieldset data-slot="field-set" className={cn("flex flex-col gap-6", className)} {...props} />;
}

function PixelFieldLegend({ className, ...props }: React.ComponentProps<"legend">) {
  return <legend data-slot="field-legend" className={cn("text-sm uppercase tracking-widest", className)} {...props} />;
}

function PixelFieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="field-group" className={cn("flex flex-col gap-4", className)} {...props} />;
}

const fieldVariants = cva("group/field flex w-full gap-2 data-[invalid=true]:text-destructive", {
  variants: {
    orientation: {
      vertical: "flex-col [&>*]:w-full",
      horizontal: "flex-row items-center [&>*]:flex-1",
      responsive: "flex-col [&>*]:w-full @lg:flex-row @lg:items-center @lg:[&>*]:flex-1",
    },
  },
  defaultVariants: { orientation: "vertical" },
});

function PixelField({
  className, orientation = "vertical", ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return <div role="group" data-slot="field" data-orientation={orientation} className={cn(fieldVariants({ orientation }), className)} {...props} />;
}

function PixelFieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="field-content" className={cn("flex flex-1 flex-col gap-1 leading-snug", className)} {...props} />;
}

function PixelFieldLabel({ className, ...props }: React.ComponentProps<typeof PixelLabel>) {
  return <PixelLabel data-slot="field-label" className={cn("flex w-fit gap-2 leading-snug", className)} {...props} />;
}

function PixelFieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="field-title" className={cn("flex w-fit items-center gap-2 text-xs uppercase tracking-widest", className)} {...props} />;
}

function PixelFieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="field-description" className={cn("text-xs text-muted-foreground", className)} {...props} />;
}

function PixelFieldSeparator({ children, className, ...props }: React.ComponentProps<"div"> & { children?: React.ReactNode }) {
  return (
    <div data-slot="field-separator" className={cn("relative -my-2 h-5 text-xs", className)} {...props}>
      <PixelSeparator className="absolute inset-0 top-1/2" />
      {children && <span className="relative mx-auto block w-fit bg-background px-2">{children}</span>}
    </div>
  );
}

function PixelFieldError({
  className, children, errors, ...props
}: React.ComponentProps<"div"> & { errors?: Array<{ message?: string } | undefined> }) {
  if (!children && !errors?.length) return null;
  const message = children ?? errors?.[0]?.message;
  if (!message) return null;
  return <div role="alert" data-slot="field-error" className={cn("text-xs text-destructive", className)} {...props}>{message}</div>;
}

export {
  PixelField, PixelFieldContent, PixelFieldDescription, PixelFieldError,
  PixelFieldGroup, PixelFieldLabel, PixelFieldLegend, PixelFieldSeparator,
  PixelFieldSet, PixelFieldTitle,
};

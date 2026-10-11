"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function PixelCalendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 font-[family-name:var(--pixel-font)]", className)}
      classNames={{
        // months is the positioning context (relative) because RDP renders
        // the nav as a direct child of months. The nav spans the full width
        // at the top; the caption reserves horizontal padding so its centered
        // label never sits under the edge-anchored arrow buttons.
        months: "flex flex-col sm:flex-row gap-4 relative",
        month: "flex flex-col gap-3 w-full",
        month_caption: "flex h-9 items-center justify-center w-full px-9",
        caption_label: "text-xs uppercase tracking-widest font-medium select-none",
        nav: "absolute inset-x-0 top-1 flex h-9 items-center justify-between px-0 z-10",
        button_previous:
          "inline-flex h-7 w-7 items-center justify-center border-2 border-foreground bg-transparent p-0 opacity-70 transition-all hover:opacity-100 hover:bg-accent active:translate-x-px disabled:opacity-30 disabled:hover:bg-transparent",
        button_next:
          "inline-flex h-7 w-7 items-center justify-center border-2 border-foreground bg-transparent p-0 opacity-70 transition-all hover:opacity-100 hover:bg-accent active:translate-x-px disabled:opacity-30 disabled:hover:bg-transparent",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "w-8 font-normal text-[10px] uppercase text-muted-foreground text-center",
        week: "flex w-full mt-1",
        day: "h-8 w-8 p-0 font-normal text-xs text-center border-2 border-transparent hover:border-foreground relative",
        day_button:
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100 inline-flex items-center justify-center",
        selected:
          "bg-primary text-primary-foreground border-2 border-foreground hover:bg-primary hover:text-primary-foreground",
        today: "border-2 border-accent font-bold",
        outside: "text-muted-foreground opacity-40",
        disabled: "text-muted-foreground opacity-30",
        range_middle: "bg-accent text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...props }) =>
          orientation === "left" ? (
            <ChevronLeft className="h-4 w-4" strokeWidth={3} {...props} />
          ) : (
            <ChevronRight className="h-4 w-4" strokeWidth={3} {...props} />
          ),
      }}
      {...props}
    />
  );
}
PixelCalendar.displayName = "PixelCalendar";

export { PixelCalendar };

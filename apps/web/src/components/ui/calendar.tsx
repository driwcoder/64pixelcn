"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function PixelCalendar({
  className, classNames, showOutsideDays = true, ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 font-[family-name:var(--pixel-font)]", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-xs uppercase tracking-widest",
        nav: "flex items-center gap-1",
        button_previous: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border-2 border-foreground absolute left-1 inline-flex items-center justify-center",
        button_next: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border-2 border-foreground absolute right-1 inline-flex items-center justify-center",
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday: "text-muted-foreground w-8 font-normal text-[10px] uppercase",
        week: "flex w-full mt-2",
        day: "h-8 w-8 p-0 font-normal text-xs border-2 border-transparent hover:border-foreground relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-none last:[&:has([aria-selected])]:rounded-none focus-within:relative focus-within:z-20",
        day_button: "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
        selected: "bg-primary text-primary-foreground border-2 border-foreground hover:bg-primary hover:text-primary-foreground",
        today: "border-2 border-accent font-bold",
        outside: "text-muted-foreground opacity-50",
        disabled: "text-muted-foreground opacity-50",
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

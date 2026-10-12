"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PixelButton } from "./button";
import { PixelCalendar } from "./calendar";
import { PixelPopover, PixelPopoverContent, PixelPopoverTrigger } from "./popover";

interface PixelDatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export function PixelDatePicker({ date, onDateChange, placeholder = "Pick a date", className }: PixelDatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <PixelPopover open={open} onOpenChange={setOpen}>
      <PixelPopoverTrigger asChild>
        <PixelButton
          data-slot="date-picker-trigger"
          variant="outline"
          className={cn(
            "w-full min-w-0 justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" strokeWidth={3} />
          <span className="truncate">{date ? date.toLocaleDateString() : placeholder}</span>
        </PixelButton>
      </PixelPopoverTrigger>
      <PixelPopoverContent className="w-auto p-0" align="start">
        <PixelCalendar
          mode="single"
          selected={date}
          onSelect={(d) => { onDateChange?.(d); setOpen(false); }}
          autoFocus
        />
      </PixelPopoverContent>
    </PixelPopover>
  );
}

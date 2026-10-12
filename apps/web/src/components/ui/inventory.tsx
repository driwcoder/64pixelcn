"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface PixelInventoryItem {
  id: string;
  name: string;
  icon?: React.ReactNode;
  /** Stack size; shown when greater than 1. */
  count?: number;
}

export interface PixelInventoryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** One entry per slot; null is an empty slot. */
  slots: (PixelInventoryItem | null)[];
  columns?: number;
  /** Selected item id (controlled). */
  selectedId?: string | null;
  defaultSelectedId?: string | null;
  onSelectedIdChange?: (id: string | null, item: PixelInventoryItem | null) => void;
}

/**
 * Grid of item slots. One tab stop for the whole grid: arrow keys move,
 * Home/End jump to the row ends, Enter/Space select.
 */
const PixelInventory = React.forwardRef<HTMLDivElement, PixelInventoryProps>(
  ({ slots, columns = 4, selectedId, defaultSelectedId = null, onSelectedIdChange, className, style, ...props }, ref) => {
    const [internal, setInternal] = React.useState(defaultSelectedId);
    const selected = selectedId !== undefined ? selectedId : internal;
    const [active, setActive] = React.useState(() => Math.max(0, slots.findIndex((s) => s?.id === selected)));
    const cells = React.useRef<(HTMLDivElement | null)[]>([]);

    const select = (i: number) => {
      const item = slots[i] ?? null;
      const id = item && item.id !== selected ? item.id : null;
      if (selectedId === undefined) setInternal(id);
      onSelectedIdChange?.(id, id ? item : null);
    };

    const move = (i: number) => {
      const next = Math.max(0, Math.min(slots.length - 1, i));
      setActive(next);
      cells.current[next]?.focus();
    };

    const onKeyDown = (e: React.KeyboardEvent, i: number) => {
      const row = Math.floor(i / columns) * columns;
      const keys: Record<string, () => void> = {
        ArrowRight: () => move(i + 1),
        ArrowLeft: () => move(i - 1),
        ArrowDown: () => move(i + columns),
        ArrowUp: () => move(i - columns),
        Home: () => move(row),
        End: () => move(Math.min(slots.length - 1, row + columns - 1)),
        Enter: () => select(i),
        " ": () => select(i),
      };
      const action = keys[e.key];
      if (action) {
        e.preventDefault();
        action();
      }
    };

    const rows: number[][] = [];
    for (let i = 0; i < slots.length; i += columns) rows.push(Array.from({ length: Math.min(columns, slots.length - i) }, (_, j) => i + j));

    return (
      <div
        ref={ref}
        role="grid"
        aria-label={props["aria-label"] ?? "Inventory"}
        data-slot="inventory"
        className={cn(
          "pixel-raised inline-grid max-w-full gap-[0.4em] bg-card p-[0.6em] text-card-foreground",
          "font-[family-name:var(--pixel-font)] text-[0.7rem]",
          className
        )}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 3.6em))`, ...style }}
        {...props}
      >
        {rows.map((r) => (
          <div key={r[0]} role="row" className="contents">
            {r.map((i) => {
              const item = slots[i];
              const isSelected = !!item && item.id === selected;
              return (
                <div
                  key={i}
                  ref={(el) => {
                    cells.current[i] = el;
                  }}
                  role="gridcell"
                  tabIndex={i === active ? 0 : -1}
                  aria-selected={isSelected}
                  aria-label={item ? `${item.name}${item.count && item.count > 1 ? `, ${item.count}` : ""}` : "Empty slot"}
                  title={item?.name}
                  data-slot="inventory-slot"
                  data-state={isSelected ? "selected" : undefined}
                  onClick={() => {
                    setActive(i);
                    select(i);
                  }}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    "relative flex aspect-square min-w-0 cursor-pointer items-center justify-center border-[length:var(--pixel-line,2px)] bg-muted",
                    "[&_svg]:size-[55%] [&_img]:size-[70%] [&_img]:object-contain",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isSelected ? "border-primary bg-primary/25" : "border-border hover:border-foreground",
                    !item && "cursor-default"
                  )}
                >
                  {item?.icon}
                  {item?.count !== undefined && item.count > 1 && (
                    <span aria-hidden className="absolute bottom-0 right-[0.2em] text-[0.85em] leading-tight tabular-nums">
                      {item.count}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
);
PixelInventory.displayName = "PixelInventory";

export { PixelInventory };

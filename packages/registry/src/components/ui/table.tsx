import * as React from "react";
import { cn } from "@/lib/utils";

function PixelTable({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto border-2 border-foreground">
      <table data-slot="table" className={cn("w-full caption-bottom text-xs font-[family-name:var(--pixel-font)]", className)} {...props} />
    </div>
  );
}

function PixelTableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn("bg-muted [&_tr]:border-b-2 [&_tr]:border-foreground", className)} {...props} />;
}

function PixelTableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

function PixelTableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return <tfoot data-slot="table-footer" className={cn("border-t-2 border-foreground bg-muted/50 font-medium", className)} {...props} />;
}

function PixelTableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return <tr data-slot="table-row" className={cn("border-b-2 border-foreground transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)} {...props} />;
}

function PixelTableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th data-slot="table-head" className={cn("h-10 px-3 text-left align-middle uppercase tracking-widest text-muted-foreground [&:has([role=checkbox])]:pr-0", className)} {...props} />
  );
}

function PixelTableCell({ className, ...props }: React.ComponentProps<"td">) {
  return <td data-slot="table-cell" className={cn("p-3 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props} />;
}

function PixelTableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return <caption data-slot="table-caption" className={cn("mt-4 text-xs text-muted-foreground", className)} {...props} />;
}

export {
  PixelTable, PixelTableHeader, PixelTableBody, PixelTableFooter,
  PixelTableHead, PixelTableRow, PixelTableCell, PixelTableCaption,
};

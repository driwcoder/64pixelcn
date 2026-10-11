"use client";

import * as React from "react";
import { flexRender, type ColumnDef } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PixelButton } from "./button";
import {
  PixelSelect,
  PixelSelectContent,
  PixelSelectItem,
  PixelSelectTrigger,
  PixelSelectValue,
} from "./select";
import {
  PixelTable,
  PixelTableBody,
  PixelTableCell,
  PixelTableHead,
  PixelTableHeader,
  PixelTableRow,
} from "./table";

interface DataTableProps<TData> {
  // TanStack v9 Table type takes two generics and pulls in a large feature
  // union; a structural `any` here keeps the component usable with any
  // feature set the consumer enables (pagination, sorting, etc.).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<any, any>[];
}

export function PixelDataTable<TData>({
  table,
  columns,
}: DataTableProps<TData>) {
  return (
    <div
      data-slot="data-table"
      className="space-y-4 font-[family-name:var(--pixel-font)]"
    >
      <PixelTable>
        <PixelTableHeader>
          {table.getHeaderGroups().map((headerGroup: { id: string; headers: Array<{ id: string; isPlaceholder: boolean; column: { columnDef: { header?: unknown } }; getContext: () => unknown }> }) => (
            <PixelTableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <PixelTableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header as never,
                        header.getContext() as never
                      )}
                </PixelTableHead>
              ))}
            </PixelTableRow>
          ))}
        </PixelTableHeader>
        <PixelTableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row: { id: string; getIsSelected: () => boolean; getVisibleCells: () => Array<{ id: string; column: { columnDef: { cell?: unknown } }; getContext: () => unknown }> }) => (
              <PixelTableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <PixelTableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell as never,
                      cell.getContext() as never
                    )}
                  </PixelTableCell>
                ))}
              </PixelTableRow>
            ))
          ) : (
            <PixelTableRow>
              <PixelTableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </PixelTableCell>
            </PixelTableRow>
          )}
        </PixelTableBody>
      </PixelTable>

      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-xs text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs">Rows per page</span>
            <PixelSelect
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <PixelSelectTrigger className="h-8 w-[70px]">
                <PixelSelectValue placeholder={table.getState().pagination.pageSize} />
              </PixelSelectTrigger>
              <PixelSelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <PixelSelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </PixelSelectItem>
                ))}
              </PixelSelectContent>
            </PixelSelect>
          </div>
          <div className="flex w-[100px] items-center justify-center text-xs">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center gap-1">
            <PixelButton
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={3} />
            </PixelButton>
            <PixelButton
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" strokeWidth={3} />
            </PixelButton>
          </div>
        </div>
      </div>
    </div>
  );
}

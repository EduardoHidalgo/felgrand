import React, {
  cloneElement,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { VirtualizedHead } from "./head";
import { fuzzyFilter } from "./helpers";

export interface VirtualizedDatatableProps<T> {
  columns: Array<ColumnDef<T>>;
  data: Array<T>;
  estimateSize: number;
  filters: ReactNode;
  initialFilters?: ColumnFiltersState;
  topRender?: ReactNode;
  updateData?: (item: T, index: number) => Promise<void>;
}

export const VirtualizedDatatable = <T,>({
  columns,
  data,
  estimateSize,
  filters,
  initialFilters,
  topRender,
  updateData,
}: VirtualizedDatatableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const virtualizerRef = useRef<HTMLDivElement>(null);

  const table = useReactTable<T>({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    meta: {
      updateData,
    },
    state: {
      columnFilters,
      sorting,
    },
    initialState: {
      columnFilters: initialFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { rows } = table.getRowModel();

  const virtualizer = useVirtualizer({
    count: table.getRowCount(),
    getScrollElement: () => virtualizerRef.current,
    estimateSize: () => estimateSize,
  });

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="flex flex-row gap-6">
        {cloneElement(topRender as ReactElement, {
          data: rows.map((row) => row.original),
        })}
      </div>
      <div className="grid w-full grid-cols-12 gap-2 gap-y-4">
        {cloneElement(filters as ReactElement, {
          table,
        })}
      </div>
      <div className="relative overflow-auto" ref={virtualizerRef}>
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
          }}
        >
          <table>
            <VirtualizedHead table={table} />
            <tbody className="">
              {virtualizer.getVirtualItems().map((virtualItem, index) => {
                const row = rows[virtualItem.index] as Row<T>;

                return (
                  <tr
                    key={index}
                    style={{
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${
                        virtualItem.start - index * virtualItem.size
                      }px)`,
                    }}
                    className="z-0"
                  >
                    {row !== undefined &&
                      row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

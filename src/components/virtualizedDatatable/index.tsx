import React, { useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { VirtualizedHead } from "./head";

export interface VirtualizedDatatableProps<T> {
  columns: Array<ColumnDef<T>>;
  data: Array<T>;
  estimateSize: number;
  itemsCount: number;
  updateData?: (item: T, index: number) => Promise<void>;
}

export const VirtualizedDatatable = <T,>({
  columns,
  data,
  estimateSize,
  itemsCount,
  updateData,
}: VirtualizedDatatableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const virtualizerRef = useRef<HTMLDivElement>(null);

  const table = useReactTable<T>({
    data,
    columns,
    state: {
      sorting,
    },
    meta: {
      updateData,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { rows } = table.getRowModel();

  const virtualizer = useVirtualizer({
    count: itemsCount,
    getScrollElement: () => virtualizerRef.current,
    estimateSize: () => estimateSize,
  });

  return (
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
                >
                  {row.getVisibleCells().map((cell) => (
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
  );
};

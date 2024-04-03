import classNames from "classnames";

import { flexRender, Table } from "@tanstack/react-table";

export interface VirtualizedHeadProps<T> {
  className?: string;
  table: Table<T>;
}

export const VirtualizedHead = <T,>({
  className,
  table,
}: VirtualizedHeadProps<T>) => {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr
          className="divide-x divide-gray-50 border border-white"
          key={headerGroup.id}
        >
          {headerGroup.headers.map((header) => (
            <th
              className={classNames(
                "bg-gray-900 px-2 py-1 text-center text-xs font-semibold",
                className,
              )}
              key={header.id}
              colSpan={header.colSpan}
              style={{ width: header.getSize() }}
            >
              {header.isPlaceholder ? null : (
                <div
                  {...{
                    className: header.column.getCanSort()
                      ? "cursor-pointer select-none"
                      : "",
                    onClick: header.column.getToggleSortingHandler(),
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted() as string] ?? null}
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

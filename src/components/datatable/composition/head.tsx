import { FC } from "react";

export interface TableHeadProps {
  headers: Array<string>;
}

export const TableHead: FC<TableHeadProps> = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th
            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold bg-gray-900"
            key={`th-${index}`}
            scope={"col"}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

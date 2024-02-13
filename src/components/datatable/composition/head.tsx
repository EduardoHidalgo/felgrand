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
            className="bg-gray-900 px-2 py-3.5 text-left text-sm font-semibold"
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

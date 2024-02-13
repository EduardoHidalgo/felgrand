import { FC, ReactNode } from "react";

export interface TableDataProps {
  children: ReactNode;
}

export const TableData: FC<TableDataProps> = ({ children }) => {
  return (
    <td className="px-2 py-2 text-sm">
      <div className="flex w-full flex-row justify-between gap-2">
        {children}
      </div>
    </td>
  );
};

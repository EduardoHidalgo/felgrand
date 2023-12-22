import { FC, ReactNode } from "react";

export interface TableDataProps {
  children: ReactNode;
}

export const TableData: FC<TableDataProps> = ({ children }) => {
  return (
    <td className=" whitespace-nowrap px-2 py-2 text-sm">
      <div className="flex flex-row justify-between w-full gap-2">
        {children}
      </div>
    </td>
  );
};

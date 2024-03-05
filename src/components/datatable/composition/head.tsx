import { FC, ReactNode } from "react";

export interface TableHeadProps {
  children: ReactNode;
}

export const TableHead: FC<TableHeadProps> = ({ children }) => {
  return (
    <thead>
      <tr className="divide-x divide-gray-50 border border-white">
        {children}
      </tr>
    </thead>
  );
};

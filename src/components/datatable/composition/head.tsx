import { FC, ReactNode } from "react";

export interface TableHeadProps {
  children: ReactNode;
}

export const TableHead: FC<TableHeadProps> = ({ children }) => {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  );
};

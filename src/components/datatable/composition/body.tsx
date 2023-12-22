import { FC, ReactNode } from "react";

export interface TableBodyProps {
  children: ReactNode;
}

export const TableBody: FC<TableBodyProps> = ({ children }) => {
  return <tbody className="divide-y divide-gray-200">{children}</tbody>;
};

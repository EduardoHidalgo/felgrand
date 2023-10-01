import { FC, ReactNode } from "react";
import { TableData, TableDataProps } from "./composition/data";
import { TableHead, TableHeadProps } from "./composition/head";
import { TableRow, TableRowProps } from "./composition/row";
import { TableBody, TableBodyProps } from "./composition/body";

interface Composition {
  Body: FC<TableBodyProps>;
  Data: FC<TableDataProps>;
  Head: FC<TableHeadProps>;
  Row: FC<TableRowProps>;
}

export interface DatatableProps {
  children: ReactNode;
}

export const Datatable: FC<DatatableProps> & Composition = ({ children }) => {
  return (
    <table className="min-w-full divide-y divide-gray-300">{children}</table>
  );
};

Datatable.Body = TableBody;
Datatable.Data = TableData;
Datatable.Head = TableHead;
Datatable.Row = TableRow;

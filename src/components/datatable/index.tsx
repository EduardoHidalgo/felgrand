import { FC, ReactNode } from "react";
import { TableBody, TableBodyProps } from "./composition/body";
import { TableData, TableDataProps } from "./composition/data";
import { TableMessageDisplay } from "./composition/empty";
import { TableHead, TableHeadProps } from "./composition/head";
import { TableRow, TableRowProps } from "./composition/row";
import { TableTextfield, TableTextfieldProps } from "./composition/textfield";
import { TableSelector, TableSelectorProps } from "./composition/selector";
import {
  TableHeaderCell,
  TableHeaderCellProps,
} from "./composition/headerCell";

interface Composition {
  Body: FC<TableBodyProps>;
  Data: FC<TableDataProps>;
  Head: FC<TableHeadProps>;
  HeaderCell: FC<TableHeaderCellProps>;
  Row: FC<TableRowProps>;
  Selector: FC<TableSelectorProps<any>>;
  Textfield: FC<TableTextfieldProps>;
}

export interface DatatableProps {
  children: ReactNode;
  display?: string;
  showDisplay?: boolean;
}

export const Datatable: FC<DatatableProps> & Composition = ({
  children,
  display,
  showDisplay,
}) => {
  return (
    <>
      <table className="min-w-full divide-y divide-gray-300">{children}</table>
      {showDisplay !== undefined && showDisplay == true && (
        <TableMessageDisplay>{display}</TableMessageDisplay>
      )}
    </>
  );
};

Datatable.Body = TableBody;
Datatable.Data = TableData;
Datatable.Head = TableHead;
Datatable.HeaderCell = TableHeaderCell;
Datatable.Row = TableRow;
Datatable.Selector = TableSelector;
Datatable.Textfield = TableTextfield;

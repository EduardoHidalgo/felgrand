import { FC, ReactNode } from "react";

export interface TableRowProps {
  children: ReactNode;
  index: number;
  onClickRow?: (index: number) => void;
}

export const TableRow: FC<TableRowProps> = ({
  children,
  index,
  onClickRow,
}) => {
  const onClick = () => {
    onClickRow && onClickRow(index);
  };

  return <tr onClick={onClick}>{children}</tr>;
};

import classNames from "classnames";
import { FC, ReactNode } from "react";

export interface TableRowProps {
  children: ReactNode;
  index: number;
  isSelected?: boolean;
  onClickRow?: (index: number) => void;
}

export const TableRow: FC<TableRowProps> = ({
  children,
  index,
  isSelected,
  onClickRow,
}) => {
  const onClick = () => {
    onClickRow && onClickRow(index);
  };

  return (
    <tr className={classNames(isSelected && "bg-gray-800")} onClick={onClick}>
      {children}
    </tr>
  );
};

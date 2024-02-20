import { FC, ReactNode } from "react";
import classNames from "classnames";

export interface TableHeaderCellProps {
  children: ReactNode;
  className?: string;
}

export const TableHeaderCell: FC<TableHeaderCellProps> = ({
  children,
  className,
}) => {
  return (
    <th
      className={classNames(
        "bg-gray-900 px-2 py-2 text-left text-sm font-semibold",
        className,
      )}
      scope={"col"}
    >
      {children}
    </th>
  );
};

import { FC, ReactNode, cloneElement } from "react";
import classNames from "classnames";

import { TableDataProps } from "./data";

export interface TableRowProps
  extends Pick<TableDataProps, "index" | "onClickRow"> {
  children: ReactNode;
  colSpan?: number;
  className?: string;
  isSelected?: boolean;
}

export const TableRow: FC<TableRowProps> = ({
  children,
  className,
  colSpan,
  index,
  isSelected,
  onClickRow,
}) => {
  return (
    <tr className={classNames(isSelected && "bg-gray-800", className)}>
      {Array.isArray(children) == false && (
        <td colSpan={colSpan} className="border-b-4 border-gray-900">
          {children}
        </td>
      )}
      {Array.isArray(children) &&
        (children as Array<ReactNode>).map((child, key) =>
          cloneElement(
            child as JSX.Element,
            {
              index,
              key,
              onClickRow,
            } as Pick<TableDataProps, "index" | "onClickRow"> & { key: number },
          ),
        )}
    </tr>
  );
};

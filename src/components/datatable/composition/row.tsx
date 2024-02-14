import classNames from "classnames";
import { FC, ReactNode, cloneElement } from "react";
import { TableDataProps } from "./data";

export interface TableRowProps
  extends Pick<TableDataProps, "index" | "onClickRow"> {
  children: ReactNode;
  isSelected?: boolean;
}

export const TableRow: FC<TableRowProps> = ({
  children,
  index,
  isSelected,
  onClickRow,
}) => {
  return (
    <tr className={classNames(isSelected && "bg-gray-800")}>
      {(children as Array<ReactNode>).map((child) =>
        cloneElement(
          child as JSX.Element,
          {
            index,
            onClickRow,
          } as Pick<TableDataProps, "index" | "onClickRow">,
        ),
      )}
    </tr>
  );
};

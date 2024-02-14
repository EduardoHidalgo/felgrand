import { FC, ReactNode } from "react";

export interface TableDataProps {
  children: ReactNode;
  clickRowIgnore?: boolean;
  index?: number;
  onClickRow?: (index: number) => void;
}

export const TableData: FC<TableDataProps> = ({
  children,
  clickRowIgnore,
  index,
  onClickRow,
}) => {
  const onClick = () => {
    clickRowIgnore !== true && onClickRow && index && onClickRow(index);
  };

  return (
    <td className="px-2 py-2 text-sm" onClick={onClick}>
      <div className="flex w-full flex-row justify-between gap-2">
        {children}
      </div>
    </td>
  );
};

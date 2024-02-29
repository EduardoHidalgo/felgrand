import { FC, ReactNode } from "react";
import { ClipboardIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

export interface TableDataProps {
  children: ReactNode;
  className?: string;
  clickRowIgnore?: boolean;
  index?: number;
  copyToClipboard?: string;
  onClickRow?: (index: number) => void;
}

export const TableData: FC<TableDataProps> = ({
  children,
  className,
  clickRowIgnore,
  index,
  copyToClipboard,
  onClickRow,
}) => {
  const onClick = () => {
    clickRowIgnore !== true &&
      onClickRow &&
      index !== undefined &&
      onClickRow(index);
  };

  const onClickCopyToClipboard = async (value?: string) => {
    if (value) await navigator.clipboard.writeText(value);
  };

  return (
    <td className="px-2 py-2 text-sm" onClick={onClick}>
      <div
        className={classNames(
          "flex w-full flex-row gap-2",
          copyToClipboard && "justify-between",
          className,
        )}
      >
        {children}
        {copyToClipboard && (
          <ClipboardIcon
            className={classNames(
              "text-gray-30 h-4 w-4 min-w-[16px] self-center",
              "transition-all hover:scale-125 hover:cursor-pointer hover:text-white",
            )}
            onClick={() => onClickCopyToClipboard(copyToClipboard)}
          />
        )}
      </div>
    </td>
  );
};

import { FC, ReactNode, useState } from "react";
import { ClipboardIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

export interface TableDataProps {
  children: ReactNode;
  className?: string;
  clickRowIgnore?: boolean;
  copyToClipboard?: string;
  index?: number;
  onClickRow?: (index: number) => void;
}

export const TableData: FC<TableDataProps> = ({
  children,
  className,
  clickRowIgnore,
  copyToClipboard,
  index,
  onClickRow,
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const onMouseEnter = () => setIsHover(true);

  const onMouseLeave = () => setIsHover(false);

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
    <td
      className="px-2 py-2 text-sm"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={classNames(
          copyToClipboard && (isHover ? "gap-2" : "pr-6"),
          "flex w-full flex-row whitespace-nowrap",
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
              isHover ? "block" : "hidden",
            )}
            onClick={() => onClickCopyToClipboard(copyToClipboard)}
          />
        )}
      </div>
    </td>
  );
};

import { FC, ReactNode } from "react";
import classNames from "classnames";

export interface ChipProps {
  className?: string;
  children: ReactNode;
}

export const Chip: FC<ChipProps> = ({ className, children }) => {
  return (
    <span
      className={classNames(
        "whitespace-nowrap rounded-full px-3 text-xs font-bold",
        className,
      )}
    >
      {children}
    </span>
  );
};

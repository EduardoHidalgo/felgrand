import { FC, ReactNode, useState } from "react";
import classNames from "classnames";

export interface TooltipProps {
  children: ReactNode;
  container?: {
    className?: string;
  };
  content: ReactNode;
  tooltip?: {
    className?: string;
  };
}

export const Tooltip: FC<TooltipProps> = ({
  children,
  container,
  content,
  tooltip,
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const onMouseEnter = () => setIsHover(true);
  const onMouseLeave = () => setIsHover(false);

  return (
    <div
      className={classNames("relative", container?.className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
      {content && (
        <div
          className={classNames(
            "absolute z-10 flex rounded border border-white bg-black px-2 py-1 text-center leading-3",
            isHover == false && "hidden",
            tooltip?.className,
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};

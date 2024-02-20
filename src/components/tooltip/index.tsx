import { FC, ReactNode, useState } from "react";
import classNames from "classnames";

export interface TooltipProps {
  children: ReactNode;
  container: {
    className?: string;
  };
  text: string;
  tooltip: {
    className?: string;
  };
}

export const Tooltip: FC<TooltipProps> = ({
  children,
  container,
  text,
  tooltip,
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const onMouseEnter = () => setIsHover(true);
  const onMouseLeave = () => setIsHover(false);

  return (
    <div
      className={classNames("relative", container.className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
      <p
        className={classNames(
          "absolute z-10 h-6 rounded border border-white bg-black px-2 py-1 text-center leading-3",
          isHover == false && "hidden",
          tooltip.className,
        )}
      >
        {text}
      </p>
    </div>
  );
};

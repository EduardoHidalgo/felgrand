import classNames from "classnames";
import { FC } from "react";

export interface ButtonProps {
  disabled?: boolean;
  label: string;
  onClick: () => void;
}

export const Button: FC<ButtonProps> = ({ disabled, label, onClick }) => {
  const onClickHandler = () => {
    if (!disabled) onClick();
  };

  return (
    <button
      disabled={disabled}
      onClick={() => onClickHandler()}
      type="button"
      className={classNames(
        "rounded px-2 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset ring-gray-300",
        disabled
          ? "bg-orange-50 text-gray-400"
          : "bg-orange-300 text-gray-900 hover:bg-orange-400",
      )}
    >
      {label}
    </button>
  );
};

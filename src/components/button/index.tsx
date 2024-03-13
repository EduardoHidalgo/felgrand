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
        "rounded px-2 py-1 text-base font-medium transition-colors",
        disabled
          ? "cursor-not-allowed bg-gray-200 text-gray-600"
          : "bg-white text-black hover:bg-gray-200",
      )}
    >
      {label}
    </button>
  );
};

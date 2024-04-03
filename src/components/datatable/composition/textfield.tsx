import { ChangeEvent, FC, useEffect, useState } from "react";
import classNames from "classnames";

import { TextfieldProps } from "@/components/textfield";
import { useDebounce } from "@/hooks/useDebounce";
import { InputType } from "@/types";

export interface TableTextfieldProps
  extends Omit<TextfieldProps, "label" | "styles"> {
  styles?: {
    input?: string;
    wrapper?: string;
  };
}

export const TableTextfield: FC<TableTextfieldProps> = ({
  disabled,
  id,
  initialValue,
  min,
  onChange,
  placeholder,
  readonly,
  styles,
  type,
  value,
}) => {
  const [inputValue, setInputValue] = useState(
    readonly === true ? value : initialValue,
  );
  const debouncedValue = useDebounce<InputType>(inputValue);

  useEffect(() => {
    onChange && debouncedValue !== initialValue && onChange(inputValue);
  }, [debouncedValue]);

  const onChangeInternal = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <div className={classNames("relative w-full", styles?.wrapper)}>
      <input
        className={classNames(
          styles?.input,
          "transition-colors",
          "w-full rounded-md border-0 bg-black !px-0 py-1.5 text-sm",
          "focus:outline-none",
          type == "price" && "!pr-3",
          disabled
            ? "text-gray-300 placeholder:text-gray-400"
            : "text-gray-100 placeholder:text-gray-200",
        )}
        disabled={disabled}
        id={id}
        min={min}
        name={id}
        onChange={onChangeInternal}
        placeholder={placeholder}
        type={type ? type : "text"}
        value={readonly === true ? value : inputValue}
      />
      {type == "price" && (
        <div className="pointer-events-none absolute bottom-[5px] right-0 flex items-center">
          <span className="text-base text-white">$</span>
        </div>
      )}
    </div>
  );
};

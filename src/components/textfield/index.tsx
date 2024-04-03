import {
  ChangeEvent,
  FC,
  HTMLInputTypeAttribute,
  useEffect,
  useState,
} from "react";
import classNames from "classnames";

import { useDebounce } from "@/hooks/useDebounce";
import { InputType } from "@/types";

export interface TextfieldProps {
  disabled?: boolean;
  id: string;
  initialValue?: InputType;
  label: string;
  min?: number;
  onChange?: (value: InputType) => void;
  placeholder?: string;
  readonly?: boolean;
  styles?: {
    input?: string;
    label?: string;
    wrapper?: string;
  };
  type?: HTMLInputTypeAttribute | "price";
  value?: InputType;
}

export const Textfield: FC<TextfieldProps> = ({
  disabled,
  id,
  initialValue,
  label,
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
    if (value !== inputValue) setInputValue(value);
  }, [value]);

  useEffect(() => {
    onChange && onChange(inputValue);
  }, [debouncedValue]);

  const onChangeInternal = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <div className={classNames("relative w-full", styles?.wrapper)}>
      <label
        className={classNames(
          styles?.label,
          "transition-colors",
          "absolute -top-[10px] left-2 z-10 bg-black px-1 text-sm font-bold",
          disabled ? "text-gray-300" : "text-white",
        )}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={classNames(
          styles?.input,
          "transition-colors",
          "w-full rounded-md border-0 bg-black py-1.5 text-sm leading-6",
          "ring-1 ring-inset focus:ring-2 focus:ring-inset",
          type == "price" && "pl-3",
          disabled
            ? "text-gray-300 ring-gray-500 placeholder:text-gray-400 focus:ring-gray-200"
            : "text-gray-100 ring-gray-300 placeholder:text-gray-200 focus:ring-white",
        )}
        disabled={disabled || readonly}
        id={id}
        min={min}
        name={id}
        onChange={onChangeInternal}
        placeholder={placeholder}
        type={type ? type : "text"}
        value={readonly === true ? value : inputValue}
      />
      {type == "price" && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-base text-white">$</span>
        </div>
      )}
    </div>
  );
};

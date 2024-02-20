import { InputType } from "@/types";
import classNames from "classnames";

export type SelectorOption<T> = {
  value: T;
  label: string;
  index?: string | number;
};

export interface SelectorProps<T> {
  disabled?: boolean;
  id: string;
  label: string;
  onChange: (value: T) => void;
  options: Array<SelectorOption<T>>;
  styles?: {
    label?: string;
    select?: string;
    wrapper?: string;
  };
  value: InputType | undefined;
}

export const Selector = <T,>({
  disabled,
  id,
  label,
  onChange,
  options,
  styles,
  value,
}: SelectorProps<T>) => {
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
      <select
        className={classNames(
          styles?.select,
          "transition-colors",
          "w-full rounded-md border-0 bg-black py-1.5 text-sm leading-6",
          "ring-1 ring-inset focus:ring-2 focus:ring-inset",
          disabled
            ? "text-gray-300 ring-gray-500 placeholder:text-gray-400 focus:ring-gray-200"
            : "text-gray-100 ring-gray-300 placeholder:text-gray-200 focus:ring-white",
        )}
        disabled={disabled}
        id={id}
        name={id}
        onChange={(e) => onChange(e.target.value as T)}
        value={value}
      >
        {options.map(({ label, value }) => (
          <option key={label} value={value as any}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

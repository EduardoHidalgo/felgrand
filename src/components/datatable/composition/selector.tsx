import classNames from "classnames";

import { SelectorProps } from "@/components/selector";

export interface TableSelectorProps<T>
  extends Omit<SelectorProps<T>, "label" | "styles"> {
  styles?: {
    select?: string;
    wrapper?: string;
  };
}

export const TableSelector = <T,>({
  disabled,
  id,
  onChange,
  options,
  styles,
  value,
}: TableSelectorProps<T>) => {
  return (
    <div className={classNames("relative w-full", styles?.wrapper)}>
      <select
        className={classNames(
          "transition-colors",
          "w-full rounded-md border-0 bg-black text-sm",
          "focus:outline-none",
          disabled
            ? "text-gray-300 placeholder:text-gray-400"
            : "text-gray-100 placeholder:text-gray-200",
          styles?.select,
        )}
        disabled={disabled}
        id={id}
        name={id}
        onChange={(e) => onChange(e.target.value as T)}
        value={value}
      >
        {options.map(({ label, value }) => (
          <option key={label} value={value as any} className="text-gray-100">
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

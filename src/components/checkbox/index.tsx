import { FC } from "react";

export interface CheckboxProps {
  checked: boolean;
  label: string;
  name: string;
  onClick: (value: boolean) => void;
}

export const Checkbox: FC<CheckboxProps> = ({
  checked,
  label,
  name,
  onClick,
}: CheckboxProps) => {
  const onChange = () => {
    onClick(!checked);
  };

  return (
    <div className="flex h-6 items-center">
      <input
        checked={checked}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        name={name}
        onChange={onChange}
        type="checkbox"
      />
      <div className="ml-3 text-sm leading-6">
        <label htmlFor={name} className="font-medium text-gray-900">
          {label}
        </label>
      </div>
    </div>
  );
};

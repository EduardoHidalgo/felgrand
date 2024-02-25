export interface SelectorOptionProps<T> {
  className?: string;
  label: string;
  value: T;
}

export const SelectorOption = <T,>({
  className,
  label,
  value,
}: SelectorOptionProps<T>) => {
  return (
    <option className={className} key={label} value={value as any}>
      {label}
    </option>
  );
};

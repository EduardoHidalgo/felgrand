import { useEffect, useState } from "react";

export function useDebounce<T>(value: T): T {
  const DEBOUNCE_TIME_MS = 750;
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // Every time a new input is given but not enough time has passed, the
  // execution of the immediate previous timeout is eliminated and a new one
  // is generated that will wait.
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), DEBOUNCE_TIME_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debouncedValue;
}

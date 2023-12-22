"use client";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebounce } from "./useDebounce";

export interface SearchBarProps {
  fetchData: (searchValue: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ fetchData }) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce<string>(inputValue);

  useEffect(() => {
    submit();
  }, [debouncedValue]);

  const submit = async () => {
    fetchData(debouncedValue);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <div className="w-full py-2">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          className="block w-full text-gray-200 bg-transparent outline-gray-500 rounded-md border border-gray-300 py-1.5 pl-10 pr-3"
          id="search"
          name="search"
          onChange={(e) => onChange(e)}
          placeholder="Search"
          type="search"
        />
      </div>
    </div>
  );
};

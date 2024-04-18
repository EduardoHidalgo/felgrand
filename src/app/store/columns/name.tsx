import { FC } from "react";

export interface StoreColumnNameProps {
  name: string;
}

export const StoreColumnName: FC<StoreColumnNameProps> = ({ name }) => {
  return (
    <a
      className="cursor-pointer whitespace-pre-wrap underline underline-offset-2"
      href={`/search?search=${name}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      {name}
    </a>
  );
};

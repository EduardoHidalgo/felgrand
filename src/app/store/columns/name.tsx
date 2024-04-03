import { FC } from "react";

export interface StoreColumnNameProps {
  name: string;
}

export const StoreColumnName: FC<StoreColumnNameProps> = ({ name }) => {
  return <p className="whitespace-pre-wrap">{name}</p>;
};

import { FC } from "react";

export interface LoaderProps {}

export const Loader: FC<LoaderProps> = ({}) => {
  return (
    <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-solid border-orange-500 border-t-transparent" />
  );
};

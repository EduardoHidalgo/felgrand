import { FC } from "react";

export interface LoaderProps {}

export const Loader: FC<LoaderProps> = ({}) => {
  return (
    <div className="w-8 h-8 rounded-full animate-spin border-[3px] border-solid border-orange-500 border-t-transparent" />
  );
};

import { FC, ReactNode } from "react";

export interface TableMessageDisplayProps {
  children: ReactNode;
}

export const TableMessageDisplay: FC<TableMessageDisplayProps> = ({
  children,
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <p className="w-64 py-4 text-center">{children}</p>
    </div>
  );
};

import { FC } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

import { InputType, StoreStatus } from "@/types";
import { StoreColumnProps, TableMetaType } from "./interface";
import { TableTextfield } from "@/components/datatable/composition/textfield";

export interface StoreColumnWantedCountProps extends StoreColumnProps {}

export const StoreColumnWantedCount: FC<StoreColumnWantedCountProps> = ({
  row,
  table,
}) => {
  const { status, wantedCount } = row.original;
  const { index } = row;

  const onChange = (value: InputType) => {
    const meta = table.options.meta as TableMetaType;
    Number.isSafeInteger(value) &&
      meta &&
      meta.updateData({ ...row.original, wantedCount: Number(value) }, index);
  };

  return (
    <>
      {wantedCount > 0 && (
        <div className="flex flex-row items-center justify-start font-bold">
          <TableTextfield
            id={`wantedCount-${index}`}
            onChange={onChange}
            type="number"
            initialValue={wantedCount}
            styles={{
              wrapper: "!w-8",
              input: "text-center",
            }}
          />
        </div>
      )}
      {wantedCount == 0 && (
        <div
          className={classNames(
            "flex flex-row items-center justify-start gap-1 font-bold",
            status === StoreStatus.Wanted && "text-red-400",
          )}
        >
          <TableTextfield
            id={`wantedCount-${index}`}
            onChange={onChange}
            type="number"
            initialValue={wantedCount}
            styles={{
              wrapper: "!w-8",
              input: "text-center",
            }}
          />
          {status === StoreStatus.Wanted && (
            <QuestionMarkCircleIcon className="h-4 w-4" />
          )}
        </div>
      )}
    </>
  );
};

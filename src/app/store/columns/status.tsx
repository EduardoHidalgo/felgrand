import { FC } from "react";
import classNames from "classnames";

import { StoreColumnProps, TableMetaType } from "./interface";
import { StoreStatus } from "@/types";
import { statusOptions } from "@/utils/options";
import { TableSelector } from "@/components/datatable/composition/selector";

export interface StoreColumnStatusProps extends StoreColumnProps {}

export const StoreColumnStatus: FC<StoreColumnStatusProps> = ({
  row,
  table,
}) => {
  const { status } = row.original;
  const { index } = row;

  const onChange = (value: StoreStatus) => {
    const meta = table.options.meta as TableMetaType;
    meta &&
      meta.updateData({ ...row.original, status: value as StoreStatus }, index);
  };

  return (
    <div className="flex flex-row justify-center">
      <TableSelector<StoreStatus>
        id="condition"
        onChange={onChange}
        options={statusOptions}
        styles={{
          select: classNames(
            "whitespace-nowrap !w-auto text-center font-bold",
            status == StoreStatus.Bought && "text-orange-400",
            status == StoreStatus.Default && "text-gray-200",
            status == StoreStatus.Delivered && "text-blue-500",
            status == StoreStatus.PendingDelivery && "text-yellow-400",
            status == StoreStatus.Stored && "text-green-400",
            status == StoreStatus.Wanted && "text-red-400",
          ),
        }}
        value={status}
      />
    </div>
  );
};

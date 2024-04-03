import { FC } from "react";
import classNames from "classnames";

import { StoreColumnProps, TableMetaType } from "./interface";
import { Priority } from "@/types";
import { TableSelector } from "@/components/datatable/composition/selector";
import { priorityOptions } from "@/utils/options";

export interface StoreColumnPriorityProps extends StoreColumnProps {}

export const StoreColumnPriority: FC<StoreColumnPriorityProps> = ({
  row,
  table,
}) => {
  const { priority } = row.original;
  const { index } = row;

  const onChange = (value: Priority) => {
    const meta = table.options.meta as TableMetaType;
    meta &&
      meta.updateData(
        { ...row.original, priority: Number(value) as Priority },
        index,
      );
  };

  return (
    <div className="flex w-full flex-row justify-center">
      <TableSelector
        id="priority"
        onChange={onChange}
        options={priorityOptions}
        styles={{
          select: classNames(
            "whitespace-nowrap !w-auto text-center font-bold",
            priority == Priority.High && "text-yellow-500",
            priority == Priority.Ignore && "text-gray-500 line-through",
            priority == Priority.Low && "text-orange-300",
            priority == Priority.Medium && "text-yellow-300",
            priority == Priority.NotReleasedYet && "text-red-700",
            priority == Priority.TooExpensive && "text-purple-500",
            priority == Priority.Unwanted && "text-red-300",
            priority == Priority.Urgent && "text-green-500",
            priority == Priority.VeryHigh && "text-green-300",
          ),
        }}
        value={priority}
      />
    </div>
  );
};

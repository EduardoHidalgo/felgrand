import { FC } from "react";
import classNames from "classnames";

import { StoreColumnProps, TableMetaType } from "./interface";
import { Importance } from "@/types";
import { importanceOptions } from "@/utils/options";
import { TableSelector } from "@/components/datatable/composition/selector";

export interface StoreColumnImportanceProps extends StoreColumnProps {}

export const StoreColumnImportance: FC<StoreColumnImportanceProps> = ({
  row,
  table,
}) => {
  const { importance } = row.original;
  const { index } = row;

  const onChange = (value: Importance) => {
    const meta = table.options.meta as TableMetaType;
    meta &&
      meta.updateData(
        { ...row.original, importance: Number(value) as Importance },
        index,
      );
  };

  return (
    <div className="flex w-full flex-row justify-center">
      <TableSelector
        id="importance"
        onChange={onChange}
        options={importanceOptions}
        styles={{
          select: classNames(
            "whitespace-nowrap !w-auto text-center font-bold",
            importance == Importance.ArchetypeCore && "text-blue-500",
            importance == Importance.HighValue && "text-green-300",
            importance == Importance.LowValue && "text-orange-300",
            importance == Importance.MediumValue && "text-yellow-300",
            importance == Importance.Proxy && "text-pink-400",
            importance == Importance.Staple && "text-purple-500",
            importance == Importance.Trash && "text-red-700 line-through",
            importance == Importance.Unused && "text-red-300",
            importance == Importance.Unwanted && "text-red-500 line-through",
            importance == Importance.VeryHighValue && "text-green-500",
          ),
        }}
        value={importance}
      />
    </div>
  );
};

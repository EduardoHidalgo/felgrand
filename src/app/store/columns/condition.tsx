import { FC } from "react";
import classNames from "classnames";

import { StoreColumnProps, TableMetaType } from "./interface";
import { Condition } from "@/types";
import { TableSelector } from "@/components/datatable/composition/selector";
import { conditionOptions } from "@/utils/options";

export interface StoreColumnConditionProps extends StoreColumnProps {}

export const StoreColumnCondition: FC<StoreColumnConditionProps> = ({
  row,
  table,
}) => {
  const { condition } = row.original;
  const { index } = row;

  const onChange = (value: Condition) => {
    const meta = table.options.meta as TableMetaType;
    meta &&
      meta.updateData(
        { ...row.original, condition: Number(value) as Condition },
        index,
      );
  };

  return (
    <div className="flex w-full flex-row justify-center">
      <TableSelector<Condition>
        id="condition"
        onChange={onChange}
        options={conditionOptions}
        styles={{
          select: classNames(
            "whitespace-nowrap !w-auto text-center font-bold",
            condition == Condition.Damaged && "text-red-500",
            condition == Condition.HeavilyPlayer && "text-orange-500",
            condition == Condition.LightlyPlayed && "text-green-300",
            condition == Condition.ModeratelyPlayed && "text-yellow-400",
            condition == Condition.NearMint && "text-green-500",
          ),
        }}
        value={condition}
      />
    </div>
  );
};

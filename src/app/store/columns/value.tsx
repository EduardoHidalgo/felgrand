import { FC } from "react";

import { TrendingPrice } from "@/components/trendingPrice";
import { StoreColumnProps, TableMetaType } from "./interface";
import { TableTextfield } from "@/components/datatable/composition/textfield";
import { InputType } from "@/types";

export interface StoreColumnValueProps extends StoreColumnProps {}

export const StoreColumnValue: FC<StoreColumnValueProps> = ({ row, table }) => {
  const { prices, status, value } = row.original;
  const { index } = row;

  const onChange = (value: InputType) => {
    const meta = table.options.meta as TableMetaType;
    Number.isSafeInteger(value) &&
      meta &&
      meta.updateData({ ...row.original, value: Number(value) }, index);
  };

  return (
    <TrendingPrice price={value} prices={prices} status={status}>
      <TableTextfield
        id={`value-${index}`}
        onChange={onChange}
        type="price"
        initialValue={value !== 0 ? value.toFixed(2).toString() : 0}
        styles={{
          wrapper: "!w-16",
          input: "text-right",
        }}
      />
    </TrendingPrice>
  );
};

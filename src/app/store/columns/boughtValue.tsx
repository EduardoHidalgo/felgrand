import { FC } from "react";
import { StoreColumnProps, TableMetaType } from "./interface";
import { InputType } from "@/types";
import { TableTextfield } from "@/components/datatable/composition/textfield";

export interface StoreColumnBoughtValueProps extends StoreColumnProps {}

export const StoreColumnBoughtValue: FC<StoreColumnBoughtValueProps> = ({
  row,
  table,
}) => {
  const { boughtValue } = row.original;
  const { index } = row;

  const onChange = (value: InputType) => {
    const meta = table.options.meta as TableMetaType;
    Number.isSafeInteger(value) &&
      meta &&
      meta.updateData({ ...row.original, value: Number(value) }, index);
  };

  return (
    <div className="flex flex-row items-center justify-end px-1">
      <TableTextfield
        id={`boughtValue-${index}`}
        onChange={onChange}
        type="price"
        initialValue={boughtValue}
        styles={{
          input: "text-right",
        }}
      />
    </div>
  );
};

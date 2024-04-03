import { FC } from "react";

import { StoreColumnProps, TableMetaType } from "./interface";
import { TableTextfield } from "@/components/datatable/composition/textfield";
import { InputType } from "@/types";

export interface StoreColumnStorageGroupProps extends StoreColumnProps {}

export const StoreColumnStorageGroup: FC<StoreColumnStorageGroupProps> = ({
  row,
  table,
}) => {
  const { storageGroup } = row.original;
  const { index } = row;

  const onChange = (value: InputType) => {
    const meta = table.options.meta as TableMetaType;
    meta &&
      meta.updateData({ ...row.original, storageGroup: String(value) }, index);
  };

  return (
    <div className="flex w-full flex-row justify-center text-center">
      <TableTextfield
        id={`storageGroup-${index}`}
        onChange={onChange}
        type="text"
        initialValue={storageGroup ? storageGroup : ""}
        styles={{
          input: "text-center",
        }}
      />
    </div>
  );
};

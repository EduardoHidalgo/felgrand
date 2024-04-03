import { Row, Table } from "@tanstack/react-table";

import { StoredCardCombined } from "@/types";

export type MetaDataType = {
  updateData: (item: StoredCardCombined, index: number) => Promise<void>;
};

export type TableMetaType = MetaDataType;

export interface StoreColumnProps {
  row: Row<StoredCardCombined>;
  table: Table<StoredCardCombined>;
}

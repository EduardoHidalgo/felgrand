import { FC } from "react";

import { Datatable } from "../datatable";
import { StoredCardItemData, YugiohCard } from "@/types";
import { ItemTableRow } from "./itemTableRow";

export interface StoredCardItemsTableProps {
  items: Array<StoredCardItemData>;
  yugiohCard: YugiohCard;
}

export const StoredCardItemsTable: FC<StoredCardItemsTableProps> = ({
  items,
  yugiohCard,
}) => {
  return (
    <Datatable display={"No items added yet."} showDisplay={items.length == 0}>
      <Datatable.Head>
        <Datatable.HeaderCell>set code</Datatable.HeaderCell>
        <Datatable.HeaderCell>set name</Datatable.HeaderCell>
        <Datatable.HeaderCell>rarity</Datatable.HeaderCell>
        <Datatable.HeaderCell className="text-center">
          language
        </Datatable.HeaderCell>
        <Datatable.HeaderCell className="text-center">
          condition
        </Datatable.HeaderCell>
        <Datatable.HeaderCell className="text-center">
          status
        </Datatable.HeaderCell>
        <Datatable.HeaderCell>storageGroup</Datatable.HeaderCell>
        <Datatable.HeaderCell>count</Datatable.HeaderCell>
        <Datatable.HeaderCell>wanted count</Datatable.HeaderCell>
        <Datatable.HeaderCell className="text-center">
          price value
        </Datatable.HeaderCell>
        <Datatable.HeaderCell className="text-center">
          bought value
        </Datatable.HeaderCell>
      </Datatable.Head>
      <Datatable.Body>
        {items.map((item, index) => (
          <ItemTableRow
            index={index}
            item={item}
            key={index}
            yugiohCard={yugiohCard}
          />
        ))}
      </Datatable.Body>
    </Datatable>
  );
};

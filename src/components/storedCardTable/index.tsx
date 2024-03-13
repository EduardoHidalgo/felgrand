import { FC } from "react";

import {
  AsyncState,
  StoredCardItem,
  UpdateRowStoredCardItem,
  UpdateStoredCard,
  YugiohCard,
} from "@/types";
import { Datatable } from "../datatable";
import { StoredCardTableRow } from "./StoredCardTableRow";

export interface StoredCardTableProps {
  cards: Array<StoredCardItem>;
  deleteStoredCardItem: (itemId: number) => Promise<void>;
  state: AsyncState;
  yugiohCard: YugiohCard | null;
  updateStoredCard: (item: UpdateStoredCard) => Promise<void>;
  updateStoredCardItem: (item: UpdateRowStoredCardItem) => Promise<void>;
}

export const StoredCardTable: FC<StoredCardTableProps> = ({
  cards,
  deleteStoredCardItem,
  state,
  updateStoredCard,
  updateStoredCardItem,
  yugiohCard,
}) => {
  const display = (): string | undefined => {
    switch (state) {
      case AsyncState.Error:
        return "Something has failed. Unable to get storedCards.";
      case AsyncState.Loading:
        return "Loading storedCards.";
      default:
        return undefined;
    }
  };

  const showDisplay = (): boolean => {
    switch (state) {
      case AsyncState.Error:
      case AsyncState.Loading:
        return true;
      default:
        return false;
    }
  };

  return (
    <Datatable display={display()} showDisplay={showDisplay()}>
      <Datatable.Head>
        <Datatable.HeaderCell>name</Datatable.HeaderCell>
        <Datatable.HeaderCell>count</Datatable.HeaderCell>
        <Datatable.HeaderCell>wanted count</Datatable.HeaderCell>
        <Datatable.HeaderCell className="text-center">
          avg value
        </Datatable.HeaderCell>
        <Datatable.HeaderCell className="text-center">
          importance
        </Datatable.HeaderCell>
        <Datatable.HeaderCell className="text-center">
          priority
        </Datatable.HeaderCell>
        <Datatable.HeaderCell>archetype</Datatable.HeaderCell>
        <Datatable.HeaderCell>ban</Datatable.HeaderCell>
        <Datatable.HeaderCell className="text-center">
          card type
        </Datatable.HeaderCell>
        <Datatable.HeaderCell>race</Datatable.HeaderCell>
      </Datatable.Head>
      <Datatable.Body>
        {cards.map((card, index) => (
          <StoredCardTableRow
            key={`sctr-${index}`}
            card={card}
            deleteStoredCardItem={deleteStoredCardItem}
            index={index}
            updateStoredCard={updateStoredCard}
            updateStoredCardItem={updateStoredCardItem}
            yugiohCard={yugiohCard}
          />
        ))}
      </Datatable.Body>
    </Datatable>
  );
};

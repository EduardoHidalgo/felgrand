import { FC, Fragment } from "react";

import {
  AsyncState,
  Importance,
  Priority,
  StoredCardItem,
  UpdateRowStoredCardItem,
  YugiohCard,
} from "@/types";
import { Datatable } from "../datatable";
import { StoredCardItemsTable } from "./itemTable";
import { ChipCardType } from "../chipCardType";

export interface StoredCardTableProps {
  cards: Array<StoredCardItem>;
  deleteStoredCardItem: (itemId: number) => Promise<void>;
  state: AsyncState;
  yugiohCard: YugiohCard | null;
  updateStoredCardItem: (item: UpdateRowStoredCardItem) => Promise<void>;
}

export const StoredCardTable: FC<StoredCardTableProps> = ({
  cards,
  deleteStoredCardItem,
  state,
  updateStoredCardItem,
  yugiohCard,
}) => {
  const mapImportance = (importance: Importance): keyof typeof Importance => {
    switch (importance) {
      case Importance.ArchetypeCore:
        return "ArchetypeCore";
      case Importance.HighValue:
        return "HighValue";
      case Importance.LowValue:
        return "LowValue";
      case Importance.MediumValue:
        return "MediumValue";
      case Importance.Staple:
        return "Staple";
      case Importance.Trash:
        return "Trash";
      case Importance.Unused:
        return "Unused";
      case Importance.Unwanted:
        return "Unwanted";
      case Importance.VeryHighValue:
        return "VeryHighValue";
      case Importance.NotDefined:
      default:
        return "NotDefined";
    }
  };

  const mapPriority = (priority: Priority): keyof typeof Priority => {
    switch (priority) {
      case Priority.High:
        return "High";
      case Priority.Ignore:
        return "Ignore";
      case Priority.Low:
        return "Low";
      case Priority.Medium:
        return "Medium";
      case Priority.NotReleasedYet:
        return "NotReleasedYet";
      case Priority.Pending:
        return "Pending";
      case Priority.TooExpensive:
        return "TooExpensive";
      case Priority.Unwanted:
        return "Unwanted";
      case Priority.Urgent:
        return "Urgent";
      case Priority.VeryHigh:
        return "VeryHigh";
      case Priority.NotDefined:
      default:
        return "NotDefined";
    }
  };

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
          <Fragment key={card.id}>
            <Datatable.Row index={index} key={card.id}>
              <Datatable.Data copyToClipboard={card.name}>
                {card.name}
              </Datatable.Data>
              <Datatable.Data>{card.countSum}</Datatable.Data>
              <Datatable.Data>{card.wantedCountSum}</Datatable.Data>
              <Datatable.Data className="w-full justify-between">
                <p className="w-full flex-1 text-right">
                  {card.avgValue.toFixed(2).toString()}
                </p>
                <p>$</p>
              </Datatable.Data>
              <Datatable.Data className="!block text-center">
                {mapImportance(card.importance)}
              </Datatable.Data>
              <Datatable.Data className="!block text-center">
                {mapPriority(card.priority)}
              </Datatable.Data>
              <Datatable.Data
                copyToClipboard={card.archetype ? card.archetype : undefined}
              >
                {card.archetype ? card.archetype : ""}
              </Datatable.Data>
              <Datatable.Data>{card.banType}</Datatable.Data>
              <Datatable.Data className="!block text-center">
                <ChipCardType type={card.cardType} />
              </Datatable.Data>
              <Datatable.Data className="">{card.race}</Datatable.Data>
            </Datatable.Row>
            <Datatable.Row colSpan={12} key={"items-table"}>
              <StoredCardItemsTable
                deleteStoredCardItem={deleteStoredCardItem}
                items={card.items}
                updateStoredCardItem={updateStoredCardItem}
                yugiohCard={yugiohCard!}
              />
            </Datatable.Row>
          </Fragment>
        ))}
      </Datatable.Body>
    </Datatable>
  );
};

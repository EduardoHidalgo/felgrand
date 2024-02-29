"use client";
import { Condition, Importance, Priority, StoreStatus } from "@/types";
import { useStore } from "./useStore";
import { Datatable } from "@/components/datatable";
import { ChipCardType } from "@/components/chipCardType";
import { rarityCodeToName } from "@/utils/rarityCodeToName";

export default function StorePage() {
  const { cards, selectedCard, onClickRow } = useStore({});

  const mapCondition = (condition: Condition) => {
    switch (condition) {
      case Condition.Damaged:
        return <span className="text-red-500">Damaged</span>;
      case Condition.HeavilyPlayer:
        return <span className="text-orange-500">HeavilyPlayer</span>;
      case Condition.LightlyPlayed:
        return <span className="text-green-300">LightlyPlayed</span>;
      case Condition.ModeratelyPlayed:
        return <span className="text-yellow-400">ModeratelyPlayed</span>;
      case Condition.NearMint:
        return <span className="text-green-500">NearMint</span>;
    }
  };

  const mapStatus = (status: StoreStatus) => {
    switch (status) {
      case StoreStatus.Bought:
        return <span className="text-orange-400">Bought</span>;
      case StoreStatus.Default:
        return <span className="text-gray-200">Default</span>;
      case StoreStatus.Delivered:
        return <span className="text-blue-500">Delivered</span>;
      case StoreStatus.PendingDelivery:
        return <span className="text-yellow-400">PendingDelivery</span>;
      case StoreStatus.Stored:
        return <span className="text-green-400">Stored</span>;
      case StoreStatus.Wanted:
        return <span className="text-red-400">Wanted</span>;
    }
  };

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

  const totalCount = cards.reduce((sum, { count }) => (sum += count), 0);
  const totalWantedCount = cards.reduce(
    (sum, { wantedCount }) => (sum += wantedCount),
    0,
  );
  const totalValue = cards.reduce(
    (sum, { value, count }) => (sum += value * count),
    0,
  );

  return (
    <div className="fixed flex h-full w-full flex-col gap-2 overflow-y-scroll px-2">
      <div className="flex flex-row gap-6">
        <div className="">
          total count:{" "}
          <span className="font-bold text-green-500">{totalCount}</span>
        </div>
        <div>
          total wanted count:{" "}
          <span className="font-bold text-green-500">{totalWantedCount}</span>
        </div>
        <div>
          total value:{" "}
          <span className="font-bold text-green-500">
            {totalValue.toFixed(2).toString()}
          </span>
        </div>
      </div>
      <Datatable>
        <Datatable.Head>
          <Datatable.HeaderCell>name</Datatable.HeaderCell>
          <Datatable.HeaderCell>count</Datatable.HeaderCell>
          <Datatable.HeaderCell>wanted count</Datatable.HeaderCell>
          <Datatable.HeaderCell>value</Datatable.HeaderCell>
          <Datatable.HeaderCell>condition</Datatable.HeaderCell>
          <Datatable.HeaderCell>language</Datatable.HeaderCell>
          <Datatable.HeaderCell>status</Datatable.HeaderCell>
          <Datatable.HeaderCell>storage group</Datatable.HeaderCell>
          <Datatable.HeaderCell>rarity</Datatable.HeaderCell>
          <Datatable.HeaderCell className="text-center">
            card type
          </Datatable.HeaderCell>
          <Datatable.HeaderCell>race</Datatable.HeaderCell>
          <Datatable.HeaderCell>archetype</Datatable.HeaderCell>
          <Datatable.HeaderCell className="text-center">
            ban
          </Datatable.HeaderCell>
          <Datatable.HeaderCell className="text-center">
            importance
          </Datatable.HeaderCell>
          <Datatable.HeaderCell className="text-center">
            priority
          </Datatable.HeaderCell>
        </Datatable.Head>
        <Datatable.Body>
          {cards.map((card, index) => (
            <Datatable.Row
              index={index}
              key={card.storedCardItemId}
              onClickRow={onClickRow}
              isSelected={
                selectedCard
                  ? selectedCard.storedCardItemId === card.storedCardItemId
                  : undefined
              }
            >
              <Datatable.Data copyToClipboard={card.name}>
                {card.name}
              </Datatable.Data>
              <Datatable.Data>{card.count}</Datatable.Data>
              <Datatable.Data>{card.wantedCount}</Datatable.Data>
              <Datatable.Data>
                <p className="w-full flex-1 text-right">
                  {card.value.toFixed(2).toString()}
                </p>
                <p>$</p>
              </Datatable.Data>
              <Datatable.Data>{mapCondition(card.condition)}</Datatable.Data>
              <Datatable.Data>{card.language}</Datatable.Data>
              <Datatable.Data>{mapStatus(card.status)}</Datatable.Data>
              <Datatable.Data>{card.storageGroup}</Datatable.Data>
              <Datatable.Data className="!block whitespace-nowrap">
                {rarityCodeToName(card.rarityCode)}
              </Datatable.Data>
              <Datatable.Data className="!block text-center">
                <ChipCardType type={card.cardType} />
              </Datatable.Data>
              <Datatable.Data>{card.race}</Datatable.Data>
              <Datatable.Data
                copyToClipboard={card.archetype ? card.archetype : undefined}
              >
                {card.archetype ? card.archetype : ""}
              </Datatable.Data>
              <Datatable.Data className="!block text-center">
                {card.banType}
              </Datatable.Data>
              <Datatable.Data className="!block text-center">
                {mapImportance(card.importance)}
              </Datatable.Data>
              <Datatable.Data className="!block text-center">
                {mapPriority(card.priority)}
              </Datatable.Data>
            </Datatable.Row>
          ))}
        </Datatable.Body>
      </Datatable>
    </div>
  );
}

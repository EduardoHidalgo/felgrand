"use client";
import {
  CardLanguage,
  Condition,
  Importance,
  Priority,
  StoreStatus,
} from "@/types";
import { useStore } from "./useStore";
import { Datatable } from "@/components/datatable";
import { ChipCardType } from "@/components/chipCardType";
import { rarityCodeToName } from "@/utils/rarityCodeToName";
import { FlagUS } from "@/components/icons/flags/us";
import { FlagFR } from "@/components/icons/flags/fr";
import { FlagDE } from "@/components/icons/flags/de";
import { FlagIT } from "@/components/icons/flags/it";
import { FlagJP } from "@/components/icons/flags/jp";
import { FlagPT } from "@/components/icons/flags/pt";
import { FlagSP } from "@/components/icons/flags/sp";
import { RarityColorful } from "@/components/rarityColorful";
import { NoSymbolIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

export default function StorePage() {
  const { cards, selectedCard, onClickRow } = useStore({});

  const mapCondition = (condition: Condition) => {
    switch (condition) {
      case Condition.Damaged:
        return <span className="text-red-500">Damaged</span>;
      case Condition.HeavilyPlayer:
        return <span className="text-orange-500">HeavilyPlayer</span>;
      case Condition.LightlyPlayed:
        return <span className="text-green-200">LightlyPlayed</span>;
      case Condition.ModeratelyPlayed:
        return <span className="text-yellow-400">ModeratelyPlayed</span>;
      case Condition.NearMint:
        return <span className="text-green-400">NearMint</span>;
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

  const mapImportance = (importance: Importance) => {
    switch (importance) {
      case Importance.ArchetypeCore:
        return <span className="text-blue-500">Archetype Core</span>;
      case Importance.HighValue:
        return <span className="text-green-300">High Value</span>;
      case Importance.LowValue:
        return <span className="text-orange-300">Low Value</span>;
      case Importance.MediumValue:
        return <span className="text-yellow-300">Medium Value</span>;
      case Importance.Staple:
        return <span className="text-purple-500">Staple</span>;
      case Importance.Trash:
        return (
          <span className="bg-red-700">
            Trash <TrashIcon className="h-4 w-4" />
          </span>
        );
      case Importance.Unused:
        return <span className="bg-red-300">Unused</span>;
      case Importance.Unwanted:
        return <span className="bg-red-500 line-through">Unwanted</span>;
      case Importance.VeryHighValue:
        return <span className="text-green-500">Very High Value</span>;
      case Importance.NotDefined:
      default:
        return <span className="">-</span>;
    }
  };

  const mapPriority = (priority: Priority) => {
    switch (priority) {
      case Priority.High:
        return <span className="text-yellow-500">High</span>;
      case Priority.Ignore:
        return <span className="text-gray-500 line-through">Ignore</span>;
      case Priority.Low:
        return <span className="text-orange-300">Low</span>;
      case Priority.Medium:
        return <span className="text-yellow-300">Medium</span>;
      case Priority.NotReleasedYet:
        return (
          <span className="text-red-700">
            Not Released Yet <ExclamationCircleIcon className="h-5 w-5" />
          </span>
        );
      case Priority.Pending:
        return <span className="">Pending</span>;
      case Priority.TooExpensive:
        return <span className="text-purple-500">Too Expensive</span>;
      case Priority.Unwanted:
        return <span className="text-red-300">Unwanted</span>;
      case Priority.Urgent:
        return <span className="text-green-500">Urgent</span>;
      case Priority.VeryHigh:
        return <span className="text-green-300">Very High</span>;
      case Priority.NotDefined:
      default:
        return <span className="">-</span>;
    }
  };

  const mapLanguage = (language: CardLanguage) => {
    switch (language) {
      case CardLanguage.English:
        return <FlagUS className="w-6" />;
      case CardLanguage.French:
        return <FlagFR className="w-6" />;
      case CardLanguage.German:
        return <FlagDE className="w-6" />;
      case CardLanguage.Italian:
        return <FlagIT className="w-6" />;
      case CardLanguage.Japanese:
        return <FlagJP className="w-6" />;
      case CardLanguage.Portuguese:
        return <FlagPT className="w-6" />;
      case CardLanguage.Spanish:
        return <FlagSP className="w-6" />;
      default:
        break;
    }
  };

  const mapBanned = (
    banType: "Banned" | "Limited" | "SemiLimited" | "Unlimited",
  ) => {
    switch (banType) {
      case "Banned":
        return (
          <div className="flex gap-1 font-bold text-red-500">
            <span>{banType}</span>
            <NoSymbolIcon className="h-5 w-5" />
          </div>
        );
      case "Limited":
        return <span className="font-bold text-orange-500">{banType}</span>;
      case "SemiLimited":
        return <span className="font-bold text-yellow-500">{banType}</span>;
      case "Unlimited":
        return <span className="text-gray-400">{banType}</span>;
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
              <Datatable.Data className="justify-end gap-1">
                <span>{card.value.toFixed(2).toString()}</span>
                <span>$</span>
              </Datatable.Data>
              <Datatable.Data className="!block text-center font-bold">
                {mapCondition(card.condition)}
              </Datatable.Data>
              <Datatable.Data className="items-center justify-center">
                {mapLanguage(card.language)}
              </Datatable.Data>
              <Datatable.Data className="!block text-center font-bold">
                {mapStatus(card.status)}
              </Datatable.Data>
              <Datatable.Data className="!block text-center">
                {card.storageGroup}
              </Datatable.Data>
              <Datatable.Data className="!block whitespace-nowrap">
                <RarityColorful rarity={rarityCodeToName(card.rarityCode)} />
              </Datatable.Data>
              <Datatable.Data className="!block text-center">
                <ChipCardType type={card.cardType} />
              </Datatable.Data>
              <Datatable.Data className="!block text-center">
                {card.race}
              </Datatable.Data>
              <Datatable.Data
                className="text-center"
                copyToClipboard={card.archetype ? card.archetype : undefined}
              >
                {card.archetype ? card.archetype : ""}
              </Datatable.Data>
              <Datatable.Data className="!block text-center">
                {mapBanned(card.banType)}
              </Datatable.Data>
              <Datatable.Data className="!block text-center font-bold">
                {mapImportance(card.importance)}
              </Datatable.Data>
              <Datatable.Data className="!block text-center font-bold">
                {mapPriority(card.priority)}
              </Datatable.Data>
            </Datatable.Row>
          ))}
        </Datatable.Body>
      </Datatable>
    </div>
  );
}

import { Table } from "@tanstack/react-table";
import classNames from "classnames";

import {
  Ban,
  CardLanguage,
  CardType,
  Condition,
  Importance,
  InputType,
  Priority,
  Race,
  SetRarityCode,
  StoredCardCombined,
  StoreStatus,
} from "@/types";
import { Textfield } from "@/components/textfield";
import { Selector } from "@/components/selector";
import {
  banOptionsWithDefault,
  cardTypeOptionsWithDefault,
  conditionOptionsWithDefault,
  importanceOptionsWithDefault,
  languageOptionsWithDefault,
  priorityOptionsWithDefault,
  raceOptionsWithDefault,
  rarityOptionsWithDefault,
  statusOptionsWithDefault,
} from "@/utils/options";

export interface StoreFiltersProps<StoredCardCombined> {
  table?: Table<StoredCardCombined>;
}

export const StoreFilters = ({
  table,
}: StoreFiltersProps<StoredCardCombined>) => {
  const nameColumn = table?.getColumn("name");
  const countColumn = table?.getColumn("count");
  const wantedCountColumn = table?.getColumn("wantedCount");
  const valueColumn = table?.getColumn("value");
  const boughtValueColumn = table?.getColumn("boughtValue");
  const conditionColumn = table?.getColumn("condition");
  const languageColumn = table?.getColumn("language");
  const rarityColumn = table?.getColumn("rarityCode");
  const statusColumn = table?.getColumn("status");
  const importanceColumn = table?.getColumn("importance");
  const priorityColumn = table?.getColumn("priority");
  const storageGroupColumn = table?.getColumn("storageGroup");
  const archetypeColumn = table?.getColumn("archetype");
  const cardTypeColumn = table?.getColumn("cardType");
  const raceColumn = table?.getColumn("race");
  const banColumn = table?.getColumn("banType");

  const conditionValue = Number(
    conditionColumn ? conditionColumn.getFilterValue() : 0,
  );

  const onChangeNameFilter = (value: InputType) => {
    nameColumn && nameColumn.setFilterValue(value);
  };

  const onChangeCountMinFilter = (value: InputType) => {
    countColumn &&
      countColumn.setFilterValue((old: [number, number]) => [value, old?.[1]]);
  };

  const onChangeCountMaxFilter = (value: InputType) => {
    countColumn &&
      countColumn.setFilterValue((old: [number, number]) => [old?.[0], value]);
  };

  const onChangeWantedCountMinFilter = (value: InputType) => {
    wantedCountColumn &&
      wantedCountColumn.setFilterValue((old: [number, number]) => [
        value,
        old?.[1],
      ]);
  };

  const onChangeWantedCountMaxFilter = (value: InputType) => {
    wantedCountColumn &&
      wantedCountColumn.setFilterValue((old: [number, number]) => [
        old?.[0],
        value,
      ]);
  };

  const onChangeValueMinFilter = (value: InputType) => {
    valueColumn &&
      valueColumn.setFilterValue((old: [number, number]) => [value, old?.[1]]);
  };

  const onChangeValueMaxFilter = (value: InputType) => {
    valueColumn &&
      valueColumn.setFilterValue((old: [number, number]) => [old?.[0], value]);
  };

  const onChangeBoughtValueMinFilter = (value: InputType) => {
    boughtValueColumn &&
      boughtValueColumn.setFilterValue((old: [number, number]) => [
        value,
        old?.[1],
      ]);
  };

  const onChangeBoughtValueMaxFilter = (value: InputType) => {
    boughtValueColumn &&
      boughtValueColumn.setFilterValue((old: [number, number]) => [
        old?.[0],
        value,
      ]);
  };

  const onChangeConditionFilter = (value: Condition | 0) => {
    if (Number(value) === 0) return conditionColumn?.setFilterValue(undefined);

    conditionColumn && conditionColumn.setFilterValue(value);
  };

  const onChangeLanguageFilter = (value: CardLanguage | "") => {
    if (value === "") return languageColumn?.setFilterValue(undefined);

    languageColumn && languageColumn.setFilterValue(value);
  };

  const onChangeRarityFilter = (value: SetRarityCode | "") => {
    if (value === "") return rarityColumn?.setFilterValue(undefined);

    rarityColumn && rarityColumn.setFilterValue(value);
  };

  const onChangeStatusFilter = (value: StoreStatus | "") => {
    if (value === "") return statusColumn?.setFilterValue(undefined);

    statusColumn && statusColumn.setFilterValue(value);
  };

  const onChangeImportanceFilter = (value: Importance | 0) => {
    if (Number(value) === 0) return importanceColumn?.setFilterValue(undefined);

    importanceColumn && importanceColumn.setFilterValue(value);
  };

  const onChangePriorityFilter = (value: Priority | 0) => {
    if (Number(value) === 0) return priorityColumn?.setFilterValue(undefined);

    priorityColumn && priorityColumn.setFilterValue(value);
  };

  const onChangeStorageGroupFilter = (value: InputType) => {
    storageGroupColumn && storageGroupColumn.setFilterValue(value);
  };

  const onChangeArchetypeFilter = (value: InputType) => {
    archetypeColumn && archetypeColumn.setFilterValue(value);
  };

  const onChangeCardTypeFilter = (value: CardType | "") => {
    if (value === "") return priorityColumn?.setFilterValue(undefined);

    priorityColumn && priorityColumn.setFilterValue(value);
  };

  const onChangeRaceFilter = (value: Race | "") => {
    if (value === "") return raceColumn?.setFilterValue(undefined);

    raceColumn && raceColumn.setFilterValue(value);
  };

  const onChangeBanFilter = (value: Ban | "") => {
    if (value === "") return banColumn?.setFilterValue(undefined);

    banColumn && banColumn.setFilterValue(value);
  };

  return (
    table && (
      <>
        {nameColumn && (
          <Textfield
            id={`name-filter`}
            label="Name"
            onChange={onChangeNameFilter}
            placeholder={`search... (${nameColumn.getFacetedUniqueValues().size})`}
            type="text"
            value={nameColumn.getFilterValue() as string}
            styles={{
              wrapper: "col-span-2",
            }}
          />
        )}
        {countColumn && (
          <>
            <Textfield
              id={`count-filter-min`}
              label="Count min"
              max={Number(countColumn.getFacetedMinMaxValues()?.[1] ?? "")}
              min={Number(countColumn.getFacetedMinMaxValues()?.[0] ?? "")}
              onChange={onChangeCountMinFilter}
              type="text"
              value={
                (countColumn.getFilterValue() as [number, number])?.[0] ?? ""
              }
              placeholder={
                countColumn.getFacetedMinMaxValues()?.[0]
                  ? `min (${countColumn.getFacetedMinMaxValues()?.[0]})`
                  : ""
              }
              styles={{
                wrapper: "col-span-1",
              }}
            />
            <Textfield
              id={`count-filter-max`}
              label="Count max"
              max={Number(countColumn.getFacetedMinMaxValues()?.[1] ?? "")}
              min={Number(countColumn.getFacetedMinMaxValues()?.[0] ?? "")}
              onChange={onChangeCountMaxFilter}
              type="text"
              value={
                (countColumn.getFilterValue() as [number, number])?.[1] ?? ""
              }
              placeholder={
                countColumn.getFacetedMinMaxValues()?.[1]
                  ? `max (${countColumn.getFacetedMinMaxValues()?.[1]})`
                  : ""
              }
              styles={{
                wrapper: "col-span-1",
              }}
            />
          </>
        )}
        {wantedCountColumn && (
          <>
            <Textfield
              id={`wantedCount-filter-min`}
              label="Wanted Count min"
              max={Number(
                wantedCountColumn.getFacetedMinMaxValues()?.[1] ?? "",
              )}
              min={Number(
                wantedCountColumn.getFacetedMinMaxValues()?.[0] ?? "",
              )}
              onChange={onChangeWantedCountMinFilter}
              type="text"
              value={
                (wantedCountColumn.getFilterValue() as [number, number])?.[0] ??
                ""
              }
              placeholder={
                wantedCountColumn.getFacetedMinMaxValues()
                  ? `min (${wantedCountColumn.getFacetedMinMaxValues()?.[0]})`
                  : ""
              }
              styles={{
                wrapper: "col-span-1",
              }}
            />
            <Textfield
              id={`wantedCount-filter-max`}
              label="Wanted Count max"
              max={Number(
                wantedCountColumn.getFacetedMinMaxValues()?.[1] ?? "",
              )}
              min={Number(
                wantedCountColumn.getFacetedMinMaxValues()?.[0] ?? "",
              )}
              onChange={onChangeWantedCountMaxFilter}
              type="text"
              value={
                (wantedCountColumn.getFilterValue() as [number, number])?.[1] ??
                ""
              }
              placeholder={
                wantedCountColumn.getFacetedMinMaxValues()
                  ? `max (${wantedCountColumn.getFacetedMinMaxValues()?.[1]})`
                  : ""
              }
              styles={{
                wrapper: "col-span-1",
              }}
            />
          </>
        )}
        {valueColumn && (
          <>
            <Textfield
              id={`value-filter-min`}
              label="Value min"
              max={Number(valueColumn.getFacetedMinMaxValues()?.[1] ?? "")}
              min={Number(valueColumn.getFacetedMinMaxValues()?.[0] ?? "")}
              onChange={onChangeValueMinFilter}
              type="text"
              value={
                (valueColumn.getFilterValue() as [number, number])?.[0] ?? ""
              }
              placeholder={
                valueColumn.getFacetedMinMaxValues()
                  ? `min (${valueColumn.getFacetedMinMaxValues()?.[0]})`
                  : ""
              }
              styles={{
                wrapper: "col-span-1",
              }}
            />
            <Textfield
              id={`value-filter-max`}
              label="Value max"
              max={Number(valueColumn.getFacetedMinMaxValues()?.[1] ?? "")}
              min={Number(valueColumn.getFacetedMinMaxValues()?.[0] ?? "")}
              onChange={onChangeValueMaxFilter}
              type="text"
              value={
                (valueColumn.getFilterValue() as [number, number])?.[1] ?? ""
              }
              placeholder={
                valueColumn.getFacetedMinMaxValues()
                  ? `max (${valueColumn.getFacetedMinMaxValues()?.[1]})`
                  : ""
              }
              styles={{
                wrapper: "col-span-1",
              }}
            />
          </>
        )}
        {boughtValueColumn && (
          <>
            <Textfield
              id={`boughtValue-filter-min`}
              label="Bought Value min"
              max={Number(
                boughtValueColumn.getFacetedMinMaxValues()?.[1] ?? "",
              )}
              min={Number(
                boughtValueColumn.getFacetedMinMaxValues()?.[0] ?? "",
              )}
              onChange={onChangeBoughtValueMinFilter}
              type="text"
              value={
                (boughtValueColumn.getFilterValue() as [number, number])?.[0] ??
                ""
              }
              placeholder={
                boughtValueColumn.getFacetedMinMaxValues()
                  ? `min (${boughtValueColumn.getFacetedMinMaxValues()?.[0]})`
                  : ""
              }
              styles={{
                wrapper: "col-span-1",
              }}
            />
            <Textfield
              id={`boughtValue-filter-max`}
              label="Bought Value max"
              max={Number(
                boughtValueColumn.getFacetedMinMaxValues()?.[1] ?? "",
              )}
              min={Number(
                boughtValueColumn.getFacetedMinMaxValues()?.[0] ?? "",
              )}
              onChange={onChangeBoughtValueMaxFilter}
              type="text"
              value={
                (boughtValueColumn.getFilterValue() as [number, number])?.[1] ??
                ""
              }
              placeholder={
                boughtValueColumn.getFacetedMinMaxValues()
                  ? `max (${boughtValueColumn.getFacetedMinMaxValues()?.[1]})`
                  : ""
              }
              styles={{
                wrapper: "col-span-1",
              }}
            />
          </>
        )}
        {conditionColumn && (
          <Selector<Condition | 0>
            id="condition-filter"
            label="Condition"
            onChange={onChangeConditionFilter}
            options={conditionOptionsWithDefault}
            value={Number(conditionColumn.getFilterValue())}
            styles={{
              select: classNames(
                "whitespace-nowrap text-center font-bold",
                conditionValue == Condition.Damaged && "text-red-500",
                conditionValue == Condition.HeavilyPlayer && "text-orange-500",
                conditionValue == Condition.LightlyPlayed && "text-green-300",
                conditionValue == Condition.ModeratelyPlayed &&
                  "text-yellow-400",
                conditionValue == Condition.NearMint && "text-green-500",
              ),
              wrapper: "col-span-1",
            }}
          />
        )}
        {languageColumn && (
          <Selector<CardLanguage | "">
            id="language-filter"
            label="Language"
            onChange={onChangeLanguageFilter}
            options={languageOptionsWithDefault}
            value={languageColumn.getFilterValue() as string}
            styles={{
              select: "whitespace-nowrap text-center font-bold",
              wrapper: "col-span-1",
            }}
          />
        )}
        {rarityColumn && (
          <Selector<SetRarityCode | "">
            id="rarity-filter"
            label="Rarity"
            onChange={onChangeRarityFilter}
            options={rarityOptionsWithDefault}
            value={rarityColumn.getFilterValue() as string}
            styles={{
              select: "whitespace-nowrap text-center font-bold",
              wrapper: "col-span-1",
            }}
          />
        )}
        {statusColumn && (
          <Selector<StoreStatus | "">
            id="status-filter"
            label="Status"
            onChange={onChangeStatusFilter}
            options={statusOptionsWithDefault}
            value={statusColumn.getFilterValue() as string}
            styles={{
              select: "whitespace-nowrap text-center font-bold",
              wrapper: "col-span-1",
            }}
          />
        )}
        {importanceColumn && (
          <Selector<Importance | 0>
            id="importance-filter"
            label="Importance"
            onChange={onChangeImportanceFilter}
            options={importanceOptionsWithDefault}
            value={importanceColumn.getFilterValue() as string}
            styles={{
              select: "whitespace-nowrap text-center font-bold",
              wrapper: "col-span-1",
            }}
          />
        )}
        {priorityColumn && (
          <Selector<Priority | 0>
            id="priority-filter"
            label="Priority"
            onChange={onChangePriorityFilter}
            options={priorityOptionsWithDefault}
            value={priorityColumn.getFilterValue() as string}
            styles={{
              select: "whitespace-nowrap text-center font-bold",
              wrapper: "col-span-1",
            }}
          />
        )}
        {storageGroupColumn && (
          <Textfield
            id={`storageGroup-filter`}
            label="Storage Group"
            onChange={onChangeStorageGroupFilter}
            placeholder={`search... (${storageGroupColumn.getFacetedUniqueValues().size})`}
            type="text"
            value={storageGroupColumn.getFilterValue() as string}
            styles={{
              wrapper: "col-span-2",
            }}
          />
        )}
        {archetypeColumn && (
          <Textfield
            id={`archetype-filter`}
            label="Archetype"
            onChange={onChangeArchetypeFilter}
            placeholder={`search... (${archetypeColumn.getFacetedUniqueValues().size})`}
            type="text"
            value={archetypeColumn.getFilterValue() as string}
            styles={{
              wrapper: "col-span-2",
            }}
          />
        )}
        {cardTypeColumn && (
          <Selector<CardType | "">
            id="cardType-filter"
            label="Card Type"
            onChange={onChangeCardTypeFilter}
            options={cardTypeOptionsWithDefault}
            value={cardTypeColumn.getFilterValue() as string}
            styles={{
              select: "whitespace-nowrap text-center font-bold",
              wrapper: "col-span-1",
            }}
          />
        )}
        {raceColumn && (
          <Selector<Race | "">
            id="race-filter"
            label="Race"
            onChange={onChangeRaceFilter}
            options={raceOptionsWithDefault}
            value={raceColumn.getFilterValue() as string}
            styles={{
              select: "whitespace-nowrap text-center font-bold",
              wrapper: "col-span-1",
            }}
          />
        )}
        {banColumn && (
          <Selector<Ban | "">
            id="ban-filter"
            label="Ban"
            onChange={onChangeBanFilter}
            options={banOptionsWithDefault}
            value={banColumn.getFilterValue() as string}
            styles={{
              select: "whitespace-nowrap text-center font-bold",
              wrapper: "col-span-1",
            }}
          />
        )}
      </>
    )
  );
};

import { SelectorOption } from "@/components/selector";
import {
  Ban,
  CardLanguage,
  CardType,
  Condition,
  Importance,
  Priority,
  Race,
  SetRarityCode,
  StoreStatus,
} from "@/types";
import { rarityCodeToName } from "./rarityCodeToName";

export const languageOptions: Array<SelectorOption<CardLanguage>> =
  Object.entries(CardLanguage).map((o) => {
    return {
      label: o[0],
      value: o[1],
    };
  });

export const languageOptionsWithDefault: Array<
  SelectorOption<CardLanguage | "">
> = [{ label: "not selected", value: "" }, ...languageOptions];

export const conditionOptions: Array<SelectorOption<Condition>> =
  Object.entries(Condition)
    .filter((value) => typeof value[1] === "number")
    .map((o) => {
      return {
        label: o[0],
        value: o[1] as Condition,
      };
    });

export const conditionOptionsWithDefault: Array<SelectorOption<Condition | 0>> =
  [{ label: "not selected", value: 0 }, ...conditionOptions];

export const statusOptions: Array<SelectorOption<StoreStatus>> = Object.entries(
  StoreStatus,
).map((o) => {
  return {
    label: o[0],
    value: o[1],
  };
});

export const statusOptionsWithDefault: Array<SelectorOption<StoreStatus | "">> =
  [{ label: "not selected", value: "" }, ...statusOptions];

export const importanceOptions: Array<SelectorOption<Importance>> =
  Object.entries(Importance)
    .filter((value) => typeof value[1] === "number")
    .map((o) => {
      return {
        label: o[0],
        value: o[1] as Importance,
      };
    });

export const importanceOptionsWithDefault: Array<
  SelectorOption<Importance | 0>
> = [{ label: "not selected", value: 0 }, ...importanceOptions];

export const priorityOptions: Array<SelectorOption<Priority>> = Object.entries(
  Priority,
)
  .filter((value) => typeof value[1] === "number")
  .map((o) => {
    return {
      label: o[0],
      value: o[1] as Priority,
    };
  });

export const priorityOptionsWithDefault: Array<SelectorOption<Priority | 0>> = [
  { label: "not selected", value: 0 },
  ...priorityOptions,
];

export const cardTypeOptions: Array<SelectorOption<CardType>> = Object.entries(
  CardType,
).map((o) => {
  return {
    label: o[0],
    value: o[1] as CardType,
  };
});

export const cardTypeOptionsWithDefault: Array<SelectorOption<CardType | "">> =
  [{ label: "not selected", value: "" }, ...cardTypeOptions];

export const banOptions: Array<SelectorOption<Ban>> = Object.entries(Ban).map(
  (o) => {
    return {
      label: o[0],
      value: o[1] as Ban,
    };
  },
);

export const banOptionsWithDefault: Array<SelectorOption<Ban | "">> = [
  { label: "not selected", value: "" },
  ...banOptions,
];

export const rarityOptions: Array<SelectorOption<SetRarityCode>> =
  Object.entries(SetRarityCode).map((o) => {
    return {
      label: rarityCodeToName(o[1]),
      value: o[1] as SetRarityCode,
    };
  });

export const rarityOptionsWithDefault: Array<
  SelectorOption<SetRarityCode | "">
> = [{ label: "not selected", value: "" }, ...rarityOptions];

export const raceOptions: Array<SelectorOption<Race>> = Object.entries(
  Race,
).map((o) => {
  return {
    label: o[0],
    value: o[1] as Race,
  };
});

export const raceOptionsWithDefault: Array<SelectorOption<Race | "">> = [
  { label: "not selected", value: "" },
  ...raceOptions,
];

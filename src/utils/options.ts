import { SelectorOption } from "@/components/selector";
import {
  CardLanguage,
  Condition,
  Importance,
  Priority,
  StoreStatus,
} from "@/types";

export const languageOptions: Array<SelectorOption<CardLanguage>> =
  Object.entries(CardLanguage).map((o) => {
    return {
      label: o[0],
      value: o[1],
    };
  });

export const conditionOptions: Array<SelectorOption<Condition>> =
  Object.entries(Condition)
    .filter((value) => typeof value[1] === "number")
    .map((o) => {
      return {
        label: o[0],
        value: o[1] as Condition,
      };
    });

export const statusOptions: Array<SelectorOption<StoreStatus>> = Object.entries(
  StoreStatus,
).map((o) => {
  return {
    label: o[0],
    value: o[1],
  };
});

export const importanceOptions: Array<SelectorOption<Importance>> =
  Object.entries(Importance)
    .filter((value) => typeof value[1] === "number")
    .map((o) => {
      return {
        label: o[0],
        value: o[1] as Importance,
      };
    });

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

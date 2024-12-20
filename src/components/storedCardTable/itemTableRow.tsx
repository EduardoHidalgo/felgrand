import { FC, useEffect } from "react";
import { useFormik } from "formik";
import { TrashIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import * as Yup from "yup";

import { rarityCodeToName } from "@/utils/rarityCodeToName";
import {
  conditionOptions,
  languageOptions,
  statusOptions,
} from "@/utils/options";
import {
  CardLanguage,
  Condition,
  InputType,
  StoreStatus,
  StoredCardItemData,
  UpdateRowStoredCardItem,
  YugiohCard,
} from "@/types";
import { Datatable } from "../datatable";

export interface ItemTableRowProps {
  deleteStoredCardItem: (itemId: number) => Promise<void>;
  index: number;
  item: StoredCardItemData;
  updateStoredCardItem: (item: UpdateRowStoredCardItem) => Promise<void>;
  yugiohCard: YugiohCard;
}

export const ItemTableRow: FC<ItemTableRowProps> = ({
  deleteStoredCardItem,
  index,
  item,
  updateStoredCardItem,
  yugiohCard,
}) => {
  const cardSets = yugiohCard.card_sets;
  const isReleased = cardSets !== undefined;

  const updateRowForm = useFormik<UpdateRowStoredCardItem>({
    initialStatus: "",
    isInitialValid: false,
    validateOnChange: true,
    initialValues: {
      ...item,
      setIndex: isReleased ? 0 : null,
    },
    validationSchema: Yup.object<UpdateRowStoredCardItem>({
      boughtValue: Yup.number().positive().min(0),
      count: Yup.number().positive().min(0),
      value: Yup.number().positive().min(0),
    }),
    onSubmit: async (values) => {
      await updateStoredCardItem(values);
    },
  });

  const onChangeLanguage = async (value: CardLanguage) =>
    await updateRowForm.setFieldValue("language", value);

  const onChangeCondition = async (value: Condition) =>
    await updateRowForm.setFieldValue("condition", Number(value));

  const onChangeStatus = async (value: StoreStatus) =>
    await updateRowForm.setFieldValue("status", value);

  const onChangeStorageGroup = async (value: InputType) => {
    await updateRowForm.setFieldValue("storageGroup", String(value));
  };

  const onChangeBoughtValue = async (value: InputType) => {
    await updateRowForm.setFieldValue("boughtValue", Number(value));
  };

  const onChangeCount = async (value: InputType) => {
    await updateRowForm.setFieldValue("count", Number(value));
  };

  const onChangeWantedCount = async (value: InputType) => {
    await updateRowForm.setFieldValue("wantedCount", Number(value));
  };

  const onChangeValue = async (value: InputType) => {
    await updateRowForm.setFieldValue("value", Number(value));
  };

  const onClickDelete = async () => deleteStoredCardItem(item.id);

  useEffect(() => {
    updateRowForm.isValid && updateRowForm.submitForm();
  }, [updateRowForm.values]);

  const isSubmitting = updateRowForm.isSubmitting;

  return (
    <Datatable.Row index={index} key={item.id}>
      <Datatable.Data className="whitespace-nowrap text-start">
        {item.setCode}
      </Datatable.Data>
      <Datatable.Data className="text-start">{item.setName}</Datatable.Data>
      <Datatable.Data className="text-start">
        {rarityCodeToName(item.rarityCode)}
      </Datatable.Data>
      <Datatable.Data className="!inline-block text-center">
        <Datatable.Selector
          disabled={isSubmitting}
          id="language"
          onChange={onChangeLanguage}
          options={languageOptions}
          styles={{
            select: "whitespace-nowrap !w-auto text-center font-bold",
          }}
          value={updateRowForm.values.language}
        />
      </Datatable.Data>
      <Datatable.Data className="!inline-block text-center">
        <Datatable.Selector
          disabled={isSubmitting}
          id="condition"
          onChange={onChangeCondition}
          options={conditionOptions}
          styles={{
            select: classNames(
              "whitespace-nowrap !w-auto text-center font-bold",
              updateRowForm.values.condition == Condition.Damaged &&
                "text-red-500",
              updateRowForm.values.condition == Condition.HeavilyPlayer &&
                "text-orange-500",
              updateRowForm.values.condition == Condition.LightlyPlayed &&
                "text-green-300",
              updateRowForm.values.condition == Condition.ModeratelyPlayed &&
                "text-yellow-400",
              updateRowForm.values.condition == Condition.NearMint &&
                "text-green-500",
            ),
          }}
          value={updateRowForm.values.condition}
        />
      </Datatable.Data>
      <Datatable.Data className="blue !inline-block whitespace-nowrap text-center">
        <Datatable.Selector
          disabled={isSubmitting}
          id="status"
          onChange={onChangeStatus}
          options={statusOptions}
          styles={{
            select: classNames(
              "whitespace-nowrap !w-auto text-center font-bold",
              updateRowForm.values.status == StoreStatus.Bought &&
                "text-orange-400",
              updateRowForm.values.status == StoreStatus.Default &&
                "text-gray-200",
              updateRowForm.values.status == StoreStatus.Delivered &&
                "text-blue-500",
              updateRowForm.values.status == StoreStatus.PendingDelivery &&
                "text-yellow-400",
              updateRowForm.values.status == StoreStatus.Stored &&
                "text-green-400",
              updateRowForm.values.status == StoreStatus.Wanted &&
                "text-red-400",
            ),
          }}
          value={updateRowForm.values.status}
        />
      </Datatable.Data>
      <Datatable.Data className="whitespace-nowrap text-start">
        <Datatable.Textfield
          disabled={isSubmitting}
          id="storageGroup"
          onChange={onChangeStorageGroup}
          initialValue={updateRowForm.values.storageGroup}
          type="text"
        />
      </Datatable.Data>
      <Datatable.Data>
        <Datatable.Textfield
          disabled={isSubmitting}
          id="count"
          onChange={onChangeCount}
          initialValue={updateRowForm.values.count}
          min={0}
          type="number"
        />
      </Datatable.Data>
      <Datatable.Data>
        <Datatable.Textfield
          disabled={isSubmitting}
          id="wantedCount"
          onChange={onChangeWantedCount}
          initialValue={updateRowForm.values.wantedCount}
          min={0}
          styles={{
            wrapper: "text-start",
          }}
          type="number"
        />
      </Datatable.Data>
      <Datatable.Data>
        <Datatable.Textfield
          disabled={isSubmitting}
          id="value"
          onChange={onChangeValue}
          initialValue={updateRowForm.values.value.toFixed(2).toString()}
          min={0}
          styles={{
            input: "text-right whitespace-nowrap",
          }}
          type="price"
        />
      </Datatable.Data>
      <Datatable.Data>
        <Datatable.Textfield
          disabled={isSubmitting}
          id="boughtValue"
          onChange={onChangeBoughtValue}
          initialValue={updateRowForm.values.boughtValue.toFixed(2).toString()}
          min={0}
          styles={{
            input: "text-right whitespace-nowrap",
          }}
          type="price"
        />
      </Datatable.Data>
      <Datatable.Data>
        <TrashIcon
          className="h-6 w-6 cursor-pointer text-red-500 transition-all hover:scale-110 hover:text-red-400"
          onClick={onClickDelete}
        />
      </Datatable.Data>
    </Datatable.Row>
  );
};

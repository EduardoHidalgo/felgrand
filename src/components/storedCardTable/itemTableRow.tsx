import { FC, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { rarityCodeToName } from "@/utils/rarityCodeToName";
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
import {
  conditionOptions,
  languageOptions,
  statusOptions,
} from "@/utils/options";

export interface ItemTableRowProps {
  index: number;
  item: StoredCardItemData;
  yugiohCard: YugiohCard;
}

export const ItemTableRow: FC<ItemTableRowProps> = ({
  index,
  item,
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
      const url = `/api/cardStored/updateItem`;

      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(values),
      });

      if (response.ok == false) {
        console.error(await response.json());
      }
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
            select: "whitespace-nowrap !w-auto text-center",
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
            select: "whitespace-nowrap !w-auto text-center",
          }}
          value={updateRowForm.values.condition}
        />
      </Datatable.Data>
      <Datatable.Data className="!inline-block whitespace-nowrap text-center">
        <Datatable.Selector
          disabled={isSubmitting}
          id="status"
          onChange={onChangeStatus}
          options={statusOptions}
          styles={{
            select: "whitespace-nowrap !w-auto text-center",
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
    </Datatable.Row>
  );
};

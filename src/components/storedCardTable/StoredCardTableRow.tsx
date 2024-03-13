import { FC, Fragment, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Importance,
  InputType,
  Priority,
  StoredCardItem,
  UpdateRowStoredCardItem,
  UpdateStoredCard,
  YugiohCard,
} from "@/types";
import { Datatable } from "../datatable";
import { StoredCardItemsTable } from "./itemTable";
import { ChipCardType } from "../chipCardType";
import { importanceOptions, priorityOptions } from "@/utils/options";

export interface StoredCardRowProps {
  card: StoredCardItem;
  deleteStoredCardItem: (itemId: number) => Promise<void>;
  index: number;
  updateStoredCard: (item: UpdateStoredCard) => Promise<void>;
  updateStoredCardItem: (item: UpdateRowStoredCardItem) => Promise<void>;
  yugiohCard: YugiohCard | null;
}

export const StoredCardTableRow: FC<StoredCardRowProps> = ({
  card,
  deleteStoredCardItem,
  index,
  updateStoredCard,
  updateStoredCardItem,
  yugiohCard,
}) => {
  const updateStoredCardForm = useFormik<UpdateStoredCard>({
    initialStatus: "",
    isInitialValid: false,
    validateOnChange: true,
    initialValues: {
      archetype: card.archetype,
      id: card.id,
      importance: card.importance,
      priority: card.priority,
    },
    validationSchema: Yup.object<UpdateStoredCard>({}),
    onSubmit: async (values) => {
      await updateStoredCard(values);
    },
  });

  const onChangeImportance = async (value: Importance) =>
    await updateStoredCardForm.setFieldValue("importance", Number(value));

  const onChangePriority = async (value: Priority) =>
    await updateStoredCardForm.setFieldValue("priority", Number(value));

  const onChangeArchetype = async (value: InputType) => {
    await updateStoredCardForm.setFieldValue("archetype", String(value));
  };

  useEffect(() => {
    updateStoredCardForm.isValid && updateStoredCardForm.submitForm();
  }, [updateStoredCardForm.values]);

  return (
    <Fragment>
      <Datatable.Row colSpan={10} index={index} key={card.id}>
        <Datatable.Data copyToClipboard={card.name}>{card.name}</Datatable.Data>
        <Datatable.Data>{card.countSum}</Datatable.Data>
        <Datatable.Data>{card.wantedCountSum}</Datatable.Data>
        <Datatable.Data className="w-full justify-between">
          <p className="w-full flex-1 text-right">
            {card.avgValue.toFixed(2).toString()}
          </p>
          <p className="pl-1">$</p>
        </Datatable.Data>
        <Datatable.Data className="!block text-center">
          <Datatable.Selector
            disabled={updateStoredCardForm.isSubmitting}
            id="importance"
            onChange={onChangeImportance}
            options={importanceOptions}
            styles={{
              select: "whitespace-nowrap !w-auto text-center font-bold",
            }}
            value={updateStoredCardForm.values.importance}
          />
        </Datatable.Data>
        <Datatable.Data className="!block text-center">
          <Datatable.Selector
            disabled={updateStoredCardForm.isSubmitting}
            id="priority"
            onChange={onChangePriority}
            options={priorityOptions}
            styles={{
              select: "whitespace-nowrap !w-auto text-center font-bold",
            }}
            value={updateStoredCardForm.values.priority}
          />
        </Datatable.Data>
        <Datatable.Data
          copyToClipboard={card.archetype ? card.archetype : undefined}
        >
          <Datatable.Textfield
            disabled={updateStoredCardForm.isSubmitting}
            id="archetype"
            onChange={onChangeArchetype}
            initialValue={
              updateStoredCardForm.values.archetype
                ? updateStoredCardForm.values.archetype
                : ""
            }
            type="text"
          />
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
  );
};

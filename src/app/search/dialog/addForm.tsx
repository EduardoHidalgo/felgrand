import { FC } from "react";
import { useFormik } from "formik";

import {
  AsyncState,
  CTPrice,
  CardLanguage,
  Condition,
  GetPriceArgs,
  InputType,
  NewStoredCardItem,
  StoreStatus,
  YugiohCard,
} from "@/types";
import {
  conditionOptions,
  languageOptions,
  statusOptions,
} from "@/utils/options";
import { Button } from "@/components/button";
import { Loader } from "@/components/loader";
import { Selector, SelectorOption } from "@/components/selector";
import { Textfield } from "@/components/textfield";

export interface SearchDialogAddFormProps {
  addNewStoredCardItem: (item: NewStoredCardItem) => Promise<void>;
  cleanPrice: () => Promise<void>;
  getPrices: (args: GetPriceArgs) => Promise<void>;
  isSubmitting: boolean;
  prices: CTPrice | null;
  pricesState: AsyncState;
  yugiohCard: YugiohCard;
}

export const SearchDialogAddForm: FC<SearchDialogAddFormProps> = ({
  addNewStoredCardItem,
  cleanPrice,
  getPrices,
  isSubmitting,
  prices,
  pricesState,
  yugiohCard,
}) => {
  const isNotProd = process.env.NODE_ENV !== "production";
  const cardSets = yugiohCard.card_sets;
  const isReleased = cardSets !== undefined;

  const addForm = useFormik<NewStoredCardItem>({
    initialValues: {
      boughtValue: 0,
      condition: Condition.NearMint,
      count: 0,
      language: CardLanguage.English,
      setIndex: isReleased ? 0 : null,
      status: StoreStatus.Stored,
      storageGroup: "",
      value: 0,
      wantedCount: 0,
    },
    onSubmit: async (values, { resetForm }) => {
      await addNewStoredCardItem(values);
      resetForm({
        values: {
          boughtValue: 0,
          condition: Condition.NearMint,
          count: 0,
          language: CardLanguage.English,
          setIndex: isReleased ? 0 : null,
          status: StoreStatus.Stored,
          storageGroup: "",
          value: 0,
          wantedCount: 0,
        },
      });
    },
  });

  const getSelectedSetPrices = () => {
    if (cardSets !== undefined && addForm.values.setIndex !== null) {
      const cardSet = cardSets[addForm.values.setIndex];
      getPrices({
        cardName: yugiohCard.name,
        rarity: cardSet.set_rarity,
        setCode: cardSet.set_code,
        setName: cardSet.set_name,
      });
    }
  };

  const setCodes: Array<SelectorOption<number>> = isReleased
    ? cardSets!.map((s, index) => {
        return {
          label: `${s.set_code} - ${s.set_name} ${s.set_rarity_code}`,
          value: index,
        };
      })
    : [];

  const rarityLabel = () => {
    if (cardSets == undefined || addForm.values.setIndex == null) return "";

    const set = cardSets[addForm.values.setIndex];

    return `${set?.set_rarity} ${set?.set_rarity_code}`;
  };

  const onChangeSetIndex = async (value: number) => {
    await addForm.setFieldValue("setIndex", Number(value));
    await cleanPrice();
  };

  const onChangeLanguage = async (value: CardLanguage) => {
    await addForm.setFieldValue("language", value);
  };

  const onChangeCondition = async (value: Condition) => {
    await addForm.setFieldValue("condition", Number(value));
  };

  const onChangeStatus = async (value: StoreStatus) => {
    await addForm.setFieldValue("status", value);
  };

  const onChangeStorageGroup = async (value: InputType) => {
    await addForm.setFieldValue("storageGroup", String(value));
  };

  const onChangeBoughtValue = async (value: InputType) => {
    await addForm.setFieldValue("boughtValue", Number(value));
  };

  const onChangeCount = async (value: InputType) => {
    await addForm.setFieldValue("count", Number(value));
  };

  const onChangeWantedCount = async (value: InputType) => {
    await addForm.setFieldValue("wantedCount", Number(value));
  };

  const onChangeValue = async (value: InputType) => {
    await addForm.setFieldValue("value", Number(value));
  };

  const onClickSubmit = () => {
    addForm.submitForm();
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex w-full flex-row justify-between border-b border-white pb-2 pl-2">
          <h1 className="text-start text-2xl font-medium">Add Item</h1>
          <div className="flex flex-row gap-2">
            <Button
              disabled={isSubmitting}
              label="Add New Item"
              onClick={onClickSubmit}
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-24 gap-3">
          {isReleased && (
            <Selector<number>
              disabled={isSubmitting}
              id="setIndex"
              label="Set"
              onChange={onChangeSetIndex}
              options={setCodes}
              styles={{
                wrapper: "col-span-10",
              }}
              value={addForm.values.setIndex!}
            />
          )}
          {isReleased && addForm.values.setIndex !== null && (
            <Textfield
              disabled={true}
              id="rarityCode"
              label="Rarity"
              readonly
              styles={{
                wrapper: "col-span-6",
              }}
              type="text"
              value={rarityLabel()}
            />
          )}
          <Selector<CardLanguage>
            disabled={isSubmitting}
            id="language"
            label="Language"
            onChange={onChangeLanguage}
            options={languageOptions}
            styles={{
              wrapper: "col-span-4",
            }}
            value={addForm.values.language}
          />
          <Selector<Condition>
            disabled={isSubmitting}
            id="condition"
            label="Condition"
            onChange={onChangeCondition}
            options={conditionOptions}
            styles={{
              wrapper: "col-span-4",
            }}
            value={addForm.values.condition}
          />
          <Selector<StoreStatus>
            disabled={isSubmitting}
            id="status"
            label="Status"
            onChange={onChangeStatus}
            options={statusOptions}
            styles={{
              wrapper: "col-span-4",
            }}
            value={addForm.values.status}
          />
          <Textfield
            disabled={isSubmitting}
            id="count"
            label="Count"
            min={0}
            onChange={onChangeCount}
            placeholder="0"
            styles={{
              wrapper: "col-span-4",
            }}
            type="number"
            initialValue={addForm.values.count}
            value={addForm.values.count}
          />
          <Textfield
            disabled={isSubmitting}
            id="wantedCount"
            label="Wanted count"
            min={0}
            onChange={onChangeWantedCount}
            placeholder="0"
            styles={{
              wrapper: "col-span-3",
            }}
            type="number"
            initialValue={addForm.values.wantedCount}
            value={addForm.values.wantedCount}
          />
          <Textfield
            disabled={isSubmitting}
            id="value"
            label="Price Value"
            min={0}
            onChange={onChangeValue}
            placeholder="0"
            styles={{
              wrapper: "col-span-3",
            }}
            type="price"
            initialValue={addForm.values.value}
            value={addForm.values.value}
          />
          <Textfield
            disabled={isSubmitting}
            id="boughtValue"
            label="Bought Value"
            onChange={onChangeBoughtValue}
            placeholder="0"
            styles={{
              wrapper: "col-span-3",
            }}
            type="price"
            min={0}
            initialValue={addForm.values.boughtValue}
            value={addForm.values.boughtValue}
          />
          <Textfield
            disabled={isSubmitting}
            id="storageGroup"
            label="Storage Group"
            styles={{
              wrapper: "col-span-3",
            }}
            type="text"
            onChange={onChangeStorageGroup}
            initialValue={addForm.values.storageGroup}
            value={addForm.values.storageGroup}
          />
        </div>
      </div>
      {isNotProd && (
        <div className="flex flex-col">
          <div className="flex w-full flex-row justify-between border-b border-white pb-2 pl-2">
            <h1 className="text-start text-2xl font-medium">Set Prices</h1>
            <Button
              disabled={
                cardSets === undefined ||
                addForm.values.setIndex == null ||
                pricesState == AsyncState.Loading ||
                pricesState == AsyncState.Success
              }
              label="Get selected set prices"
              onClick={getSelectedSetPrices}
            />
          </div>
          {pricesState == AsyncState.Error && (
            <p className="mt-4 text-red-500">
              Some error happened. Unable to load prices.
            </p>
          )}
          {pricesState === AsyncState.Initial && (
            <p className="mt-4">
              click the "Get selected set prices" button to obtain prices for
              real stores.
            </p>
          )}
          {pricesState == AsyncState.Loading && (
            <div className="mt-4 flex flex-row items-center justify-center">
              <Loader />
            </div>
          )}
          {pricesState == AsyncState.Success && prices && (
            <div className="flex flex-row gap-4 text-lg font-bold">
              <div className="flex flex-row gap-1">
                <p>Minimum Price:</p>
                {prices.minPrice ? (
                  <p className="text-green-500">
                    {Number(prices.minPrice).toFixed(2)} $
                  </p>
                ) : (
                  <p className="text-red-500">unavailable</p>
                )}
              </div>
              <div className="flex flex-row gap-1">
                <p>Market Price:</p>
                {prices.marketPrice ? (
                  <p className="text-green-500">
                    {Number(prices.marketPrice).toFixed(2)} $
                  </p>
                ) : (
                  <p className="text-red-500">unavailable</p>
                )}
              </div>
              <div className="flex flex-row gap-1">
                <p>Best Near Mint Price:</p>
                {prices.betterPrice ? (
                  <p className="text-green-500">
                    {Number(prices.betterPrice).toFixed(2)} $
                  </p>
                ) : (
                  <p className="text-red-500">unavailable</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

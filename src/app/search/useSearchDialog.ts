import { useState } from "react";

import {
  AsyncState,
  CTPrice,
  GetPriceArgs,
  NewStoredCardItem,
  NewStoredCardItemBody,
  StoredCardItem,
  UpdateRowStoredCardItem,
  UpdateStoredCard,
  YugiohCard,
} from "@/types";
import { rarityCodeToName } from "@/utils/rarityCodeToName";

export interface UseSearchDialogProps {
  card: YugiohCard | null;
}

export interface UseSearchDialogReturn {
  addNewStoredCardItem: (item: NewStoredCardItem) => Promise<void>;
  cleanPrice: () => Promise<void>;
  cleanStates: () => void;
  deleteStoredCardItem: (itemId: number) => Promise<void>;
  getPrices: (args: GetPriceArgs) => Promise<void>;
  prices: CTPrice | null;
  pricesState: AsyncState;
  searchDialogOpened: () => Promise<void>;
  storedCard: StoredCardItem | null;
  storedCardState: AsyncState;
  submitState: AsyncState;
  updateStoredCard: (item: UpdateStoredCard) => Promise<void>;
  updateStoredCardItem: (item: UpdateRowStoredCardItem) => Promise<void>;
}

export const useSearchDialog = ({
  card,
}: UseSearchDialogProps): UseSearchDialogReturn => {
  const [storedCard, setStoredCard] = useState<StoredCardItem | null>(null);
  const [prices, setPrices] = useState<CTPrice | null>(null);

  const [storedCardState, setStoredCardState] = useState<AsyncState>(
    AsyncState.Loading,
  );
  const [submitState, setSubmitState] = useState<AsyncState>(
    AsyncState.Initial,
  );
  const [pricesState, setPricesState] = useState<AsyncState>(
    AsyncState.Initial,
  );

  const cleanStates = () => {
    setStoredCard(null);
    setStoredCardState(AsyncState.Loading);
    setSubmitState(AsyncState.Initial);
    cleanPrice();
  };

  const cleanPrice = async () => {
    setPrices(null);
    setPricesState(AsyncState.Initial);
  };

  const fetchStoredCard = async () => {
    if (card == null) {
      return setStoredCardState(AsyncState.Error);
    }

    const url = `/api/cardStored/getByName?card_name=${encodeURIComponent(card.name)}`;
    const response = await fetch(url, { method: "GET", cache: "no-store" });

    if (response.ok) {
      const data = (await response.json()) as StoredCardItem | null;
      setStoredCard(data);
      setStoredCardState(AsyncState.Success);
    } else {
      return setStoredCardState(AsyncState.Error);
    }
  };

  const addNewStoredCardItem = async (item: NewStoredCardItem) => {
    setSubmitState(AsyncState.Loading);

    const url = `/api/cardStored/addItem`;

    if (storedCard && card) {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          boughtValue: item.boughtValue,
          condition: item.condition,
          count: item.count,
          language: item.language,
          status: item.status,
          storageGroup: item.storageGroup,
          value: item.value,
          wantedCount: item.wantedCount,
          storedCardId: storedCard?.id,
          rarityCode:
            item.setIndex !== null
              ? card.card_sets![item.setIndex].set_rarity_code
              : null,
          setCode:
            item.setIndex !== null
              ? card.card_sets![item.setIndex].set_code
              : null,
          setName:
            item.setIndex !== null
              ? card.card_sets![item.setIndex].set_name
              : null,
        } as NewStoredCardItemBody),
      });

      if (response.ok) {
        await cleanPrice();
        await fetchStoredCard();
        setSubmitState(AsyncState.Success);
      } else {
        setSubmitState(AsyncState.Error);
      }
    } else {
      setSubmitState(AsyncState.Error);
    }
  };

  const updateStoredCard = async (item: UpdateStoredCard) => {
    const url = `/api/cardStored/update`;

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(item),
    });

    if (response.ok == false) {
      return console.error(await response.json());
    }

    await fetchStoredCard();
  };

  const updateStoredCardItem = async (item: UpdateRowStoredCardItem) => {
    const url = `/api/cardStored/updateItem`;

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(item),
    });

    if (response.ok == false) {
      return console.error(await response.json());
    }

    await fetchStoredCard();
  };

  const deleteStoredCardItem = async (itemId: number) => {
    try {
      const url = `/api/cardStored/deleteItem?id=${itemId}`;

      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok && storedCard) {
        const itemsWithoutRemoved = storedCard.items.filter(
          (i) => i.id != itemId,
        );

        const avgValue = itemsWithoutRemoved.reduce(
          (sum, { value }) => (sum += value),
          0,
        );
        const countSum = itemsWithoutRemoved.reduce(
          (sum, { count }) => (sum += count),
          0,
        );
        const wantedCountSum = itemsWithoutRemoved.reduce(
          (sum, { wantedCount }) => (sum += wantedCount),
          0,
        );

        setStoredCard({
          ...storedCard,
          avgValue,
          countSum,
          wantedCountSum,
          items: itemsWithoutRemoved,
        });
      } else throw new Error(await response.json());
    } catch (error) {
      console.error(error);
    }
  };

  const searchDialogOpened = async () => {
    await fetchStoredCard();
  };

  const getPrices = async ({
    cardName,
    rarity,
    setCode,
    setName,
  }: GetPriceArgs) => {
    setPricesState(AsyncState.Loading);

    if (storedCard == null) return setPricesState(AsyncState.Error);

    let url = `/api/prices/card-trader?`;
    url += `card_name=${encodeURIComponent(cardName)}`;
    url += `&rarity=${rarity}`;
    url += `&set_code=${setCode}`;
    url += `&set_name=${setName}`;

    const itemFound = storedCard.items.find(
      (item) =>
        item.setName == setName && rarityCodeToName(item.rarityCode) == rarity,
    );

    if (itemFound) {
      url += `&stored_card_item_id=${itemFound.id}`;
    }

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    if (response.ok) {
      const data = (await response.json()) as CTPrice;
      setPrices(data);
      setPricesState(AsyncState.Success);
    } else {
      return setPricesState(AsyncState.Error);
    }
  };

  return {
    addNewStoredCardItem,
    cleanPrice,
    cleanStates,
    deleteStoredCardItem,
    getPrices,
    prices,
    pricesState,
    searchDialogOpened,
    storedCard,
    storedCardState,
    submitState,
    updateStoredCard,
    updateStoredCardItem,
  };
};

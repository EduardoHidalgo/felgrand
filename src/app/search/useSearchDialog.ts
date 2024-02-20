import {
  AsyncState,
  NewStoredCardItem,
  NewStoredCardItemBody,
  StoredCardItem,
  YugiohCard,
} from "@/types";
import { useEffect, useState } from "react";

export interface UseSearchDialogProps {
  card: YugiohCard | null;
}

export interface UseSearchDialogReturn {
  addNewStoredCardItem: (item: NewStoredCardItem) => Promise<void>;
  storedCard: StoredCardItem | null;
  storedCardState: AsyncState;
  submitState: AsyncState;
}

export const useSearchDialog = ({
  card,
}: UseSearchDialogProps): UseSearchDialogReturn => {
  const [storedCard, setStoredCard] = useState<StoredCardItem | null>(null);
  const [storedCardState, setStoredCardState] = useState<AsyncState>(
    AsyncState.Loading,
  );
  const [submitState, setSubmitState] = useState<AsyncState>(
    AsyncState.Initial,
  );

  useEffect(() => {
    if (card) fetchStoredCard();
  }, [card]);

  const fetchStoredCard = async () => {
    if (card == null) {
      return setStoredCardState(AsyncState.Error);
    }

    const url = `/api/cardStored/getByName?card_name=${card.name}`;
    const response = await fetch(url, { method: "GET" });

    if (response.ok) {
      const data = (await response.json()) as StoredCardItem;
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
          rarityCode: item.setIndex
            ? card.card_sets![item.setIndex].set_rarity_code
            : null,
          setCode: item.setIndex
            ? card.card_sets![item.setIndex].set_code
            : null,
          setName: item.setIndex
            ? card.card_sets![item.setIndex].set_name
            : null,
        } as NewStoredCardItemBody),
      });

      if (response.ok) {
        await fetchStoredCard();
        setSubmitState(AsyncState.Success);
      } else {
        setSubmitState(AsyncState.Error);
      }
    } else {
      setSubmitState(AsyncState.Error);
    }
  };

  return {
    addNewStoredCardItem,
    storedCard,
    storedCardState,
    submitState,
  };
};

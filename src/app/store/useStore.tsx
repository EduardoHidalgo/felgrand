import { useEffect, useState } from "react";
import { StoredCardCombined } from "@/types";

export interface UseStoreProps {}

export interface UseStoreReturn {
  cards: Array<StoredCardCombined>;
  selectedCard: StoredCardCombined | null;
  onClickRow: (index: number) => void;
}

export const useStore = (props: UseStoreProps): UseStoreReturn => {
  const {} = props;

  const [cards, setCards] = useState<Array<StoredCardCombined>>([]);
  const [selectedCard, setSelectedCard] = useState<StoredCardCombined | null>(
    null,
  );

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const url = `/api/cardStored/getAll`;
    const response = await fetch(url, { method: "GET" });

    if (response.ok) {
      const data = (await response.json()) as Array<StoredCardCombined>;
      setCards(data);
    } else {
    }
  };

  const onClickRow = (index: number) => {
    if (
      selectedCard &&
      cards[index].storedCardItemId === selectedCard.storedCardItemId
    )
      return;

    setSelectedCard(cards[index]);
  };

  return {
    cards,
    onClickRow,
    selectedCard,
  };
};

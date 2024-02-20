import { StoredCardItem, StoredCardList } from "@/types";
import { useEffect, useState } from "react";

export interface UseStoreProps {}

export interface UseStoreReturn {
  cards: StoredCardList;
  selectedCard: StoredCardItem | null;
  onClickRow: (index: number) => void;
}

export const useStore = (props: UseStoreProps): UseStoreReturn => {
  const {} = props;

  const [cards, setCards] = useState<StoredCardList>([]);
  const [selectedCard, setSelectedCard] = useState<StoredCardItem | null>(null);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const url = `/api/cardStored/getAll`;
    const response = await fetch(url, { method: "GET" });

    if (response.ok) {
      const data = (await response.json()) as StoredCardList;
      setCards(data);
    }
  };

  const onClickRow = (index: number) => {
    if (selectedCard && cards[index].id === selectedCard.id) return;

    setSelectedCard(cards[index]);
  };

  return {
    cards,
    onClickRow,
    selectedCard,
  };
};

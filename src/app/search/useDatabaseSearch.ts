import {
  AddNewStoredCard,
  AsyncHtmlScrap,
  AsyncInventoryList,
  AsyncState,
  Ban,
  GetStoredCardInventory,
  YugiohCard,
  YugiohDatabase,
} from "@/types";
import data from "../../../public/database.json";
import { useEffect, useState } from "react";

export interface UseDatabaseSearchProps {
  onFetchClean: () => void;
  onFetchFound: (params: string) => void;
}

export interface UseDatabaseSearchReturn {
  fetchList: (searchValue: string) => Promise<void>;
  inventory: AsyncInventoryList;
  isInventoried: (cardName: string) => boolean;
  isInventoryLoading: boolean;
  list: YugiohCard[];
  onClickRow: (index: number) => Promise<void>;
  /*  rulings: AsyncHtmlScrap; */
  selectedCard: YugiohCard | null;
  storeCard: (cardName: string) => Promise<void>;
  /* tips: AsyncHtmlScrap; */
}

export const useDatabaseSearch = (
  props: UseDatabaseSearchProps,
): UseDatabaseSearchReturn => {
  const { onFetchClean, onFetchFound } = props;

  const LIST_LIMIT = 1500;
  const SEARCHABLE_LENGTH = 3;

  const database: YugiohDatabase = data as unknown as YugiohDatabase;

  const [list, setList] = useState<Array<YugiohCard>>([]);
  const [selectedCard, setSelectedCard] = useState<YugiohCard | null>(null);
  /* const [tips, setTips] = useState<AsyncHtmlScrap>({
    html: null,
    state: AsyncState.Initial,
  });
  const [rulings, setRulings] = useState<AsyncHtmlScrap>({
    html: null,
    state: AsyncState.Initial,
  }); */
  const [inventory, setInventory] = useState<AsyncInventoryList>({
    list: [],
    state: AsyncState.Initial,
  });

  const isInventoryLoading = [AsyncState.Initial, AsyncState.Loading].includes(
    inventory.state,
  );

  useEffect(() => {
    if (selectedCard !== null && selectedCard !== undefined) {
      /* setTips({ ...tips, state: AsyncState.Loading });
      setRulings({ ...rulings, state: AsyncState.Loading });

      fetchTips(selectedCard);
      fetchRulings(selectedCard); */
      fetchInventory();
    }
  }, [selectedCard]);

  const rehydrateStoredCardToInventory = (cardName: string) => {
    if (!inventory.list.some((item) => item.name === cardName)) {
      setInventory({
        list: [...inventory.list, { name: cardName }],
        state: inventory.state,
      });
    }
  };

  const storeCard = async (cardName: string) => {
    const url = `/api/cardStored/addNew`;
    const card = database.data.find((item) => item.name === cardName);

    if (card === undefined) return;

    const body: AddNewStoredCard = {
      archetype: card.archetype,
      cardType: card.type,
      name: card.name,
      race: card.race,
      banType: (card.banlist_info && card.banlist_info.ban_tcg
        ? card.banlist_info.ban_tcg
        : "Unlimited") as keyof typeof Ban,
    };

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (response.ok) rehydrateStoredCardToInventory(cardName);
  };

  /* const fetchTips = async (card: YugiohCard) => {
    const url = `/api/tips?card_name=${card.name}`;
    const response = await fetch(url, { method: "GET" });

    if (response.ok) {
      const data = (await response.json()) as { html: string };
      setTips({ html: data.html, state: AsyncState.Success });
    } else {
      setTips({ html: null, state: AsyncState.Error });
    }
  };

  const fetchRulings = async (card: YugiohCard) => {
    const url = `/api/rulings?card_name=${card.name}`;
    const response = await fetch(url, { method: "GET" });

    if (response.ok) {
      const data = (await response.json()) as { html: string };
      setRulings({ html: data.html, state: AsyncState.Success });
    } else {
      setRulings({ html: null, state: AsyncState.Error });
    }
  }; */

  const fetchInventory = async () => {
    const url = `/api/cardStored/getInventory`;
    const response = await fetch(url, { method: "GET" });

    if (response.ok) {
      const data = (await response.json()) as GetStoredCardInventory;

      setInventory({
        list: data.inventory,
        state: AsyncState.Success,
      });
    } else {
      setInventory({
        list: [],
        state: AsyncState.Error,
      });
      console.log({ response });
    }
  };

  const fetchList = async (searchValue: string) => {
    setSelectedCard(null);

    if (searchValue === "" || searchValue.length < SEARCHABLE_LENGTH) {
      /*  setTips({ html: null, state: AsyncState.Initial });
      setRulings({ html: null, state: AsyncState.Initial }); */
      setList([]);
      onFetchClean();
      return;
    }

    let count = 0;
    let hasSelectedByName = false;
    let search = searchValue.toLowerCase();
    const founds = database.data.filter((card) => {
      if (count >= LIST_LIMIT) return false;

      if (String(card.name).toLowerCase().includes(search)) {
        if (search === card.name.toLowerCase()) {
          hasSelectedByName = true;
          setSelectedCard(card);
        }

        count++;
        return true;
      }
      if (String(card.type).toLowerCase().includes(search)) {
        count++;
        return true;
      }
      if (String(card.race).toLowerCase().includes(search)) {
        count++;
        return true;
      }
      if (String(card.archetype).toLowerCase().includes(search)) {
        count++;
        return true;
      }
      if (String(card.desc).toLowerCase().includes(search)) {
        count++;
        return true;
      }
      if (card.card_sets) {
        for (let index = 0; index < card.card_sets.length; index++) {
          const set = card.card_sets[index];
          if (String(set.set_name).toLowerCase().includes(search)) {
            count++;
            return true;
          }

          if (String(set.set_code).toLowerCase().includes(search)) {
            count++;
            return true;
          }
        }
      }

      return false;
    });

    if (hasSelectedByName === false) {
      setSelectedCard(founds[0]);
    }

    if (founds.length == 0) {
      setSelectedCard(null);
    }

    setList(founds);

    const params = new URLSearchParams();
    params.set("search", search);
    onFetchFound(params.toString());
  };

  const onClickRow = async (index: number) => {
    if (selectedCard && list[index].id === selectedCard.id) return;

    /*  setTips({ html: null, state: AsyncState.Initial });
    setRulings({ html: null, state: AsyncState.Initial }); */
    setSelectedCard(list[index]);

    await navigator.clipboard.writeText(list[index].name);
  };

  const isInventoried = (cardName: string) => {
    return inventory.list.some((item) => item.name == cardName);
  };

  return {
    fetchList,
    inventory,
    isInventoried,
    isInventoryLoading,
    list,
    onClickRow,
    /*  rulings, */
    selectedCard,
    storeCard,
    /*   tips, */
  };
};

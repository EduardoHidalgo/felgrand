"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { YugiohCard } from "@/types";
import { useYugiohDatabase } from "@/hooks/useYugiohDatabase";
import {
  BuilderListType,
  BuilderSearchFilter,
  SearchArgs,
  searchArgsDefault,
} from "@/components/builder";
import { BuilderSorting } from "./sortings";

export interface UseBuilderReturn {
  dragHandlers: {
    onDragCancel: () => void;
    onDragEnd: (event: DragEndEvent) => void;
    onDragStart: (event: DragStartEvent) => void;
  };
  lists: {
    mainList: YugiohCard[];
    sideList: YugiohCard[];
    extraList: YugiohCard[];
    customList: YugiohCard[];
  };
  activeId: string | number | null;
  filteredSearch: (search: string) => void;
  onCheckedSearchFilter: (value: boolean, type: BuilderSearchFilter) => void;
  onClickAddCard: (card: YugiohCard, type: BuilderListType) => void;
  onClickClearList: (type: BuilderListType) => void;
  onClickSortList: (type: BuilderListType) => void;
  searchArgs: SearchArgs;
  searchResult: YugiohCard[];
}

export const useBuilder = (): UseBuilderReturn => {
  const [searchArgs, setSearchArgs] = useState<SearchArgs>(searchArgsDefault);
  const [mainList, setMainList] = useState<Array<YugiohCard>>([]);
  const [extraList, setExtraList] = useState<Array<YugiohCard>>([]);
  const [sideList, setSideList] = useState<Array<YugiohCard>>([]);
  const [customList, setCustomList] = useState<Array<YugiohCard>>([]);
  const [activeId, setActiveId] = useState<number | string | null>(null);

  const { searchResult, searchYugiohCards } = useYugiohDatabase({
    ...searchArgs,
  });

  const filteredSearch = (search: string) => {
    searchYugiohCards(search);
  };

  const onCheckedSearchFilter = (value: boolean, type: BuilderSearchFilter) => {
    let newFilters: SearchArgs = searchArgs;

    switch (type) {
      case "arquetype":
        newFilters.filters.byArquetype = value;
        break;
      case "id":
        newFilters.filters.byId = value;
        break;
      case "name":
        newFilters.filters.byName = value;
        break;
      case "race":
        newFilters.filters.byRace = value;
        break;
      case "type":
        newFilters.filters.byType = value;
        break;
    }

    return setSearchArgs({ ...newFilters });
  };

  const onClickSortList = (type: BuilderListType) => {
    switch (type) {
      case "main":
        return setMainList(BuilderSorting.sortMainDeck(mainList));
      case "extra":
        return setExtraList(BuilderSorting.sortExtraDeck(extraList));
      case "side":
        return setSideList(BuilderSorting.sortSideDeck(sideList));
      case "custom":
        return setCustomList(BuilderSorting.sortCustomList(customList));
    }
  };

  const onClickAddCard = (card: YugiohCard, type: BuilderListType) => {
    if (type == "main" && mainList.length >= 60) return;
    if (type == "extra" && extraList.length >= 15) return;
    if (type == "side" && sideList.length >= 15) return;
    if (type == "custom" && customList.length >= 90) return;

    const uuid = uuidv4();
    switch (type) {
      case "main":
        return setMainList([...mainList, { ...card, uuid, id: uuid }]);
      case "side":
        return setSideList([...sideList, { ...card, uuid, id: uuid }]);
      case "extra":
        return setExtraList([...extraList, { ...card, uuid, id: uuid }]);
      case "custom":
        return setCustomList([...customList, { ...card, uuid, id: uuid }]);
    }
  };

  const onClickClearList = (type: BuilderListType) => {
    switch (type) {
      case "custom":
        return setCustomList([]);
      case "extra":
        return setExtraList([]);
      case "main":
        return setMainList([]);
      case "side":
        return setSideList([]);
    }
  };

  const onDragCancel = () => {
    setActiveId(null);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (mainList.some((yc) => yc.uuid == active.id)) {
      if (active.id !== over!.id) {
        setMainList((cards) => {
          const oldIndex = cards.findIndex((yc) => yc.id === active.id);
          const newIndex = cards.findIndex((yc) => yc.id === over!.id);
          return arrayMove(cards, oldIndex, newIndex);
        });

        return setActiveId(null);
      } else return setActiveId(null);
    }

    if (extraList.some((yc) => yc.uuid == active.id)) {
      if (active.id !== over!.id) {
        setExtraList((cards) => {
          const oldIndex = cards.findIndex((yc) => yc.id === active.id);
          const newIndex = cards.findIndex((yc) => yc.id === over!.id);
          return arrayMove(cards, oldIndex, newIndex);
        });

        return setActiveId(null);
      } else return setActiveId(null);
    }

    if (sideList.some((yc) => yc.uuid == active.id)) {
      if (active.id !== over!.id) {
        setSideList((cards) => {
          const oldIndex = cards.findIndex((yc) => yc.id === active.id);
          const newIndex = cards.findIndex((yc) => yc.id === over!.id);
          return arrayMove(cards, oldIndex, newIndex);
        });

        return setActiveId(null);
      } else return setActiveId(null);
    }

    if (customList.some((yc) => yc.uuid == active.id)) {
      if (active.id !== over!.id) {
        setCustomList((cards) => {
          const oldIndex = cards.findIndex((yc) => yc.id === active.id);
          const newIndex = cards.findIndex((yc) => yc.id === over!.id);
          return arrayMove(cards, oldIndex, newIndex);
        });

        return setActiveId(null);
      } else return setActiveId(null);
    }

    return setActiveId(null);
  };

  const onDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  return {
    dragHandlers: {
      onDragCancel,
      onDragEnd,
      onDragStart,
    },
    lists: {
      mainList,
      sideList,
      extraList,
      customList,
    },
    activeId,
    filteredSearch,
    onCheckedSearchFilter,
    onClickAddCard,
    onClickClearList,
    searchArgs,
    searchResult,
    onClickSortList,
  };
};

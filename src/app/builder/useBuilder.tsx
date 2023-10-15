"use client";
import { Dispatch, SetStateAction, useState } from "react";
import {
  DragCancelEvent,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";

import {
  BuilderList,
  BuilderListItem,
  YugiohCard,
  defaultBuilderList,
} from "@/types";
import { BuilderSorting } from "./sortings";
import { useYugiohDatabase } from "@/hooks/useYugiohDatabase";
import { Notification, NotificationType } from "@/components/toast";
import {
  BuilderListType,
  BuilderSearchFilter,
  SearchArgs,
  searchArgsDefault,
} from "@/components/builder";

export interface UseBuilderReturn {
  activeDragId: string | null;
  dragHandlers: {
    onDragCancel: (event: DragCancelEvent) => void;
    onDragEnd: (event: DragEndEvent) => void;
    onDragOver: (event: DragOverEvent) => void;
    onDragStart: (event: DragStartEvent) => void;
  };
  filteredSearch: (search: string) => void;
  list: BuilderList;
  onCheckedSearchFilter: (value: boolean, type: BuilderSearchFilter) => void;
  onClickAddCard: (card: YugiohCard, type: BuilderListType) => void;
  onClickClearList: (type: BuilderListType) => void;
  onClickRemoveCard: (type: BuilderListType) => void;
  onClickSortList: (type: BuilderListType) => void;
  searchArgs: SearchArgs;
  searchResult: YugiohCard[];
  selectedItem: BuilderListItem | null;
  setList: Dispatch<SetStateAction<BuilderList>>;
}

export interface UseBuilderProps {
  createNotification: (notification: Omit<Notification, "id">) => void;
}

export const useBuilder = ({
  createNotification,
}: UseBuilderProps): UseBuilderReturn => {
  const LIST_LIMIT: { [key in BuilderListType]: number } = {
    custom: 90,
    extra: 15,
    main: 60,
    side: 15,
  };
  const TOTAL_CARDS_PER_LEGAL_DECK = 3;

  const [searchArgs, setSearchArgs] = useState<SearchArgs>(searchArgsDefault);
  const [list, setList] = useState<BuilderList>(defaultBuilderList);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<BuilderListItem | null>(
    null
  );

  const { searchResult, searchYugiohCards } = useYugiohDatabase({
    ...searchArgs,
  });

  const filteredSearch = (search: string) => {
    searchYugiohCards(search);
  };

  const notifyCardLimitError = () => {
    return createNotification({
      message: "You can't add more than 3 same cards on this list",
      title: "Unable to add the card",
      type: NotificationType.error,
    });
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

  const onClickAddCard = (card: YugiohCard, type: BuilderListType) => {
    if (
      type !== "custom" &&
      list[type].filter((el) => el.card.id === card.id).length ==
        TOTAL_CARDS_PER_LEGAL_DECK
    ) {
      return notifyCardLimitError();
    }

    if (list[type].length == LIST_LIMIT[type]) {
      return;
    }

    const id = uuidv4();
    return setList({
      ...list,
      [type]: [...list[type], { card, id }],
    });
  };

  const onClickSortList = (type: BuilderListType) => {
    return setList(BuilderSorting.sortList(list, type));
  };

  const onClickClearList = (type: BuilderListType) => {
    setList((obj) => {
      return { ...obj, [type]: [] };
    });
  };

  const onClickRemoveCard = (type: BuilderListType) => {
    if (selectedItem !== null)
      setList((obj) => {
        return {
          ...obj,
          [type]: obj[type].filter((el) => el.id !== selectedItem.id),
        };
      });
    setSelectedItem(null);
  };

  /** Fires if a drag operation is cancelled, for example, if the user presses
   * escape while dragging a draggable item.
   *
   * @see https://docs.dndkit.com/api-documentation/context-provider#ondragcancel
   */
  const onDragCancel = (event: DragCancelEvent) => {
    setActiveDragId(null);
  };

  /** Fires when a drag event that meets the activation constraints for that
   * sensor happens, along with the unique identifier of the draggable element
   * that was picked up.
   *
   * @see https://docs.dndkit.com/api-documentation/context-provider#ondragstart
   */
  const onDragStart = (event: DragStartEvent) => {
    const id = event.active.id.toString();

    if (event.active.data.current) {
      const activeContainerId = event.active.data.current.sortable
        .containerId as BuilderListType;

      const item = list[activeContainerId].find((el) => el.id === id);
      if (item) setSelectedItem(item);

      setActiveDragId(id);
    }
  };

  /** Fires after a draggable item is dropped. This event contains information
   * about the active draggable id along with information on whether the draggable
   * item was dropped over. If there are no collisions detected when the draggable
   * item is dropped, the over property will be null. If a collision is detected,
   * the over property will contain the id of the droppable over which it was
   * dropped.
   *
   * It's important to understand that the onDragEnd event does not move draggable
   * items into droppable containers.
   *
   * @see https://docs.dndkit.com/api-documentation/context-provider#ondragend
   */
  const onDragEnd = (_: DragEndEvent) => {
    return setActiveDragId(null);
  };

  /** Fires when a draggable item is moved over a droppable container, along
   * with the unique identifier of that droppable container.
   *
   * @see https://docs.dndkit.com/api-documentation/context-provider#ondragover
   */
  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    try {
      // Both active and over has data, that means two items collided. Otherwise
      // should drop into the container without over item collision.
      if (active.data.current && over && over.data.current) {
        const activeContainerId = active.data.current.sortable
          .containerId as BuilderListType;

        const overContainerId = over.data.current.sortable
          .containerId as BuilderListType;

        // If containers are equal, just switch positions
        if (activeContainerId === overContainerId) {
          if (active.id !== over.id) {
            return setList((obj) => {
              const oldIndex = obj[activeContainerId].findIndex(
                (el) => el.id === active.id
              );
              const newIndex = obj[overContainerId].findIndex(
                (el) => el.id === over!.id
              );
              return {
                ...obj,
                [activeContainerId]: arrayMove(
                  obj[activeContainerId],
                  oldIndex,
                  newIndex
                ),
              };
            });
          }
        }

        // If containers are different, remove item  in active container and
        // transfer to overContainer.
        if (activeContainerId !== overContainerId) {
          const activeIndex = list[activeContainerId].findIndex(
            (el) => el.id == active.id
          );

          let activeList = Array.from(list[activeContainerId]);
          let overList = Array.from(list[overContainerId]);

          overList.splice(activeIndex, 0, activeList[activeIndex]);
          activeList.splice(activeIndex, 1);

          setList({
            ...list,
            [activeContainerId]: activeList,
            [overContainerId]: overList,
          });
        }
      } else {
        const activeContainerId = active.data.current!.sortable
          .containerId as BuilderListType;

        const overContainerId = over!.id as BuilderListType;

        // Safe validation
        if (activeContainerId && overContainerId) {
          const activeIndex = list[activeContainerId].findIndex(
            (el) => el.id == active.id
          );

          let activeList = Array.from(list[activeContainerId]);
          let overList = Array.from(list[overContainerId]);
          let item = activeList[activeIndex];

          if (overList.includes(item)) return;

          overList.push(item);
          activeList.splice(activeIndex, 1);

          setList({
            ...list,
            [activeContainerId]: activeList,
            [overContainerId]: overList,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    activeDragId,
    dragHandlers: {
      onDragCancel,
      onDragEnd,
      onDragStart,
      onDragOver,
    },
    filteredSearch,
    list,
    onCheckedSearchFilter,
    onClickAddCard,
    onClickClearList,
    onClickRemoveCard,
    onClickSortList,
    searchArgs,
    searchResult,
    selectedItem,
    setList,
  };
};

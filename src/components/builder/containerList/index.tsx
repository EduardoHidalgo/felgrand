"use client";
import { FC } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import classNames from "classnames";

import { BuilderList, BuilderListItem } from "@/types";
import { Button } from "@/components/button";
import { BuilderCardDrag } from "../cardPreview";
import { BuilderListType } from "..";
import { useDroppable } from "@dnd-kit/core";

export interface BuilderListProps {
  activeDragId: string | null;
  className: string;
  list: BuilderList;
  onClickClearList: (type: BuilderListType) => void;
  onClickRemoveCard: (type: BuilderListType) => void;
  onClickSortList: (type: BuilderListType) => void;
  selectedItem: BuilderListItem | null;
  title: string;
  type: BuilderListType;
}

export const BuilderContainerList: FC<BuilderListProps> = ({
  activeDragId,
  className,
  list,
  onClickClearList,
  onClickRemoveCard,
  onClickSortList,
  selectedItem,
  title,
  type,
}) => {
  const items = list[type];

  const { isOver, setNodeRef } = useDroppable({ id: type });

  return (
    <div className="m-1">
      <div className="flex flex-row justify-between mb-1">
        <h2>{title}</h2>
        <div className="flex flex-row gap-2">
          <Button
            disabled={
              selectedItem === null ||
              list[type].includes(selectedItem) == false
            }
            label="remove"
            onClick={() => onClickRemoveCard(type)}
          />
          <Button label="sort" onClick={() => onClickSortList(type)} />
          <Button label="clear" onClick={() => onClickClearList(type)} />
        </div>
      </div>
      <SortableContext id={type} items={items} strategy={rectSortingStrategy}>
        <div
          className={classNames(
            "grid grid-cols-15 border border-black",
            isOver && "border border-red-400",
            className
          )}
          ref={setNodeRef}
        >
          {items.map(
            (item) =>
              item && (
                <BuilderCardDrag
                  key={item.id}
                  item={item}
                  activeDragId={activeDragId}
                  selectedItem={selectedItem}
                />
              )
          )}
        </div>
      </SortableContext>
    </div>
  );
};

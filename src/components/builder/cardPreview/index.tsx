"use client";
import { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import classNames from "classnames";

import { BuilderListItem } from "@/types";

export interface BuilderCardDragProps {
  activeDragId: string | null;
  item: BuilderListItem;
  selectedItem: BuilderListItem | null;
}

export const BuilderCardDrag: FC<BuilderCardDragProps> = ({
  activeDragId,
  item,
  selectedItem,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const isDragged = activeDragId !== null && item.id === activeDragId;
  const isSelected = selectedItem !== null && item.id === selectedItem.id;

  const onPointerDown = (e: any) => {
    listeners!.onPointerDown(e, item.id);
  };

  const onKeyDown = (e: any) => {
    listeners!.onKeyDown(e, item.id);
  };

  return (
    <div
      className={classNames("relative h-24 w-16", isDragged && "z-10")}
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      onPointerDown={(e) => onPointerDown(e)}
      onKeyDown={(e) => onKeyDown(e)}
    >
      <div
        className={classNames(
          "absolute m-auto h-24 w-16",
          (isDragged || isSelected) && "z-20 border-4 border-red-500",
        )}
      />
      <img
        className={classNames("h-24 w-16")}
        src={item.card.card_images[0].image_url_small}
      />
    </div>
  );
};

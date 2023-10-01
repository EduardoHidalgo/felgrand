"use client";
import { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import classNames from "classnames";

import { YugiohCard } from "@/types";

export interface BuilderCardPreviewProps {
  activeId: number | string | null;
  card: YugiohCard;
}

export const BuilderCardPreview: FC<BuilderCardPreviewProps> = ({
  activeId,
  card,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  const isActive = activeId !== null && card.id === activeId;

  return (
    <img
      className={classNames("h-24 w-16", isActive && "z-10")}
      src={card.card_images[0].image_url_small}
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
    />
  );
};

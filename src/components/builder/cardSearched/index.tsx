import { FC } from "react";

import { YugiohCard } from "@/types";
import { Button } from "@/components/button";
import { BuilderListType } from "../types";

export interface CardSearchedProps {
  card: YugiohCard;
  onClickAddCard: (card: YugiohCard, type: BuilderListType) => void;
}

export const CardSearched: FC<CardSearchedProps> = ({
  card,
  onClickAddCard,
}) => {
  const onClick = (type: BuilderListType) => onClickAddCard(card, type);

  return (
    <div className="flex flex-row gap-2 border border-gray-400 p-1">
      <img className="w-16" src={card.card_images[0].image_url_small} />
      <div className="flex flex-col shrink truncate w-full">
        <span className="truncate">{card.name}</span>
        <span className="truncate">{card.reference}</span>
        <span className="truncate">{card.type}</span>
        <span className="truncate">{card.archetype}</span>
      </div>
      <div className="flex flex-col whitespace-nowrap">
        <Button label="Add to deck" onClick={() => onClick("main")} />
        <Button label="Add to extra deck" onClick={() => onClick("extra")} />
        <Button label="Add to side deck" onClick={() => onClick("side")} />
        <Button label="Add to custom list" onClick={() => onClick("custom")} />
      </div>
    </div>
  );
};

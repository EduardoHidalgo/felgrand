import { FC } from "react";

import { ChipCardType } from "@/components/chipCardType";
import { CardType } from "@/types";

export interface StoreColumnCardTypeProps {
  cardType: CardType;
}

export const StoreColumnCardType: FC<StoreColumnCardTypeProps> = ({
  cardType,
}) => {
  return (
    <div className="flex w-full flex-row justify-center">
      <ChipCardType type={cardType} />
    </div>
  );
};

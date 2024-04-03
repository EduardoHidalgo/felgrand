import { FC } from "react";

import { SetRarityCode } from "@/types";
import { RarityColorful } from "@/components/rarityColorful";
import { rarityCodeToName } from "@/utils/rarityCodeToName";

export interface StoreColumnRarityProps {
  rarity: SetRarityCode;
}

export const StoreColumnRarity: FC<StoreColumnRarityProps> = ({ rarity }) => {
  return (
    <div className="flex w-full flex-row justify-center text-center">
      <RarityColorful rarity={rarityCodeToName(rarity)} />
    </div>
  );
};

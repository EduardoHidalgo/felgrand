import { FC } from "react";

import { SetRarity } from "@/types";
import classNames from "classnames";

export interface RarityColorfulProps {
  rarity: SetRarity | "Undefined" | "Empty";
}

export const RarityColorful: FC<RarityColorfulProps> = ({
  rarity,
}: RarityColorfulProps) => {
  const base = "bg-gradient-to-r bg-clip-text text-transparent";

  switch (rarity) {
    case SetRarity.Common:
      return <p className="text-gray-400">{rarity}</p>;
    case SetRarity.GoldRare:
    case SetRarity.GoldSecretRare:
    case SetRarity.PremiumGoldRare:
      return <p className="font-bold text-yellow-300">{rarity}</p>;
    case SetRarity.Rare:
      return <p className="font-bold text-gray-200">{rarity}</p>;
    case SetRarity.PrismaticSecretRare:
    case SetRarity.SecretRare:
      return (
        <p
          className={classNames(
            base,
            "animate-shiny from-blue-500 via-green-300 to-red-400 font-bold",
          )}
        >
          {rarity} ✨
        </p>
      );
    case SetRarity.SuperRare:
      return (
        <p className={classNames(base, "from-blue-100 to-green-200 font-bold")}>
          {rarity}
        </p>
      );
    case SetRarity.UltimateRare:
      return (
        <p
          className={classNames(
            base,
            "animate-pulse from-blue-200 to-white font-bold",
          )}
        >
          {rarity}
        </p>
      );
    case SetRarity.UltraRare:
      return (
        <p
          className={classNames(
            base,
            "from-blue-300 via-green-200 to-yellow-300 font-bold",
          )}
        >
          {rarity}
        </p>
      );
    default:
      return rarity;
  }
};

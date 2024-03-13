import { FC } from "react";

import { CardType } from "@/types";
import { Chip } from "../chip";

export interface ChipCardTypeProps {
  type: CardType;
}

export const ChipCardType: FC<ChipCardTypeProps> = ({ type }) => {
  switch (type) {
    case CardType.EffectMonster:
      return <Chip className="bg-effect text-black">{type}</Chip>;
    case CardType.FlipEffectMonster:
      return <Chip className="bg-effect text-black">{type}</Chip>;
    case CardType.PendulumFlipEffectMonster:
      return (
        <Chip className="bg-gradient-to-r from-spell to-effect text-black">
          {type}
        </Chip>
      );
    case CardType.FusionMonster:
      return <Chip className="bg-fusion text-white">{type}</Chip>;
    case CardType.GeminiMonster:
      return <Chip className="bg-effect text-black">{type}</Chip>;
    case CardType.LinkMonster:
      return <Chip className="bg-link text-white">{type}</Chip>;
    case CardType.NormalMonster:
      return <Chip className="bg-normal text-black">{type}</Chip>;
    case CardType.NormalTunerMonster:
      return <Chip className="bg-normal text-black">{type}</Chip>;
    case CardType.PendulumEffectFusionMonster:
      return (
        <Chip className="bg-gradient-to-r from-spell to-fusion text-white">
          {type}
        </Chip>
      );
    case CardType.PendulumEffectMonster:
      return (
        <Chip className="bg-gradient-to-r from-spell via-effect to-effect text-black">
          {type}
        </Chip>
      );
    case CardType.PendulumEffectRitualMonster:
      return (
        <Chip className="bg-gradient-to-r from-spell via-ritual to-ritual text-black">
          {type}
        </Chip>
      );
    case CardType.PendulumNormalMonster:
      return (
        <Chip className="bg-gradient-to-r from-spell to-normal text-black">
          {type}
        </Chip>
      );
    case CardType.PendulumTunerEffectMonster:
      return (
        <Chip className="bg-gradient-to-r from-spell via-effect to-effect text-black">
          {type}
        </Chip>
      );
    case CardType.RitualEffectMonster:
      return <Chip className="bg-ritual text-black">{type}</Chip>;
    case CardType.RitualMonster:
      return <Chip className="bg-ritual text-black">{type}</Chip>;
    case CardType.SkillCard:
      return <Chip className="">{type}</Chip>;
    case CardType.SpellCard:
      return <Chip className="bg-spell text-black">{type}</Chip>;
    case CardType.SpiritMonster:
      return <Chip className="bg-effect text-black">{type}</Chip>;
    case CardType.SynchroMonster:
      return <Chip className="bg-synchro text-black">{type}</Chip>;
    case CardType.SynchroPendulumEffectMonster:
      return (
        <Chip className="bg-gradient-to-r from-spell via-synchro to-synchro text-black">
          {type}
        </Chip>
      );
    case CardType.SynchroTunerMonster:
      return <Chip className="bg-synchro text-black">{type}</Chip>;
    case CardType.Token:
      return <Chip className="bg-token text-black">{type}</Chip>;
    case CardType.ToonMonster:
      return <Chip className="">{type}</Chip>;
    case CardType.TrapCard:
      return <Chip className="bg-trap text-white">{type}</Chip>;
    case CardType.TunerMonster:
      return <Chip className="bg-normal text-black">{type}</Chip>;
    case CardType.UnionEffectMonster:
      return <Chip className="bg-effect text-black">{type}</Chip>;
    case CardType.XYZPendulumEffectMonster:
      return (
        <Chip className="bg-gradient-to-r from-spell via-xyz to-xyz text-white">
          {type}
        </Chip>
      );
    case CardType.XYZMonster:
      return <Chip className="bg-xyz text-white">{type}</Chip>;
  }
};

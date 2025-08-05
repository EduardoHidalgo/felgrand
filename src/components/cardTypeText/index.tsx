"use client";
import { FC } from "react";
import classNames from "classnames";
import { CardType } from "@/types";

export interface CardTypeTextProps {
  type: CardType;
  className?: string;
  size?: "xs" | "sm" | "base" | "lg" | "xl";
}

export const CardTypeText: FC<CardTypeTextProps> = ({
  type,
  className = "",
  size = "base",
}) => {
  const getTypeColor = (cardType: CardType): string => {
    switch (cardType) {
      // Monster Cards - Orange/Yellow
      case CardType.NormalMonster:
      case CardType.NormalTunerMonster:
        return "text-yellow-600"; // Normal monsters - Yellow

      case CardType.EffectMonster:
      case CardType.FlipEffectMonster:
      case CardType.GeminiMonster:
      case CardType.SpiritMonster:
      case CardType.ToonMonster:
      case CardType.TunerMonster:
      case CardType.UnionEffectMonster:
        return "text-orange-600"; // Effect monsters - Orange

      case CardType.FusionMonster:
      case CardType.PendulumEffectFusionMonster:
        return "text-purple-600"; // Fusion monsters - Purple

      case CardType.SynchroMonster:
      case CardType.SynchroPendulumEffectMonster:
      case CardType.SynchroTunerMonster:
        return "text-white bg-gray-800 px-1 rounded"; // Synchro monsters - White text on dark background

      case CardType.XYZMonster:
      case CardType.XYZPendulumEffectMonster:
        return "text-black bg-yellow-300 px-1 rounded"; // XYZ monsters - Black text on yellow background

      case CardType.LinkMonster:
        return "text-blue-700"; // Link monsters - Dark blue

      case CardType.RitualMonster:
      case CardType.RitualEffectMonster:
      case CardType.PendulumEffectRitualMonster:
        return "text-blue-500"; // Ritual monsters - Blue

      case CardType.PendulumNormalMonster:
      case CardType.PendulumEffectMonster:
      case CardType.PendulumFlipEffectMonster:
      case CardType.PendulumTunerEffectMonster:
        return "text-green-600"; // Pendulum monsters - Green

      // Spell Cards - Green
      case CardType.SpellCard:
        return "text-green-700"; // Spell cards - Green

      // Trap Cards - Pink/Magenta
      case CardType.TrapCard:
        return "text-pink-600"; // Trap cards - Pink/Magenta

      // Skill Cards - Special
      case CardType.SkillCard:
        return "text-indigo-600"; // Skill cards - Indigo

      // Token - Gray
      case CardType.Token:
        return "text-gray-500"; // Token - Gray

      default:
        return "text-gray-600"; // Default color
    }
  };

  const getSizeClass = (size: string): string => {
    switch (size) {
      case "xs":
        return "text-xs";
      case "sm":
        return "text-sm";
      case "base":
        return "text-base";
      case "lg":
        return "text-lg";
      case "xl":
        return "text-xl";
      default:
        return "text-base";
    }
  };

  return (
    <span
      className={classNames(
        "font-medium",
        getTypeColor(type),
        getSizeClass(size),
        className,
      )}
    >
      {type}
    </span>
  );
};

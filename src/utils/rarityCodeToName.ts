import { SetRarity, SetRarityCode } from "@/types";

export function rarityCodeToName(
  rarityCode: SetRarityCode,
): SetRarity | "Undefined" | "Empty" {
  switch (rarityCode) {
    case SetRarityCode.C:
      return SetRarity.Common;
    case SetRarityCode.CR:
      return SetRarity.CollectorSRare;
    case SetRarityCode.Dnpr:
      return SetRarity.DuelTerminalNormalParallelRare;
    case SetRarityCode.Drpr:
      return SetRarity.DuelTerminalRareParallelRare;
    case SetRarityCode.Dspr:
      return SetRarity.DuelTerminalSuperParallelRare;
    case SetRarityCode.Dupr:
      return SetRarity.DuelTerminalUltraParallelRare;
    case SetRarityCode.Empty:
      return "Empty";
    case SetRarityCode.GScR:
      return SetRarity.GoldSecretRare;
    case SetRarityCode.Ggr:
      return SetRarity.GhostGoldRare;
    case SetRarityCode.Gr:
      return SetRarity.GhostRare;
    case SetRarityCode.Gur:
      return SetRarity.GoldRare;
    case SetRarityCode.Msr:
      return SetRarity.MosaicRare;
    case SetRarityCode.PG:
      return SetRarity.PremiumGoldRare;
    case SetRarityCode.PS:
      return SetRarity.PlatinumSecretRare;
    case SetRarityCode.PScR:
      return SetRarity.PrismaticSecretRare;
    case SetRarityCode.Pir:
      return SetRarity.PlatinumRare;
    case SetRarityCode.QCScR:
      return SetRarity.QuarterCenturySecretRare;
    case SetRarityCode.R:
      return SetRarity.Rare;
    case SetRarityCode.SP:
      return SetRarity.ShortPrint;
    case SetRarityCode.SSP:
      return SetRarity.SuperShortPrint;
    case SetRarityCode.ScR:
      return SetRarity.SecretRare;
    case SetRarityCode.Sfr:
      return SetRarity.StarfoilRare;
    case SetRarityCode.Shr:
      return SetRarity.ShatterfoilRare;
    case SetRarityCode.Spr:
      return SetRarity.SuperParallelRare;
    case SetRarityCode.Sr:
      return SetRarity.SuperRare;
    case SetRarityCode.StR:
      return SetRarity.StarlightRare;
    case SetRarityCode.The10000ScR:
      return SetRarity.The10000SecretRare;
    case SetRarityCode.UScR:
      return SetRarity.UltraSecretRare;
    case SetRarityCode.Upr:
      return SetRarity.UltraParallelRare;
    case SetRarityCode.Ur:
      return SetRarity.UltraRare;
    case SetRarityCode.UtR:
      return SetRarity.UltimateRare;
    default:
      return "Undefined";
  }
}

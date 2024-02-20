import { BuilderListType } from "@/components/builder";
import { StoredCard } from "@prisma/client";

export type InputType = string | number | readonly string[] | undefined;

export enum AsyncState {
  Error = "Error",
  Initial = "Initial",
  Loading = "Loading",
  Success = "Success",
}

export type AsyncHtmlScrap = {
  html: string | null;
  state: AsyncState;
};

export type AsyncInventoryList = {
  state: AsyncState;
  list: Array<Pick<StoredCard, "name">>;
};

export const defaultBuilderList = {
  custom: [],
  extra: [],
  main: [],
  side: [],
};

export type BuilderList = { [key in BuilderListType]: Array<BuilderListItem> };

export type BuilderListItem = {
  card: YugiohCard;
  id: string;
};

export interface YugiohDatabase {
  data: YugiohCard[];
}

export interface YugiohCard {
  archetype?: string;
  atk?: number;
  attribute?: Attribute;
  banlist_info?: BanlistInfo;
  card_images: CardImage[];
  card_prices: CardPrice[];
  card_sets?: CardSet[];
  def?: number;
  desc: string;
  frameType: FrameType;
  id: number;
  level?: number;
  linkmarkers?: Linkmarker[];
  linkval?: number;
  name: string;
  race: Race;
  scale?: number;
  type: CardType;
}

export enum Attribute {
  Dark = "DARK",
  Divine = "DIVINE",
  Earth = "EARTH",
  Fire = "FIRE",
  Light = "LIGHT",
  Water = "WATER",
  Wind = "WIND",
}

export interface BanlistInfo {
  ban_goat?: Ban;
  ban_tcg?: Ban;
  ban_ocg?: Ban;
}

export enum Ban {
  Banned = "Banned",
  Limited = "Limited",
  SemiLimited = "Semi-Limited",
  Unlimited = "Unlimited",
}

export interface CardImage {
  id: number;
  image_url: string;
  image_url_small: string;
  image_url_cropped: string;
}

export interface CardPrice {
  cardmarket_price: string;
  tcgplayer_price: string;
  ebay_price: string;
  amazon_price: string;
  coolstuffinc_price: string;
}

export interface CardSet {
  set_name: string;
  set_code: string;
  set_rarity: SetRarity;
  set_rarity_code: SetRarityCode;
  set_price: string;
}

export enum SetRarity {
  C = "c",
  CollectorSRare = "Collector's Rare",
  Common = "Common",
  DuelTerminalNormalParallelRare = "Duel Terminal Normal Parallel Rare",
  DuelTerminalNormalRareParallelRare = "Duel Terminal Normal Rare Parallel Rare",
  DuelTerminalRareParallelRare = "Duel Terminal Rare Parallel Rare",
  DuelTerminalSuperParallelRare = "Duel Terminal Super Parallel Rare",
  DuelTerminalUltraParallelRare = "Duel Terminal Ultra Parallel Rare",
  ExtraSecret = "Extra Secret",
  ExtraSecretRare = "Extra Secret Rare",
  GhostGoldRare = "Ghost/Gold Rare",
  GhostRare = "Ghost Rare",
  GoldRare = "Gold Rare",
  GoldSecretRare = "Gold Secret Rare",
  MosaicRare = "Mosaic Rare",
  NormalParallelRare = "Normal Parallel Rare",
  PlatinumRare = "Platinum Rare",
  PlatinumSecretRare = "Platinum Secret Rare",
  PremiumGoldRare = "Premium Gold Rare",
  PrismaticSecretRare = "Prismatic Secret Rare",
  QCScR = "QCScR",
  QuarterCenturySecretRare = "Quarter Century Secret Rare",
  Rare = "Rare",
  SecretRare = "Secret Rare",
  ShatterfoilRare = "Shatterfoil Rare",
  ShortPrint = "Short Print",
  Starfoil = "Starfoil",
  StarfoilRare = "Starfoil Rare",
  StarlightRare = "Starlight Rare",
  Super = "Super",
  SuperParallelRare = "Super Parallel Rare",
  SuperRare = "Super Rare",
  SuperShortPrint = "Super Short Print",
  The10000SecretRare = "10000 Secret Rare",
  UltimateRare = "Ultimate Rare",
  UltraParallelRare = "Ultra Parallel Rare",
  UltraRare = "Ultra Rare",
  UltraRarePharaohSRare = "Ultra Rare (Pharaoh's Rare)",
  UltraSecretRare = "Ultra Secret Rare",
}

export enum SetRarityCode {
  C = "(C)",
  CR = "(CR)",
  Dnpr = "(DNPR)",
  Drpr = "(DRPR)",
  Dspr = "(DSPR)",
  Dupr = "(DUPR)",
  Empty = "",
  GScR = "(GScR)",
  Ggr = "(GGR)",
  Gr = "(GR)",
  Gur = "(GUR)",
  Msr = "(MSR)",
  PG = "(PG)",
  PS = "(PS)",
  PScR = "(PScR)",
  Pir = "(PIR)",
  R = "(R)",
  SP = "(SP)",
  SSP = "(SSP)",
  ScR = "(ScR)",
  Sfr = "(SFR)",
  Shr = "(SHR)",
  Spr = "(SPR)",
  Sr = "(SR)",
  StR = "(StR)",
  The10000ScR = "(10000ScR)",
  UScR = "(UScR)",
  Upr = "(UPR)",
  Ur = "(UR)",
  UtR = "(UtR)",
}

export enum FrameType {
  Effect = "effect",
  EffectPendulum = "effect_pendulum",
  Fusion = "fusion",
  FusionPendulum = "fusion_pendulum",
  Link = "link",
  Normal = "normal",
  NormalPendulum = "normal_pendulum",
  Ritual = "ritual",
  RitualPendulum = "ritual_pendulum",
  Skill = "skill",
  Spell = "spell",
  Synchro = "synchro",
  SynchroPendulum = "synchro_pendulum",
  Token = "token",
  Trap = "trap",
  Xyz = "xyz",
  XyzPendulum = "xyz_pendulum",
}

export enum Linkmarker {
  Bottom = "Bottom",
  BottomLeft = "Bottom-Left",
  BottomRight = "Bottom-Right",
  Left = "Left",
  Right = "Right",
  Top = "Top",
  TopLeft = "Top-Left",
  TopRight = "Top-Right",
}

export enum Race {
  AbidosTheTh = "Abidos the Th",
  AdrianGecko = "Adrian Gecko",
  AlexisRhodes = "Alexis Rhodes",
  Amnael = "Amnael",
  Andrew = "Andrew",
  Aqua = "Aqua",
  Arkana = "Arkana",
  AsterPhoenix = "Aster Phoenix",
  AxelBrodie = "Axel Brodie",
  BastionMisaw = "Bastion Misaw",
  Beast = "Beast",
  BeastWarrior = "Beast-Warrior",
  Bonz = "Bonz",
  Camula = "Camula",
  ChazzPrincet = "Chazz Princet",
  Christine = "Christine",
  ChumleyHuffi = "Chumley Huffi",
  Continuous = "Continuous",
  Counter = "Counter",
  CreatorGod = "Creator-God",
  Cyberse = "Cyberse",
  DRVellianC = "Dr. Vellian C",
  David = "David",
  Dinosaur = "Dinosaur",
  DivineBeast = "Divine-Beast",
  DonZaloog = "Don Zaloog",
  Dragon = "Dragon",
  Emma = "Emma",
  Empty = "",
  Equip = "Equip",
  EspaRoba = "Espa Roba",
  Fairy = "Fairy",
  Field = "Field",
  Fiend = "Fiend",
  Fish = "Fish",
  Illusion = "Illusion",
  Insect = "Insect",
  Ishizu = "Ishizu",
  IshizuIshtar = "Ishizu Ishtar",
  JadenYuki = "Jaden Yuki",
  JesseAnderso = "Jesse Anderso",
  Joey = "Joey",
  JoeyWheeler = "Joey Wheeler",
  Kagemaru = "Kagemaru",
  Kaiba = "Kaiba",
  Keith = "Keith",
  LumisAndUMB = "Lumis and Umb",
  LumisUmbra = "Lumis Umbra",
  Machine = "Machine",
  Mai = "Mai",
  MaiValentine = "Mai Valentine",
  Mako = "Mako",
  Nightshroud = "Nightshroud",
  Normal = "Normal",
  Odion = "Odion",
  ParadoxBroth = "Paradox Broth",
  Pegasus = "Pegasus",
  Plant = "Plant",
  Psychic = "Psychic",
  Pyro = "Pyro",
  QuickPlay = "Quick-Play",
  Reptile = "Reptile",
  Rex = "Rex",
  Ritual = "Ritual",
  Rock = "Rock",
  SeaSerpent = "Sea Serpent",
  SetoKaiba = "Seto Kaiba",
  Spellcaster = "Spellcaster",
  SyrusTruesda = "Syrus Truesda",
  Tania = "Tania",
  TeaGardner = "Tea Gardner",
  TheSupremeK = "The Supreme K",
  TheloniousVi = "Thelonious Vi",
  Thunder = "Thunder",
  Titan = "Titan",
  TyrannoHassl = "Tyranno Hassl",
  Warrior = "Warrior",
  Weevil = "Weevil",
  WingedBeast = "Winged Beast",
  Wyrm = "Wyrm",
  YamiBakura = "Yami Bakura",
  YamiMarik = "Yami Marik",
  YamiYugi = "Yami Yugi",
  Yubel = "Yubel",
  Yugi = "Yugi",
  ZaneTruesdal = "Zane Truesdal",
  Zombie = "Zombie",
}

export enum CardType {
  EffectMonster = "Effect Monster",
  FlipEffectMonster = "Flip Effect Monster",
  FusionMonster = "Fusion Monster",
  GeminiMonster = "Gemini Monster",
  LinkMonster = "Link Monster",
  NormalMonster = "Normal Monster",
  NormalTunerMonster = "Normal Tuner Monster",
  PendulumEffectFusionMonster = "Pendulum Effect Fusion Monster",
  PendulumEffectMonster = "Pendulum Effect Monster",
  PendulumEffectRitualMonster = "Pendulum Effect Ritual Monster",
  PendulumFlipEffectMonster = "Pendulum Flip Effect Monster",
  PendulumNormalMonster = "Pendulum Normal Monster",
  PendulumTunerEffectMonster = "Pendulum Tuner Effect Monster",
  RitualEffectMonster = "Ritual Effect Monster",
  RitualMonster = "Ritual Monster",
  SkillCard = "Skill Card",
  SpellCard = "Spell Card",
  SpiritMonster = "Spirit Monster",
  SynchroMonster = "Synchro Monster",
  SynchroPendulumEffectMonster = "Synchro Pendulum Effect Monster",
  SynchroTunerMonster = "Synchro Tuner Monster",
  Token = "Token",
  ToonMonster = "Toon Monster",
  TrapCard = "Trap Card",
  TunerMonster = "Tuner Monster",
  UnionEffectMonster = "Union Effect Monster",
  XYZMonster = "XYZ Monster",
  XYZPendulumEffectMonster = "XYZ Pendulum Effect Monster",
}

export enum CardLanguage {
  English = "EN",
  French = "FR",
  German = "DE",
  Italian = "IT",
  Japanese = "JP",
  Portuguese = "PT",
  Spanish = "SP",
}

export enum StoreStatus {
  Bought = "Bought",
  Default = "Default",
  Delivered = "Delivered",
  PendingDelivery = "PendingDelivery",
  Stored = "Stored",
  Wanted = "Wanted",
}

export enum Importance {
  Staple = 1,
  ArchetypeCore = 2,
  VeryHighValue = 3,
  HighValue = 4,
  MediumValue = 5,
  LowValue = 6,
  Unused = 7,
  Trash = 8,
  Unwanted = 9,
  NotDefined = 9999,
}

export enum Priority {
  Urgent = 1,
  VeryHigh = 2,
  High = 3,
  Medium = 4,
  Low = 5,
  Unwanted = 6,
  Ignore = 7,
  Pending = 8,
  TooExpensive = 99,
  NotReleasedYet = 999,
  NotDefined = 9999,
}

export enum Condition {
  NearMint = 1,
  LightlyPlayed = 2,
  ModeratelyPlayed = 3,
  HeavilyPlayer = 4,
  Damaged = 5,
}

export interface AddNewStoredCard
  extends Pick<YugiohCard, "archetype" | "name" | "race"> {
  cardType: CardType;
}

export interface GetStoredCardInventory {
  inventory: Array<Pick<StoredCard, "name">>;
}

export interface StoredCardData {
  archetype: string | null;
  avgValue: number;
  banType: keyof typeof Ban;
  cardType: keyof typeof CardType;
  countSum: number;
  id: number;
  importance: Importance;
  name: string;
  priority: Priority;
  race: keyof typeof Race;
  wantedCountSum: number;
}

export interface StoredCardItemData {
  boughtValue: number;
  storedCardId: number;
  condition: Condition;
  count: number;
  id: number;
  language: CardLanguage;
  rarityCode: SetRarityCode;
  setCode: string;
  setName: string;
  status: StoreStatus;
  storageGroup: string;
  value: number;
  wantedCount: number;
}

export type StoredCardItem = StoredCardData & {
  items: Array<StoredCardItemData>;
};

export type StoredCardList = Array<StoredCardItem>;

export interface NewStoredCardItem
  extends Pick<
    StoredCardItemData,
    | "boughtValue"
    | "condition"
    | "count"
    | "language"
    | "status"
    | "storageGroup"
    | "value"
    | "wantedCount"
  > {
  setIndex: number | null;
}

export interface UpdateRowStoredCardItem
  extends Pick<
    StoredCardItemData,
    | "boughtValue"
    | "condition"
    | "count"
    | "id"
    | "language"
    | "status"
    | "storageGroup"
    | "value"
    | "wantedCount"
  > {
  setIndex: number | null;
}

export interface NewStoredCardItemBody
  extends Omit<NewStoredCardItem, "setIndex"> {
  rarityCode: SetRarityCode | null;
  setCode: string | null;
  setName: string | null;
  storedCardId: number;
}

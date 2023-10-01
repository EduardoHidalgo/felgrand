import { FrameType, YugiohCard } from "@/types";

export class BuilderSorting {
  public static sortMainDeck(list: Array<YugiohCard>) {
    const monsters = this.sortMonsters(list);
    const spellsTraps = this.sortSpellsTraps(list);
    const others = this.sortOthers(list);

    return [...monsters, ...spellsTraps, ...others];
  }

  public static sortExtraDeck(list: Array<YugiohCard>) {
    return this.SortExtraTypes(list);
  }

  public static sortSideDeck(list: Array<YugiohCard>) {
    const monsters = this.sortMonsters(list);
    const spellsTraps = this.sortSpellsTraps(list);
    const extras = this.SortExtraTypes(list);

    return [...extras, ...monsters, ...spellsTraps];
  }

  public static sortCustomList(list: Array<YugiohCard>) {
    const extras = this.SortExtraTypes(list);
    const monsters = this.sortMonsters(list);
    const spellsTraps = this.sortSpellsTraps(list);
    const others = this.sortOthers(list);

    return [...extras, ...monsters, ...spellsTraps, ...others];
  }

  private static sortMonsters(list: Array<YugiohCard>) {
    const effects = this.fieldSorter(
      list.filter((c) => c.frameType == FrameType.Effect)
    );
    const normals = this.fieldSorter(
      list.filter((c) => c.frameType == FrameType.Normal)
    );
    const pendulums = this.fieldSorter(
      list.filter((c) => c.frameType == FrameType.EffectPendulum)
    );
    const ritualPendulums = this.fieldSorter(
      list.filter((c) => c.frameType == FrameType.RitualPendulum)
    );
    const normalPendulums = this.fieldSorter(
      list.filter((c) => c.frameType == FrameType.NormalPendulum)
    );

    return [
      ...effects,
      ...normals,
      ...pendulums,
      ...ritualPendulums,
      ...normalPendulums,
    ];
  }

  private static sortSpellsTraps(list: Array<YugiohCard>) {
    const spells = this.fieldSorter(
      list.filter((c) => c.frameType == FrameType.Spell)
    );
    const traps = this.fieldSorter(
      list.filter((c) => c.frameType == FrameType.Trap)
    );

    return [...spells, ...traps];
  }

  private static SortExtraTypes(list: Array<YugiohCard>) {
    const fusionPendulums = this.fieldSorter(
      list.filter((c) => c.frameType == FrameType.FusionPendulum)
    );
    const fusions = this.fieldSorter(
      list.filter((c) => c.frameType == FrameType.Fusion)
    );
    const synchroPendulums = this.fieldSorter(
      list.filter((c) => c.frameType == FrameType.SynchroPendulum)
    );
    const synchros = this.fieldSorter(
      list.filter((c) => c.frameType == FrameType.Synchro)
    );
    const xyzPendulums = this.fieldSorter(
      list.filter((c) => c.frameType == FrameType.XyzPendulum)
    );
    const xyzs = this.fieldSorter(
      list.filter((c) => c.frameType == FrameType.Xyz)
    );
    const links = this.fieldSorter(
      list.filter((c) => c.frameType == FrameType.Link)
    );

    return [
      ...fusionPendulums,
      ...fusions,
      ...synchroPendulums,
      ...synchros,
      ...xyzPendulums,
      ...xyzs,
      ...links,
    ];
  }

  private static sortOthers(list: Array<YugiohCard>) {
    const tokens = list.filter((c) => c.frameType == FrameType.Token);
    const skills = list.filter((c) => c.frameType == FrameType.Skill);

    return [...tokens, ...skills];
  }

  private static fieldSorter(list: Array<YugiohCard>) {
    return list.sort(
      (a, b) =>
        this.compareByLevel(a, b) ||
        this.compareByAttack(a, b) ||
        this.compareByName(a, b)
    );
  }

  private static compareByLevel(a: YugiohCard, b: YugiohCard) {
    if (a.level == undefined || b.level == undefined) return 0;
    if (a.level > b.level) return -1;
    if (a.level < b.level) return 1;
    return 0;
  }

  private static compareByName(a: YugiohCard, b: YugiohCard) {
    return a.name.localeCompare(b.name);
  }

  private static compareByAttack(a: YugiohCard, b: YugiohCard) {
    if (a.atk == undefined || b.atk == undefined) return 0;
    if (a.atk > b.atk) return -1;
    if (a.atk < b.atk) return 1;
    return 0;
  }
}

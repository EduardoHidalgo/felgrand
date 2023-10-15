import { FrameType, BuilderListItem, BuilderList } from "@/types";
import { BuilderListType } from "@/components/builder";

export class BuilderSorting {
  public static sortList(
    list: BuilderList,
    type: BuilderListType
  ): BuilderList {
    let sortedList: Array<BuilderListItem> = [];
    switch (type) {
      case "custom":
        sortedList = this.sortCustomList(list[type]);
        break;
      case "extra":
        sortedList = this.sortExtraDeck(list[type]);
        break;
      case "main":
        sortedList = this.sortMainDeck(list[type]);
        break;
      case "side":
        sortedList = this.sortSideDeck(list[type]);
        break;
    }

    return { ...list, [type]: [...sortedList] };
  }

  private static sortMainDeck(list: Array<BuilderListItem>) {
    const monsters = this.sortMonsters(list);
    const spellsTraps = this.sortSpellsTraps(list);
    const others = this.sortOthers(list);

    return [...monsters, ...spellsTraps, ...others];
  }

  private static sortExtraDeck(list: Array<BuilderListItem>) {
    return this.SortExtraTypes(list);
  }

  private static sortSideDeck(list: Array<BuilderListItem>) {
    const monsters = this.sortMonsters(list);
    const spellsTraps = this.sortSpellsTraps(list);
    const extras = this.SortExtraTypes(list);

    return [...extras, ...monsters, ...spellsTraps];
  }

  private static sortCustomList(list: Array<BuilderListItem>) {
    const extras = this.SortExtraTypes(list);
    const monsters = this.sortMonsters(list);
    const spellsTraps = this.sortSpellsTraps(list);
    const others = this.sortOthers(list);

    return [...extras, ...monsters, ...spellsTraps, ...others];
  }

  private static sortMonsters(list: Array<BuilderListItem>) {
    const effects = this.fieldSorter(
      list.filter((el) => el.card.frameType == FrameType.Effect)
    );
    const normals = this.fieldSorter(
      list.filter((el) => el.card.frameType == FrameType.Normal)
    );
    const pendulums = this.fieldSorter(
      list.filter((el) => el.card.frameType == FrameType.EffectPendulum)
    );
    const ritualPendulums = this.fieldSorter(
      list.filter((el) => el.card.frameType == FrameType.RitualPendulum)
    );
    const normalPendulums = this.fieldSorter(
      list.filter((el) => el.card.frameType == FrameType.NormalPendulum)
    );

    return [
      ...effects,
      ...normals,
      ...pendulums,
      ...ritualPendulums,
      ...normalPendulums,
    ];
  }

  private static sortSpellsTraps(list: Array<BuilderListItem>) {
    const spells = this.fieldSorter(
      list.filter(({ card }) => card.frameType == FrameType.Spell)
    );
    const traps = this.fieldSorter(
      list.filter(({ card }) => card.frameType == FrameType.Trap)
    );

    return [...spells, ...traps];
  }

  private static SortExtraTypes(list: Array<BuilderListItem>) {
    const fusionPendulums = this.fieldSorter(
      list.filter(({ card }) => card.frameType == FrameType.FusionPendulum)
    );
    const fusions = this.fieldSorter(
      list.filter(({ card }) => card.frameType == FrameType.Fusion)
    );
    const synchroPendulums = this.fieldSorter(
      list.filter(({ card }) => card.frameType == FrameType.SynchroPendulum)
    );
    const synchros = this.fieldSorter(
      list.filter(({ card }) => card.frameType == FrameType.Synchro)
    );
    const xyzPendulums = this.fieldSorter(
      list.filter(({ card }) => card.frameType == FrameType.XyzPendulum)
    );
    const xyzs = this.fieldSorter(
      list.filter(({ card }) => card.frameType == FrameType.Xyz)
    );
    const links = this.fieldSorter(
      list.filter(({ card }) => card.frameType == FrameType.Link)
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

  private static sortOthers(list: Array<BuilderListItem>) {
    const tokens = list.filter(({ card }) => card.frameType == FrameType.Token);
    const skills = list.filter(({ card }) => card.frameType == FrameType.Skill);

    return [...tokens, ...skills];
  }

  private static fieldSorter(list: Array<BuilderListItem>) {
    return list.sort(
      (a, b) =>
        this.compareByLevel(a, b) ||
        this.compareByAttack(a, b) ||
        this.compareByName(a, b)
    );
  }

  private static compareByLevel(a: BuilderListItem, b: BuilderListItem) {
    if (a.card.level == undefined || b.card.level == undefined) return 0;
    if (a.card.level > b.card.level) return -1;
    if (a.card.level < b.card.level) return 1;
    return 0;
  }

  private static compareByName(a: BuilderListItem, b: BuilderListItem) {
    return a.card.name.localeCompare(b.card.name);
  }

  private static compareByAttack(a: BuilderListItem, b: BuilderListItem) {
    if (a.card.atk == undefined || b.card.atk == undefined) return 0;
    if (a.card.atk > b.card.atk) return -1;
    if (a.card.atk < b.card.atk) return 1;
    return 0;
  }
}

export type BuilderListType = "extra" | "side" | "main" | "custom";

export type BuilderSearchFilter = "arquetype" | "id" | "name" | "race" | "type";

export interface SearchArgs {
  filters: {
    byArquetype: boolean;
    byId: boolean;
    byName: boolean;
    byRace: boolean;
    byType: boolean;
  };
  sort: "ASC" | "DESC" | null;
}

export const searchArgsDefault: SearchArgs = {
  filters: {
    byArquetype: false,
    byId: false,
    byName: true,
    byRace: false,
    byType: false,
  },
  sort: null,
};

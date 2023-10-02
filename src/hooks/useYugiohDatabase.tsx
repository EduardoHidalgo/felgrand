import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { YugiohCard, YugiohDatabase } from "@/types";
import data from "../../public/database.json";

export interface UseYugiohDatabaseProps {
  filters: {
    byArquetype: boolean;
    byId: boolean;
    byName: boolean;
    byRace: boolean;
    byType: boolean;
  };
  sort: "ASC" | "DESC" | null;
}

export function useYugiohDatabase({ filters, sort }: UseYugiohDatabaseProps) {
  const LIST_LIMIT = 100;
  const SEARCHABLE_LENGTH = 3;
  const database: YugiohDatabase = data as unknown as YugiohDatabase;

  const [searchResult, setSearchResult] = useState<Array<YugiohCard>>([]);

  const searchYugiohCards = async (searchValue: string) => {
    if (searchValue === "" || searchValue.length < SEARCHABLE_LENGTH) {
      return setSearchResult([]);
    }

    let count = 0;
    let search = searchValue.toLowerCase();
    const founds = database.data.filter((card) => {
      if (count >= LIST_LIMIT) return false;

      if (
        filters.byArquetype &&
        card.archetype &&
        ifIncludes(card.archetype, search)
      ) {
        count++;
        return true;
      }
      if (filters.byId && ifIncludes(card.id, search)) {
        count++;
        return true;
      }
      if (filters.byName && ifIncludes(card.name, search)) {
        count++;
        return true;
      }
      if (filters.byRace && ifIncludes(card.race, search)) {
        count++;
        return true;
      }
      if (filters.byType && ifIncludes(card.type, search)) {
        count++;
        return true;
      }

      return false;
    });

    setSearchResult(
      founds.map((c) => {
        const uuid = uuidv4();
        return { ...c, uuid, id: uuid, reference: Number(c.id) };
      })
    );
  };

  const ifIncludes = (field: string | number, search: string) => {
    return String(field).toLowerCase().includes(search);
  };

  return { searchResult, searchYugiohCards };
}

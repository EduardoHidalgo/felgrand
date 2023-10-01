import { FC } from "react";

import { Checkbox } from "@/components/checkbox";
import { SearchBar } from "@/components/searchbar";
import { BuilderSearchFilter, SearchArgs } from "../types";

export interface BuilderFinderProps {
  filteredSearch: (search: string) => void;
  onCheckedSearchFilter: (value: boolean, filter: BuilderSearchFilter) => void;
  searchArgs: SearchArgs;
}

export const BuilderFinder: FC<BuilderFinderProps> = ({
  filteredSearch,
  onCheckedSearchFilter,
  searchArgs,
}) => {
  return (
    <div className="grid grid-cols-8 w-full">
      <div className="col-span-2">
        <SearchBar fetchData={filteredSearch} />
      </div>
      <div className="flex flex-col">
        <span>Filter by:</span>
        <div>
          <Checkbox
            checked={searchArgs.filters.byName}
            label="Name"
            name="name"
            onClick={(value) => onCheckedSearchFilter(value, "name")}
          />
          <Checkbox
            checked={searchArgs.filters.byArquetype}
            label="Arquetype"
            name="arquetype"
            onClick={(value) => onCheckedSearchFilter(value, "arquetype")}
          />
          <Checkbox
            checked={searchArgs.filters.byRace}
            label="Race"
            name="race"
            onClick={(value) => onCheckedSearchFilter(value, "race")}
          />
          <Checkbox
            checked={searchArgs.filters.byType}
            label="Type"
            name="type"
            onClick={(value) => onCheckedSearchFilter(value, "type")}
          />
          <Checkbox
            checked={searchArgs.filters.byId}
            label="Id"
            name="id"
            onClick={(value) => onCheckedSearchFilter(value, "id")}
          />
        </div>
      </div>
    </div>
  );
};

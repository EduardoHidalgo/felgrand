import { FC } from "react";

import { BuilderFinder, BuilderList, CardSearched } from "@/components/builder";
import { UseBuilderReturn } from "./useBuilder";

export interface BuilderRender extends UseBuilderReturn {}

export const BuilderRender: FC<BuilderRender> = ({
  activeId,
  filteredSearch,
  lists,
  onCheckedSearchFilter,
  onClickAddCard,
  onClickClearList,
  onClickSortList,
  searchArgs,
  searchResult,
}) => {
  const { customList, mainList, extraList, sideList } = lists;

  return (
    <>
      <div className="flex flex-col w-[960px] min-w-[960px] h-[100vh] overflow-y-scroll">
        <BuilderFinder
          filteredSearch={filteredSearch}
          onCheckedSearchFilter={onCheckedSearchFilter}
          searchArgs={searchArgs}
        />
        <div className="flex flex-col">
          <BuilderList
            activeId={activeId}
            className="grid-rows-4 h-[384px]"
            type="main"
            list={mainList}
            onClickSortList={onClickSortList}
            onClickClearList={onClickClearList}
            title="Deck"
          />
          <BuilderList
            activeId={activeId}
            className="grid-rows-1 h-[96px]"
            type="extra"
            list={extraList}
            onClickSortList={onClickSortList}
            onClickClearList={onClickClearList}
            title="Extra Deck"
          />
          <BuilderList
            activeId={activeId}
            className="grid-rows-1 h-[96px]"
            type="side"
            list={sideList}
            onClickSortList={onClickSortList}
            onClickClearList={onClickClearList}
            title="Side Deck"
          />
          <BuilderList
            activeId={activeId}
            className="grid-rows-6 h-[576px]"
            type="custom"
            list={customList}
            onClickSortList={onClickSortList}
            onClickClearList={onClickClearList}
            title="Custom List"
          />
        </div>
      </div>
      <div className="flex flex-col w-full h-[100vh] min-w-[500px] overflow-y-scroll gap-1 p-2">
        {searchResult.map((card) => (
          <CardSearched
            key={card.uuid}
            card={card}
            onClickAddCard={onClickAddCard}
          />
        ))}
      </div>
    </>
  );
};

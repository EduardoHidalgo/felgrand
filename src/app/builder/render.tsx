import { FC } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  closestCorners,
  rectIntersection,
} from "@dnd-kit/core";

import { UseBuilderReturn } from "./useBuilder";
import {
  BuilderCardPreview,
  BuilderFinder,
  BuilderContainerList,
  CardSearched,
} from "@/components/builder";

export interface BuilderRender extends UseBuilderReturn {}

export const BuilderRender: FC<BuilderRender> = ({
  filteredSearch,
  list,
  onCheckedSearchFilter,
  onClickAddCard,
  searchArgs,
  searchResult,
  activeDragId,
  dragHandlers,
  onClickClearList,
  onClickRemoveCard,
  onClickSortList,
  selectedItem,
}) => {
  const builderListProps = {
    list,
    activeDragId,
    onClickClearList,
    onClickRemoveCard,
    onClickSortList,
    selectedItem,
  };

  return (
    <>
      {/* width calculation: each card has 64px, and the BuilderContainerList 
      can have 15 card per row. 64x15 = 960. The remaining size to complete 
      987px was added manually to prevent cards overlaping each other. */}
      <div className="flex h-[100vh] w-[987px] min-w-[987px] flex-col overflow-y-scroll">
        <BuilderFinder
          filteredSearch={filteredSearch}
          onCheckedSearchFilter={onCheckedSearchFilter}
          searchArgs={searchArgs}
        />
        <div className="flex flex-col">
          <DndContext collisionDetection={rectIntersection} {...dragHandlers}>
            <BuilderContainerList
              {...builderListProps}
              className="h-[384px] grid-rows-4"
              title="Deck"
              type="main"
            />
            <BuilderContainerList
              {...builderListProps}
              className="h-[96px] grid-rows-1"
              title="Extra Deck"
              type="extra"
            />
            <BuilderContainerList
              {...builderListProps}
              className="h-[96px] grid-rows-1"
              title="Side Deck"
              type="side"
            />
            <BuilderContainerList
              {...builderListProps}
              className="h-[576px] grid-rows-6"
              title="Custom List"
              type="custom"
            />
            <DragOverlay>
              {activeDragId && selectedItem ? (
                <BuilderCardPreview
                  activeDragId={activeDragId}
                  item={selectedItem}
                  selectedItem={selectedItem}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
      <div className="flex h-[100vh] w-full min-w-[500px] flex-col gap-1 overflow-y-scroll p-2">
        {searchResult.map((card) => (
          <CardSearched
            key={card.id}
            card={card}
            onClickAddCard={onClickAddCard}
          />
        ))}
      </div>
    </>
  );
};

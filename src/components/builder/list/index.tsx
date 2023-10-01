import { FC } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import classNames from "classnames";

import { YugiohCard } from "@/types";
import { Button } from "@/components/button";
import { BuilderCardPreview } from "../cardPreview";
import { BuilderListType } from "..";

export interface BuilderListProps {
  activeId: string | number | null;
  className: string;
  type: BuilderListType;
  list: Array<YugiohCard>;
  onClickSortList: (type: BuilderListType) => void;
  onClickClearList: (type: BuilderListType) => void;
  title: string;
}

export const BuilderList: FC<BuilderListProps> = ({
  activeId,
  className,
  type,
  list,
  onClickSortList,
  onClickClearList,
  title,
}) => {
  return (
    <div className="m-1">
      <div className="flex flex-row justify-between mb-1">
        <h2>{title}</h2>
        <div className="flex flex-row gap-2">
          <Button label="sort" onClick={() => onClickSortList(type)} />
          <Button label="clear" onClick={() => onClickClearList(type)} />
        </div>
      </div>
      <div
        className={classNames(
          "grid grid-cols-15 border border-black",
          className
        )}
      >
        <SortableContext id={type} items={list} strategy={rectSortingStrategy}>
          {list.map((card) => (
            <BuilderCardPreview
              key={card.uuid}
              card={card}
              activeId={activeId}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

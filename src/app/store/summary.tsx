import { StoredCardCombined } from "@/types";
import { FC } from "react";

export interface StoreSummaryProps {
  cards: Array<StoredCardCombined>;
}

export const StoreSummary: FC<StoreSummaryProps> = ({ cards }) => {
  const totalCount = cards.reduce((sum, { count }) => (sum += count), 0);
  const totalWantedCount = cards.reduce(
    (sum, { wantedCount }) => (sum += wantedCount),
    0,
  );
  const totalValue = cards.reduce(
    (sum, { value, count }) => (sum += value * count),
    0,
  );
  const totalBoughtValue = cards.reduce(
    (sum, { boughtValue, wantedCount }) => (sum += boughtValue * wantedCount),
    0,
  );

  return (
    <>
      <div className="">
        total count:{" "}
        <span className="font-bold text-green-500">{totalCount}</span>
      </div>
      <div>
        total value:{" "}
        <span className="font-bold text-green-500">
          {totalValue.toFixed(2).toString()}
        </span>
      </div>
      <div>
        total wanted count:{" "}
        <span className="font-bold text-green-500">{totalWantedCount}</span>
      </div>
      <div>
        total bought value:{" "}
        <span className="font-bold text-green-500">
          {totalBoughtValue.toFixed(2).toString()}
        </span>
      </div>
    </>
  );
};

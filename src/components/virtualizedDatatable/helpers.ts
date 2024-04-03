import { FilterFn, Row, SortingFn, sortingFns } from "@tanstack/react-table";
import {
  compareItems,
  RankingInfo,
  rankItem,
} from "@tanstack/match-sorter-utils";

export const fuzzyFilter: FilterFn<any> = (
  row,
  columnId,
  value,
  addMeta,
): boolean => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export const fuzzySort: SortingFn<any> = <T extends { itemRank: RankingInfo }>(
  rowA: Row<T>,
  rowB: Row<T>,
  columnId: string,
): number => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    const a = rowA.columnFiltersMeta[columnId] as T;
    const b = rowB.columnFiltersMeta[columnId] as T;
    dir = compareItems(a?.itemRank!, b?.itemRank!);
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

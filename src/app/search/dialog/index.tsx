import { FC } from "react";

import { StoredCardTable } from "@/components/storedCardTable";
import { SearchDialogAddForm } from "./addForm";
import {
  AsyncState,
  CTPrice,
  GetPriceArgs,
  NewStoredCardItem,
  StoredCardItem,
  UpdateRowStoredCardItem,
  UpdateStoredCard,
  YugiohCard,
} from "@/types";

export interface SearchDialogProps {
  addNewStoredCardItem: (item: NewStoredCardItem) => Promise<void>;
  cleanPrice: () => Promise<void>;
  deleteStoredCardItem: (itemId: number) => Promise<void>;
  getPrices: (args: GetPriceArgs) => Promise<void>;
  prices: CTPrice | null;
  pricesState: AsyncState;
  storedCard: StoredCardItem | null;
  storedCardState: AsyncState;
  submitState: AsyncState;
  updateStoredCard: (item: UpdateStoredCard) => Promise<void>;
  updateStoredCardItem: (item: UpdateRowStoredCardItem) => Promise<void>;
  yugiohCard: YugiohCard | null;
}

export const SearchDialog: FC<SearchDialogProps> = ({
  addNewStoredCardItem,
  cleanPrice,
  deleteStoredCardItem,
  getPrices,
  prices,
  pricesState,
  storedCard,
  storedCardState,
  submitState,
  updateStoredCard,
  updateStoredCardItem,
  yugiohCard,
}) => {
  return (
    <div className="flex h-auto w-[90vw] flex-col gap-6 p-2">
      {yugiohCard && (
        <SearchDialogAddForm
          addNewStoredCardItem={addNewStoredCardItem}
          cleanPrice={cleanPrice}
          getPrices={getPrices}
          isSubmitting={submitState == AsyncState.Loading}
          prices={prices}
          pricesState={pricesState}
          yugiohCard={yugiohCard}
        />
      )}
      <StoredCardTable
        cards={storedCard ? [storedCard] : []}
        deleteStoredCardItem={deleteStoredCardItem}
        state={storedCardState}
        updateStoredCard={updateStoredCard}
        updateStoredCardItem={updateStoredCardItem}
        yugiohCard={yugiohCard}
      />
    </div>
  );
};

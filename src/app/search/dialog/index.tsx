import { FC } from "react";

import { StoredCardTable } from "@/components/storedCardTable";
import { SearchDialogAddForm } from "./addForm";
import {
  AsyncState,
  NewStoredCardItem,
  StoredCardItem,
  YugiohCard,
} from "@/types";

export interface SearchDialogProps {
  addNewStoredCardItem: (item: NewStoredCardItem) => Promise<void>;
  deleteStoredCardItem: (itemId: number) => Promise<void>;
  storedCard: StoredCardItem | null;
  storedCardState: AsyncState;
  submitState: AsyncState;
  yugiohCard: YugiohCard | null;
}

export const SearchDialog: FC<SearchDialogProps> = ({
  addNewStoredCardItem,
  deleteStoredCardItem,
  storedCard,
  storedCardState,
  submitState,
  yugiohCard,
}) => {
  return (
    <div className="flex h-auto w-[90vw] flex-col gap-6 p-2">
      {yugiohCard && (
        <SearchDialogAddForm
          addNewStoredCardItem={addNewStoredCardItem}
          isSubmitting={submitState == AsyncState.Loading}
          yugiohCard={yugiohCard}
        />
      )}
      <StoredCardTable
        cards={storedCard ? [storedCard] : []}
        deleteStoredCardItem={deleteStoredCardItem}
        state={storedCardState}
        yugiohCard={yugiohCard}
      />
    </div>
  );
};

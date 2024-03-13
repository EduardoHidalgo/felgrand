"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { StarIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

import { useDatabaseSearch } from "./useDatabaseSearch";
import { useSearchDialog } from "./useSearchDialog";

import { ChipCardType } from "@/components/chipCardType";
import { Datatable } from "@/components/datatable";
import { Dialog } from "@/components/dialog";
import { SearchBar } from "@/components/searchbar";
import { SearchDialog } from "./dialog";
import { TcgCard } from "@/components/tcgCard";
import { AsyncState } from "@/types";

export default function SearchPage() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search");

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogIndex, setDialogIndex] = useState<number | null>(null);

  const onFetchClean = () => {
    router.push(pathname);
  };

  const onFetchFound = (params: string) => {
    router.push(`${pathname}?${params}`);
  };

  const {
    fetchList,
    inventory,
    isInventoried,
    isInventoryLoading,
    list,
    onClickRow,
    rulings,
    selectedCard,
    storeCard,
    tips,
  } = useDatabaseSearch({
    onFetchClean,
    onFetchFound,
  });

  const {
    addNewStoredCardItem,
    cleanPrice,
    cleanStates,
    deleteStoredCardItem,
    searchDialogOpened,
    storedCard,
    storedCardState,
    submitState,
    updateStoredCard,
    updateStoredCardItem,
    getPrices,
    prices,
    pricesState,
  } = useSearchDialog({
    card: selectedCard,
  });

  useEffect(() => {
    if (selectedCard == null && searchParam != null) {
      fetchList(searchParam.replaceAll("_", " "));
    }
  }, []);

  useEffect(() => {
    if (
      selectedCard !== null &&
      dialogIndex !== null &&
      selectedCard.id == list[dialogIndex].id
    ) {
      openDialogSecurely();
    }
  }, [selectedCard, dialogIndex]);

  const closeDialog = () => {
    setDialogOpen(false);
    setDialogIndex(null);
    cleanStates();
  };

  const openDialog = (index: number) => {
    onClickRow(index);
    setDialogIndex(index);
  };

  const openDialogSecurely = async () => {
    await searchDialogOpened();
    setDialogOpen(true);
  };

  const addStoredCardAndOpenDialog = async (
    cardName: string,
    index: number,
  ) => {
    await storeCard(cardName);
    openDialog(index);
  };

  return (
    <>
      <Dialog closeDialog={closeDialog} open={dialogOpen}>
        <SearchDialog
          addNewStoredCardItem={addNewStoredCardItem}
          cleanPrice={cleanPrice}
          deleteStoredCardItem={deleteStoredCardItem}
          getPrices={getPrices}
          prices={prices}
          pricesState={pricesState}
          storedCard={storedCard}
          storedCardState={storedCardState}
          submitState={submitState}
          updateStoredCard={updateStoredCard}
          updateStoredCardItem={updateStoredCardItem}
          yugiohCard={selectedCard}
        />
      </Dialog>
      <div className="fixed left-0 flex h-full w-[60vw] max-w-[60vw] flex-col overflow-x-hidden overflow-y-scroll px-2">
        <SearchBar fetchData={fetchList} initialValue={searchParam} />
        <Datatable
          display="There is no searched cards."
          showDisplay={list.length == 0}
        >
          <Datatable.Head>
            <Datatable.HeaderCell>name</Datatable.HeaderCell>
            <Datatable.HeaderCell className="text-center">
              type
            </Datatable.HeaderCell>
            <Datatable.HeaderCell>archetype</Datatable.HeaderCell>
            <Datatable.HeaderCell>race</Datatable.HeaderCell>
            <Datatable.HeaderCell className="text-center">
              stored
            </Datatable.HeaderCell>
          </Datatable.Head>
          <Datatable.Body>
            {list.map((card, index) => (
              <Datatable.Row
                index={index}
                key={card.id}
                onClickRow={onClickRow}
                isSelected={
                  selectedCard ? selectedCard.id === card.id : undefined
                }
              >
                <Datatable.Data
                  className="justify-between"
                  copyToClipboard={card.name}
                >
                  {card.name}
                </Datatable.Data>
                <Datatable.Data className="!block text-center">
                  <ChipCardType type={card.type} />
                </Datatable.Data>
                <Datatable.Data>{card.race}</Datatable.Data>
                <Datatable.Data
                  className="justify-between"
                  copyToClipboard={card.archetype}
                >
                  {card.archetype ? card.archetype : ""}
                </Datatable.Data>
                <Datatable.Data clickRowIgnore>
                  <div className="flex w-full flex-row justify-center">
                    {isInventoryLoading && (
                      <StarIcon className="h-5 w-5 animate-pulse cursor-not-allowed text-gray-100" />
                    )}
                    {inventory.state === AsyncState.Error && (
                      <ExclamationCircleIcon className="h-5 w-5 cursor-not-allowed text-red-300" />
                    )}
                    {inventory.state === AsyncState.Success &&
                      (isInventoried(card.name) ? (
                        <StarIcon
                          className={classNames(
                            "h-5 w-5 cursor-pointer text-yellow-400",
                            "transition-all hover:scale-125 hover:text-yellow-300",
                          )}
                          onClick={() => openDialog(index)}
                        />
                      ) : (
                        <StarIcon
                          className={classNames(
                            "h-5 w-5 cursor-pointer text-gray-600",
                            "transition-all hover:scale-125 hover:text-gray-500",
                          )}
                          onClick={() =>
                            addStoredCardAndOpenDialog(card.name, index)
                          }
                        />
                      ))}
                  </div>
                </Datatable.Data>
              </Datatable.Row>
            ))}
          </Datatable.Body>
        </Datatable>
      </div>
      <div className="fixed right-0 flex h-full w-[40vw] flex-col overflow-x-hidden overflow-y-scroll pb-12 pt-2">
        {selectedCard ? (
          <TcgCard card={selectedCard} tips={tips} rulings={rulings} />
        ) : (
          <div>unselected card.</div>
        )}
      </div>
    </>
  );
}

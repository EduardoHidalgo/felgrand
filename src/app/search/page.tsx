"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { StarIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";

import { useDatabaseSearch } from "./useDatabaseSearch";

import { SearchDialog } from "./dialog";
import { Datatable } from "@/components/datatable";
import { SearchBar } from "@/components/searchbar";
import { TcgCard } from "@/components/tcgCard";
import { Dialog } from "@/components/dialog";
import { AsyncState } from "@/types";
import { useSearchDialog } from "./useSearchDialog";

export default function SearchPage() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search");

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

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
    tips,
  } = useDatabaseSearch({
    onFetchClean,
    onFetchFound,
  });

  const { addNewStoredCardItem, storedCard, storedCardState, submitState } =
    useSearchDialog({
      card: selectedCard,
    });

  useEffect(() => {
    if (selectedCard == null && searchParam != null) {
      fetchList(searchParam.replaceAll("_", " "));
    }
  }, []);

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const openDialog = (index: number) => {
    onClickRow(index);
    setDialogOpen(true);
  };

  return (
    <>
      <Dialog closeDialog={closeDialog} open={dialogOpen}>
        <SearchDialog
          addNewStoredCardItem={addNewStoredCardItem}
          storedCard={storedCard}
          storedCardState={storedCardState}
          submitState={submitState}
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
            <Datatable.HeaderCell>type</Datatable.HeaderCell>
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
                <Datatable.Data>{card.type}</Datatable.Data>
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
                          className="h-5 w-5 cursor-pointer text-yellow-400"
                          onClick={() => openDialog(index)}
                        />
                      ) : (
                        <StarIcon
                          className="h-5 w-5 cursor-pointer text-gray-600"
                          onClick={() => openDialog(index)}
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

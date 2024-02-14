"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { StarIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";

import { Datatable } from "@/components/datatable";
import { SearchBar } from "@/components/searchbar";
import { TcgCard } from "@/components/tcgCard";
import { useDatabaseSearch } from "./useDatabaseSearch";
import { AsyncState, YugiohCard } from "@/types";
import { Dialog } from "@/components/dialog";
import { Button } from "@/components/button";

export default function SearchPage() {
  const headers: Array<string> = [
    "name",
    "type",
    "race",
    "archetype",
    "stored",
  ];

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search");

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogCardId, setDialogCardId] = useState<number | null>(null);

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

  useEffect(() => {
    if (selectedCard == null && searchParam != null) {
      fetchList(searchParam.replaceAll("_", " "));
    }
  }, []);

  const onClickCopyToClipboard = async (value: string) => {
    await navigator.clipboard.writeText(value);
  };

  const closeDialog = () => {
    setDialogCardId(null);
    setDialogOpen(false);
  };

  const openDialog = (cardId: number) => {
    setDialogCardId(cardId);
    setDialogOpen(true);
  };

  const onClickStoreCard = async () => {
    if (dialogCardId) {
      await storeCard(dialogCardId);
      closeDialog();
    }
  };

  return (
    <>
      <Dialog closeDialog={closeDialog} open={dialogOpen}>
        <div className="m-8 flex flex-col">
          <Button label="Add to store" onClick={onClickStoreCard} />
        </div>
      </Dialog>
      <main className="">
        <div className="fixed left-0 flex h-full w-[60vw] max-w-[60vw] flex-col overflow-x-hidden overflow-y-scroll px-2">
          <SearchBar fetchData={fetchList} initialValue={searchParam} />
          <Datatable>
            <Datatable.Head headers={headers} />
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
                  <Datatable.Data>
                    {card.name}
                    <ClipboardIcon
                      className="h-4 w-4 text-gray-200 transition-all hover:scale-125 hover:cursor-pointer hover:text-gray-50"
                      onClick={() => onClickCopyToClipboard(card.name)}
                    />
                  </Datatable.Data>
                  <Datatable.Data>{card.type}</Datatable.Data>
                  <Datatable.Data>{card.race}</Datatable.Data>
                  <Datatable.Data>
                    {card.archetype ? card.archetype : ""}
                    {card.archetype && (
                      <ClipboardIcon
                        className="h-4 w-4 text-gray-200 transition-all hover:scale-125 hover:cursor-pointer hover:text-gray-50"
                        onClick={() => onClickCopyToClipboard(card.archetype!)}
                      />
                    )}
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
                        (isInventoried(card.id) ? (
                          <StarIcon
                            className="h-5 w-5 cursor-pointer text-yellow-300"
                            onClick={() => openDialog(card.id)}
                          />
                        ) : (
                          <StarIcon
                            className="h-5 w-5 cursor-pointer text-gray-600"
                            onClick={() => openDialog(card.id)}
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
      </main>
    </>
  );
}

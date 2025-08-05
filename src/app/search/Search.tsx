"use client";
import { FC, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

import { useDatabaseSearch } from "./useDatabaseSearch";

import { ChipCardType } from "@/components/chipCardType";
import { CardTypeText } from "@/components/cardTypeText";
import { Datatable } from "@/components/datatable";
import { SearchBar } from "@/components/searchbar";
import { TcgCard } from "@/components/tcgCard";

export interface SearchPageLayoutProps {}

export const SearchPageLayout: FC<SearchPageLayoutProps> = ({}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search");

  // Estado para mobile: controlar si se muestra la lista o el detalle
  const [showMobileDetail, setShowMobileDetail] = useState<boolean>(false);

  const onFetchClean = () => {
    router.push(pathname);
  };

  const onFetchFound = (params: string) => {
    router.push(`${pathname}?${params}`);
  };

  const { fetchList, list, onClickRow, selectedCard } = useDatabaseSearch({
    onFetchClean,
    onFetchFound,
  });

  useEffect(() => {
    if (selectedCard == null && searchParam != null) {
      fetchList(searchParam.replaceAll("_", " "));
    }
  }, []);

  const handleCardClick = async (index: number) => {
    onClickRow(index);
    // En móviles, mostrar el detalle
    setShowMobileDetail(true);
  };

  const handleBackToList = () => {
    setShowMobileDetail(false);
  };

  return (
    <div className="flex h-full w-full">
      {/* Panel izquierdo - Lista de cartas */}
      <div
        className={classNames(
          "flex flex-col overflow-x-hidden overflow-y-scroll px-2",
          // En móviles: mostrar lista completa o ocultar cuando se ve detalle
          "w-full md:w-[60vw] md:max-w-[60vw]",
          showMobileDetail ? "hidden md:flex" : "flex",
        )}
      >
        <SearchBar fetchData={fetchList} initialValue={searchParam} />
        <Datatable
          display="There is no searched cards."
          showDisplay={list.length == 0}
        >
          <Datatable.Head>
            <Datatable.HeaderCell>name</Datatable.HeaderCell>
            <Datatable.HeaderCell className="hidden text-center sm:table-cell">
              type
            </Datatable.HeaderCell>
            <Datatable.HeaderCell className="hidden lg:table-cell">
              archetype
            </Datatable.HeaderCell>
            <Datatable.HeaderCell className="hidden md:table-cell">
              race
            </Datatable.HeaderCell>
          </Datatable.Head>
          <Datatable.Body>
            {list.map((card, index) => (
              <Datatable.Row
                index={index}
                key={card.id}
                onClickRow={handleCardClick}
                isSelected={
                  selectedCard ? selectedCard.id === card.id : undefined
                }
              >
                <Datatable.Data
                  className="justify-between"
                  copyToClipboard={card.name}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{card.name}</span>
                    {/* Mostrar tipo y raza en móviles debajo del nombre */}
                    <div className="text-xs text-gray-500 sm:hidden">
                      <CardTypeText type={card.type} size="xs" /> • {card.race}
                      {card.archetype && ` • ${card.archetype}`}
                    </div>
                  </div>
                </Datatable.Data>
                <Datatable.Data className="hidden text-center sm:table-cell">
                  <ChipCardType type={card.type} />
                </Datatable.Data>
                <Datatable.Data className="hidden lg:table-cell">
                  <span className="truncate" title={card.archetype || ""}>
                    {card.archetype ? card.archetype : ""}
                  </span>
                </Datatable.Data>
                <Datatable.Data
                  className="hidden justify-between md:table-cell"
                  copyToClipboard={card.race}
                >
                  {card.race}
                </Datatable.Data>
              </Datatable.Row>
            ))}
          </Datatable.Body>
        </Datatable>
      </div>

      {/* Panel derecho - Detalle de carta */}
      <div
        className={classNames(
          "flex flex-col overflow-x-hidden overflow-y-scroll pb-12 pt-2",
          // En móviles: mostrar detalle completo o ocultar cuando se ve lista
          "w-full md:w-[40vw]",
          showMobileDetail ? "flex" : "hidden md:flex",
        )}
      >
        {/* Botón de regreso para móviles */}
        {showMobileDetail && (
          <button
            onClick={handleBackToList}
            className="flex items-center gap-2 p-2 text-blue-600 hover:text-blue-800 md:hidden"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Back to list</span>
          </button>
        )}

        {selectedCard ? (
          <TcgCard card={selectedCard} />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            <div className="text-center">
              <p className="hidden md:block">Select a card to view details.</p>
              <p className="md:hidden">Search for cards to get started.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

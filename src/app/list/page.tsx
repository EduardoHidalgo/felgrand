"use client";
import { useEffect, useState } from "react";
import { ClipboardIcon } from "@heroicons/react/24/outline";

import { AsyncState, YugiohCard, YugiohDatabase } from "@/types";
import { Datatable } from "@/components/datatable";
import { SearchBar } from "@/components/searchbar";
import { TcgCard } from "@/components/tcgCard";
import data from "../../../public/database.json";

export default function ListPagr() {
  const LIST_LIMIT = 1500;
  const SEARCHABLE_LENGTH = 3;
  const database: YugiohDatabase = data as unknown as YugiohDatabase;

  const headers: Array<string> = ["name", "type", "race", "archetype"];

  const [list, setList] = useState<Array<YugiohCard>>([]);
  const [selectedCard, setSelectedCard] = useState<YugiohCard | null>(null);
  const [tips, setTips] = useState<{ html: string | null; state: AsyncState }>({
    html: null,
    state: AsyncState.Initial,
  });
  const [rulings, setRulings] = useState<{
    html: string | null;
    state: AsyncState;
  }>({
    html: null,
    state: AsyncState.Initial,
  });

  useEffect(() => {
    if (selectedCard !== null) {
      setTips({ ...tips, state: AsyncState.Loading });
      setRulings({ ...rulings, state: AsyncState.Loading });

       fetchTips(selectedCard);
      fetchRulings(selectedCard);
    }
  }, [selectedCard]);

  const fetchTips = async (card: YugiohCard) => {
    const url = `/api/tips?card_name=${card.name}`;
    const response = await fetch(url, { method: "GET" });

    if (response.ok) {
      const data = (await response.json()) as { html: string };
      setTips({ html: data.html, state: AsyncState.Success });
    } else {
      setTips({ html: null, state: AsyncState.Error });
    }
  };

  const fetchRulings = async (card: YugiohCard) => {
    const url = `/api/rulings?card_name=${card.name}`;
    const response = await fetch(url, { method: "GET" });

    if (response.ok) {
      const data = (await response.json()) as { html: string };
      setRulings({ html: data.html, state: AsyncState.Success });
    } else {
      setRulings({ html: null, state: AsyncState.Error });
    }
  };

  const fetchData = async (searchValue: string) => {
    if (searchValue === "" || searchValue.length < SEARCHABLE_LENGTH) {
      setSelectedCard(null);
      setTips({ html: null, state: AsyncState.Initial });
      setRulings({ html: null, state: AsyncState.Initial });
      return setList([]);
    }

    let count = 0;
    let hasSelectedByName = false;
    let search = searchValue.toLowerCase();
    const founds = database.data.filter((card) => {
      if (count >= LIST_LIMIT) return false;

      if (String(card.name).toLowerCase().includes(search)) {
        if (search === card.name.toLowerCase()) {
          hasSelectedByName = true;
          setSelectedCard(card);
        }

        count++;
        return true;
      }
      if (String(card.type).toLowerCase().includes(search)) {
        count++;
        return true;
      }
      if (String(card.race).toLowerCase().includes(search)) {
        count++;
        return true;
      }
      if (String(card.archetype).toLowerCase().includes(search)) {
        count++;
        return true;
      }
      if (String(card.desc).toLowerCase().includes(search)) {
        count++;
        return true;
      }
      if (card.card_sets) {
        for (let index = 0; index < card.card_sets.length; index++) {
          const set = card.card_sets[index];
          if (String(set.set_name).toLowerCase().includes(search)) {
            count++;
            return true;
          }

          if (String(set.set_code).toLowerCase().includes(search)) {
            count++;
            return true;
          }
        }
      }

      return false;
    });

    if (hasSelectedByName === false) {
      setSelectedCard(founds[0]);
    }

    setList(founds);
  };

  const onClickRow = async (index: number) => {
    if (selectedCard && list[index].id === selectedCard.id) return;

    setTips({ html: null, state: AsyncState.Initial });
    setRulings({ html: null, state: AsyncState.Initial });
    setSelectedCard(list[index]);

    await navigator.clipboard.writeText(list[index].name);
  };

  const onClickCopyToClipboard = async (value: string) => {
    await navigator.clipboard.writeText(value);
  };

  return (
    <main className="flex flex-row overflow-x-auto gap-2">
      <div className="flex flex-col max-w-[50vw] w-full">
        <SearchBar fetchData={fetchData} />
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
                    className="w-4 h-4 hover:cursor-pointer hover:scale-125 transition-all text-gray-200 hover:text-gray-50"
                    onClick={() => onClickCopyToClipboard(card.name)}
                  />
                </Datatable.Data>
                <Datatable.Data>{card.type}</Datatable.Data>
                <Datatable.Data>{card.race}</Datatable.Data>
                <Datatable.Data>
                  {card.archetype ? card.archetype : ""}
                  {card.archetype && (
                    <ClipboardIcon
                      className="w-4 h-4 hover:cursor-pointer hover:scale-125 transition-all text-gray-200 hover:text-gray-50"
                      onClick={() => onClickCopyToClipboard(card.archetype!)}
                    />
                  )}
                </Datatable.Data>
              </Datatable.Row>
            ))}
          </Datatable.Body>
        </Datatable>
      </div>
      <div className="flex flex-col pt-2 pb-12 max-w-[calc(50vw-24px)] fixed right-0 overflow-y-scroll overflow-x-hidden h-full w-full">
        {selectedCard ? (
          <TcgCard card={selectedCard} tips={tips} rulings={rulings} />
        ) : (
          <div>unselected card.</div>
        )}
      </div>
    </main>
  );
}

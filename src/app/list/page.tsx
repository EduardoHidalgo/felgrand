"use client";
import { useState } from "react";

import { YugiohCard, YugiohDatabase } from "@/types";
import { Datatable } from "@/components/datatable";
import { SearchBar } from "@/components/searchbar";
import { TcgCard } from "@/components/tcgCard";
import data from "../../../public/database.json";

export default function ListPagr() {
  const LIST_LIMIT = 100;
  const SEARCHABLE_LENGTH = 3;
  const database: YugiohDatabase = data as unknown as YugiohDatabase;

  const headers: Array<string> = [
    "id",
    "name",
    "type",
    "frameType",
    "race",
    "archetype",
  ];

  const [list, setList] = useState<Array<YugiohCard>>([]);
  const [selectedCard, setSelectedCard] = useState<YugiohCard | null>(null);

  const fetchData = async (searchValue: string) => {
    if (searchValue === "" || searchValue.length < SEARCHABLE_LENGTH) {
      return setList([]);
    }

    let count = 0;
    let search = searchValue.toLowerCase();
    const founds = database.data.filter((card) => {
      if (count >= LIST_LIMIT) return false;

      if (String(card.id).toLowerCase().includes(search)) {
        count++;
        return true;
      }
      if (String(card.name).toLowerCase().includes(search)) {
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

      return false;
    });

    setList(founds);
  };

  const onClickRow = (index: number) => {
    setSelectedCard(list[index]);
  };

  return (
    <main className="flex flex-row">
      <div className="flex flex-col w-full">
        <SearchBar fetchData={fetchData} />
        <Datatable>
          <Datatable.Head headers={headers} />
          <Datatable.Body>
            {list.map((card, index) => (
              <Datatable.Row
                index={index}
                key={card.id}
                onClickRow={onClickRow}
              >
                <Datatable.Data>{card.id}</Datatable.Data>
                <Datatable.Data>{card.name}</Datatable.Data>
                <Datatable.Data>{card.type}</Datatable.Data>
                <Datatable.Data>{card.frameType}</Datatable.Data>
                <Datatable.Data>{card.race}</Datatable.Data>
                <Datatable.Data>
                  {card.archetype ? card.archetype : ""}
                </Datatable.Data>
                {/* <Datatable.Data>{card.desc}</Datatable.Data> */}
              </Datatable.Row>
            ))}
          </Datatable.Body>
        </Datatable>
      </div>
      <div className="flex flex-col w-[512px]">
        {selectedCard ? (
          <TcgCard card={selectedCard} />
        ) : (
          <div>unselected card.</div>
        )}
      </div>
    </main>
  );
}
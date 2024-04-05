"use client";
import { useMemo, useState } from "react";
import { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";

import { StoredCardCombined } from "@/types";
import { VirtualizedDatatable } from "@/components/virtualizedDatatable";
import { useStore } from "./useStore";
import { StoreSummary } from "./summary";

import { StoreColumnArchetype } from "./columns/archetype";
import { StoreColumnBanType } from "./columns/banType";
import { StoreColumnBoughtValue } from "./columns/boughtValue";
import { StoreColumnCardType } from "./columns/cardType";
import { StoreColumnCondition } from "./columns/condition";
import { StoreColumnCount } from "./columns/count";
import { StoreColumnImportance } from "./columns/importance";
import { StoreColumnLanguage } from "./columns/language";
import { StoreColumnName } from "./columns/name";
import { StoreColumnPriority } from "./columns/priority";
import { StoreColumnRace } from "./columns/race";
import { StoreColumnRarity } from "./columns/rarity";
import { StoreColumnStatus } from "./columns/status";
import { StoreColumnStorageGroup } from "./columns/storageGroup";
import { StoreColumnValue } from "./columns/value";
import { StoreColumnWantedCount } from "./columns/wantedCount";
import { StoreFilters } from "./filters";

export default function StorePage() {
  const { cards, updateCard } = useStore({});

  const columns = useMemo<ColumnDef<StoredCardCombined>[]>(
    () => [
      {
        accessorKey: "name",
        minSize: 460,
        maxSize: 460,
        cell: ({ getValue }) => <StoreColumnName name={getValue<string>()} />,
        sortingFn: "alphanumericCaseSensitive",
      },
      {
        accessorKey: "count",
        minSize: 60,
        maxSize: 60,
        cell: ({ row, table }) => <StoreColumnCount row={row} table={table} />,
      },
      {
        accessorKey: "wantedCount",
        header: "wanted count",
        minSize: 60,
        maxSize: 60,
        cell: ({ row, table }) => (
          <StoreColumnWantedCount row={row} table={table} />
        ),
      },
      {
        accessorKey: "value",
        minSize: 100,
        maxSize: 100,
        cell: ({ row, table }) => <StoreColumnValue row={row} table={table} />,
      },
      {
        accessorKey: "boughtValue",
        header: "bought value",
        minSize: 80,
        maxSize: 80,
        cell: ({ row, table }) => (
          <StoreColumnBoughtValue row={row} table={table} />
        ),
      },
      {
        accessorKey: "condition",
        minSize: 140,
        maxSize: 140,
        cell: ({ row, table }) => (
          <StoreColumnCondition row={row} table={table} />
        ),
        filterFn: "equalsString",
      },
      {
        accessorKey: "language",
        header: "lang",
        minSize: 20,
        maxSize: 20,
        cell: ({ row }) => (
          <StoreColumnLanguage language={row.original.language} />
        ),
        filterFn: "equalsString",
      },
      {
        accessorKey: "rarityCode",
        minSize: 120,
        maxSize: 120,
        header: "rarity",
        cell: ({ row }) => (
          <StoreColumnRarity rarity={row.original.rarityCode} />
        ),
        filterFn: "equalsString",
      },
      {
        accessorKey: "status",
        minSize: 100,
        maxSize: 100,
        cell: ({ row, table }) => <StoreColumnStatus row={row} table={table} />,
        filterFn: "equalsString",
      },
      {
        accessorKey: "importance",
        minSize: 100,
        maxSize: 100,
        cell: ({ row, table }) => (
          <StoreColumnImportance row={row} table={table} />
        ),
        filterFn: "equalsString",
      },
      {
        accessorKey: "priority",
        minSize: 100,
        maxSize: 100,
        cell: ({ row, table }) => (
          <StoreColumnPriority row={row} table={table} />
        ),
        filterFn: "equalsString",
      },
      {
        accessorKey: "storageGroup",
        minSize: 150,
        maxSize: 150,
        cell: ({ row, table }) => (
          <StoreColumnStorageGroup row={row} table={table} />
        ),
      },
      {
        accessorKey: "archetype",
        minSize: 140,
        maxSize: 140,
        cell: ({ row }) => (
          <StoreColumnArchetype archetype={row.original.archetype} />
        ),
      },
      {
        accessorKey: "cardType",
        minSize: 150,
        maxSize: 150,
        header: "card type",
        cell: ({ row }) => (
          <StoreColumnCardType cardType={row.original.cardType} />
        ),
        filterFn: "equalsString",
      },
      {
        accessorKey: "race",
        minSize: 100,
        maxSize: 100,
        cell: ({ row }) => <StoreColumnRace race={row.original.race} />,
        filterFn: "equalsString",
      },
      {
        accessorKey: "banType",
        minSize: 80,
        maxSize: 80,
        cell: ({ row }) => (
          <StoreColumnBanType banType={row.original.banType} />
        ),
        filterFn: "equalsString",
      },
    ],
    [],
  );

  const initialFilters: ColumnFiltersState = [];

  return (
    <div className="fixed flex h-full w-full flex-col gap-2 p-1 pt-2">
      <VirtualizedDatatable
        columns={columns}
        data={cards}
        estimateSize={37}
        filters={<StoreFilters />}
        initialFilters={initialFilters}
        topRender={<StoreSummary />}
        updateData={updateCard}
      />
    </div>
  );
}

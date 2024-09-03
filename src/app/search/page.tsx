"use client";
import { Suspense } from "react";
import { SearchPageLayout } from "./Search";

export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageLayout />
    </Suspense>
  );
}

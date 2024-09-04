"use client";
import { Suspense } from "react";
import { SearchPageLayout } from "./Search";

export const dynamic = "force-dynamic";

export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageLayout />
    </Suspense>
  );
}

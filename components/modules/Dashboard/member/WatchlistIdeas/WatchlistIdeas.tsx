"use client";

import React, { useState } from "react";
import WatchlistHeader from "./WatchlistHeader/WatchlistHeader";
import WatchlistFilters from "./WatchlistFilters/WatchlistFilters";
import WatchlistGrid from "./WatchlistGrid/WatchlistGrid";
import AppPagination from "@/components/shared/reusableComponents/AppPagination";
import { useMyWatchList } from "@/app/(DashboardLayout)/dashboard/watchlist-ideas/_actions";
import { useDebounce } from "@/hooks/useDebounce";
import {
  IWatchListIdea,
  IWatchListMeta,
} from "@/types/memberTypes/watchlist.types";

const WatchlistIdeas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [categoryId, setCategoryId] = useState("all");
  const [page, setPage] = useState(1);

  const { data: response, isLoading } = useMyWatchList({
    search: debouncedSearch || undefined,
    categoryId: categoryId === "all" ? undefined : categoryId,
    page: String(page),
    limit: "9", // 3x3 grid looks better than 10
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
    setPage(1);
  };

  const handleCategoryChange = (val: string) => {
    setCategoryId(val);
    setPage(1);
  };

  const handleClear = () => {
    setSearchTerm("");
    setCategoryId("all");
    setPage(1);
  };

  const ideas = (response?.data ?? []) as IWatchListIdea[];
  const meta = response?.meta as IWatchListMeta | undefined;

  return (
    <div className="space-y-8 pb-10">
      {/* Page Title Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Watchlist Ideas
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Manage and track the innovative ideas you&apos;ve saved for future
          consideration.
        </p>
      </div>

      <WatchlistHeader meta={meta} />

      <WatchlistFilters
        searchTerm={searchTerm}
        setSearchTerm={handleSearch}
        categoryId={categoryId}
        setCategoryId={handleCategoryChange}
        onClear={handleClear}
      />

      <WatchlistGrid ideas={ideas} isLoading={isLoading} />

      {meta && meta.totalPages > 1 && (
        <div className="flex justify-center">
          <AppPagination
            page={page}
            totalPages={meta.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default WatchlistIdeas;

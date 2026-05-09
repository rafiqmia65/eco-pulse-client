"use client";

import React from "react";
import WatchlistHeader from "./WatchlistHeader/WatchlistHeader";
import WatchlistFilters from "./WatchlistFilters/WatchlistFilters";
import WatchlistGrid from "./WatchlistGrid/WatchlistGrid";
import { useMyWatchList } from "@/app/(DashboardLayout)/dashboard/watchlist-ideas/_actions";
import { useDebounce } from "@/hooks/useDebounce";
import {
  IWatchListIdea,
  IWatchListMeta,
} from "@/types/memberTypes/watchlist.types";
import Pagination from "@/components/shared/Pagination/Pagination";
import { useAppStore } from "@/store";

const WatchlistIdeas = () => {
  const {
    watchlistSearch,
    setWatchlistSearch,
    watchlistCategory,
    setWatchlistCategory,
    watchlistPage,
    setWatchlistPage,
    resetWatchlistFilters,
  } = useAppStore();

  const debouncedSearch = useDebounce(watchlistSearch, 500);

  const { data: response, isLoading } = useMyWatchList({
    search: debouncedSearch || undefined,
    categoryId: watchlistCategory === "all" ? undefined : watchlistCategory,
    page: String(watchlistPage),
    limit: "9", // 3x3 grid looks better than 10
  });

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
        searchTerm={watchlistSearch}
        setSearchTerm={setWatchlistSearch}
        categoryId={watchlistCategory}
        setCategoryId={setWatchlistCategory}
        onClear={resetWatchlistFilters}
      />

      <WatchlistGrid ideas={ideas} isLoading={isLoading} />

      {meta && meta.totalPages > 1 && (
        <Pagination
          meta={{ page: watchlistPage, totalPages: meta.totalPages }}
          onPageChange={setWatchlistPage}
        />
      )}
    </div>
  );
};

export default WatchlistIdeas;

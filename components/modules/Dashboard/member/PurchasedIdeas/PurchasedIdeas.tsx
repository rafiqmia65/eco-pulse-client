"use client";

import React from "react";
import PurchasedIdeasHeader from "./PurchasedIdeasHeader/PurchasedIdeasHeader";
import PurchasedIdeasFilters from "./PurchasedIdeasFilters/PurchasedIdeasFilters";
import PurchasedIdeasTable from "./PurchasedIdeasTable/PurchasedIdeasTable";

import { useDebounce } from "@/hooks/useDebounce";
import { usePurchasedIdeas } from "@/app/(DashboardLayout)/dashboard/purchased-ideas/_actions";
import { IPurchasedIdeaCounts } from "@/types/memberTypes/purchasedIdeas.types";
import Pagination from "@/components/shared/Pagination/Pagination";
import { useAppStore } from "@/store";

const PurchasedIdeas = () => {
  const {
    purchasedSearch,
    setPurchasedSearch,
    purchasedSortBy,
    setPurchasedSortBy,
    purchasedCategory,
    setPurchasedCategory,
    purchasedPage,
    setPurchasedPage,
    resetPurchasedFilters,
  } = useAppStore();

  const debouncedSearch = useDebounce(purchasedSearch, 500);

  const { data: response, isLoading } = usePurchasedIdeas({
    searchTerm: debouncedSearch || undefined,
    sortBy: purchasedSortBy === "all" ? undefined : purchasedSortBy,
    "idea.categoryId":
      purchasedCategory === "all" ? undefined : purchasedCategory,
    page: String(purchasedPage),
    limit: "10",
  });

  const purchases = response?.data || [];
  const meta = response?.meta;
  const counts = (response?.counts as unknown as IPurchasedIdeaCounts) || {
    totalPurchased: 0,
    totalSpent: 0,
    averageSpend: 0,
    highestPurchaseAmount: 0,
    last7DaysPurchases: 0,
    last30DaysPurchases: 0,
    thisMonthPurchases: 0,
    uniqueCategoriesPurchased: 0,
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <PurchasedIdeasHeader counts={counts} />

      <PurchasedIdeasFilters
        searchTerm={purchasedSearch}
        setSearchTerm={setPurchasedSearch}
        sortBy={purchasedSortBy}
        setSortBy={setPurchasedSortBy}
        categoryId={purchasedCategory}
        setCategoryId={setPurchasedCategory}
        onClear={resetPurchasedFilters}
      />

      <PurchasedIdeasTable purchases={purchases} isLoading={isLoading} />

      {meta && meta.totalPages > 1 && (
        <Pagination
          meta={{ page: purchasedPage, totalPages: meta.totalPages }}
          onPageChange={setPurchasedPage}
        />
      )}
    </div>
  );
};

export default PurchasedIdeas;

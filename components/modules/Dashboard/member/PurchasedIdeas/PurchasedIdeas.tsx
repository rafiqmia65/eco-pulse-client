"use client";

import React, { useState } from "react";
import PurchasedIdeasHeader from "./PurchasedIdeasHeader/PurchasedIdeasHeader";
import PurchasedIdeasFilters from "./PurchasedIdeasFilters/PurchasedIdeasFilters";
import PurchasedIdeasTable from "./PurchasedIdeasTable/PurchasedIdeasTable";

import { useDebounce } from "@/hooks/useDebounce";
import { usePurchasedIdeas } from "@/app/(DashboardLayout)/dashboard/purchased-ideas/_actions";
import { IPurchasedIdeaCounts } from "@/types/memberTypes/purchasedIdeas.types";
import Pagination from "@/components/shared/Pagination/Pagination";

const PurchasedIdeas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [sortBy, setSortBy] = useState("all");
  const [categoryId, setCategoryId] = useState("all");
  const [page, setPage] = useState(1);

  const { data: response, isLoading } = usePurchasedIdeas({
    searchTerm: debouncedSearch || undefined,
    sortBy: sortBy === "all" ? undefined : sortBy,
    "idea.categoryId": categoryId === "all" ? undefined : categoryId,
    page: String(page),
    limit: "10",
  });

  const handleClear = () => {
    setSearchTerm("");
    setSortBy("all");
    setCategoryId("all");
    setPage(1);
  };

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
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        onClear={handleClear}
      />

      <PurchasedIdeasTable purchases={purchases} isLoading={isLoading} />

      {meta && meta.totalPages > 1 && (
        <Pagination
          meta={{ page, totalPages: meta.totalPages }}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default PurchasedIdeas;

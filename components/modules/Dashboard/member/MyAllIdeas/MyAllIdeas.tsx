"use client";

import React, { useState } from "react";
import MyIdeasHeader from "@/components/modules/Dashboard/member/MyAllIdeas/MyIdeasHeader/MyIdeasHeader";
import MyIdeasFilters from "@/components/modules/Dashboard/member/MyAllIdeas/MyIdeasFilters/MyIdeasFilters";
import MyIdeasTable from "@/components/modules/Dashboard/member/MyAllIdeas/MyIdeasTable/MyIdeasTable";

import { useDebounce } from "@/hooks/useDebounce";
import { useMyIdeas } from "@/app/(DashboardLayout)/dashboard/_actions";
import { IIdeaCounts } from "@/types/memberTypes/myAllIdeas.types";
import Pagination from "@/components/shared/Pagination/Pagination";

const MyAllIdeas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [status, setStatus] = useState("all");
  const [categoryId, setCategoryId] = useState("all");
  const [page, setPage] = useState(1);

  const { data: response, isLoading } = useMyIdeas({
    searchTerm: debouncedSearch || undefined,
    status: status === "all" ? undefined : status,
    categoryId: categoryId === "all" ? undefined : categoryId,
    page,
    limit: 10,
  });

  const handleClear = () => {
    setSearchTerm("");
    setStatus("all");
    setCategoryId("all");
    setPage(1);
  };

  const ideas = response?.data || [];
  const meta = response?.meta;
  const counts = (response?.counts as unknown as IIdeaCounts) || {
    total: 0,
    draft: 0,
    review: 0,
    approved: 0,
    rejected: 0,
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <MyIdeasHeader counts={counts} />

      <MyIdeasFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        status={status}
        setStatus={setStatus}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        onClear={handleClear}
      />

      <MyIdeasTable ideas={ideas} isLoading={isLoading} />

      {meta && meta.totalPages > 1 && (
        <Pagination
          meta={{ page, totalPages: meta.totalPages }}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default MyAllIdeas;

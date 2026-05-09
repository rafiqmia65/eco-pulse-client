"use client";

import React from "react";
import MyIdeasHeader from "@/components/modules/Dashboard/member/MyAllIdeas/MyIdeasHeader/MyIdeasHeader";
import MyIdeasFilters from "@/components/modules/Dashboard/member/MyAllIdeas/MyIdeasFilters/MyIdeasFilters";
import MyIdeasTable from "@/components/modules/Dashboard/member/MyAllIdeas/MyIdeasTable/MyIdeasTable";

import { useDebounce } from "@/hooks/useDebounce";
import { useMyIdeas } from "@/app/(DashboardLayout)/dashboard/_actions";
import { IIdeaCounts } from "@/types/memberTypes/myAllIdeas.types";
import Pagination from "@/components/shared/Pagination/Pagination";
import { useAppStore } from "@/store";

const MyAllIdeas = () => {
  const {
    myIdeasSearch,
    setMyIdeasSearch,
    myIdeasStatus,
    setMyIdeasStatus,
    myIdeasCategory,
    setMyIdeasCategory,
    myIdeasPage,
    setMyIdeasPage,
    resetMyIdeasFilters,
  } = useAppStore();

  const debouncedSearch = useDebounce(myIdeasSearch, 500);

  const { data: response, isLoading } = useMyIdeas({
    searchTerm: debouncedSearch || undefined,
    status: myIdeasStatus === "all" ? undefined : myIdeasStatus,
    categoryId: myIdeasCategory === "all" ? undefined : myIdeasCategory,
    page: myIdeasPage,
    limit: 10,
  });

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
        searchTerm={myIdeasSearch}
        setSearchTerm={setMyIdeasSearch}
        status={myIdeasStatus}
        setStatus={setMyIdeasStatus}
        categoryId={myIdeasCategory}
        setCategoryId={setMyIdeasCategory}
        onClear={resetMyIdeasFilters}
      />

      <MyIdeasTable ideas={ideas} isLoading={isLoading} />

      {meta && meta.totalPages > 1 && (
        <Pagination
          meta={{ page: myIdeasPage, totalPages: meta.totalPages }}
          onPageChange={setMyIdeasPage}
        />
      )}
    </div>
  );
};

export default MyAllIdeas;

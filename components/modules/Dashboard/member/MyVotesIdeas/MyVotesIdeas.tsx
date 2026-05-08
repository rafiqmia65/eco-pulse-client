"use client";

import React, { useState } from "react";
import MyVotesHeader from "./MyVotesHeader/MyVotesHeader";
import MyVotesFilters from "./MyVotesFilters/MyVotesFilters";
import MyVotesGrid from "./MyVotesGrid/MyVotesGrid";

import { useMyVotes } from "@/app/(DashboardLayout)/dashboard/my-votes-ideas/_actions";
import { useDebounce } from "@/hooks/useDebounce";
import { IVotesCounts } from "@/types/memberTypes/myVotes.types";
import { IIdea } from "@/types/public/home.types";
import Pagination from "@/components/shared/Pagination/Pagination";

const MyVotesIdeas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [categoryId, setCategoryId] = useState("all");
  const [page, setPage] = useState(1);

  const { data: response, isLoading } = useMyVotes({
    searchTerm: debouncedSearch || undefined,
    "idea.categoryId": categoryId === "all" ? undefined : categoryId,
    page: String(page),
    limit: "9",
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

  const votes = (response?.data ?? []) as IIdea[];
  const meta = response?.meta;
  const counts = response?.counts as unknown as IVotesCounts | undefined;

  return (
    <div className="space-y-8 pb-10">
      {/* Page Title Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold tracking-tight">
          My Voted Ideas
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Review the innovative solutions you&apos;ve supported or provided
          feedback on through your votes.
        </p>
      </div>

      <MyVotesHeader counts={counts} />

      <MyVotesFilters
        searchTerm={searchTerm}
        setSearchTerm={handleSearch}
        categoryId={categoryId}
        setCategoryId={handleCategoryChange}
        onClear={handleClear}
      />

      <MyVotesGrid votes={votes} isLoading={isLoading} />

      {meta && meta.totalPages > 1 && (
        <Pagination
          meta={{ page: meta.page, totalPages: meta.totalPages }}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default MyVotesIdeas;

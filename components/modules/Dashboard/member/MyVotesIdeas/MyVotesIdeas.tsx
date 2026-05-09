"use client";

import React from "react";
import MyVotesHeader from "./MyVotesHeader/MyVotesHeader";
import MyVotesFilters from "./MyVotesFilters/MyVotesFilters";
import MyVotesGrid from "./MyVotesGrid/MyVotesGrid";

import { useMyVotes } from "@/app/(DashboardLayout)/dashboard/my-votes-ideas/_actions";
import { useDebounce } from "@/hooks/useDebounce";
import { IVotesCounts } from "@/types/memberTypes/myVotes.types";
import { IIdea } from "@/types/public/home.types";
import Pagination from "@/components/shared/Pagination/Pagination";
import { useAppStore } from "@/store";

const MyVotesIdeas = () => {
  const {
    votedSearch,
    setVotedSearch,
    votedCategory,
    setVotedCategory,
    votedPage,
    setVotedPage,
    resetVotedFilters,
  } = useAppStore();

  const debouncedSearch = useDebounce(votedSearch, 500);

  const { data: response, isLoading } = useMyVotes({
    searchTerm: debouncedSearch || undefined,
    "idea.categoryId": votedCategory === "all" ? undefined : votedCategory,
    page: String(votedPage),
    limit: "9",
  });

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
        searchTerm={votedSearch}
        setSearchTerm={setVotedSearch}
        categoryId={votedCategory}
        setCategoryId={setVotedCategory}
        onClear={resetVotedFilters}
      />

      <MyVotesGrid votes={votes} isLoading={isLoading} />

      {meta && meta.totalPages > 1 && (
        <Pagination
          meta={{ page: votedPage, totalPages: meta.totalPages }}
          onPageChange={setVotedPage}
        />
      )}
    </div>
  );
};

export default MyVotesIdeas;

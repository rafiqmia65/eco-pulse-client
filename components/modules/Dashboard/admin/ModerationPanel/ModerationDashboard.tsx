"use client";

import React, { useState } from "react";
import { useAdminAllIdeas } from "@/app/(DashboardLayout)/admin/all-ideas/_actions";
import { ShieldCheck, RefreshCcw, FileText } from "lucide-react";
import ModerationStats from "./ModerationStats/ModerationStats";

import IdeaFilters from "./IdeaFilters/IdeaFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/shared/Pagination/Pagination";
import { useDebounce } from "@/hooks/useDebounce";

import { IIdeaStatus } from "@/types/adminTypes/adminIdeas.types";
import IdeaModerationTable from "./IdeaModerationTable/IdeaModerationTable";

const ModerationDashboard = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<IIdeaStatus | "">("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isPaidFilter, setIsPaidFilter] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setPage(1);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status as IIdeaStatus | "");
    setPage(1);
  };

  const handleCategoryChange = (val: string) => {
    setCategoryFilter(val);
    setPage(1);
  };

  const handleIsPaidChange = (val: string) => {
    setIsPaidFilter(val);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setCategoryFilter("");
    setIsPaidFilter("");
    setPage(1);
  };

  const {
    data: response,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useAdminAllIdeas({
    page,
    limit: 10,
    searchTerm: debouncedSearch,
    status: statusFilter || undefined,
    categoryId: categoryFilter || undefined,
    isPaid:
      isPaidFilter === "true"
        ? true
        : isPaidFilter === "false"
          ? false
          : undefined,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 space-y-4">
        <div className="p-4 rounded-full bg-rose-500/10 border border-rose-500/20">
          <RefreshCcw className="w-8 h-8 text-rose-500" />
        </div>
        <div className="text-center">
          <p className="text-rose-500 font-bold text-xl">
            Moderation Load Error
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Unable to fetch ideas for review. Please try again.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => refetch()}
          className="gap-2 rounded-xl h-11 px-8 border-rose-500/20 hover:bg-rose-500/5 text-rose-500"
        >
          <RefreshCcw
            className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Retry Connection
        </Button>
      </div>
    );
  }

  const ideas = response?.data || [];
  const meta = response?.meta;
  const counts = response?.counts || {
    total: 0,
    review: 0,
    approved: 0,
    rejected: 0,
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-primary" />
            Content Moderation
          </h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Review, approve, or reject community idea submissions.
          </p>
        </div>
      </div>

      {/* Overview Stats */}
      {isLoading && !response ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <ModerationStats
          counts={counts}
          currentFilter={statusFilter}
          onFilterChange={handleStatusChange}
        />
      )}

      {/* Filters Area */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <FileText className="w-5 h-5 text-muted-foreground" />
            Idea Submissions
          </h2>
          {isFetching && (
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-medium animate-pulse">
              <RefreshCcw className="w-3 h-3 animate-spin" />
              Updating list...
            </div>
          )}
        </div>
        <IdeaFilters
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          status={statusFilter}
          onStatusChange={handleStatusChange}
          categoryId={categoryFilter}
          onCategoryChange={handleCategoryChange}
          isPaid={isPaidFilter}
          onIsPaidChange={handleIsPaidChange}
          onClear={handleClearFilters}
        />
      </div>

      {/* Content Area */}
      {isLoading && !response ? (
        <div className="space-y-4">
          <Skeleton className="h-100 w-full rounded-2xl" />
        </div>
      ) : (
        <div className="space-y-6">
          <IdeaModerationTable ideas={ideas} />

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-center pt-4">
              <Pagination meta={meta} onPageChange={(p) => setPage(p)} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModerationDashboard;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useIdeas } from "@/app/(PublicLayout)/ideas/_actions";
import { useCategories } from "@/hooks/useCategories";
import IdeaCard from "./IdeaCard/IdeaCard";
import { useEffect, useMemo } from "react";
import CustomInput from "@/components/shared/reusableComponents/CustomInput";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import { Filter, X } from "lucide-react";
import Pagination from "@/components/shared/Pagination/Pagination";

import { useAppStore } from "@/store";
import { useDebounce } from "@/hooks/useDebounce";

export default function IdeasGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    publicIdeasSearch,
    setPublicIdeasSearch,
    publicIdeasCategory,
    setPublicIdeasCategory,
    publicIdeasIsPaid,
    setPublicIdeasIsPaid,
    publicIdeasSortBy,
    setPublicIdeasSortBy,
    publicIdeasPage,
    setPublicIdeasPage,
    isFilterSidebarOpen,
    setIsFilterSidebarOpen,
    resetPublicIdeasFilters,
  } = useAppStore();

  const debouncedSearch = useDebounce(publicIdeasSearch, 500);

  // ================= PARAMS =================
  const params = useMemo(() => {
    return {
      searchTerm: debouncedSearch || "",
      categoryId: publicIdeasCategory === "all" ? "" : publicIdeasCategory,
      isPaid: publicIdeasIsPaid === "all" ? "" : publicIdeasIsPaid,
      sortBy: publicIdeasSortBy,
      page: publicIdeasPage,
      limit: 10,
    };
  }, [
    debouncedSearch,
    publicIdeasCategory,
    publicIdeasIsPaid,
    publicIdeasSortBy,
    publicIdeasPage,
  ]);

  const { data, isLoading } = useIdeas(params);
  const { data: categories } = useCategories();

  const ideas = data?.data ?? [];
  const meta = data?.meta;

  // ================= SYNC URL -> ZUSTAND =================
  useEffect(() => {
    const urlSearch = searchParams.get("searchTerm") || "";
    const urlCategory = searchParams.get("categoryId") || "all";
    const urlIsPaid = searchParams.get("isPaid") || "all";
    const urlSortBy = searchParams.get("sortBy") || "latest";
    const urlPage = Number(searchParams.get("page") || 1);

    if (urlSearch !== publicIdeasSearch) setPublicIdeasSearch(urlSearch);
    if (urlCategory !== publicIdeasCategory)
      setPublicIdeasCategory(urlCategory);
    if (urlIsPaid !== publicIdeasIsPaid) setPublicIdeasIsPaid(urlIsPaid);
    if (urlSortBy !== publicIdeasSortBy) setPublicIdeasSortBy(urlSortBy);
    if (urlPage !== publicIdeasPage) setPublicIdeasPage(urlPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // ================= SYNC ZUSTAND -> URL =================
  useEffect(() => {
    const newParams = new URLSearchParams();
    if (publicIdeasSearch) newParams.set("searchTerm", publicIdeasSearch);
    if (publicIdeasCategory !== "all")
      newParams.set("categoryId", publicIdeasCategory);
    if (publicIdeasIsPaid !== "all") newParams.set("isPaid", publicIdeasIsPaid);
    if (publicIdeasSortBy !== "latest")
      newParams.set("sortBy", publicIdeasSortBy);
    if (publicIdeasPage > 1) newParams.set("page", String(publicIdeasPage));

    const currentParams = searchParams.toString();
    const newParamsStr = newParams.toString();

    if (currentParams !== newParamsStr) {
      router.replace(`/ideas?${newParamsStr}`, { scroll: false });
    }
  }, [
    publicIdeasSearch,
    publicIdeasCategory,
    publicIdeasIsPaid,
    publicIdeasSortBy,
    publicIdeasPage,
    router,
    searchParams,
  ]);

  const resetFilters = () => {
    resetPublicIdeasFilters();
    setIsFilterSidebarOpen(false);
  };

  const IdeaCardSkeleton = () => (
    <div className="p-4 border border-border rounded-xl space-y-3 animate-pulse">
      <div className="h-4 w-2/3 bg-muted rounded" />
      <div className="h-3 w-full bg-muted rounded" />
      <div className="h-3 w-5/6 bg-muted rounded" />
    </div>
  );

  return (
    <div className="w-full relative">
      {/* FLOATING BUTTON (MOBILE) */}
      <CustomButton
        onClick={() => setIsFilterSidebarOpen(true)}
        className="fixed top-20 right-6 z-50 lg:hidden p-4 rounded-full shadow-lg"
      >
        <Filter size={20} />
        <span>Filters</span>
      </CustomButton>

      {/* OVERLAY */}
      {isFilterSidebarOpen && (
        <div
          onClick={() => setIsFilterSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* ================= SIDEBAR (UNCHANGED UI) ================= */}
        <div
          className={`
            fixed lg:static top-0 left-0 h-full lg:h-auto
            w-80 bg-background lg:bg-card z-50 lg:z-10 p-5 space-y-5 shadow-xl
            transform transition-transform duration-300
            ${isFilterSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 lg:w-72 lg:sticky lg:top-24
          `}
        >
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl">Filters</h2>

            <button
              onClick={() => setIsFilterSidebarOpen(false)}
              className="lg:hidden p-2 rounded hover:bg-muted"
            >
              <X size={18} />
            </button>
          </div>

          {/* SEARCH */}
          <div>
            <label className="text-sm mb-1 block">Search Ideas</label>
            <CustomInput
              value={publicIdeasSearch}
              onChange={(e) => setPublicIdeasSearch(e.target.value)}
              placeholder="Search ideas..."
            />
          </div>

          {/* SORT */}
          <Select
            value={publicIdeasSortBy}
            onValueChange={(value) => setPublicIdeasSortBy(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort Ideas" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="latest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="top_voted">Top Voted</SelectItem>
              <SelectItem value="most_commented">Most Commented</SelectItem>
            </SelectContent>
          </Select>

          {/* CATEGORY */}
          <Select
            value={publicIdeasCategory}
            onValueChange={(value) => setPublicIdeasCategory(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>

              {categories?.data?.map((cat: any) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* PAID / FREE */}
          <Select
            value={publicIdeasIsPaid}
            onValueChange={(value) => setPublicIdeasIsPaid(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pricing" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Ideas</SelectItem>
              <SelectItem value="true">Premium Ideas</SelectItem>
              <SelectItem value="false">Free Ideas</SelectItem>
            </SelectContent>
          </Select>

          {/* RESET */}
          <CustomButton onClick={resetFilters} className="w-full">
            Clear Filters
          </CustomButton>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex-1 space-y-6 w-full">
          <p className="text-sm text-muted-foreground">
            Showing {ideas.length} of {meta?.total || 0}
          </p>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <IdeaCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ideas.map((idea: any) => (
                <IdeaCard key={idea.id} idea={idea} />
              ))}
            </div>
          )}

          {/* ================= PAGINATION (ORIGINAL UI) ================= */}
          {meta && (
            <Pagination
              meta={{ page: publicIdeasPage, totalPages: meta.totalPages }}
              onPageChange={(page) => setPublicIdeasPage(page)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

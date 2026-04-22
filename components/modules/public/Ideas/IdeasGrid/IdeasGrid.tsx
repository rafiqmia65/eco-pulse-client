/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useIdeas } from "@/app/(PublicLayout)/ideas/_actions";
import { useCategories } from "@/hooks/useCategories";
import IdeaCard from "./IdeaCard/IdeaCard";
import { useState, useEffect, useCallback, useMemo } from "react";
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

export default function IdeasGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);

  // ================= PARAMS =================
  const params = useMemo(() => {
    return {
      searchTerm: searchParams.get("searchTerm") || "",
      categoryId: searchParams.get("categoryId") || "",
      isPaid: searchParams.get("isPaid") || "",
      sortBy: searchParams.get("sortBy") || "latest",
      page: Number(searchParams.get("page") || 1),
      limit: 10,
    };
  }, [searchParams]);

  const { data, isLoading } = useIdeas(params);
  const { data: categories } = useCategories();

  const ideas = data?.data ?? [];
  const meta = data?.meta;

  const [search, setSearch] = useState(params.searchTerm);
  const [debouncedSearch, setDebouncedSearch] = useState(params.searchTerm);

  // ================= SEARCH DEBOUNCE =================
  useEffect(() => {
    const delay = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(delay);
  }, [search]);

  // ================= FIXED QUERY UPDATE =================
  const updateQuery = useCallback(
    (key: string, value: string) => {
      const newParams = new URLSearchParams(searchParams.toString());

      if (!value) newParams.delete(key);
      else newParams.set(key, value);

      // FIX: pagination click  page reset
      if (key !== "page") {
        newParams.set("page", "1");
      }

      router.replace(`/ideas?${newParams.toString()}`, {
        scroll: false,
      });
    },
    [router, searchParams],
  );

  // ================= SYNC SEARCH =================
  useEffect(() => {
    if (debouncedSearch !== params.searchTerm) {
      updateQuery("searchTerm", debouncedSearch);
    }
  }, [debouncedSearch, params.searchTerm, updateQuery]);

  // ================= RESET =================
  const resetFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    router.replace("/ideas", { scroll: false });
    setOpen(false);
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
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 lg:hidden p-4 rounded-full shadow-lg"
      >
        <Filter size={20} />
      </CustomButton>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
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
            ${open ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 lg:w-72 lg:sticky lg:top-24
          `}
        >
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl">Filters</h2>

            <button
              onClick={() => setOpen(false)}
              className="lg:hidden p-2 rounded hover:bg-muted"
            >
              <X size={18} />
            </button>
          </div>

          {/* SEARCH */}
          <div>
            <label className="text-sm mb-1 block">Search Ideas</label>
            <CustomInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ideas..."
            />
          </div>

          {/* SORT */}
          <Select
            value={params.sortBy}
            onValueChange={(value) => updateQuery("sortBy", value)}
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
            value={params.categoryId || "all"}
            onValueChange={(value) =>
              updateQuery("categoryId", value === "all" ? "" : value)
            }
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
            value={params.isPaid || "all"}
            onValueChange={(value) =>
              updateQuery("isPaid", value === "all" ? "" : value)
            }
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
              meta={meta}
              onPageChange={(page) => updateQuery("page", String(page))}
            />
          )}
        </div>
      </div>
    </div>
  );
}

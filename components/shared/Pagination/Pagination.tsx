"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePagination } from "@/hooks/usePagination";

type Props = {
  meta: {
    page: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
};

export default function Pagination({ meta, onPageChange }: Props) {
  const { currentPage, pages, isFirstPage, isLastPage, prevPage, nextPage } =
    usePagination(meta);

  return (
    <div className="flex justify-center items-center gap-2 pt-6 flex-wrap">
      {/* PREV */}
      <button
        disabled={isFirstPage}
        onClick={() => onPageChange(prevPage)}
        className="flex items-center gap-1 px-3 py-1.5 border rounded-lg text-sm 
        hover:bg-muted transition-all duration-200 
        disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={14} />
        Prev
      </button>

      {/* PAGES */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={i} className="px-2 text-muted-foreground">
            ...
          </span>
        ) : (
          <button
            key={i}
            onClick={() => onPageChange(Number(p))}
            className={`px-3 py-1.5 border rounded-lg text-sm transition-all duration-200
            ${
              currentPage === p
                ? "bg-primary text-primary-foreground border-primary shadow-md ring-2 ring-primary/40 scale-105"
                : "hover:bg-muted"
            }`}
          >
            {p}
          </button>
        ),
      )}

      {/* NEXT */}
      <button
        disabled={isLastPage}
        onClick={() => onPageChange(nextPage)}
        className="flex items-center gap-1 px-3 py-1.5 border rounded-lg text-sm 
        hover:bg-muted transition-all duration-200 
        disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

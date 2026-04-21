"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type Meta = {
  page: number;
  totalPages: number;
};

export default function CommentPagination({
  meta,
  onPageChange,
}: {
  meta: Meta;
  onPageChange: (page: number) => void;
}) {
  // ================= PAGE GENERATOR =================
  const generatePages = () => {
    const total = meta?.totalPages || 1;
    const current = meta?.page || 1;
    const pages: (number | string)[] = [];

    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);

      if (current > 3) pages.push("...");

      for (
        let i = Math.max(2, current - 1);
        i <= Math.min(total - 1, current + 1);
        i++
      ) {
        pages.push(i);
      }

      if (current < total - 2) pages.push("...");

      pages.push(total);
    }

    return pages;
  };

  // ================= UI =================
  return (
    <div className="flex justify-center items-center gap-2 pt-6 flex-wrap">
      {/* PREV */}
      <button
        disabled={meta.page === 1}
        onClick={() => onPageChange(meta.page - 1)}
        className="flex items-center gap-1 px-3 py-1.5 border rounded-lg text-sm 
        hover:bg-muted transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={14} />
        Prev
      </button>

      {/* PAGE NUMBERS */}
      {generatePages().map((p, i) =>
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
              meta.page === p
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
        disabled={meta.page === meta.totalPages}
        onClick={() => onPageChange(meta.page + 1)}
        className="flex items-center gap-1 px-3 py-1.5 border rounded-lg text-sm 
        hover:bg-muted transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

import { useMemo } from "react";

type PaginationMeta = {
  page: number;
  totalPages: number;
};

export const usePagination = (meta?: PaginationMeta) => {
  const currentPage = meta?.page || 1;
  const totalPages = meta?.totalPages || 1;

  // ================= PAGE GENERATOR =================
  const pages = useMemo(() => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  // ================= HELPERS =================
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return {
    currentPage,
    totalPages,
    pages,

    isFirstPage,
    isLastPage,

    prevPage,
    nextPage,
  };
};

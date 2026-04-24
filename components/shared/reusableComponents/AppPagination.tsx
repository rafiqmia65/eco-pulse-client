import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePagination } from "@/hooks/usePagination";
import { cn } from "@/lib/utils";

interface AppPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const AppPagination: React.FC<AppPaginationProps> = ({
  page,
  totalPages,
  onPageChange,
  className,
}) => {
  const { pages, isFirstPage, isLastPage, prevPage, nextPage } = usePagination({
    page,
    totalPages,
  });

  if (totalPages <= 1) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 mt-8 pb-4",
        className,
      )}
    >
      <button
        onClick={() => onPageChange(prevPage)}
        disabled={isFirstPage}
        className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2">
        {pages.map((p, idx) => (
          <React.Fragment key={idx}>
            {p === "..." ? (
              <span className="w-10 h-10 flex items-center justify-center text-muted-foreground">
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(p as number)}
                className={cn(
                  "w-10 h-10 rounded-xl border flex items-center justify-center font-medium transition-colors",
                  page === p
                    ? "bg-primary text-primary-foreground border-primary"
                    : "hover:bg-muted",
                )}
              >
                {p}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      <button
        onClick={() => onPageChange(nextPage)}
        disabled={isLastPage}
        className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default AppPagination;

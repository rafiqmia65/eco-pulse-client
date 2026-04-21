"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CommentPagination from "./CommentPagination";

export default function CommentPaginationClient({
  meta,
}: {
  meta: { page: number; totalPages: number };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return <CommentPagination meta={meta} onPageChange={handlePageChange} />;
}

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const AIAnalyticsSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-9 w-64 rounded-xl" />
          <Skeleton className="h-5 w-96 rounded-lg" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-24 rounded-xl" />
          <Skeleton className="h-12 w-12 rounded-2xl" />
        </div>
      </div>

      {/* KPI Cards Skeleton (5 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>

      {/* Charts Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Skeleton className="h-[380px] rounded-2xl" />
        </div>
        <div>
          <Skeleton className="h-[380px] rounded-2xl" />
        </div>
      </div>

      {/* Top Users & Logs Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <Skeleton className="h-[450px] rounded-2xl" />
        </div>
        <div className="lg:col-span-2">
          <Skeleton className="h-[450px] rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default AIAnalyticsSkeleton;

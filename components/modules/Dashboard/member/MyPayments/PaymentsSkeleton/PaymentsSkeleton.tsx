import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const PaymentsSkeleton = () => (
  <div className="space-y-8">
    <div className="flex justify-between items-end">
      <div className="space-y-3">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      <Skeleton className="h-12 w-12 rounded-2xl" />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-full rounded-2xl" />
      ))}
    </div>

    <Card className="border-border/50 shadow-sm overflow-hidden bg-card/50 backdrop-blur-xs rounded-2xl">
      <div className="h-14 bg-muted/20 border-b px-6 flex items-center">
        <Skeleton className="h-5 w-40" />
      </div>
      <div className="p-6 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    </Card>
  </div>
);

export default PaymentsSkeleton;

import { Skeleton } from "@/components/ui/skeleton";

export default function IdeaCardSkeleton() {
  return (
    <div className="bg-card border border-border overflow-hidden shadow-custom flex flex-col h-[500px]">
      <Skeleton className="h-44 w-full" />
      <div className="p-5 flex flex-col gap-4 flex-1">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex justify-between mt-auto">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-border/60 mt-4">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-1/3 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function IdeaGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <IdeaCardSkeleton key={i} />
      ))}
    </div>
  );
}

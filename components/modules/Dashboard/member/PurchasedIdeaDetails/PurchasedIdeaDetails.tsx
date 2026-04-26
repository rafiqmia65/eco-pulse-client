"use client";

import React from "react";
import { usePurchasedIdeaDetails } from "@/app/(DashboardLayout)/dashboard/idea-details/[id]/_actions";
import CommentsSection from "@/components/shared/Comments/CommentsSection";
import IdeaContent from "./IdeaContent/IdeaContent";
import { RoleType } from "@/constants/roles";
import { Skeleton } from "@/components/ui/skeleton";
import IdeaHeader from "./IdeaHeader/IdeaHeader";

interface PurchasedIdeaDetailsProps {
  id: string;
  currentUserId?: string;
  currentUserRole?: RoleType;
}

const PurchasedIdeaDetails: React.FC<PurchasedIdeaDetailsProps> = ({
  id,
  currentUserId,
  currentUserRole,
}) => {
  const { data, isLoading } = usePurchasedIdeaDetails(id);
  const idea = data?.data;

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10 animate-pulse">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-1/4" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <Skeleton className="h-100 w-full rounded-3xl" />
            <Skeleton className="h-64 w-full rounded-3xl" />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <Skeleton className="h-80 w-full rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 text-center">
        <h2 className="text-2xl font-bold">Idea Not Found</h2>
        <p className="text-muted-foreground mt-2">
          We couldn&apos;t load the details for this idea.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* HEADER */}
      <IdeaHeader idea={idea} />

      {/* MAIN GRID */}
      <div className="mt-8">
        <IdeaContent idea={idea} />
      </div>
      <CommentsSection
        ideaId={idea.id}
        currentUserId={currentUserId}
        currentUserRole={currentUserRole}
      />
    </>
  );
};

export default PurchasedIdeaDetails;

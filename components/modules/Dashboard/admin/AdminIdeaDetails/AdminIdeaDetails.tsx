"use client";

import React from "react";
import { useAdminIdeaDetails } from "@/app/(DashboardLayout)/admin/ideas/[id]/_actions";
import { useParams } from "next/navigation";
import IdeaHeader from "./IdeaHeader/IdeaHeader";
import IdeaContent from "./IdeaContent/IdeaContent";
import StatsBar from "./StatsBar/StatsBar";
import IdeaMeta from "./IdeaMeta/IdeaMeta";
import CommentsSection from "@/components/shared/Comments/CommentsSection";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AdminIdeaActions from "../../../../shared/AdminIdeaActions/AdminIdeaActions";
import { AuthUser } from "@/types/auth.types";

const AdminIdeaDetails = ({ user }: { user: AuthUser | null }) => {
  const { id } = useParams();
  const {
    data: idea,
    isLoading,
    isError,
    refetch,
  } = useAdminIdeaDetails(id as string);

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <Skeleton className="h-100 w-full rounded-3xl" />
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
        <div className="space-y-4">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError || !idea) {
    return (
      <div className="min-h-125 flex flex-col items-center justify-center text-center p-8 bg-card rounded-3xl border border-dashed border-border/60">
        <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="text-rose-500 w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Failed to load idea details</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Something went wrong while fetching the idea information. It might
          have been removed or you may not have permission to view it.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => refetch()} variant="outline" className="gap-2">
            <RefreshCcw size={16} /> Retry
          </Button>
          <Button asChild>
            <Link href="/admin/all-ideas">Back to All Ideas</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <IdeaHeader idea={idea} />
      <div className="mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
          <IdeaMeta idea={idea} />
          <StatsBar idea={idea} />
          <AdminIdeaActions
            ideaId={idea.id}
            status={idea.status}
            variant="sidebar"
          />
        </div>
      </div>

      <div className="mt-8">
        <IdeaContent idea={idea} />
      </div>

      <CommentsSection
        ideaId={idea.id}
        currentUserId={user?.id}
        currentUserRole={user?.role}
      />
    </div>
  );
};

export default AdminIdeaDetails;

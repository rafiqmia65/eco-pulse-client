"use client";

import React from "react";
import { RoleType } from "@/constants/roles";

import CommentsSection from "@/components/shared/Comments/CommentsSection";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import IdeaHeader from "./IdeaHeader/IdeaHeader";
import IdeaActions from "./IdeaActions/IdeaActions";
import IdeaMeta from "./IdeaMeta/IdeaMeta";
import { IIdeaDetailsByOwner } from "@/types/memberTypes/IdeaDetailsByOwner.types";
import { useMySingleIdea } from "@/app/(DashboardLayout)/dashboard/_actions";
import StatsBar from "./StatsBar/StatsBar";
import { AlertTriangle, MessageSquareWarning } from "lucide-react";
import IdeaDetailContent from "./IdeaDetailContent/IdeaDetailContent";
import IdeaAnalysisPanel from "@/components/shared/IdeaAnalysis/IdeaAnalysisPanel";

interface Props {
  id: string;
  currentUserId?: string;
  currentUserRole?: RoleType;
}

export default function IdeaDetailsByOwner({
  id,
  currentUserId,
  currentUserRole,
}: Props) {
  const { data: response, isLoading, isError } = useMySingleIdea(id);
  const idea = response?.data as IIdeaDetailsByOwner;

  if (isLoading) return <IdeaDetailsSkeleton />;

  if (isError || !idea) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-xl font-semibold">Idea not found</h2>
        <Link
          href="/dashboard/my-ideas"
          className="text-primary mt-2 hover:underline"
        >
          Back to My Ideas
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <IdeaHeader idea={idea} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 items-stretch">
        <IdeaMeta idea={idea} />
        <StatsBar idea={idea} />
        <IdeaActions idea={idea} />
      </div>

      {/* AI ANALYSIS PANEL */}
      <div className="mt-6">
        <IdeaAnalysisPanel ideaId={idea.id} isOwnerOrAdmin={true} />
      </div>

      {idea.feedback && (
        <div className="relative overflow-hidden rounded-2xl border border-red-200/40 dark:border-red-900/40 bg-red-50/40 dark:bg-red-950/20 p-5 shadow-sm">
          {/* top status bar */}
          <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-red-500 to-rose-500" />

          <div className="flex items-start gap-3">
            {/* icon */}
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-bold text-red-700 dark:text-red-300 flex items-center gap-2">
                Rejected by Admin
              </p>

              <p className="text-xs text-muted-foreground mt-1">
                This idea was reviewed and did not meet platform quality or
                guideline requirements.
              </p>

              {/* feedback box */}
              <div className="mt-3 p-4 rounded-xl bg-white/60 dark:bg-black/20 border border-red-100 dark:border-red-900/30">
                <div className="flex items-center gap-2 mb-2 text-red-500">
                  <MessageSquareWarning className="w-4 h-4" />
                  <span className="text-[11px] uppercase tracking-wider font-semibold">
                    Admin Feedback
                  </span>
                </div>

                <p className="text-sm italic text-red-900 dark:text-red-200 leading-relaxed">
                  “{idea.feedback.message}”
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <IdeaDetailContent idea={idea} />
      </div>

      <CommentsSection
        ideaId={idea.id}
        currentUserId={currentUserId}
        currentUserRole={currentUserRole}
      />
    </div>
  );
}

function IdeaDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8 animate-pulse">
      <Skeleton className="h-75 w-full rounded-3xl" />
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-24 w-full rounded-2xl" />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          <Skeleton className="h-10 w-64 rounded-lg" />
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

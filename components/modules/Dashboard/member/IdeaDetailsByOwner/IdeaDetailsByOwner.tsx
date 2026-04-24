"use client";

import React, { useState } from "react";
import { RoleType } from "@/constants/roles";

import CommentsSection from "@/components/shared/Comments/CommentsSection";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Section from "@/components/shared/reusableComponents/Section";
import { useMySingleIdea } from "@/app/(DashboardLayout)/dashboard/ideas/[id]/_actions";
import IdeaHeader from "./IdeaHeader/IdeaHeader";
import IdeaActions from "./IdeaActions/IdeaActions";
import IdeaMeta from "./IdeaMeta/IdeaMeta";
import IdeaContent from "./IdeaContent/IdeaContent";
import { IIdeaDetailsByOwner } from "@/types/memberTypes/IdeaDetailsByOwner.types";

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

  const [activeTab, setActiveTab] = useState<"overview" | "discussion">(
    "overview",
  );

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
    <Section>
      {/* Header */}
      <IdeaHeader idea={idea} />

      {/* Stats Bar */}
      <div className="grid mt-8 grid-cols-2 md:grid-cols-4 gap-4">
        <Stat
          label="Upvotes"
          value={idea.upvotesCount}
          color="text-emerald-600"
        />
        <Stat
          label="Downvotes"
          value={idea.downvotesCount}
          color="text-rose-600"
        />
        <Stat
          label="Comments"
          value={idea.commentsCount}
          color="text-blue-600"
        />
        <Stat
          label="Engagement"
          value={idea.votesCount}
          color="text-amber-600"
        />
      </div>
      {/* Sidebar Area: Action and Overview (Meta) in same column/grid */}
      <div className="md:flex justify-between mt-8 gap-4">
        <IdeaActions idea={idea} />
        <IdeaMeta idea={idea} />
      </div>

      {/* Tabs */}
      <div className="border-b mt-8 flex gap-8 text-sm font-medium">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-4 border-b-2 transition-all duration-300 ${
            activeTab === "overview"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Project Overview
        </button>

        <button
          onClick={() => setActiveTab("discussion")}
          className={`pb-4 border-b-2 transition-all duration-300 ${
            activeTab === "discussion"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Discussion ({idea.commentsCount})
        </button>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        {activeTab === "overview" ? (
          <IdeaContent idea={idea} />
        ) : (
          <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
            <CommentsSection
              ideaId={idea.id}
              currentUserId={currentUserId}
              currentUserRole={currentUserRole}
            />
          </div>
        )}
      </div>
    </Section>
  );
}

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="bg-card border border-border/50 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all duration-300 group">
      <p className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground group-hover:text-primary transition-colors">
        {label}
      </p>
      <p className={`font-black text-2xl mt-1 ${color || "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}

function IdeaDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8 animate-pulse">
      <Skeleton className="h-[300px] w-full rounded-3xl" />
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

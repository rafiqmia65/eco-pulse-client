"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { DashboardStats } from "@/types/memberTypes/DashboardStats.types";
import { useUserStats } from "@/app/(DashboardLayout)/dashboard/_actions";
import { StatsGrid } from "./dashboardContent/StatsGrid";
import { IdeaStatusChart } from "./dashboardContent/IdeaStatusChart";
import { ActivityCharts } from "./dashboardContent/ActivityCharts";
import { EngagementOverview } from "./dashboardContent/EngagementOverview";
import { BestIdeaCard } from "./dashboardContent/BestIdeaCard";
import { RecentPurchasesTable } from "./dashboardContent/RecentPurchasesTable";

/**
 * MemberDashboard Module
 * The primary view for members, orchestrating stats, charts, and activity tables.
 * Uses a flexible flex-col layout with standardized gaps to prevent overlap.
 */
export default function MemberDashboard() {
  const { data, isLoading, isError } = useUserStats();
  const stats = data as DashboardStats;

  if (isLoading) {
    return (
      <div className="space-y-8 p-4 md:p-0">
        <Skeleton className="h-10 w-48" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-87.5 w-full rounded-2xl" />
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold">Dashboard Load Failed</h2>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary text-white rounded-xl"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-primary bg-clip-text">
            Dashboard Analytics
          </h1>
          <p className="text-muted-foreground mt-1 text-lg font-medium">
            Monitor your ideas, performance & investments
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
            Live Updates
          </span>
        </div>
      </div>

      {/* Stats Section */}
      <section>
        <StatsGrid stats={stats} />
      </section>

      {/* Charts & Engagement Section */}
      <section className="grid gap-8 lg:grid-cols-3 items-start">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <IdeaStatusChart ideas={stats.ideas} />
          <ActivityCharts
            spendingData={stats.spending.last7Days}
            ideasData={stats.charts.ideasLast7Days}
          />
        </div>

        <div className="flex flex-col gap-8">
          <EngagementOverview
            engagement={stats.engagement}
            performance={stats.performance}
          />
          <BestIdeaCard bestIdea={stats.bestIdea} />
        </div>
      </section>

      {/* Activity Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 px-1">
          <div className="h-6 w-1 bg-primary rounded-full" />
          <h2 className="text-2xl font-bold tracking-tight">Recent Activity</h2>
        </div>
        <RecentPurchasesTable purchases={stats.recentPurchases} />
      </section>
    </div>
  );
}

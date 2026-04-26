"use client";

import React from "react";
import { useAdminStats } from "@/app/(DashboardLayout)/admin/_actions";
import { LayoutDashboard, RefreshCcw } from "lucide-react";
import AdminOverviewSkeleton from "./AdminOverviewSkeleton";
import StatCards from "./StatCards";
import RevenueChart from "./RevenueChart";
import IdeasChart from "./IdeasChart";
import TopIdeasLists from "./TopIdeasLists";
import DetailedBreakdown from "./DetailedBreakdown";
import { Button } from "@/components/ui/button";

const AdminOverview = () => {
  const {
    data: response,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useAdminStats();

  if (isLoading) return <AdminOverviewSkeleton />;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-rose-500 font-medium text-lg">
          Failed to load admin stats
        </p>
        <Button variant="outline" onClick={() => refetch()} className="gap-2">
          <RefreshCcw
            className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Try Again
        </Button>
      </div>
    );
  }

  const data = response?.data;

  if (!data) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
            Admin Overview
          </h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Detailed insights into users, ideas, and financial performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
            <LayoutDashboard className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>

      {/* Main Stats Cards */}
      <StatCards data={data} />

      {/* Detailed Breakdown Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight px-1">
          Detailed Metrics
        </h2>
        <DetailedBreakdown data={data} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={data.revenue.last7Days} />
        <IdeasChart data={data.charts.ideasLast7Days} />
      </div>

      {/* Top Performing Content */}
      <TopIdeasLists
        voted={data.topIdeas.mostVoted}
        purchased={data.topIdeas.mostPurchased}
      />
    </div>
  );
};

export default AdminOverview;

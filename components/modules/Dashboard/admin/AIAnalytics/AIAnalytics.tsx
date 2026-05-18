"use client";

import React from "react";
import { RefreshCcw, AlertTriangle } from "lucide-react";
import { useAdminAIStats } from "@/app/(DashboardLayout)/admin/ai-analytics/_actions";
import { Button } from "@/components/ui/button";

import AIAnalyticsSkeleton from "./AIAnalyticsSkeleton";
import AIAnalyticsHeader from "./AIAnalyticsHeader";
import AIAnalyticsStats from "./AIAnalyticsStats";
import AIAnalyticsCharts from "./AIAnalyticsCharts";
import AITopUsers from "./AITopUsers";
import AILogsTable from "./AILogsTable";

const AIAnalytics = () => {
  const {
    data: response,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useAdminAIStats();

  // Loading skeleton screen
  if (isLoading) return <AIAnalyticsSkeleton />;

  // System exception loading screen
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center space-y-5 rounded-2xl border border-rose-500/20 bg-rose-500/5 backdrop-blur-xs">
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-full animate-bounce">
          <AlertTriangle className="w-8 h-8 text-rose-500" />
        </div>
        <div className="space-y-1.5 max-w-md">
          <h2 className="text-lg font-bold text-foreground">
            Failed to Synchronize AI Analytics
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The platform is unable to establish an administrative connection with the backend AI service logs. Please check your credentials or backend server status.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
          className="h-10 px-5 rounded-xl border-rose-500/25 text-rose-500 hover:bg-rose-500/10 active:scale-95 transition-all gap-2"
        >
          <RefreshCcw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
          Retry Connection
        </Button>
      </div>
    );
  }

  const data = response?.data;

  // Render nothing if response is empty
  if (!data) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Dynamic Header */}
      <AIAnalyticsHeader isFetching={isFetching} onRefresh={refetch} />

      {/* KPI Cards Summary Grid */}
      <AIAnalyticsStats totals={data.totals} />

      {/* Analytical Area and Bar Charts */}
      <AIAnalyticsCharts
        trendData={data.usageTrends.dailyUsageChart}
        featureData={data.featureAnalytics.features}
      />

      {/* Top Consumers and Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <AITopUsers
            topUsers={data.userAnalytics.topUsers}
            recentLogs={data.recentLogs}
          />
        </div>
        <div className="lg:col-span-2">
          <AILogsTable
            recentLogs={data.recentLogs}
            errorLogs={data.apiErrorLogs}
          />
        </div>
      </div>
    </div>
  );
};

export default AIAnalytics;

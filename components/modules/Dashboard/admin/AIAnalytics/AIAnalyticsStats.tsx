"use client";

import React from "react";
import { Activity, Cpu, DollarSign, Zap, Users } from "lucide-react";
import { IAdminAITotals } from "@/types/adminTypes/adminAIStats.types";
import { Card, CardContent } from "@/components/ui/card";

interface AIAnalyticsStatsProps {
  totals: IAdminAITotals;
}

const AIAnalyticsStats = ({ totals }: AIAnalyticsStatsProps) => {
  const {
    totalRequests,
    totalInputTokens,
    totalOutputTokens,
    totalTokenUsage,
    estimatedCost,
    averageResponseTime,
    successRate,
    failedRequestsCount,
    activeAIUsers,
  } = totals;

  // Determine speed rating
  const getSpeedLabel = (timeMs: number) => {
    if (timeMs === 0) return { label: "N/A", color: "bg-muted text-muted-foreground" };
    if (timeMs < 1000) return { label: "Fast", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" };
    if (timeMs < 3000) return { label: "Good", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" };
    return { label: "Slow", color: "bg-rose-500/10 text-rose-500 border-rose-500/20" };
  };

  const speedInfo = getSpeedLabel(averageResponseTime);

  // Formatting large numbers with commas
  const formatNum = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const statsConfig = [
    {
      title: "Total AI Requests",
      value: formatNum(totalRequests),
      icon: Activity,
      iconColor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
      description: (
        <div className="flex items-center justify-between text-xs mt-2 w-full">
          <span className="text-muted-foreground">Success Rate:</span>
          <span className="font-semibold text-emerald-500">{successRate}%</span>
        </div>
      ),
      subInfo: (
        <div className="text-[10px] text-muted-foreground/70 flex items-center justify-between mt-1 pt-1 border-t border-border/20">
          <span>Failed Queries:</span>
          <span className="font-medium text-rose-500">{failedRequestsCount}</span>
        </div>
      ),
    },
    {
      title: "Tokens Utilized",
      value: formatNum(totalTokenUsage),
      icon: Cpu,
      iconColor: "text-violet-500 bg-violet-500/10 border-violet-500/20",
      description: (
        <div className="mt-2 space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground/80">Input Tokens:</span>
            <span className="font-medium">{formatNum(totalInputTokens)}</span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-500 rounded-full transition-all duration-500"
              style={{
                width: `${totalTokenUsage > 0 ? (totalInputTokens / totalTokenUsage) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      ),
      subInfo: (
        <div className="text-[10px] text-muted-foreground/70 flex items-center justify-between mt-1 pt-1 border-t border-border/20">
          <span>Output (Gen):</span>
          <span>{formatNum(totalOutputTokens)}</span>
        </div>
      ),
    },
    {
      title: "Estimated Cost",
      value: `$${estimatedCost.toFixed(4)}`,
      icon: DollarSign,
      iconColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      description: (
        <div className="flex items-center justify-between text-xs mt-2 w-full">
          <span className="text-muted-foreground">Rate:</span>
          <span className="font-mono text-muted-foreground/90">$0.003 / 1k tkn</span>
        </div>
      ),
      subInfo: (
        <div className="text-[10px] text-muted-foreground/70 flex items-center justify-between mt-1 pt-1 border-t border-border/20">
          <span>Usage Class:</span>
          <span className="text-emerald-500 font-medium">Standard USD</span>
        </div>
      ),
    },
    {
      title: "Avg Latency",
      value: averageResponseTime ? `${formatNum(averageResponseTime)}ms` : "0ms",
      icon: Zap,
      iconColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
      description: (
        <div className="flex items-center justify-between text-xs mt-2 w-full">
          <span className="text-muted-foreground">Performance:</span>
          <span className={`px-2 py-0.2 text-[10px] rounded-md border font-semibold ${speedInfo.color}`}>
            {speedInfo.label}
          </span>
        </div>
      ),
      subInfo: (
        <div className="text-[10px] text-muted-foreground/70 flex items-center justify-between mt-1 pt-1 border-t border-border/20">
          <span>Response Quality:</span>
          <span className="font-medium text-amber-500">Optimized</span>
        </div>
      ),
    },
    {
      title: "Active AI Users",
      value: activeAIUsers.toString(),
      icon: Users,
      iconColor: "text-rose-500 bg-rose-500/10 border-rose-500/20",
      description: (
        <div className="flex items-center justify-between text-xs mt-2 w-full">
          <span className="text-muted-foreground">Engaged Members:</span>
          <span className="font-semibold text-rose-500">
            {totalRequests && activeAIUsers ? (totalRequests / activeAIUsers).toFixed(1) : 0} req/usr
          </span>
        </div>
      ),
      subInfo: (
        <div className="text-[10px] text-muted-foreground/70 flex items-center justify-between mt-1 pt-1 border-t border-border/20">
          <span>Access Scope:</span>
          <span className="font-medium text-rose-500">All Roles</span>
        </div>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {statsConfig.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card
            key={idx}
            className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-xs shadow-xs hover:shadow-md hover:border-border/80 transition-all duration-300 group overflow-hidden"
          >
            <CardContent className="p-4 flex flex-col justify-between h-full min-h-[140px]">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-muted-foreground/80 group-hover:text-muted-foreground tracking-tight">
                    {stat.title}
                  </span>
                  <div className={`p-2 rounded-xl border transition-colors ${stat.iconColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="mt-2">
                  <h3 className="text-2xl font-bold tracking-tight font-mono text-foreground">
                    {stat.value}
                  </h3>
                </div>
              </div>

              <div>
                {stat.description}
                {stat.subInfo}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AIAnalyticsStats;

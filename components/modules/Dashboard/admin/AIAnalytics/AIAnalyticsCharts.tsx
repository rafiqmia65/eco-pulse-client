"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { IUsageTrendDay, IFeatureAnalyticItem } from "@/types/adminTypes/adminAIStats.types";
import { cn } from "@/lib/utils";
import { Activity, Cpu, Users, BarChart3, TrendingUp } from "lucide-react";

interface AIAnalyticsChartsProps {
  trendData: IUsageTrendDay[];
  featureData: IFeatureAnalyticItem[];
}

type MetricType = "requests" | "tokenUsage" | "activeUsers";

const AIAnalyticsCharts = ({ trendData, featureData }: AIAnalyticsChartsProps) => {
  const [activeMetric, setActiveMetric] = useState<MetricType>("requests");

  // Colors mapping for charts
  const colors = {
    requests: {
      stroke: "hsl(var(--primary))",
      fill: "url(#colorRequests)",
      base: "hsl(var(--primary))",
      hex: "#10b981", // Emerald
      label: "Requests",
      icon: Activity,
    },
    tokenUsage: {
      stroke: "#8b5cf6", // Violet
      fill: "url(#colorTokens)",
      base: "#8b5cf6",
      hex: "#8b5cf6",
      label: "Tokens Used",
      icon: Cpu,
    },
    activeUsers: {
      stroke: "#3b82f6", // Blue
      fill: "url(#colorUsers)",
      base: "#3b82f6",
      hex: "#3b82f6",
      label: "Active Users",
      icon: Users,
    },
  };

  const currentConfig = colors[activeMetric];

  // Colors for different features in the bar chart
  const featureColors = ["#10b981", "#8b5cf6", "#3b82f6", "#f59e0b", "#ec4899", "#14b8a6"];

  // Formatter for large values
  const formatValue = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
    return val.toString();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Daily Trends Area Chart */}
      <Card className="lg:col-span-2 rounded-2xl border border-border/40 bg-card/40 backdrop-blur-xs shadow-xs overflow-hidden flex flex-col justify-between">
        <CardHeader className="pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Daily AI Usage Trends
            </CardTitle>
            <CardDescription>
              Monitor server requests, total tokens consumed, and unique users daily.
            </CardDescription>
          </div>

          {/* Metric Selector Toggles */}
          <div className="flex bg-muted/60 p-1 rounded-xl border border-border/20 self-start sm:self-center">
            {(Object.keys(colors) as MetricType[]).map((metric) => {
              const MetricIcon = colors[metric].icon;
              const isActive = activeMetric === metric;
              return (
                <button
                  key={metric}
                  onClick={() => setActiveMetric(metric)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all active:scale-95 duration-200 cursor-pointer",
                    isActive
                      ? "bg-background text-foreground shadow-xs border border-border/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/20"
                  )}
                >
                  <MetricIcon className="w-3.5 h-3.5" />
                  <span>{colors[metric].label}</span>
                </button>
              );
            })}
          </div>
        </CardHeader>

        <CardContent className="p-0 pt-4 flex-1">
          {trendData && trendData.length > 0 ? (
            <div className="h-80 w-full pr-4 pb-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={trendData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--border))"
                    opacity={0.4}
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={(dateStr) => {
                      try {
                        const date = new Date(dateStr);
                        if (isNaN(date.getTime())) return dateStr;
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      } catch {
                        return dateStr;
                      }
                    }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={formatValue}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "12px",
                      fontSize: "12px",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    }}
                    labelStyle={{ fontWeight: "bold", color: "hsl(var(--foreground))" }}
                    itemStyle={{ color: currentConfig.hex }}
                    formatter={(value: any) => [
                      new Intl.NumberFormat().format(Number(value || 0)),
                      currentConfig.label,
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey={activeMetric}
                    stroke={currentConfig.stroke}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill={currentConfig.fill}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-80 w-full flex items-center justify-center text-muted-foreground text-sm">
              No historical trends data available
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feature Distribution Horizontal Bar Chart */}
      <Card className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-xs shadow-xs overflow-hidden flex flex-col justify-between">
        <CardHeader className="pb-2">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              AI Feature Utilization
            </CardTitle>
            <CardDescription>
              Volume distributions across smart components.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-4 flex-1 flex flex-col justify-center">
          {featureData && featureData.length > 0 ? (
            <div className="space-y-6">
              {/* Chart container */}
              <div className="h-44 w-full pr-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={featureData}
                    layout="vertical"
                    margin={{ top: 0, right: 10, left: -25, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} tickFormatter={formatValue} />
                    <YAxis dataKey="feature" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(val: string) => {
                      // Formatting feature keys
                      return val.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
                    }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "12px",
                        fontSize: "11px",
                      }}
                      formatter={(value: any, name: any, props: any) => [
                        new Intl.NumberFormat().format(Number(value || 0)),
                        "Requests",
                      ]}
                    />
                    <Bar dataKey="requests" radius={[0, 4, 4, 0]} barSize={12}>
                      {featureData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={featureColors[index % featureColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Legends with detail lists */}
              <div className="space-y-2 pt-2 border-t border-border/30 max-h-40 overflow-y-auto scrollbar-thin">
                {featureData.map((item, idx) => {
                  const featureNameFormatted = item.feature
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c: string) => c.toUpperCase());
                  return (
                    <div key={item.feature} className="flex items-center justify-between text-xs py-0.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: featureColors[idx % featureColors.length] }}
                        />
                        <span className="font-medium truncate text-muted-foreground group-hover:text-foreground">
                          {featureNameFormatted}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 font-mono text-[11px] text-right">
                        <span>
                          <strong className="text-foreground">{formatValue(item.requests)}</strong> reqs
                        </span>
                        <span className="text-muted-foreground/60">|</span>
                        <span className="text-muted-foreground">
                          {formatValue(item.tokenUsage)} tkns
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="h-60 w-full flex items-center justify-center text-muted-foreground text-sm">
              No features data available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAnalyticsCharts;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, DollarSign, ShoppingBag, TrendingUp } from "lucide-react";
import { DashboardStats } from "@/types/memberTypes/DashboardStats.types";

export const StatsGrid = ({ stats }: { stats: DashboardStats }) => {
  const { ideas, earnings, spending, performance, payments } = stats;

  const statCards = [
    {
      title: "Total Ideas",
      value: ideas.total,
      icon: Lightbulb,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: `${ideas.approved} approved, ${ideas.review} in review`,
      trend: "+12% this month",
    },
    {
      title: "Total Earnings",
      value: `$${earnings.total.toLocaleString()}`,
      icon: DollarSign,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      description: "Revenue from idea sales",
      trend: "+5.4% vs last week",
    },
    {
      title: "Total Investment",
      value: `$${spending.total.toLocaleString()}`,
      icon: ShoppingBag,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
      description: `${payments.success} acquisitions`,
      trend: "Recent purchases",
    },
    {
      title: "Activity Score",
      value: performance.score,
      icon: TrendingUp,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      description: "Based on community impact",
      trend: "Top 10% of users",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, i) => (
        <Card
          key={i}
          className="relative overflow-hidden border-none shadow-sm bg-linear-to-br from-card/80 to-card/40 backdrop-blur-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
        >
          <div
            className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full ${stat.bgColor} blur-2xl group-hover:scale-150 transition-transform duration-500`}
          />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 z-10">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div
              className={`${stat.bgColor} p-2.5 rounded-xl transition-colors duration-300 group-hover:bg-primary/20`}
            >
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent className="z-10">
            <div className="text-3xl font-bold tracking-tight">
              {stat.value}
            </div>
            <div className="flex flex-col mt-1">
              <p className="text-xs text-muted-foreground font-medium">
                {stat.description}
              </p>
              <span className="text-[10px] text-primary/70 font-semibold uppercase tracking-wider mt-2">
                {stat.trend}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

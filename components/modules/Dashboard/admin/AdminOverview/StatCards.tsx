"use client";

import React, { ReactNode } from "react";
import { Users, Lightbulb, CreditCard, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { IAdminStatsData } from "@/types/adminTypes/adminStats.types";

interface StatCardsProps {
  data: IAdminStatsData;
}

const StatCards = ({ data }: StatCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Users"
        value={data.users.total.toString()}
        subValue={`${data.users.active} active`}
        icon={<Users className="w-5 h-5 text-blue-500" />}
        color="bg-blue-500/10"
      />
      <StatCard
        title="Total Ideas"
        value={data.ideas.total.toString()}
        subValue={`${data.ideas.approved} approved`}
        icon={<Lightbulb className="w-5 h-5 text-amber-500" />}
        color="bg-amber-500/10"
      />
      <StatCard
        title="Total Revenue"
        value={`$${data.revenue.total.toFixed(2)}`}
        subValue="Lifetime earnings"
        icon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
        color="bg-emerald-500/10"
      />
      <StatCard
        title="Payments"
        value={data.payments.total.toString()}
        subValue={`${data.payments.success} successful`}
        icon={<CreditCard className="w-5 h-5 text-rose-500" />}
        color="bg-rose-500/10"
      />
    </div>
  );
};

interface CardProps {
  title: string;
  value: string;
  subValue: string;
  icon: ReactNode;
  color: string;
}

const StatCard = ({ title, value, subValue, icon, color }: CardProps) => (
  <Card className="border-border/50 shadow-xs bg-card/50 backdrop-blur-xs overflow-hidden group hover:border-primary/20 transition-all duration-300">
    <CardContent className="p-5">
      <div className="flex items-center justify-between">
        <div
          className={`p-2.5 rounded-2xl ${color} border border-white/5 transition-transform group-hover:scale-110 duration-500`}
        >
          {icon}
        </div>
        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
          {title}
        </span>
      </div>
      <div className="mt-5">
        <h3 className="text-2xl font-bold tracking-tight text-foreground">
          {value}
        </h3>
        <p className="text-[11px] text-muted-foreground mt-1 font-medium flex items-center gap-1">
          {subValue}
        </p>
      </div>
    </CardContent>
  </Card>
);

export default StatCards;

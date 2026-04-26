"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  XCircle,
} from "lucide-react";
import { IAdminIdeaCounts } from "@/types/adminTypes/adminIdeas.types";

interface ModerationStatsProps {
  counts: IAdminIdeaCounts;
  currentFilter: string;
  onFilterChange: (status: string) => void;
}

const ModerationStats = ({ counts, currentFilter, onFilterChange }: ModerationStatsProps) => {
  const stats = [
    {
      label: "Total Ideas",
      count: counts.total,
      status: "ALL",
      icon: <FileText className="w-5 h-5 text-blue-500" />,
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      label: "Pending Review",
      count: counts.review,
      status: "REVIEW",
      icon: <Clock className="w-5 h-5 text-amber-500" />,
      bg: "bg-amber-500/10",
      border: "border-amber-500/20"
    },
    {
      label: "Approved",
      count: counts.approved,
      status: "APPROVED",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    },
    {
      label: "Rejected",
      count: counts.rejected,
      status: "REJECTED",
      icon: <XCircle className="w-5 h-5 text-rose-500" />,
      bg: "bg-rose-500/10",
      border: "border-rose-500/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card 
          key={stat.label}
          className={`cursor-pointer transition-all duration-300 border backdrop-blur-xs hover:shadow-lg hover:-translate-y-1 ${
            (currentFilter === stat.status || (currentFilter === "" && stat.status === "ALL"))
              ? `${stat.border} ${stat.bg} shadow-md ring-1 ring-primary/20` 
              : "border-border/50 bg-card/50"
          }`}
          onClick={() => onFilterChange(stat.status === "ALL" ? "" : stat.status)}
        >
          <CardContent className="p-5 flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.border} border`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold tracking-tight mt-0.5">
                {stat.count}
              </h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ModerationStats;

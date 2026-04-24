import React from "react";
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

interface MyIdeasHeaderProps {
  counts: {
    total: number;
    draft: number;
    review: number;
    approved: number;
    rejected: number;
  };
}

const MyIdeasHeader: React.FC<MyIdeasHeaderProps> = ({ counts }) => {
  const stats = [
    {
      label: "Total Ideas",
      value: counts.total,
      icon: FileText,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Drafts",
      value: counts.draft,
      icon: FileText,
      color: "text-gray-500",
      bg: "bg-gray-500/10",
    },
    {
      label: "Under Review",
      value: counts.review,
      icon: Clock,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      label: "Approved",
      value: counts.approved,
      icon: CheckCircle2,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      label: "Rejected",
      value: counts.rejected,
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My All Ideas</h1>
          <p className="text-muted-foreground text-sm">
            Manage and track the status of all your submitted ideas.
          </p>
        </div>

        <Link
          href="/dashboard/ideas-create"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Create New Idea
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 border shadow-sm">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}
              >
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase">
                  {stat.label}
                </p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyIdeasHeader;

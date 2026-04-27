"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IAdminStatsData } from "@/types/adminTypes/adminStats.types";
import {
  Users,
  Lightbulb,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Lock,
  Unlock,
  DollarSign,
  Tag,
} from "lucide-react";

interface DetailedBreakdownProps {
  data: IAdminStatsData;
}

const DetailedBreakdown = ({ data }: DetailedBreakdownProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* User Status Breakdown */}
      <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur-xs shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b px-6 py-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-500" />
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <BreakdownItem
            label="Total Registered"
            value={data.users.total}
            icon={<Users className="w-3.5 h-3.5" />}
          />
          <BreakdownItem
            label="Active Accounts"
            value={data.users.active}
            icon={<Unlock className="w-3.5 h-3.5 text-emerald-500" />}
            color="text-emerald-500"
          />
          <BreakdownItem
            label="Blocked Accounts"
            value={data.users.blocked}
            icon={<Lock className="w-3.5 h-3.5 text-rose-500" />}
            color="text-rose-500"
          />
        </CardContent>
      </Card>

      {/* Idea Status Breakdown */}
      <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur-xs shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b px-6 py-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Idea Lifecycle
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <BreakdownItem
              label="Approved"
              value={data.ideas.approved}
              icon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
            />
            <BreakdownItem
              label="In Review"
              value={data.ideas.review}
              icon={<Clock className="w-3.5 h-3.5 text-blue-500" />}
            />
            <BreakdownItem
              label="Rejected"
              value={data.ideas.rejected}
              icon={<XCircle className="w-3.5 h-3.5 text-rose-500" />}
            />
            <BreakdownItem
              label="Drafts"
              value={data.ideas.draft}
              icon={<FileText className="w-3.5 h-3.5 text-muted-foreground" />}
            />
          </div>
          <div className="pt-3 border-t border-border/40 grid grid-cols-2 gap-3">
            <BreakdownItem
              label="Paid Ideas"
              value={data.ideas.paid}
              icon={<DollarSign className="w-3.5 h-3.5 text-amber-500" />}
            />
            <BreakdownItem
              label="Free Ideas"
              value={data.ideas.free}
              icon={<Tag className="w-3.5 h-3.5 text-blue-500" />}
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Status Breakdown */}
      <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur-xs shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b px-6 py-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-rose-500" />
            Financial Health
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <BreakdownItem
            label="Success Payments"
            value={data.payments.success}
            icon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
            color="text-emerald-500"
          />
          <BreakdownItem
            label="Pending Actions"
            value={data.payments.pending}
            icon={<Clock className="w-3.5 h-3.5 text-amber-500" />}
            color="text-amber-500"
          />
          <BreakdownItem
            label="Failed Attempts"
            value={data.payments.failed}
            icon={<XCircle className="w-3.5 h-3.5 text-rose-500" />}
            color="text-rose-500"
          />
        </CardContent>
      </Card>
    </div>
  );
};

interface BreakdownItemProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color?: string;
}

const BreakdownItem = ({ label, value, icon, color }: BreakdownItemProps) => (
  <div className="flex items-center justify-between group">
    <div className="flex items-center gap-2">
      <div className="p-1.5 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
        {icon}
      </div>
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
    </div>
    <span className={`text-sm font-bold ${color || "text-foreground"}`}>
      {value}
    </span>
  </div>
);

export default DetailedBreakdown;

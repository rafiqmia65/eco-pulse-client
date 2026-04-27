"use client";

import React, { useState } from "react";
import { useMyPaymentHistory } from "@/app/(DashboardLayout)/dashboard/my-payments/_actions";
import { 
  CreditCard, 
  TrendingUp,
  History,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "./StatsCard/StatsCard";
import PaymentsTable from "./PaymentsTable/PaymentsTable";
import PaymentsSkeleton from "./PaymentsSkeleton/PaymentsSkeleton";
import Pagination from "@/components/shared/Pagination/Pagination";

const MyPayments = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  
  const { data: response, isLoading } = useMyPaymentHistory(page, limit);
  
  const payments = response?.data?.list || [];
  const stats = response?.data?.stats;
  const meta = response?.meta;

  if (isLoading) return <PaymentsSkeleton />;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
            Payment History
          </h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Manage your transactions and track your purchased resources.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
            <CreditCard className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Spent"
          value={`$${(stats?.totalSpent || 0).toFixed(2)}`}
          icon={<TrendingUp className="w-4 h-4 text-emerald-500" />}
          description="Total amount invested"
          color="bg-emerald-500/10"
        />
        <StatsCard
          title="Total Purchases"
          value={(stats?.totalPurchases || 0).toString()}
          icon={<History className="w-4 h-4 text-blue-500" />}
          description="Total ideas purchased"
          color="bg-blue-500/10"
        />
        <StatsCard
          title="Success"
          value={(stats?.successPayments || 0).toString()}
          icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          description="Successful transactions"
          color="bg-emerald-500/10"
        />
        <StatsCard
          title="Pending"
          value={(stats?.pendingPayments || 0).toString()}
          icon={<Clock className="w-4 h-4 text-amber-500" />}
          description="Awaiting confirmation"
          color="bg-amber-500/10"
        />
      </div>

      {/* Table Section */}
      <Card className="border-border/50 shadow-sm overflow-hidden bg-card/50 backdrop-blur-xs rounded-2xl">
        <CardHeader className="border-b bg-muted/20 px-6 py-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <PaymentsTable payments={payments} />
        </CardContent>
      </Card>

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination 
            meta={{
              page: meta.page,
              totalPages: meta.totalPages
            }}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      )}
    </div>
  );
};

export default MyPayments;

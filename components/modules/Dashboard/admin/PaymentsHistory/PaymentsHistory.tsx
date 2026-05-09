"use client";

import React, { useEffect } from "react";
import { useAdminPayments } from "@/app/(DashboardLayout)/admin/payments/_actions";
import PaymentStatsCards from "./PaymentStatsCards/PaymentStatsCards";
import RevenueChart from "./RevenueChart/RevenueChart";
import TopIdeas from "./TopIdeas/TopIdeas";
import PaymentsTable from "./PaymentsTable/PaymentsTable";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppStore } from "@/store";
import { useDebounce } from "@/hooks/useDebounce";

const PaymentsHistory = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    paymentSearch,
    setPaymentSearch,
    paymentStatus,
    setPaymentStatus,
    paymentGateway,
    setPaymentGateway,
    paymentPage,
    setPaymentPage,
    resetPaymentFilters,
  } = useAppStore();

  // Debounce search
  const debouncedSearch = useDebounce(paymentSearch, 500);

  // Sync URL to Zustand on mount (optional but good for deep links)
  useEffect(() => {
    const urlSearch = searchParams.get("searchTerm");
    const urlStatus = searchParams.get("status");
    const urlGateway = searchParams.get("gateway");
    const urlPage = searchParams.get("page");

    if (urlSearch) setPaymentSearch(urlSearch);
    if (urlStatus) setPaymentStatus(urlStatus);
    if (urlGateway) setPaymentGateway(urlGateway);
    if (urlPage) setPaymentPage(Number(urlPage));
  }, [
    searchParams,
    setPaymentSearch,
    setPaymentStatus,
    setPaymentGateway,
    setPaymentPage,
  ]);

  // Sync Zustand to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (paymentSearch) params.set("searchTerm", paymentSearch);
    if (paymentStatus !== "all") params.set("status", paymentStatus);
    if (paymentGateway !== "all") params.set("gateway", paymentGateway);
    if (paymentPage > 1) params.set("page", paymentPage.toString());

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [paymentSearch, paymentStatus, paymentGateway, paymentPage, router]);

  const hasFilter =
    paymentSearch.trim() !== "" ||
    paymentStatus !== "all" ||
    paymentGateway !== "all";

  // Fetch data
  const { data: response, isLoading } = useAdminPayments({
    searchTerm: debouncedSearch,
    status: paymentStatus === "all" ? undefined : paymentStatus,
    gateway: paymentGateway === "all" ? undefined : paymentGateway,
    page: paymentPage,
    limit: 10,
  });

  const stats = response?.data?.stats;
  const payments = response?.data?.payments || [];
  const meta = response?.meta;

  // Loading UI
  if (isLoading) {
    return (
      <div className="space-y-8 p-6 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-95 lg:col-span-2 rounded-2xl" />
          <Skeleton className="h-95 rounded-2xl" />
        </div>
        <Skeleton className="h-100 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 max-w-400 mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Payment Analytics</h1>
        <p className="text-muted-foreground">
          Monitor revenue, transactions, and top-selling ideas.
        </p>
      </div>

      {/* Stats */}
      {stats && <PaymentStatsCards stats={stats} />}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {stats?.revenueChart && <RevenueChart data={stats.revenueChart} />}
        {stats?.topIdeas && <TopIdeas ideas={stats.topIdeas} />}
      </div>

      {/* Table Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Transaction History</h2>

          {/* Filter Badge */}
          {hasFilter && (
            <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
              Filtered
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          A detailed list of all payments and their current status.
        </p>

        {meta && (
          <PaymentsTable
            payments={payments}
            meta={meta}
            onPageChange={setPaymentPage}
            onSearch={setPaymentSearch}
            onStatusChange={setPaymentStatus}
            onGatewayChange={setPaymentGateway}
            onClearFilters={resetPaymentFilters}
            filters={{
              searchTerm: paymentSearch,
              status: paymentStatus,
              gateway: paymentGateway,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentsHistory;

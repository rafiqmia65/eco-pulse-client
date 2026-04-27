"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAdminPayments } from "@/app/(DashboardLayout)/admin/payments/_actions";
import PaymentStatsCards from "./PaymentStatsCards/PaymentStatsCards";
import RevenueChart from "./RevenueChart/RevenueChart";
import TopIdeas from "./TopIdeas/TopIdeas";
import PaymentsTable from "./PaymentsTable/PaymentsTable";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams, useRouter } from "next/navigation";

const PaymentsHistory = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read values from URL
  const status = searchParams.get("status") || "all";
  const gateway = searchParams.get("gateway") || "all";
  const page = Number(searchParams.get("page")) || 1;

  // Local state (initial URL)
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || "",
  );
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  // Filter detect (URL based)
  const hasFilter =
    (searchParams.get("searchTerm") || "").trim() !== "" ||
    status !== "all" ||
    gateway !== "all";

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Update query params
  const updateQuery = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      // reset page if filter changes
      if (key !== "page") {
        params.delete("page");
      }

      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  // Sync debounced search to URL (NO LOOP ISSUE)
  useEffect(() => {
    const currentUrlSearch = searchParams.get("searchTerm") || "";
    // Only update URL if the debounced search actually differs from the URL
    if (debouncedSearch !== currentUrlSearch) {
      const params = new URLSearchParams(searchParams.toString());
      if (debouncedSearch) {
        params.set("searchTerm", debouncedSearch);
      } else {
        params.delete("searchTerm");
      }
      params.delete("page"); // Reset page on new search
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [debouncedSearch, searchParams, router]);

  // Clear filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setDebouncedSearch("");
    router.replace("?", { scroll: false });
  };

  // Fetch data
  const { data: response, isLoading } = useAdminPayments({
    searchTerm: debouncedSearch,
    status: status === "all" ? undefined : status,
    gateway: gateway === "all" ? undefined : gateway,
    page,
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
            onPageChange={(p) => updateQuery("page", p.toString())}
            onSearch={setSearchTerm}
            onStatusChange={(s) => updateQuery("status", s)}
            onGatewayChange={(g) => updateQuery("gateway", g)}
            onClearFilters={handleClearFilters}
            filters={{ searchTerm, status, gateway }}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentsHistory;

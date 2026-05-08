"use client";

import React, { useState } from "react";
import { AdminUsersHeader } from "@/components/modules/Dashboard/admin/AdminUsers/AdminUsersHeader/AdminUsersHeader";
import { AdminUsersFilters } from "@/components/modules/Dashboard/admin/AdminUsers/AdminUsersFilters/AdminUsersFilters";
import { AdminUsersTable } from "@/components/modules/Dashboard/admin/AdminUsers/AdminUsersTable/AdminUsersTable";
import { useAdminUsers } from "@/app/(DashboardLayout)/admin/users/_actions";
import { useDebounce } from "@/hooks/useDebounce";
import { RoleType } from "@/constants/roles";
import { UserStatus } from "@/constants/userStatus";
import { Skeleton } from "@/components/ui/skeleton";
import Heading from "@/components/shared/reusableComponents/Heading";
import Pagination from "@/components/shared/Pagination/Pagination";

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isLoading, isError } = useAdminUsers({
    searchTerm: debouncedSearch || undefined,
    role: (role as RoleType) || undefined,
    status: (status as UserStatus) || undefined,
    page,
    limit,
  });

  const handleClearFilters = () => {
    setSearchTerm("");
    setRole("");
    setStatus("");
    setPage(1);
  };

  const users = data?.data?.users || [];
  const stats = data?.data?.stats || {
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0,
    adminUsers: 0,
    memberUsers: 0,
  };
  const meta = data?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <Heading
          title="User Management"
          subtitle="Manage your platform users, roles, and account status."
        />
      </div>

      {isLoading && !data ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-2xl" />
            ))}
          </div>
          <Skeleton className="h-16 rounded-2xl w-full" />
          <Skeleton className="h-[400px] rounded-2xl w-full" />
        </div>
      ) : isError ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl text-center">
          <p className="font-semibold text-lg">Failed to load users</p>
          <p className="text-sm">
            Please try again later or contact support if the issue persists.
          </p>
        </div>
      ) : (
        <>
          <AdminUsersHeader stats={stats} />

          <AdminUsersFilters
            searchTerm={searchTerm}
            onSearchChange={(val) => {
              setSearchTerm(val);
              setPage(1);
            }}
            selectedRole={role}
            onRoleChange={(val) => {
              setRole(val);
              setPage(1);
            }}
            selectedStatus={status}
            onStatusChange={(val) => {
              setStatus(val);
              setPage(1);
            }}
            onClear={handleClearFilters}
          />

          <AdminUsersTable users={users} page={page} limit={limit} />

          {meta && meta.totalPages > 1 && (
            <Pagination
              meta={{ page, totalPages: meta.totalPages }}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AdminUsers;

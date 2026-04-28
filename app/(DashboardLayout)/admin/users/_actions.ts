"use client";

import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import {
  getAllUsersAdmin,
  makeAdminAdmin,
  blockUserAdmin,
  unblockUserAdmin,
  getSingleUserAdmin,
} from "@/services/admin/adminUser.services";
import { IUserFilters } from "@/types/adminTypes/user.types";
import { RoleType } from "@/constants/roles";
import { UserStatus } from "@/constants/userStatus";
import { toast } from "sonner";

/**
 * Hook to fetch all users with filters
 */
export const useAdminUsers = (query: IUserFilters = {}) => {
  return useQuery({
    queryKey: ["adminUsers", query],
    queryFn: () => getAllUsersAdmin(query),
    placeholderData: keepPreviousData,
  });
};

/**
 * Hook to fetch a single user by ID
 */
export const useSingleUser = (id: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getSingleUserAdmin(id),
    enabled: !!id && enabled,
  });
};

/**
 * Hook to promote user to admin
 */
export const useMakeAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => makeAdminAdmin(id),
    onSuccess: (res) => {
      toast.success(res?.message || "User promoted to admin successfully");
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to promote user to admin",
      );
    },
  });
};

/**
 * Hook to block user
 */
export const useBlockUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => blockUserAdmin(id),
    onSuccess: (res) => {
      toast.success(res?.message || "User blocked successfully");
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to block user");
    },
  });
};

/**
 * Hook to unblock user
 */
export const useUnblockUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => unblockUserAdmin(id),
    onSuccess: (res) => {
      toast.success(res?.message || "User unblocked successfully");
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to unblock user");
    },
  });
};

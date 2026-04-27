"use client";

import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import {
  getAllCategoriesAdmin,
  createCategoryAdmin,
  updateCategoryAdmin,
  deleteCategoryAdmin,
  recoverCategoryAdmin,
} from "@/services/admin/adminCategory.services";
import {
  ICreateCategoryPayload,
  IUpdateCategoryPayload,
} from "@/types/adminTypes/adminCategories.types";
import { toast } from "sonner";

export const useAdminCategories = (query: Record<string, unknown> = {}) => {
  return useQuery({
    queryKey: ["adminCategories", query],
    queryFn: () => getAllCategoriesAdmin(query),
    placeholderData: keepPreviousData,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateCategoryPayload) => createCategoryAdmin(payload),
    onSuccess: (res) => {
      toast.success(res?.message || "Category created successfully");
      queryClient.invalidateQueries({ queryKey: ["adminCategories"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create category");
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: IUpdateCategoryPayload }) =>
      updateCategoryAdmin(id, payload),
    onSuccess: (res) => {
      toast.success(res?.message || "Category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["adminCategories"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update category");
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategoryAdmin(id),
    onSuccess: (res) => {
      toast.success(res?.message || "Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["adminCategories"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete category");
    },
  });
};

export const useRecoverCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => recoverCategoryAdmin(id),
    onSuccess: (res) => {
      toast.success(res?.message || "Category recovered successfully");
      queryClient.invalidateQueries({ queryKey: ["adminCategories"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to recover category");
    },
  });
};

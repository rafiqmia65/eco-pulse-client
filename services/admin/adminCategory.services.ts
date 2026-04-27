"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import {
  IAdminCategory,
  ICreateCategoryPayload,
  IUpdateCategoryPayload,
} from "@/types/adminTypes/adminCategories.types";

/**
 * Fetch all categories for admin (with optional status filter)
 */
export const getAllCategoriesAdmin = async (
  query: Record<string, unknown> = {},
): Promise<ApiResponse<IAdminCategory[]>> => {
  return await httpClient.get("/api/v1/categories/admin", {
    params: query,
  });
};

/**
 * Create a new category
 */
export const createCategoryAdmin = async (
  payload: ICreateCategoryPayload,
): Promise<ApiResponse<IAdminCategory>> => {
  return await httpClient.post("/api/v1/categories", payload);
};

/**
 * Update an existing category
 */
export const updateCategoryAdmin = async (
  id: string,
  payload: IUpdateCategoryPayload,
): Promise<ApiResponse<IAdminCategory>> => {
  return await httpClient.patch(`/api/v1/categories/${id}`, payload);
};

/**
 * Soft delete a category
 */
export const deleteCategoryAdmin = async (
  id: string,
): Promise<ApiResponse<null>> => {
  return await httpClient.delete(`/api/v1/categories/${id}`);
};

/**
 * Recover a soft-deleted category
 */
export const recoverCategoryAdmin = async (
  id: string,
): Promise<ApiResponse<null>> => {
  return await httpClient.patch(`/api/v1/categories/admin/recover/${id}`, {});
};

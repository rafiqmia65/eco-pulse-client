"use server";

import { httpClient } from "@/lib/axios/httpClient";
import {
  IUserListResponse,
  IUserFilters,
  ISingleUserResponse,
} from "@/types/adminTypes/user.types";

/**
 * Fetch all users with filters (Admin only)
 */
export const getAllUsersAdmin = async (
  query: IUserFilters = {},
): Promise<IUserListResponse> => {
  return await httpClient.get("/api/v1/users", {
    params: query,
  });
};

/**
 * Promote user to admin
 */
export const makeAdminAdmin = async (id: string) => {
  return await httpClient.patch(`/api/v1/users/make-admin/${id}`, {});
};

/**
 * Block a user
 */
export const blockUserAdmin = async (id: string) => {
  return await httpClient.patch(`/api/v1/users/block/${id}`, {});
};

/**
 * Unblock a user
 */
export const unblockUserAdmin = async (id: string) => {
  return await httpClient.patch(`/api/v1/users/unblock/${id}`, {});
};

/**
 * Fetch a single user by ID (Admin only)
 */
export const getSingleUserAdmin = async (
  id: string,
): Promise<ISingleUserResponse> => {
  return await httpClient.get(`/api/v1/users/${id}`);
};

"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IAdminStatsData, IAdminStatsResponse } from "@/types/adminTypes/adminStats.types";
import {
  IAdminIdeaListResponse,
  IAdminIdeaFilters,
  IAdminIdeaItem,
} from "@/types/adminTypes/adminIdeas.types";

/**
 * Fetch admin dashboard statistics
 */
export const getAdminStats = async (): Promise<IAdminStatsResponse> => {
  return await httpClient.get<IAdminStatsData>("/api/v1/admin/stats");
};

/**
 * Fetch all ideas for admin moderation
 */
export const getAllIdeasAdmin = async (
  query: IAdminIdeaFilters = {},
): Promise<IAdminIdeaListResponse> => {
  return (await httpClient.get<IAdminIdeaItem[]>("/api/v1/admin/ideas", {
    params: query as Record<string, unknown>,
  })) as IAdminIdeaListResponse;
};


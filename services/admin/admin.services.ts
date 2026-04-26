"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IAdminStatsData, IAdminStatsResponse } from "@/types/adminTypes/adminStats.types";

/**
 * Fetch admin dashboard statistics
 */
export const getAdminStats = async (): Promise<IAdminStatsResponse> => {
  return await httpClient.get<IAdminStatsData>("/api/v1/admin/stats");
};

"use server";

import { httpClient } from "@/lib/axios/httpClient";
import {
  IAdminStatsData,
  IAdminStatsResponse,
} from "@/types/adminTypes/adminStats.types";
import {
  IAdminAIStatsData,
  IAdminAIStatsResponse,
} from "@/types/adminTypes/adminAIStats.types";
import {
  IAdminIdeaListResponse,
  IAdminIdeaFilters,
  IAdminIdeaItem,
  IAdminIdeaDetails,
} from "@/types/adminTypes/adminIdeas.types";
import { IAdminPaymentsResponse } from "@/types/adminTypes/adminPayments.types";

/**
 * Fetch admin dashboard statistics
 */
export const getAdminStats = async (): Promise<IAdminStatsResponse> => {
  return await httpClient.get<IAdminStatsData>("/api/v1/admin/stats");
};

/**
 * Fetch admin AI analytics statistics
 */
export const getAdminAIStats = async (): Promise<IAdminAIStatsResponse> => {
  return await httpClient.get<IAdminAIStatsData>("/api/v1/ai/admin/stats");
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

/**
 * Fetch single idea for admin view
 */
export const getSingleIdeaAdmin = async (
  id: string,
  page = 1,
  limit = 5,
): Promise<IAdminIdeaDetails> => {
  const response = await httpClient.get<IAdminIdeaDetails>(
    `/api/v1/admin/ideas/${id}`,
    {
      params: { page, limit },
    },
  );
  return response.data as IAdminIdeaDetails;
};

/**
 * Approve an idea
 */
export const approveIdeaAdmin = async (id: string) => {
  return await httpClient.patch(`/api/v1/admin/ideas/approve/${id}`, {});
};

/**
 * Reject an idea with feedback
 */
export const rejectIdeaAdmin = async (id: string, feedback: string) => {
  return await httpClient.patch(`/api/v1/admin/ideas/reject/${id}`, {
    feedback,
  });
};

/**
 * Fetch all payments for admin
 */
export const getAllPaymentsAdmin = async (
  query: Record<string, unknown> = {},
): Promise<IAdminPaymentsResponse> => {
  return await httpClient.get("/api/v1/admin/payments", {
    params: query,
  });
};

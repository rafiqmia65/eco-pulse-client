"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IIdea } from "@/types/memberTypes/ideas.types";

/**
 * Submit draft idea for review
 * @route PATCH /api/v1/ideas/:id/submit
 * @access Private (Member)
 */
export const submitIdea = async (id: string) => {
  return await httpClient.patch<{
    success: boolean;
    message: string;
    data: IIdea;
  }>(`/api/v1/ideas/${id}/submit`, {});
};

/**
 * Delete Idea (Only unpublished)
 * @route DELETE /api/v1/ideas/:id
 * @access Private (Member - only owner)
 */
export const deleteIdea = async (id: string) => {
  return await httpClient.delete<{
    success: boolean;
    message: string;
  }>(`/api/v1/ideas/${id}`);
};

/**
 * Update idea (Draft or Rejected only)
 * @route PATCH /api/v1/ideas/:id
 * @access Private (Member - only owner)
 */
export const updateIdea = async (id: string, payload: Partial<IIdea>) => {
  try {
    return await httpClient.patch<{
      success: boolean;
      message: string;
      data: IIdea;
    }>(`/api/v1/ideas/${id}`, payload);
  } catch (error: any) {
    if (error.isAxiosError && error.response?.data) {
      return error.response.data as {
        success: boolean;
        message: string;
        data: IIdea;
      };
    }
    throw error;
  }
};

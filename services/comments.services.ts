"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IComment, ICommentsMeta } from "@/types/public/ideaDetails.types";

/**
 * Fetch paginated comments for a specific idea
 */
export const fetchComments = async (ideaId: string, page: number = 1) => {
  return await httpClient.get<{
    comments: IComment[];
    commentsMeta: ICommentsMeta;
  }>(`/api/v1/comments/${ideaId}`, {
    params: { page, limit: 5 },
  });
};

/**
 * Create a new comment or reply
 */
export const createComment = async (
  ideaId: string,
  payload: { content: string; parentId?: string }
) => {
  return await httpClient.post(`/api/v1/comments/${ideaId}`, payload);
};

/**
 * Update an existing comment content
 */
export const updateComment = async (
  commentId: string,
  payload: { content: string }
) => {
  return await httpClient.patch(`/api/v1/comments/${commentId}`, payload);
};

/**
 * Soft delete a comment
 */
export const deleteComment = async (commentId: string) => {
  return await httpClient.delete(`/api/v1/comments/${commentId}`);
};

/**
 * Restore a soft-deleted comment
 */
export const restoreComment = async (commentId: string) => {
  return await httpClient.patch(`/api/v1/comments/restore/${commentId}`, {});
};

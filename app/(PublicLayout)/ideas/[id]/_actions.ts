"use server";

import { httpClient } from "@/lib/axios/httpClient";
import {
  IIdeaAccessData,
  IComment,
  ICommentsMeta,
} from "@/types/public/ideaDetails.types";

export const fetchIdeaById = async (id: string) => {
  return await httpClient.get<IIdeaAccessData>(`/api/v1/ideas/access/${id}`);
};

export const toggleVoteAction = async (ideaId: string, value: 1 | -1) => {
  return await httpClient.post(`/api/v1/votes/${ideaId}`, {
    value,
  });
};

export const toggleWatchListAction = async (ideaId: string) => {
  return await httpClient.post(`/api/v1/watchlist/toggle/${ideaId}`, {});
};

export const fetchIdeaCommentsById = async (id: string, page: number = 1) => {
  return await httpClient.get<{
    comments: IComment[];
    commentsMeta: ICommentsMeta;
  }>(`/api/v1/comments/${id}`, {
    params: { page, limit: 5 },
  });
};

export const createCommentAction = async (
  ideaId: string,
  payload: { content: string; parentId?: string },
) => {
  return await httpClient.post(`/api/v1/comments/${ideaId}`, payload);
};

export const updateCommentAction = async (
  commentId: string,
  payload: { content: string },
) => {
  return await httpClient.patch(`/api/v1/comments/${commentId}`, payload);
};

export const deleteCommentAction = async (commentId: string) => {
  return await httpClient.delete(`/api/v1/comments/${commentId}`);
};

export const restoreCommentAction = async (commentId: string) => {
  return await httpClient.patch(`/api/v1/comments/restore/${commentId}`, {});
};

export const createIdeaPurchaseAction = async (ideaId: string) => {
  return await httpClient.post<{ checkoutUrl: string }>(
    `/api/v1/payments/idea/${ideaId}`,
    {},
  );
};

"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IIdeaAccessData } from "@/types/public/ideaDetails.types";

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

export const createIdeaPurchaseAction = async (ideaId: string) => {
  return await httpClient.post<{ checkoutUrl: string }>(
    `/api/v1/payments/idea/${ideaId}`,
    {},
  );
};

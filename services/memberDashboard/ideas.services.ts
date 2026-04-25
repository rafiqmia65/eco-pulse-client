"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IIdea } from "@/types/memberTypes/ideas.types";
import {
  IQueryParams,
} from "@/types/memberTypes/myAllIdeas.types";
import { IIdeaDetailsByOwner } from "@/types/memberTypes/IdeaDetailsByOwner.types";

export const createIdea = async (payload: IIdea) => {
  return await httpClient.post<{ id: string }>(
    "/api/v1/ideas",
    payload,
  );
};

export const getMyIdeas = async (params: IQueryParams) => {
  return await httpClient.get<IIdea[]>("/api/v1/ideas/my-ideas", {
    params,
  });
};

export const submitIdea = async (id: string) => {
  return await httpClient.patch<{
    success: boolean;
    message: string;
    data: IIdea;
  }>(`/api/v1/ideas/${id}/submit`, {});
};

export const getMySingleIdea = async (id: string) => {
  return await httpClient.get<IIdeaDetailsByOwner>(`/api/v1/ideas/my-idea/${id}`);
};

export const updateIdea = async (id: string, payload: Partial<IIdea>) => {
  return await httpClient.patch<{ success: boolean; message: string }>(
    `/api/v1/ideas/${id}`,
    payload,
  );
};

export const deleteIdea = async (id: string) => {
  return await httpClient.delete<{ success: boolean; message: string }>(
    `/api/v1/ideas/${id}`,
  );
};

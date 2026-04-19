"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IIdea } from "@/types/home.types";

export const getLatestIdeas = async () => {
  return await httpClient.get<IIdea[]>("/api/v1/ideas/latest");
};
export const getTrendingIdeas = async () => {
  return await httpClient.get<IIdea[]>("/api/v1/ideas/latest");
};

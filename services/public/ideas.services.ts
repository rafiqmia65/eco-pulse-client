/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { Idea } from "@/types/ideas.types";

export const fetchIdeas = async (params: any) => {
  return await httpClient.get<Idea[]>("/api/v1/ideas", { params });
};

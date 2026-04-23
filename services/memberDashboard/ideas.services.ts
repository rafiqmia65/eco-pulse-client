"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IIdea } from "@/types/memberTypes/ideas.types";

export const createIdea = async (payload: IIdea) => {
  return await httpClient.post<{ success: boolean; message: string }>(
    "/api/v1/ideas",
    payload,
  );
};

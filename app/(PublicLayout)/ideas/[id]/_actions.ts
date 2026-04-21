/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IIdeaAccessResponse } from "@/types/public/ideaDetails.types";

export const fetchIdeaById = async (id: string) => {
  try {
    const res = await httpClient.get<IIdeaAccessResponse>(
      `/api/v1/ideas/access/${id}`,
    );

    console.log(res);

    return res; // already ApiResponse
  } catch (error: any) {
    console.error("Fetch Idea Error:", error?.response?.data || error.message);
    return null;
  }
};

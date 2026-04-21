"use server";

import { httpClient } from "@/lib/axios/httpClient";

export const fetchIdeaById = async (id: string) => {
  try {
    const res = await httpClient.get(`/api/v1/ideas/access/${id}`);

    console.log(res)

    return res; // already ApiResponse
  } catch (error: any) {
    console.error("Fetch Idea Error:", error?.response?.data || error.message);
    return null;
  }
};

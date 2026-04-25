"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { RegisterPayload } from "@/types/auth.types";

export const registerUser = async (payload: RegisterPayload) => {
  return await httpClient.post("/api/v1/auth/register", payload);
};

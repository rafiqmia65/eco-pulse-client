"use server";

import { httpClient } from "@/lib/axios/httpClient";
import {
  ChangePasswordPayload,
  UpdateProfilePayload,
} from "@/types/auth.types";
import { DashboardStats } from "@/types/memberTypes/DashboardStats.types";

export async function getUserStats() {
  return await httpClient.get<DashboardStats>("/api/v1/users/stats");
}

export const updateProfileUser = async (payload: UpdateProfilePayload) => {
  return await httpClient.patch("/api/v1/users/update-profile", payload);
};

export const changePasswordUser = async (payload: ChangePasswordPayload) => {
  return await httpClient.post("/api/v1/auth/change-password", {
    oldPassword: payload.oldPassword,
    newPassword: payload.newPassword,
    confirmPassword: payload.confirmPassword,
  });
};

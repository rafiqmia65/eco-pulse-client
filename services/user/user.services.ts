"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { DashboardStats } from "@/types/memberTypes/DashboardStats.types";

export async function getUserStats() {
  return await httpClient.get<DashboardStats>("/api/v1/users/stats");
}

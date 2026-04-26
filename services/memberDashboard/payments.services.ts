"use server";

import { httpClient } from "@/lib/axios/httpClient";
import {
  IPaymentHistoryData,
  IPaymentHistoryResponse,
} from "@/types/memberTypes/payment.types";

export const getMyPaymentHistory = async (
  page: number = 1,
  limit: number = 10,
  status?: string,
): Promise<IPaymentHistoryResponse> => {
  const query: Record<string, string | number | undefined> = {
    page,
    limit,
  };

  if (status) {
    query.status = status;
  }

  return await httpClient.get<IPaymentHistoryData>("/api/v1/payments/history", {
    params: query,
  });
};

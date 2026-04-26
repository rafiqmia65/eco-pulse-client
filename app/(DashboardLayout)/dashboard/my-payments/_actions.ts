"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyPaymentHistory } from "@/services/memberDashboard/payments.services";

export const useMyPaymentHistory = (
  page: number = 1,
  limit: number = 10,
  status?: string,
) => {
  return useQuery({
    queryKey: ["payments", page, limit, status],
    queryFn: () => getMyPaymentHistory(page, limit, status),
  });
};

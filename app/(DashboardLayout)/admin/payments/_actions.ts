import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getAllPaymentsAdmin } from "@/services/admin/admin.services";

export const useAdminPayments = (query: Record<string, unknown> = {}) => {
  return useQuery({
    queryKey: ["adminPayments", query],
    queryFn: () => getAllPaymentsAdmin(query),
    placeholderData: keepPreviousData,
  });
};

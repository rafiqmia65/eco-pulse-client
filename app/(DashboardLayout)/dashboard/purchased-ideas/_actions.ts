import { useQuery } from "@tanstack/react-query";
import { getMyPurchasedIdeas } from "@/services/memberDashboard/purchases.services";
import { IQueryParams } from "@/types/api.types";

/**
 * Hook to fetch all purchased ideas for the current user with optional filters
 */
export const usePurchasedIdeas = (params: IQueryParams) => {
  return useQuery({
    queryKey: ["purchased-ideas", params],
    queryFn: () => getMyPurchasedIdeas(params),
  });
};

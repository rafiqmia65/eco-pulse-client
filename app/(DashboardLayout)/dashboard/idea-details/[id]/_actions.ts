import { useQuery } from "@tanstack/react-query";
import { getMyPurchasedIdeaDetails } from "@/services/memberDashboard/purchases.services";

/**
 * Hook to fetch details of a specific purchased idea
 */
export const usePurchasedIdeaDetails = (id: string) => {
  return useQuery({
    queryKey: ["purchased-idea", id],
    queryFn: () => getMyPurchasedIdeaDetails(id),
    enabled: !!id,
  });
};

import { useQuery } from "@tanstack/react-query";
import { getUserStats } from "@/services/user/user.services";
import { DashboardStats } from "@/types/memberTypes/DashboardStats.types";

export const useUserStats = () => {
  return useQuery<DashboardStats | undefined>({
    queryKey: ["user-stats"],
    queryFn: async () => {
      const response = await getUserStats();
      return response?.data;
    },
    staleTime: 60 * 1000, // 1 minute
  });
};

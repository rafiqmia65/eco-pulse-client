import { useQuery } from "@tanstack/react-query";
import {
  getMyIdeas,
  getMySingleIdea,
} from "@/services/memberDashboard/ideas.services";
import { getUserStats } from "@/services/user/user.services";
import { IQueryParams } from "@/types/memberTypes/myAllIdeas.types";
import { ApiResponse } from "@/types/api.types";
import { IIdeaDetailsByOwner } from "@/types/memberTypes/IdeaDetailsByOwner.types";
import { DashboardStats } from "@/types/memberTypes/DashboardStats.types";

/**
 * Hook to fetch all ideas for the current user with optional filters
 */
export const useMyIdeas = (params: IQueryParams) => {
  return useQuery({
    queryKey: ["ideas", params],
    queryFn: () => getMyIdeas(params),
  });
};

/**
 * Hook to fetch a single idea by ID (for owners)
 */
export const useMySingleIdea = (id: string) => {
  return useQuery<ApiResponse<IIdeaDetailsByOwner>>({
    queryKey: ["idea", id],
    queryFn: () => getMySingleIdea(id),
    enabled: !!id,
  });
};

/**
 * Hook to fetch user statistics for the dashboard
 */
export const useUserStats = () => {
  return useQuery<ApiResponse<DashboardStats>>({
    queryKey: ["userStats"],
    queryFn: () => getUserStats(),
  });
};

import { useQuery } from "@tanstack/react-query";
import { getAllIdeasAdmin } from "@/services/admin/admin.services";
import { IAdminIdeaFilters } from "@/types/adminTypes/adminIdeas.types";

export const useAdminAllIdeas = (query: IAdminIdeaFilters = {}) => {
  return useQuery({
    queryKey: ["adminAllIdeas", query],
    queryFn: () => getAllIdeasAdmin(query),
  });
};

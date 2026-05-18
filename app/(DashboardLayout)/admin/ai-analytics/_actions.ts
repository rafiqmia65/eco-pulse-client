import { useQuery } from "@tanstack/react-query";
import { getAdminAIStats } from "@/services/admin/admin.services";

export const useAdminAIStats = () => {
  return useQuery({
    queryKey: ["adminAIStats"],
    queryFn: () => getAdminAIStats(),
  });
};

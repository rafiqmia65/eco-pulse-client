import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdminStats } from "@/services/admin/admin.services";

export const useAdminStats = () => {
  return useQuery({
    queryKey: ["adminStats"],
    queryFn: () => getAdminStats(),
  });
};

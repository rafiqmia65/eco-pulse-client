"use client";

import { useQuery } from "@tanstack/react-query";
import { getSingleIdeaAdmin } from "@/services/admin/admin.services";

export const useAdminIdeaDetails = (id: string, page = 1, limit = 5) => {
  return useQuery({
    queryKey: ["admin-idea-details", id, page, limit],
    queryFn: () => getSingleIdeaAdmin(id, page, limit),
    enabled: !!id,
  });
};

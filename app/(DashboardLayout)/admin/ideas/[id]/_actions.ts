"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  approveIdeaAdmin,
  getSingleIdeaAdmin,
  rejectIdeaAdmin,
} from "@/services/admin/admin.services";
import { toast } from "sonner";

export const useAdminIdeaDetails = (id: string, page = 1, limit = 5) => {
  return useQuery({
    queryKey: ["admin-idea-details", id, page, limit],
    queryFn: () => getSingleIdeaAdmin(id, page, limit),
    enabled: !!id,
  });
};

export const useApproveIdeaAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => approveIdeaAdmin(id),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "Idea approved successfully");
        queryClient.invalidateQueries({ queryKey: ["adminAllIdeas"] });
        queryClient.invalidateQueries({ queryKey: ["admin-idea-details"] });
      } else {
        toast.error(res.message || "Failed to approve idea");
      }
    },
  });
};

export const useRejectIdeaAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, feedback }: { id: string; feedback: string }) =>
      rejectIdeaAdmin(id, feedback),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "Idea rejected successfully");
        queryClient.invalidateQueries({ queryKey: ["adminAllIdeas"] });
        queryClient.invalidateQueries({ queryKey: ["admin-idea-details"] });
      } else {
        toast.error(res.message || "Failed to reject idea");
      }
    },
  });
};

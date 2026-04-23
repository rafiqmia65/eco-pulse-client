import { createIdea } from "@/services/memberDashboard/ideas.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateIdea = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIdea,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-createIdea"] });
    },
  });
};

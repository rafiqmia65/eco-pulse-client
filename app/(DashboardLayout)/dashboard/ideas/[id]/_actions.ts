import { deleteIdea, getMySingleIdea, submitIdea } from "@/services/memberDashboard/ideas.services";
import { ApiResponse } from "@/types/api.types";
import { IIdeaDetailsByOwner } from "@/types/memberTypes/IdeaDetailsByOwner.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useMySingleIdea = (id: string) => {
  return useQuery<ApiResponse<IIdeaDetailsByOwner>>({
    queryKey: ["idea", id],
    queryFn: () => getMySingleIdea(id),
  });
};

export const useDeleteIdea = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteIdea(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });
};

export const useSubmitIdeaAction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => submitIdea(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["idea", id] });
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });
};

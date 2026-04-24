import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMyIdeas,
  submitIdea,
} from "@/services/memberDashboard/ideas.services";
import { IQueryParams } from "@/types/memberTypes/myAllIdeas.types";

export const useMyIdeas = (params: IQueryParams) => {
  return useQuery({
    queryKey: ["ideas", params],
    queryFn: () => getMyIdeas(params),
  });
};

export const useSubmitIdea = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => submitIdea(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });
};

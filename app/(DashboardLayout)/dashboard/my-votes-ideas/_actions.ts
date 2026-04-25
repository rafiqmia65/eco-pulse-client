import { useQuery } from "@tanstack/react-query";
import { getMyVotedIdeas } from "@/services/memberDashboard/myVotes.services";
import { IQueryParams } from "@/types/api.types";

export const useMyVotes = (params: IQueryParams) => {
  return useQuery({
    queryKey: ["my-votes", params],
    queryFn: () => getMyVotedIdeas(params),
  });
};

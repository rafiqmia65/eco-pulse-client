import { useQuery } from "@tanstack/react-query";
import { getMyIdeas } from "@/services/memberDashboard/ideas.services";
import { IQueryParams } from "@/types/memberTypes/myAllIdeas.types";

export const useMyIdeas = (params: IQueryParams) => {
  return useQuery({
    queryKey: ["my-ideas", params],
    queryFn: () => getMyIdeas(params),
  });
};

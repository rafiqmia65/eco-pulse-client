/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { fetchIdeas } from "@/services/public/ideas.services";

export const useIdeas = (params: any) => {
  return useQuery({
    queryKey: ["ideas", params],
    queryFn: () => fetchIdeas(params),
    staleTime: 0,
  });
};

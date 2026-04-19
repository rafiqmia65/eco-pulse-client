import { getLatestIdeas } from "@/services/auth/home/home.services";
import { useQuery } from "@tanstack/react-query";

export const useLatestIdeas = () => {
  return useQuery({
    queryKey: ["latest-ideas"],
    queryFn: getLatestIdeas,
  });
};

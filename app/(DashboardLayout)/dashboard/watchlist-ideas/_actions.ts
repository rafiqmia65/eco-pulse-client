import { useQuery } from "@tanstack/react-query";
import { getMyWatchList } from "@/services/memberDashboard/watchlist.services";
import { IQueryParams } from "@/types/api.types";

export const useMyWatchList = (params: IQueryParams) => {
  return useQuery({
    queryKey: ["watchlist", params],
    queryFn: () => getMyWatchList(params),
  });
};

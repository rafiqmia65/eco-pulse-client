"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IQueryParams } from "@/types/api.types";
import { IWatchListResponse } from "@/types/memberTypes/watchlist.types";

export const getMyWatchList = async (queryParams: IQueryParams) => {
  return await httpClient.get<IWatchListResponse>("/api/v1/watchlist", {
    params: queryParams,
  });
};

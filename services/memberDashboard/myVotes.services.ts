"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IQueryParams } from "@/types/api.types";
import { IVote } from "@/types/memberTypes/myVotes.types";

export const getMyVotedIdeas = async (queryParams: IQueryParams) => {
  return await httpClient.get<IVote[]>("/api/v1/votes/my-voted-ideas", {
    params: queryParams,
  });
};

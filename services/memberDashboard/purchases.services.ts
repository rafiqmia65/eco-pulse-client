"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IQueryParams } from "@/types/api.types";
import {
  IPurchasedIdea,
  IPurchasedIdeaDetails,
} from "@/types/memberTypes/purchasedIdeas.types";

/**
 * Fetch purchased ideas for the current user
 * Calls GET /api/v1/payments/my-purchases-ideas
 */
export const getMyPurchasedIdeas = async (params: IQueryParams) => {
  return await httpClient.get<IPurchasedIdea[]>(
    "/api/v1/payments/my-purchases-ideas",
    {
      params,
    },
  );
};

/**
 * Fetch details of a specific purchased idea
 * Calls GET /api/v1/payments/my-purchases-ideas/:ideaId
 */
export const getMyPurchasedIdeaDetails = async (ideaId: string) => {
  return await httpClient.get<IPurchasedIdeaDetails>(
    `/api/v1/payments/my-purchases-ideas/${ideaId}`,
  );
};

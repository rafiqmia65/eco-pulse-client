"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IIdea } from "@/types/public/home.types";

export const getLatestIdeas = async () => {
  return await httpClient.get<IIdea[]>("/api/v1/ideas", {
    params: {
      sortBy: "createdAt",
      sortOrder: "desc",
      limit: 6,
    },
  });
};

export const getTrendingIdeas = async () => {
  return await httpClient.get<IIdea[]>("/api/v1/ideas", {
    params: {
      sortBy: "upvotes",
      sortOrder: "desc",
      limit: 6,
    },
  });
};

import { ICategory } from "./myAllIdeas.types";

export interface IWatchListAuthor {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: string;
}

export interface IWatchListIdea {
  id: string;
  title: string;
  description: string;
  solution: string;
  isLocked: boolean;
  image: string | null;
  price: number | null;
  isPaid: boolean;

  upvotes: number;
  downvotes: number;
  votesCount: number;
  currentUserVote: 1 | -1 | null;

  commentsCount: number;
  watchListCount: number;
  isWatchlisted: boolean;
  hasPurchased: boolean;
  isOwner: boolean;

  category: ICategory;
  author: IWatchListAuthor;
  createdAt: string;
}

export interface IWatchListMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  totalPaidIdeas: number;
  totalFreeIdeas: number;
  totalUnlockedIdeas: number;
}

export interface IWatchListResponse {
  data: IWatchListIdea[];
  meta: IWatchListMeta;
}

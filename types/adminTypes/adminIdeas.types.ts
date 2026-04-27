/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse, ApiMeta } from "../api.types";

export type IIdeaStatus = "REVIEW" | "APPROVED" | "REJECTED" | "DRAFT";

export interface IAdminIdeaAuthor {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
}

export interface IAdminIdeaCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  deletedAt: string | null;
}

export interface IAdminIdeaItem {
  id: string;
  title: string;
  problem: string;
  solution: string;
  description: string;
  image: string;
  slug: string;
  isPaid: boolean;
  price: number | null;
  status: IIdeaStatus;
  authorId: string;
  categoryId: string;
  upvotesCount: number;
  downvotesCount: number;
  votesCount: number;
  commentsCount: number;
  watchListCount: number;
  createdAt: string;
  updatedAt: string;
  author: IAdminIdeaAuthor;
  category: IAdminIdeaCategory;
}

export interface IAdminIdeaCounts {
  total: number;
  review: number;
  approved: number;
  rejected: number;
  [key: string]: number;
}

export interface IAdminIdeaListResponse extends ApiResponse<IAdminIdeaItem[]> {
  meta: ApiMeta;
  counts: IAdminIdeaCounts;
}

export interface IAdminIdeaFilters {
  searchTerm?: string;
  status?: IIdeaStatus;
  categoryId?: string;
  isPaid?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: any; // Still need to allow dynamic keys for potential future filters, but I'll use unknown in the code
}

import { IComment } from "../public/ideaDetails.types";

// ================= ADMIN IDEA DETAILS =================
export interface IAdminIdeaVote {
  value: number;
  userId: string;
}

export interface IAdminIdeaDetails extends IAdminIdeaItem {
  votes: IAdminIdeaVote[];
  comments: IComment[];
  commentsMeta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface IAdminIdeaDetailsResponse extends ApiResponse<IAdminIdeaDetails> {}


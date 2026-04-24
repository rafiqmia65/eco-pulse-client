export interface IIdea {
  id?: string;
  title: string;
  problem: string;
  solution: string;
  description: string;
  image?: string | null;
  slug?: string | null;

  isPaid: boolean;
  price?: number | null;

  status?: "DRAFT" | "REVIEW" | "APPROVED" | "REJECTED";
  authorId?: string;
  categoryId: string;

  category?: {
    id: string;
    name: string;
  };

  upvotesCount?: number;
  downvotesCount?: number;
  votesCount?: number;
  commentsCount?: number;
  watchListCount?: number;

  createdAt?: string;
  updatedAt?: string;

  isDraft?: boolean;
}

export interface IIdeaCounts {
  total: number;
  draft: number;
  review: number;
  approved: number;
  rejected: number;
}

export interface ICategory {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
  deletedAt?: string | null;
}

export interface IIdeaResponse {
  success: boolean;
  message: string;
  data: IIdea[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  counts: IIdeaCounts;
}

export interface IQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: string;
  categoryId?: string;
  isPaid?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: string | number | boolean | undefined;
}

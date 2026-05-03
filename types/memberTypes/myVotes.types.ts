import { ICategory } from "./myAllIdeas.types";
import { IIdea } from "@/types/public/home.types";

export interface IVotedIdeaAuthor {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: string;
}

export interface IVotedIdea {
  id: string;
  title: string;
  problem: string;
  solution: string;
  description: string;
  image: string | null;
  slug: string;
  isPaid: boolean;
  price: number | null;
  status: string;
  authorId: string;
  categoryId: string;
  upvotesCount: number;
  downvotesCount: number;
  votesCount: number;
  commentsCount: number;
  watchListCount: number;
  createdAt: string;
  updatedAt: string;
  author: IVotedIdeaAuthor;
  category: ICategory;
}

export interface IVote {
  id: string;
  userId: string;
  ideaId: string;
  value: number; // 1 for upvote, -1 for downvote
  createdAt: string;
  updatedAt: string;
  idea: IVotedIdea;
}

export interface IVotesCounts {
  upvotes: number;
  downvotes: number;
  totalVotes: number;
  last7DaysVotes: number;
  totalIdeasVoted: number;
}

export interface IVotesResponse {
  data: IIdea[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  counts: IVotesCounts;
}

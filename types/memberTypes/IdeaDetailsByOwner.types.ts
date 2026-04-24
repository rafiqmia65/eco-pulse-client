import { RoleType } from "@/constants/roles";

export interface IAuthor {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: RoleType;
  status: string;
  needPasswordChange: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  deletedAt: string | null;
}

export interface IVote {
  id: string;
  userId: string;
  ideaId: string;
  value: number;
  createdAt: string;
  updatedAt: string;
}

export interface IFeedback {
  id: string;
  message: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: RoleType;
  status: string;
  needPasswordChange: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IReply {
  id: string;
  content: string;
  isDeleted: boolean;
  user: IUser;
  createdAt: string;
}

export interface IComment {
  id: string;
  content: string;
  isDeleted: boolean;
  user: IUser;
  replies: IReply[];
  createdAt: string;
}

export interface ICommentsMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IIdeaDetailsByOwner {
  id: string;
  title: string;
  problem: string;
  solution: string;
  description: string;
  image: string | null;
  slug: string;
  isPaid: boolean;
  price: number | null;
  status: "DRAFT" | "REVIEW" | "APPROVED" | "REJECTED";
  authorId: string;
  categoryId: string;
  upvotesCount: number;
  downvotesCount: number;
  votesCount: number;
  commentsCount: number;
  watchListCount: number;
  createdAt: string;
  updatedAt: string;
  author: IAuthor;
  category: ICategory;
  votes: IVote[];
  feedback: IFeedback | null;
  comments: IComment[];
  commentsMeta: ICommentsMeta;
}

export interface IIdeaDetailsByOwnerResponse {
  success: boolean;
  message: string;
  data: IIdeaDetailsByOwner;
}

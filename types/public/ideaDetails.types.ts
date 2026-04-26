// ================= MAIN RESPONSE =================
export interface IIdeaAccessResponse {
  success: boolean;
  message: string;
  data: IIdeaAccessData;
}

// ================= IDEA DATA =================
export interface IIdeaAccessData {
  id: string;
  title: string;
  description: string;
  problem: string;
  image: string;

  price: number | null;
  isPaid: boolean;

  upvotes: number;
  downvotes: number;
  votesCount: number;
  currentUserVote: number | null;

  comments: IComment[];
  commentsMeta: ICommentsMeta;

  category: ICategory;
  author: IUser;

  createdAt: string;

  isInWatchList?: boolean;
  watchListCount?: number;

  solution: string;
  isLocked: boolean;
  accessLevel:
    | "ADMIN_FULL_ACCESS"
    | "OWNER_FULL_ACCESS"
    | "PUBLIC_FREE"
    | "PUBLIC_FREE_GUEST"
    | "LIMITED_PREVIEW"
    | "GUEST_PREVIEW"
    | "PAID_FULL_ACCESS"
    | "PURCHASED_FULL_ACCESS";
}

// ================= USER =================
export interface IUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: "ADMIN" | "MEMBER";
  status: "ACTIVE" | "BLOCKED";
  emailVerified: boolean;
  needPasswordChange: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// ================= CATEGORY =================
export interface ICategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  deletedAt: string | null;
}

// ================= COMMENTS =================
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

// ================= PAGINATION =================
export interface ICommentsMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Idea {
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
  createdAt: string;
  category: {
    id: string;
    name: string;
  };
  author: {
    id: string;
    name: string;
    email: string;
  };
}

export interface IdeaResponse {
  data: Idea[];
  meta: {
    page: number;
    totalPages: number;
    limit: number;
    total: number;
  };
}

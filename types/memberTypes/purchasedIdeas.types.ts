import { ICategory, IComment, ICommentsMeta, IUser } from "../public/ideaDetails.types";

export interface IPurchasedIdea {
  paymentId: string;
  transactionId: string;
  amount: number;
  status: string;
  paidAt: string;
  purchasedAt: string;
  idea: {
    id: string;
    title: string;
    slug: string;
    description: string;
    image: string;
    price: number;
    isPaid: boolean;
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
  };
}

export interface IPurchasedIdeaCounts {
  totalPurchased: number;
  totalSpent: number;
  averageSpend: number;
  highestPurchaseAmount: number;
  last7DaysPurchases: number;
  last30DaysPurchases: number;
  thisMonthPurchases: number;
  uniqueCategoriesPurchased: number;
}

export interface IPurchasedIdeaDetails {
  id: string;
  title: string;
  problem: string;
  solution: string;
  description: string;
  image: string;
  slug: string;
  isPaid: boolean;
  price: number;
  status: string;
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
  purchasedAt: string;
  paymentInfo: {
    paymentId: string;
    transactionId: string;
    amount: number;
    paidAt: string;
    gateway: string;
    status: string;
  };
  upvotes: number;
  downvotes: number;
  votesCount: number;
  currentUserVote: number | null;
  comments: IComment[];
  commentsMeta: ICommentsMeta;
  category: ICategory;
  author: IUser;
  createdAt: string;
  updatedAt: string;
}

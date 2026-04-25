import { ICategory } from "./myAllIdeas.types";

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
    category: ICategory;
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
  accessLevel: string;
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
  comments: any[];
  commentsMeta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  category: ICategory;
  author: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
  };
  createdAt: string;
  updatedAt: string;
}

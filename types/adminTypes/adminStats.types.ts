import { ApiResponse } from "../api.types";

export interface IAdminUserStats {
  total: number;
  active: number;
  blocked: number;
}

export interface IAdminIdeaStats {
  total: number;
  approved: number;
  review: number;
  rejected: number;
  draft: number;
  paid: number;
  free: number;
}

export interface IAdminPaymentStats {
  total: number;
  success: number;
  pending: number;
  failed: number;
}

export interface IRevenueDay {
  date: string;
  amount: number;
}

export interface IIdeaDay {
  date: string;
  count: number;
}

export interface ITopIdeaVoted {
  id: string;
  title: string;
  votesCount: number;
  image: string;
  slug: string;
}

export interface ITopIdeaPurchased {
  id: string;
  title: string;
  image: string;
  slug: string;
  purchaseCount: number;
}

export interface IAdminStatsData {
  users: IAdminUserStats;
  ideas: IAdminIdeaStats;
  payments: IAdminPaymentStats;
  revenue: {
    total: number;
    last7Days: IRevenueDay[];
  };
  charts: {
    ideasLast7Days: IIdeaDay[];
  };
  topIdeas: {
    mostVoted: ITopIdeaVoted[];
    mostPurchased: ITopIdeaPurchased[];
  };
}

export type IAdminStatsResponse = ApiResponse<IAdminStatsData>;

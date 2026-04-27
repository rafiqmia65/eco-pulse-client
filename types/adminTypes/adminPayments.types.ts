import { ApiResponse } from "../api.types";

export enum PaymentStatus {
  PAID = "PAID",
  PENDING = "PENDING",
  FAILED = "FAILED",
}

export interface IPaymentUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

export interface IPaymentIdea {
  id: string;
  title: string;
  price: number;
  slug: string;
  category: string;
}

export interface IPaymentRecord {
  paymentId: string;
  transactionId: string;
  amount: number;
  status: PaymentStatus;
  gateway: string;
  paidAt: string | null;
  createdAt: string;
  user: IPaymentUser;
  idea: IPaymentIdea;
}

export interface IRevenueChartData {
  date: string;
  revenue: number;
}

export interface ITopIdeaDetails {
  ideaId: string;
  title: string;
  purchases: number;
}

export interface IAdminPaymentStats {
  totalRevenue: number;
  totalTransactions: number;
  successfulPayments: number;
  failedPayments: number;
  pendingPayments: number;
  revenueChart: IRevenueChartData[];
  topIdeas: ITopIdeaDetails[];
}

export interface IAdminPaymentsData {
  payments: IPaymentRecord[];
  stats: IAdminPaymentStats;
}

export type IAdminPaymentsResponse = ApiResponse<IAdminPaymentsData>;

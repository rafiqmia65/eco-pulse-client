import { ApiResponse } from "../api.types";

export interface IPaymentIdea {
  id: string;
  title: string;
  image: string;
  price: number;
  slug: string;
  category: string;
  author: string;
}

export interface IPaymentHistoryItem {
  paymentId: string;
  transactionId: string;
  amount: number;
  status: "PAID" | "PENDING" | "FAILED";
  gateway: string;
  paidAt: string | null;
  createdAt: string;
  idea: IPaymentIdea;
}

export interface IPaymentStats {
  totalSpent: number;
  totalPurchases: number;
  successPayments: number;
  pendingPayments: number;
}

export interface IPaymentHistoryData {
  list: IPaymentHistoryItem[];
  stats: IPaymentStats;
}

export type IPaymentHistoryResponse = ApiResponse<IPaymentHistoryData>;

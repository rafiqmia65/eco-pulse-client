import { ApiResponse } from "../api.types";

export interface IAIUserMini {
  id: string;
  name: string | null;
  email: string;
}

export interface IAILogItem {
  id: string;
  userId: string | null;
  type: string;
  prompt: string | null;
  response: string | null;
  inputTokens: number;
  outputTokens: number;
  latency: number;
  status: number;
  errorMessage: string | null;
  createdAt: string;
  user?: IAIUserMini | null;
}

export interface IAdminAITotals {
  totalRequests: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalTokenUsage: number;
  estimatedCost: number;
  averageResponseTime: number;
  successRate: number;
  failedRequestsCount: number;
  activeAIUsers: number;
}

export interface IFeatureAnalyticItem {
  feature: string;
  requests: number;
  tokenUsage: number;
}

export interface IAdminAIFeatureAnalytics {
  features: IFeatureAnalyticItem[];
  mostUsedFeature: IFeatureAnalyticItem | null;
}

export interface IAdminAITopUser {
  userId: string;
  requestCount: number;
  tokenUsage: number;
}

export interface IUsageTrendDay {
  date: string;
  requests: number;
  tokenUsage: number;
  activeUsers: number;
}

export interface IAdminAIUsageTrends {
  dailyUsageChart: IUsageTrendDay[];
  requestsThisWeek: number;
}

export interface IAdminAIPerformance {
  averageResponseTime: number;
  successCount: number;
  failedCount: number;
}

export interface IAdminAIStatsData {
  totals: IAdminAITotals;
  featureAnalytics: IAdminAIFeatureAnalytics;
  userAnalytics: {
    topUsers: IAdminAITopUser[];
  };
  usageTrends: IAdminAIUsageTrends;
  performance: IAdminAIPerformance;
  recentLogs: IAILogItem[];
  apiErrorLogs: IAILogItem[];
}

export type IAdminAIStatsResponse = ApiResponse<IAdminAIStatsData>;

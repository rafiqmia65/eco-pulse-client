export interface IdeaStats {
  total: number;
  approved: number;
  review: number;
  rejected: number;
  draft: number;
  paid: number;
  free: number;
}

export interface EngagementStats {
  totalVotesReceived: number;
  totalCommentsReceived: number;
}

export interface PaymentStats {
  total: number;
  success: number;
  pending: number;
}

export interface SpendingData {
  date: string;
  amount: number;
}

export interface SpendingStats {
  total: number;
  last7Days: SpendingData[];
}

export interface EarningsStats {
  total: number;
}

export interface IdeaTrendData {
  date: string;
  count: number;
}

export interface ChartStats {
  ideasLast7Days: IdeaTrendData[];
}

export interface PerformanceStats {
  score: number;
}

export interface BestIdea {
  id: string;
  title: string;
  votesCount: number;
  commentsCount: number;
  slug: string;
}

export interface RecentPurchase {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  idea: {
    id: string;
    title: string;
    image: string | null;
    slug: string;
  };
}

export interface DashboardStats {
  ideas: IdeaStats;
  engagement: EngagementStats;
  payments: PaymentStats;
  spending: SpendingStats;
  earnings: EarningsStats;
  charts: ChartStats;
  performance: PerformanceStats;
  bestIdea: BestIdea | null;
  recentPurchases: RecentPurchase[];
}

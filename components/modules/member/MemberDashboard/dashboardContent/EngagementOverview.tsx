import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp, MessageSquare, Zap } from "lucide-react";
import {
  EngagementStats,
  PerformanceStats,
} from "@/types/memberTypes/DashboardStats.types";

/**
 * EngagementOverview Component
 * Displays community impact metrics like performance score, total votes, and comments.
 * Uses a responsive flex layout that stacks on narrow containers to ensure visibility.
 */
export const EngagementOverview = ({
  engagement,
  performance,
}: {
  engagement: EngagementStats;
  performance: PerformanceStats;
}) => {
  return (
    <Card className="border-none shadow-sm bg-card/50 backdrop-blur-md flex-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">
          Community Impact
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 pb-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-linear-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/20 rounded-xl text-orange-500 shadow-sm">
                <Zap className="h-6 w-6 fill-current" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  Performance Score
                </p>
                <p className="text-3xl font-bold tracking-tight">
                  {performance.score}
                </p>
              </div>
            </div>
            <div className="text-right text-[10px] text-muted-foreground font-semibold uppercase">
              Active Level
            </div>
          </div>

          {/* FIX: proper height handling */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 p-4 min-h-27.5 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex flex-col items-center justify-center text-center">
              <ThumbsUp className="h-6 w-6 text-blue-500 mb-2" />
              <p className="text-2xl font-bold">
                {engagement.totalVotesReceived}
              </p>
              <p className="text-[10px] text-muted-foreground font-bold uppercase">
                Total Votes
              </p>
            </div>

            <div className="flex-1 p-4 min-h-27.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex flex-col items-center justify-center text-center">
              <MessageSquare className="h-6 w-6 text-emerald-500 mb-2" />
              <p className="text-2xl font-bold">
                {engagement.totalCommentsReceived}
              </p>
              <p className="text-[10px] text-muted-foreground font-bold uppercase">
                Comments
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

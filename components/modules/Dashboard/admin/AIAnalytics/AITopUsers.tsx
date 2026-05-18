"use client";

import React from "react";
import { Award, Crown, Cpu, Activity, User } from "lucide-react";
import { IAdminAITopUser, IAILogItem } from "@/types/adminTypes/adminAIStats.types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface AITopUsersProps {
  topUsers: IAdminAITopUser[];
  recentLogs: IAILogItem[];
}

const AITopUsers = ({ topUsers, recentLogs }: AITopUsersProps) => {
  // Build a lookup map of user metadata from recent logs
  const userMetadataMap = React.useMemo(() => {
    const map = new Map<string, { name: string | null; email: string }>();
    recentLogs.forEach((log) => {
      if (log.userId && log.user) {
        map.set(log.userId, {
          name: log.user.name,
          email: log.user.email,
        });
      }
    });
    return map;
  }, [recentLogs]);

  // Find the maximum tokens consumed to calculate progress bars relative percentages
  const maxTokens = React.useMemo(() => {
    if (topUsers.length === 0) return 0;
    return Math.max(...topUsers.map((u) => u.tokenUsage));
  }, [topUsers]);

  // Formatter for large values
  const formatValue = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
    return val.toString();
  };

  const getRankBadge = (rankIndex: number) => {
    switch (rankIndex) {
      case 0:
        return (
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-xs shadow-amber-500/15">
            <Crown className="w-3.5 h-3.5" />
          </div>
        );
      case 1:
        return (
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-400/15 text-slate-400 border border-slate-400/20">
            <Award className="w-3.5 h-3.5" />
          </div>
        );
      case 2:
        return (
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-700/10 text-amber-700 border border-amber-700/20">
            <Award className="w-3.5 h-3.5" />
          </div>
        );
      default:
        return (
          <span className="text-xs font-mono font-bold text-muted-foreground w-6 text-center">
            #{rankIndex + 1}
          </span>
        );
    }
  };

  return (
    <Card className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-xs shadow-xs overflow-hidden flex flex-col justify-between h-full">
      <CardHeader className="pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-500" />
            Top AI Consumers
          </CardTitle>
          <CardDescription>
            Leaderboard ranking members by AI token utilization and requests.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2 flex-1 overflow-y-auto scrollbar-thin">
        {topUsers && topUsers.length > 0 ? (
          <div className="space-y-4">
            {topUsers.map((item, idx) => {
              const profile = userMetadataMap.get(item.userId);
              const displayName = profile?.name || "Active Member";
              const displayEmail = profile?.email || `ID: ...${item.userId.slice(-8)}`;
              const percent = maxTokens > 0 ? (item.tokenUsage / maxTokens) * 100 : 0;

              return (
                <div
                  key={item.userId}
                  className="flex flex-col space-y-1.5 p-2 rounded-xl hover:bg-muted/40 border border-transparent hover:border-border/20 transition-all group duration-250"
                >
                  <div className="flex items-center justify-between gap-3">
                    {/* User Profile */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      {getRankBadge(idx)}
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0 text-primary font-bold text-xs uppercase">
                        {displayName[0] || <User className="w-3.5 h-3.5" />}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold truncate text-foreground group-hover:text-primary transition-colors">
                          {displayName}
                        </h4>
                        <p className="text-[10px] text-muted-foreground truncate max-w-[130px] sm:max-w-[200px]">
                          {displayEmail}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-col items-end shrink-0 font-mono text-[10px] text-right">
                      <span className="flex items-center gap-1 text-foreground font-semibold">
                        <Cpu className="w-3 h-3 text-violet-500" />
                        {formatValue(item.tokenUsage)}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground/80 mt-0.5">
                        <Activity className="w-3 h-3 text-blue-500" />
                        {item.requestCount} reqs
                      </span>
                    </div>
                  </div>

                  {/* Visual usage progress bar */}
                  <div className="pl-8">
                    <div className="h-1 bg-muted rounded-full overflow-hidden w-full">
                      <div
                        className="h-full bg-linear-to-r from-violet-500 to-primary rounded-full transition-all duration-700"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="h-60 w-full flex items-center justify-center text-muted-foreground text-sm">
            No top users found on this period.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AITopUsers;

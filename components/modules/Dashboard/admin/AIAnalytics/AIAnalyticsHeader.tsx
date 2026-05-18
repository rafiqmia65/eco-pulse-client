"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIAnalyticsHeaderProps {
  isFetching: boolean;
  onRefresh: () => void;
}

const AIAnalyticsHeader = ({ isFetching, onRefresh }: AIAnalyticsHeaderProps) => {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    setTimeString(new Date().toUTCString());
    const interval = setInterval(() => {
      setTimeString(new Date().toUTCString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground via-foreground/90 to-foreground/60">
            AI Analytics Dashboard
          </h1>
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
        </div>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
          Real-time metrics for AI query volumes, token consumption splits, estimated API costs, average system speed, and member behaviors.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {/* UTC Time Indicator */}
        <div className="hidden sm:flex flex-col items-end text-right">
          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground/60">
            System Clock (UTC)
          </span>
          <span className="text-xs font-mono font-medium text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-md border border-border/20 mt-0.5">
            {timeString || "Syncing..."}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isFetching}
            className="h-10 px-4 rounded-xl border-border/50 hover:bg-accent/40 active:scale-95 transition-all gap-2"
          >
            <RefreshCcw
              className={`w-3.5 h-3.5 text-muted-foreground ${
                isFetching ? "animate-spin text-primary" : ""
              }`}
            />
            {isFetching ? "Refreshing..." : "Sync Stats"}
          </Button>

          <div className="p-2.5 bg-primary/10 rounded-2xl border border-primary/20 shadow-xs shadow-primary/10">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalyticsHeader;

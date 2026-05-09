"use client";

import { useEffect } from "react";
import { Sparkles, ArrowRight, Loader2, Info } from "lucide-react";
import { useAppStore } from "@/store";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SmartRecommendationsProps {
  /** Only render for logged-in users. Pass currentUserId from the server. */
  currentUserId?: string;
}

export default function SmartRecommendations({
  currentUserId,
}: SmartRecommendationsProps) {
  const { recommendations, isRecommendationsLoading, fetchRecommendations } =
    useAppStore();

  useEffect(() => {
    // Only fetch if the user is logged in
    if (currentUserId) {
      fetchRecommendations();
    }
  }, [currentUserId, fetchRecommendations]);

  // Don't render anything for guests
  if (!currentUserId) return null;

  if (isRecommendationsLoading) {
    return (
      <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-primary" size={32} />
        <p className="text-sm font-medium animate-pulse">
          Personalizing your recommendations...
        </p>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="h-6 w-1 bg-primary rounded-full" />
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              Recommended for You
              <Sparkles size={20} className="text-yellow-500" />
            </h2>
          </div>
        </div>

        <div className="bg-muted/40 border border-border rounded-3xl p-10 flex flex-col items-center text-center space-y-3">
          <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center">
            <Sparkles size={24} className="text-primary" />
          </div>
          <div>
            <p className="font-semibold text-base">No recommendations yet</p>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-1">
              Start exploring — vote on ideas or add them to your watchlist and
              our AI will personalize picks just for you.
            </p>
          </div>
        </div>
      </section>
    );
  }


  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="h-6 w-1 bg-primary rounded-full" />
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            Recommended for You
            <Sparkles size={20} className="text-yellow-500" />
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-muted rounded-full text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
          <Info size={12} />
          Based on your activity
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.ideaId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-card border border-border hover:border-primary/50 rounded-3xl p-6 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden"
          >
            {/* Glow decoration */}
            <div className="absolute -right-4 -top-4 bg-primary/5 h-20 w-20 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />

            <div className="relative space-y-4">
              <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Sparkles size={20} />
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">
                  {rec.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {rec.reason}
                </p>
              </div>

              <Link href={`/ideas/${rec.ideaId}`}>
                <Button
                  variant="ghost"
                  className="w-full justify-between rounded-xl hover:bg-primary hover:text-primary-foreground group/btn mt-2"
                >
                  View Details
                  <ArrowRight
                    size={16}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

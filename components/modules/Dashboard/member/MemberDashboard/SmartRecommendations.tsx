"use client";

import { useEffect } from "react";
import { Sparkles, ArrowRight, Loader2, Info } from "lucide-react";
import { useAppStore } from "@/store";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function SmartRecommendations() {
  const { recommendations, isRecommendationsLoading, fetchRecommendations } = useAppStore();

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  if (isRecommendationsLoading) {
    return (
      <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-primary" size={32} />
        <p className="text-sm font-medium animate-pulse">Personalizing your experience...</p>
      </div>
    );
  }

  if (recommendations.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="h-6 w-1 bg-primary rounded-full" />
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            Smart Recommendations
            <Sparkles size={20} className="text-yellow-500" />
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-muted rounded-full text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
          <Info size={12} />
          Based on your activity
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.ideaId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-card border border-border hover:border-primary/50 rounded-3xl p-6 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden"
          >
            {/* Decoration */}
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
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

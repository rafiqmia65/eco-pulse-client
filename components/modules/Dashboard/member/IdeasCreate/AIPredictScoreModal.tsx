"use client";

import { useState } from "react";
import { Loader2, TrendingUp, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { IAIPrediction } from "@/types/ai.types";
import { predictIdeaScoreAction } from "@/services/ai/ai.services";
import { handleAIError } from "@/lib/ai-utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AIPredictScoreModalProps {
  title: string;
  problem: string;
  solution: string;
  categoryName: string;
}

export default function AIPredictScoreModal({
  title,
  problem,
  solution,
  categoryName,
}: AIPredictScoreModalProps) {
  const [open, setOpen] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState<IAIPrediction | null>(null);

  const handlePredict = async () => {
    if (!title || !problem || !solution || !categoryName) {
      return toast.error(
        "Please fill in the title, category, problem, and solution first.",
      );
    }

    setIsPredicting(true);
    setPrediction(null);

    const res = await predictIdeaScoreAction({
      title,
      problem,
      solution,
      categoryName,
    });

    if (res.success && res.data) {
      setPrediction(res.data);
      toast.success("Score predicted successfully!");
    } else {
      handleAIError(res);
    }

    setIsPredicting(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-indigo-500/5 border-indigo-500/20 text-indigo-500 hover:bg-indigo-500/10 gap-2 rounded-xl"
        >
          <TrendingUp size={16} />
          Predict Score
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-3xl border-border shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <TrendingUp className="text-indigo-500" />
            AI Score Predictor
          </DialogTitle>
          <DialogDescription>
            Get an estimated success score for your idea before publishing it!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4 flex flex-col items-center">
          {!prediction && !isPredicting && (
            <div className="text-center space-y-4">
              <div className="bg-muted p-4 rounded-xl text-sm text-muted-foreground">
                <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                Make sure you have entered the title, problem, solution, and
                selected a category.
              </div>
              <Button
                onClick={handlePredict}
                className="gap-2 rounded-xl w-full"
              >
                <TrendingUp size={16} />
                Analyze My Idea
              </Button>
            </div>
          )}

          {isPredicting && (
            <div className="py-10 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
              <p className="text-sm animate-pulse text-muted-foreground">
                Evaluating your idea&apos;s potential...
              </p>
            </div>
          )}

          {prediction && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full space-y-6"
            >
              <div className="bg-muted/30 p-6 rounded-2xl border border-border text-center">
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                  Estimated Score
                </span>
                <div
                  className={`text-6xl font-black mt-2 ${getScoreColor(
                    prediction.score,
                  )}`}
                >
                  {prediction.score}
                  <span className="text-2xl text-muted-foreground">/100</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-500/5 p-4 rounded-2xl border border-indigo-500/10">
                  <span className="text-xs font-bold uppercase text-muted-foreground mb-1 block">
                    Market Potential
                  </span>
                  <span className="text-lg font-bold text-indigo-500">
                    {prediction.marketPotential}
                  </span>
                </div>
                <div className="bg-green-500/5 p-4 rounded-2xl border border-green-500/10">
                  <span className="text-xs font-bold uppercase text-muted-foreground mb-1 block">
                    Sustainability Impact
                  </span>
                  <span className="text-lg font-bold text-green-500">
                    {prediction.sustainabilityImpact}
                  </span>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-2xl text-sm italic text-muted-foreground border border-border/50">
                &quot;{prediction.reasoning}&quot;
              </div>

              <Button
                onClick={handlePredict}
                variant="outline"
                className="w-full rounded-xl"
              >
                <TrendingUp size={16} className="mr-2" />
                Recalculate Score
              </Button>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

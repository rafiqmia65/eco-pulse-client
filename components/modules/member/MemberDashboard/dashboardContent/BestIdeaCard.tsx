import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Lightbulb,
  ThumbsUp,
  MessageSquare,
  ChevronRight,
  Award,
} from "lucide-react";
import Link from "next/link";
import { BestIdea } from "@/types/memberTypes/DashboardStats.types";

export const BestIdeaCard = ({ bestIdea }: { bestIdea: BestIdea | null }) => {
  return (
    <Card className="border-none shadow-sm bg-card/50 backdrop-blur-md h-full overflow-hidden group">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold tracking-tight">
          Top Performer
        </CardTitle>
        <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
          <Award className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        {bestIdea ? (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-5">
                <Lightbulb size={60} className="text-primary" />
              </div>
              <h3 className="font-bold text-xl leading-tight mb-4 group-hover:text-primary transition-colors">
                {bestIdea.title}
              </h3>
              <div className="flex gap-6">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <ThumbsUp className="h-4 w-4 text-primary" />
                  <span>{bestIdea.votesCount}</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span>{bestIdea.commentsCount}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                This project is currently your most successful initiative. High
                engagement suggests strong community interest.
              </p>
              <Link
                href={`/ideas/${bestIdea.slug}`}
                className="flex items-center justify-between p-4 text-sm font-bold rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/btn"
              >
                Go to Project
                <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
            <div className="p-4 bg-muted rounded-2xl">
              <Lightbulb className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-bold text-lg">No Top Idea Yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Start sharing your visions to see stats here.
              </p>
            </div>
            <Link
              href="/dashboard/ideas/create"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Create Idea
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

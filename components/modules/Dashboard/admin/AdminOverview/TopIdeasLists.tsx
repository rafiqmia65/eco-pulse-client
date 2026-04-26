"use client";

import React from "react";
import {
  ThumbsUp,
  ShoppingBag,
  ChevronRight,
  TrendingUp,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ITopIdeaVoted,
  ITopIdeaPurchased,
} from "@/types/adminTypes/adminStats.types";
import Link from "next/link";
import Image from "next/image";

interface TopIdeasListsProps {
  voted: ITopIdeaVoted[];
  purchased: ITopIdeaPurchased[];
}

const TopIdeasLists = ({ voted, purchased }: TopIdeasListsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Most Voted */}
      <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur-xs shadow-sm overflow-hidden">
        <CardHeader className="border-b bg-muted/20 px-6 py-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <ThumbsUp className="w-5 h-5 text-amber-500" />
            Most Voted Ideas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/40">
            {voted.length > 0 ? (
              voted.map((idea) => (
                <Link
                  key={idea.id}
                  href={`/ideas/${idea.slug}`}
                  className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0 border border-border/50">
                      <Image
                        fill
                        src={idea.image}
                        alt={idea.title}
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground line-clamp-1 leading-tight">
                        {idea.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 text-[10px] text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded-full font-bold">
                          <Star className="w-2.5 h-2.5 fill-amber-500" />
                          {idea.votesCount} Votes
                        </div>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </Link>
              ))
            ) : (
              <EmptyState message="No voted ideas yet" />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Most Purchased */}
      <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur-xs shadow-sm overflow-hidden">
        <CardHeader className="border-b bg-muted/20 px-6 py-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-500" />
            Best Selling Ideas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/40">
            {purchased.length > 0 ? (
              purchased.map((idea) => (
                <Link
                  key={idea.id}
                  href={`/ideas/${idea.slug}`}
                  className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0 border border-border/50">
                      <Image
                        fill
                        src={idea.image}
                        alt={idea.title}
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground line-clamp-1 leading-tight">
                        {idea.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 text-[10px] text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-full font-bold">
                          <TrendingUp className="w-2.5 h-2.5" />
                          {idea.purchaseCount} Sales
                        </div>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </Link>
              ))
            ) : (
              <EmptyState message="No sales yet" />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const EmptyState = ({ message }: { message: string }) => (
  <div className="p-8 text-center text-muted-foreground">
    <p className="text-sm">{message}</p>
  </div>
);

export default TopIdeasLists;

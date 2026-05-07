"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Bookmark,
  Lock,
  TrendingUp,
  Star,
} from "lucide-react";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import TiptapViewer from "@/components/shared/TiptapViewer/TiptapViewer";
import { IIdea } from "@/types/public/home.types";

export default function TrendingCarouselCard({ idea }: { idea: IIdea }) {
  const isUpvoted = idea.currentUserVote === 1;
  const isDownvoted = idea.currentUserVote === -1;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="min-w-[300px] sm:min-w-[320px] bg-card border border-border shadow-custom hover:shadow-lg flex flex-col relative transition-all duration-200"
    >
      {/* IMAGE */}
      <div className="relative">
        <Image
          src={idea.image}
          alt={idea.title}
          width={600}
          height={300}
          className="w-full h-40 object-cover"
        />
        {idea.isLocked && (
          <div className="absolute inset-0 z-10 bg-black/50 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2">
            <div className="bg-background p-2 shadow">
              <Lock size={18} className="text-primary" />
            </div>
            {idea.isPaid && (
              <span className="bg-primary text-primary-foreground text-[10px] px-2 py-1">
                PREMIUM CONTENT
              </span>
            )}
          </div>
        )}
        <div className="absolute top-3 left-3 z-20">
          <span className="bg-primary text-primary-foreground text-[10px] px-2 py-1 flex items-center gap-1 font-bold uppercase">
            <TrendingUp size={10} />
            Trending
          </span>
        </div>
        <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-1">
          {idea.isOwner && (
            <span className="bg-muted text-foreground text-[10px] px-2 py-1 font-bold">
              OWNER
            </span>
          )}
          {idea.hasPurchased && (
            <span className="bg-muted text-foreground text-[10px] px-2 py-1 flex items-center gap-1 font-bold">
              <Star size={10} className="fill-current" />
              Purchased
            </span>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <h3 className="text-sm font-bold line-clamp-1 group-hover:text-primary transition-colors">
          {idea.title}
        </h3>

        <div className="text-[11px] text-muted-foreground line-clamp-2 min-h-[32px]">
          <TiptapViewer content={idea.description} />
        </div>

        <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
          <span className="bg-muted px-2 py-0.5 rounded">
            {idea.category.name}
          </span>
          <span>{idea.author.name}</span>
        </div>

        <div className="flex items-center text-[11px] text-muted-foreground py-2 border-y border-border/40">
          <div className="flex items-center gap-3">
            <span
              className={`flex items-center gap-1 ${isUpvoted ? "text-primary font-bold" : ""}`}
            >
              <ThumbsUp size={12} className={isUpvoted ? "fill-primary" : ""} />
              {idea.upvotes}
            </span>
            <span
              className={`flex items-center gap-1 ${isDownvoted ? "text-primary font-bold" : ""}`}
            >
              <ThumbsDown
                size={12}
                className={isDownvoted ? "fill-primary" : ""}
              />
              {idea.downvotes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle size={12} />
              {idea.commentsCount}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Bookmark
              size={12}
              className={idea.isWatchlisted ? "fill-primary text-primary" : ""}
            />
            {idea.watchListCount}
          </div>
        </div>

        <Link href={`/ideas/${idea.id}`} className="mt-2">
          <CustomButton className="w-full text-xs py-5">
            View Details
          </CustomButton>
        </Link>
      </div>
    </motion.div>
  );
}

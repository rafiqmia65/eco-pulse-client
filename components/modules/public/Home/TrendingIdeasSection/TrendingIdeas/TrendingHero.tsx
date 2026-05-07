"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ThumbsUp,
  MessageCircle,
  Bookmark,
  Lock,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import TiptapViewer from "@/components/shared/TiptapViewer/TiptapViewer";
import { IIdea } from "@/types/public/home.types";

export default function TrendingHero({ hero }: { hero: IIdea }) {
  const isHeroUpvoted = hero.currentUserVote === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-10 group"
    >
      <div className="relative overflow-hidden bg-card border border-border shadow-2xl transition-all duration-500 hover:border-primary/30">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 pointer-events-none" />

        <div className="flex flex-col lg:grid lg:grid-cols-12">
          {/* IMAGE */}
          <div className="relative h-[250px] sm:h-[300px] lg:h-[400px] lg:col-span-7 overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7 }}
              className="w-full h-full"
            >
              <Image
                src={hero.image}
                alt={hero.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent lg:hidden" />
            {hero.isLocked && (
              <div className="absolute inset-0 bg-background/20 backdrop-blur-xs flex items-center justify-center z-10">
                <div className="bg-background/90 px-6 py-3 flex items-center gap-3 shadow-2xl border border-primary/20 scale-110">
                  <Lock size={20} className="text-primary animate-pulse" />
                  <span className="text-sm font-bold tracking-tight">
                    PREMIUM ACCESS ONLY
                  </span>
                </div>
              </div>
            )}
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest shadow-lg">
                <TrendingUp size={12} />
                Trending #1
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-6 sm:p-8 lg:p-10 lg:col-span-5 flex flex-col justify-center relative bg-card/80 backdrop-blur-sm">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {hero.isPaid && (
                <span className="text-[10px] font-bold px-2 py-0.5 border border-primary/30 text-primary uppercase">
                  Paid Strategy
                </span>
              )}
              {hero.isOwner && (
                <span className="text-[10px] font-bold px-2 py-0.5 border border-foreground/10 text-muted-foreground uppercase">
                  Your Idea
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black leading-tight mb-4 tracking-tighter group-hover:text-primary transition-colors duration-300">
              {hero.title}
            </h2>

            <div className="text-muted-foreground text-xs mb-4 line-clamp-2 leading-relaxed font-light">
              <TiptapViewer content={hero.description} />
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase text-muted-foreground tracking-widest font-bold mb-1">
                  Category
                </span>
                <span className="text-xs font-semibold bg-muted px-2 py-0.5 rounded">
                  {hero.category.name}
                </span>
              </div>
              <div className="h-8 w-px bg-border mx-2" />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase text-muted-foreground tracking-widest font-bold mb-1">
                  Funding
                </span>
                <span className="text-xs font-bold text-primary">
                  {hero.isPaid ? `$${hero.price}` : "Free"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-border/50 mb-6">
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5 text-primary font-bold text-sm">
                  <ThumbsUp
                    size={14}
                    className={isHeroUpvoted ? "fill-primary" : ""}
                  />
                  <span>{hero.upvotes}</span>
                </div>
                <span className="text-[8px] uppercase text-muted-foreground font-bold">
                  Upvotes
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 border-l border-r border-border/50">
                <div className="flex items-center gap-1.5 font-bold text-sm">
                  <MessageCircle size={14} />
                  <span>{hero.commentsCount}</span>
                </div>
                <span className="text-[8px] uppercase text-muted-foreground font-bold">
                  Comments
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5 text-muted-foreground font-bold text-sm">
                  <Bookmark
                    size={14}
                    className={
                      hero.isWatchlisted ? "fill-primary text-primary" : ""
                    }
                  />
                  <span>{hero.watchListCount}</span>
                </div>
                <span className="text-[8px] uppercase text-muted-foreground font-bold">
                  Watchlist
                </span>
              </div>
            </div>

            <Link
              href={`/ideas/${hero.id}`}
              className="group/btn relative inline-block"
            >
              <CustomButton className="w-full py-6 text-sm font-bold rounded-none flex items-center justify-center gap-2 overflow-hidden">
                <span className="relative z-10">VIEW SOLUTION</span>
                <ArrowRight
                  size={18}
                  className="relative z-10 group-hover/btn:translate-x-2 transition-transform"
                />
              </CustomButton>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

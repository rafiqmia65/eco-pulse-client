"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  TrendingUp,
  Star,
  Bookmark,
  Lock,
} from "lucide-react";

import { IIdea } from "@/types/public/home.types";
import Section from "@/components/shared/reusableComponents/Section";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import TiptapViewer from "@/components/shared/TiptapViewer/TiptapViewer";

const TrendingIdeas = ({ ideas }: { ideas: IIdea[] }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!ideas.length) {
    return (
      <Section variant="muted">
        <p className="text-center text-muted-foreground py-10">
          No trending ideas found
        </p>
      </Section>
    );
  }

  // DATA SPLIT
  const hero = ideas[0];
  const list = ideas.slice(1);
  const loopList = [...list, ...list];

  const isHeroUpvoted = hero?.currentUserVote === 1;
  const isHeroDownvoted = hero?.currentUserVote === -1;

  return (
    <Section variant="default">
      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          Trending Ideas
        </h2>

        <p className="text-muted-foreground mt-2 text-sm max-w-3xl mx-auto leading-relaxed">
          Discover the most impactful and community-driven ideas ranked by
          real-time engagement, including votes, discussions, and overall
          activity. This section highlights what is truly trending right now.
        </p>
      </div>

      {/* ================= HERO ================= */}
      <div className="mb-12">
        <div className="shadow-xl bg-card overflow-hidden">
          {/* MOBILE + TABLET = column | LG = grid */}
          <div className="flex flex-col lg:grid lg:grid-cols-2">
            {/* ================= IMAGE ================= */}
            <div className="relative h-[220px] sm:h-[260px] md:h-[300px] lg:h-auto order-1 lg:order-2">
              <Image
                src={hero.image}
                alt={hero.title}
                fill
                className="object-cover"
              />

              {/* LOCK */}
              {hero.isLocked && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="bg-background px-4 py-2 flex items-center gap-2 shadow-md border">
                    <Lock size={16} className="text-primary" />
                    <span className="text-xs font-medium">Locked Content</span>
                  </div>
                </div>
              )}
            </div>

            {/* ================= CONTENT ================= */}
            <div className="p-5 sm:p-6 md:p-8 flex flex-col justify-between order-2 lg:order-1">
              {/* BADGES */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="bg-primary text-primary-foreground text-[11px] px-3 py-1 flex items-center gap-1">
                  <TrendingUp size={12} />
                  Trending #1
                </span>

                {hero.isPaid && (
                  <span className="bg-muted text-foreground text-[11px] px-3 py-1">
                    PREMIUM
                  </span>
                )}

                {hero.isOwner && (
                  <span className="bg-muted text-foreground text-[11px] px-3 py-1">
                    OWNER
                  </span>
                )}

                {hero.hasPurchased && (
                  <span className="bg-primary text-primary-foreground text-[11px] px-3 py-1 flex items-center gap-1">
                    <Star size={12} className="fill-white" />
                    Purchased
                  </span>
                )}
              </div>

              {/* TITLE */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-snug mb-3">
                {hero.title}
              </h2>

              {/* META */}
              <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-muted-foreground mb-3">
                <span className="bg-muted px-2 py-1">{hero.category.name}</span>

                <span>
                  by{" "}
                  <span className="text-foreground font-medium">
                    {hero.author.name}
                  </span>
                </span>

                <span className="ml-auto font-semibold text-primary">
                  {hero.isPaid ? `$${hero.price}` : "Free"}
                </span>
              </div>

              {/* STATS */}
              <div className="flex items-center justify-between text-xs pt-1">
                <div className="flex items-center gap-3 text-muted-foreground">
                  {/* UPVOTE */}
                  <span
                    className={`flex items-center gap-1 transition ${
                      isHeroUpvoted
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    <ThumbsUp
                      size={14}
                      className={
                        isHeroUpvoted
                          ? "text-primary fill-primary stroke-primary"
                          : "text-muted-foreground"
                      }
                    />
                    {hero.upvotes}
                  </span>

                  {/* DOWNVOTE */}
                  <span
                    className={`flex items-center gap-1 transition ${
                      isHeroDownvoted
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    <ThumbsDown
                      size={14}
                      className={
                        isHeroDownvoted
                          ? "text-primary fill-primary stroke-primary"
                          : "text-muted-foreground"
                      }
                    />
                    {hero.downvotes}
                  </span>

                  {/* COMMENTS */}
                  <span className="flex items-center gap-1">
                    <MessageCircle size={14} />
                    {hero.commentsCount}
                  </span>
                </div>

                {/* WATCHLIST (MOVED FROM PRICE POSITION) */}
                <div className="flex items-center gap-1">
                  <Bookmark
                    size={14}
                    className={
                      hero.isWatchlisted
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }
                  />
                  {hero.watchListCount}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-5">
                <Link href={`/ideas/${hero.id}`}>
                  <CustomButton className="w-full text-sm">
                    View Details
                  </CustomButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CAROUSEL ================= */}
      <div
        className="overflow-x-auto overflow-y-visible pb-8 pt-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex gap-6"
          animate={{
            x: isHovered ? 0 : ["0%", "-50%"],
          }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {loopList.map((idea, index) => {
            const isUpvoted = idea.currentUserVote === 1;
            const isDownvoted = idea.currentUserVote === -1;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="min-w-[320px] bg-card border border-border shadow-custom hover:shadow-lg flex flex-col relative transition-all duration-200"
              >
                {/* IMAGE */}
                <div className="relative">
                  <Image
                    src={idea.image}
                    alt={idea.title}
                    width={600}
                    height={300}
                    className="w-full h-44 object-cover"
                  />

                  {/* LOCK */}
                  {idea.isLocked && (
                    <div className="absolute inset-0 z-10 bg-black/50 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2">
                      {/* LOCK ICON */}
                      <div className="bg-background p-2 shadow">
                        <Lock size={18} className="text-primary" />
                      </div>

                      {/* PREMIUM TEXT */}
                      {idea.isPaid && (
                        <span className="bg-primary text-primary-foreground text-xs px-3 py-1">
                          PREMIUM CONTENT
                        </span>
                      )}
                    </div>
                  )}

                  {/* TOP LEFT */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className="bg-primary text-primary-foreground text-[11px] px-2 py-1 flex items-center gap-1">
                      <TrendingUp size={12} />
                      Trending
                    </span>
                  </div>

                  {/* RIGHT */}
                  <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-1">
                    {idea.isOwner && (
                      <span className="bg-muted text-foreground text-[11px] px-2 py-1">
                        OWNER
                      </span>
                    )}

                    {idea.hasPurchased && (
                      <span className="bg-muted text-foreground text-[11px] px-2 py-1 flex items-center gap-1">
                        <Star size={11} className="fill-current" />
                        Already Purchased
                      </span>
                    )}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <h3 className="text-sm font-semibold line-clamp-1">
                    {idea.title}
                  </h3>

                  <div className="text-xs text-muted-foreground line-clamp-2">
                    <TiptapViewer content={idea.description} />
                  </div>

                  {/* META */}
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span className="bg-muted px-2 py-1">
                      {idea.category.name}
                    </span>
                    <span>{idea.author.name}</span>
                  </div>

                  {/* STATS */}
                  <div className="flex items-center text-xs text-muted-foreground">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      {/* UPVOTE */}
                      <span
                        className={`flex items-center gap-1 transition ${
                          isUpvoted
                            ? "text-primary font-semibold"
                            : "text-muted-foreground"
                        }`}
                      >
                        <ThumbsUp
                          size={14}
                          className={
                            isUpvoted
                              ? "text-primary fill-primary stroke-primary"
                              : "text-muted-foreground"
                          }
                        />
                        {idea.upvotes}
                      </span>

                      {/* DOWNVOTE */}
                      <span
                        className={`flex items-center gap-1 transition ${
                          isDownvoted
                            ? "text-primary font-semibold"
                            : "text-muted-foreground"
                        }`}
                      >
                        <ThumbsDown
                          size={14}
                          className={
                            isDownvoted
                              ? "text-primary fill-primary stroke-primary"
                              : "text-muted-foreground"
                          }
                        />
                        {idea.downvotes}
                      </span>

                      {/* COMMENTS */}
                      <span className="flex items-center gap-1">
                        <MessageCircle size={14} />
                        {idea.commentsCount}
                      </span>
                    </div>

                    <div className="ml-auto flex items-center gap-1">
                      <Bookmark
                        size={14}
                        className={
                          idea.isWatchlisted
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }
                      />
                      {idea.watchListCount}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link href={`/ideas/${idea.id}`} className="mt-auto">
                    <CustomButton className="w-full">See Details</CustomButton>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
};

export default TrendingIdeas;

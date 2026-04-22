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
} from "lucide-react";

import { IIdea } from "@/types/public/home.types";
import Section from "@/components/shared/reusableComponents/Section";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";

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

  const hero = ideas[0];
  const list = ideas.slice(1);
  const loopList = [...list, ...list];

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

      {/* HERO */}
      <div className="mb-10">
        <div className="relative overflow-hidden border shadow-lg">
          <Image
            src={hero.image}
            alt={hero.title}
            width={1200}
            height={500}
            className="w-full h-80 object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

          <div className="absolute bottom-0 p-6 text-white">
            <div className="flex items-center gap-2 text-xs mb-2">
              <Star className="w-4 h-4 text-yellow-400" />
              Top Trending #1
            </div>

            <h3 className="text-2xl font-bold">{hero.title}</h3>

            <Link href={`/ideas/${hero.id}`}>
              <CustomButton className="mt-3">See Details</CustomButton>
            </Link>
          </div>
        </div>
      </div>

      {/* CAROUSEL */}
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
                whileHover={{
                  y: -10, // ONLY MOVE UP (NO SCALE)
                }}
                className="
                  min-w-[320px]
                  bg-card border
                  shadow-md hover:shadow-2xl
                  flex flex-col
                  relative z-0
                  hover:z-10
                  transition-all duration-100
                "
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

                  <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 flex items-center gap-1 animate-pulse">
                    <TrendingUp className="w-3 h-3" />
                    Trending
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <h3 className="text-md font-semibold line-clamp-1">
                    {idea.title}
                  </h3>

                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {idea.description}
                  </p>

                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span className="bg-muted px-2 py-1">
                      {idea.category.name}
                    </span>
                    <span>{idea.author.name}</span>
                  </div>

                  <div className="flex gap-3 text-xs">
                    <span
                      className={`flex items-center gap-1 ${
                        isUpvoted ? "text-green-500 font-semibold" : ""
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      {idea.upvotes}
                    </span>

                    <span
                      className={`flex items-center gap-1 ${
                        isDownvoted ? "text-red-500 font-semibold" : ""
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      {idea.downvotes}
                    </span>

                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {idea.commentsCount}
                    </span>
                  </div>

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

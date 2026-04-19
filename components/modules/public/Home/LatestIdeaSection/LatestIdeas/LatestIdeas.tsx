"use client";

import Image from "next/image";
import Link from "next/link";
import { ThumbsUp, MessageCircle, Lock, ThumbsDown } from "lucide-react";
import { IIdea } from "@/types/home.types";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import Section from "@/components/shared/reusableComponents/Section";

const LatestIdeas = ({ ideas }: { ideas: IIdea[] }) => {
  if (!ideas.length) {
    return (
      <Section variant="muted">
        <p className="text-center text-muted-foreground py-10">
          No ideas found
        </p>
      </Section>
    );
  }

  return (
    <Section variant="muted">
      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Latest Ideas
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Explore real sustainability innovations from our community
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {ideas.map((idea) => {
          const isUpvoted = idea.currentUserVote === 1;
          const isDownvoted = idea.currentUserVote === -1;

          return (
            <div
              key={idea.id}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-custom hover:shadow-lg transition flex flex-col"
            >
              {/* IMAGE */}
              <div className="relative">
                <Image
                  src={idea.image}
                  alt={idea.title}
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover"
                />

                {idea.isPaid && (
                  <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                    Premium
                  </span>
                )}

                {idea.isLocked && (
                  <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Lock size={12} /> Locked
                  </span>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                {/* TITLE */}
                <h3 className="text-lg font-semibold text-foreground">
                  {idea.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {idea.description}
                </p>

                {/* META */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="bg-muted px-2 py-1 rounded">
                    {idea.category.name}
                  </span>
                  <span>{idea.author.name}</span>
                </div>

                {/* SOLUTION */}
                <div className="bg-muted/40 border border-border rounded-lg p-3 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Solution: {idea.solution}
                  </span>
                </div>

                {/* VOTE + COMMENTS */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    {/* UPVOTE */}
                    <span
                      className={`flex items-center gap-1 transition ${
                        isUpvoted ? "text-green-500 font-semibold" : ""
                      }`}
                    >
                      <ThumbsUp size={14} />
                      {idea.upvotes}
                    </span>

                    {/* DOWNVOTE */}
                    <span
                      className={`flex items-center gap-1 transition ${
                        isDownvoted ? "text-red-500 font-semibold" : ""
                      }`}
                    >
                      <ThumbsDown size={14} />
                      {idea.downvotes}
                    </span>

                    {/* COMMENTS */}
                    <span className="flex items-center gap-1">
                      <MessageCircle size={14} />
                      {idea.commentsCount}
                    </span>
                  </div>

                  <span className="font-semibold text-primary">
                    {idea.isPaid ? `$${idea.price}` : "Free"}
                  </span>
                </div>

                {/* FOOTER */}
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Total votes: {idea.votesCount}
                  </span>

                  <Link href={`/ideas/${idea.id}`}>
                    <CustomButton className="px-4 py-2 text-sm">
                      See Details
                    </CustomButton>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default LatestIdeas;

import Image from "next/image";
import Link from "next/link";
import {
  ThumbsUp,
  MessageCircle,
  Lock,
  ThumbsDown,
  Bookmark,
  Star,
} from "lucide-react";
import { IIdea } from "@/types/public/home.types";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import Section from "@/components/shared/reusableComponents/Section";
import TiptapViewer from "@/components/shared/TiptapViewer/TiptapViewer";

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
        <p className="text-muted-foreground mt-2 text-sm max-w-2xl mx-auto leading-relaxed">
          Explore a curated collection of innovative sustainability ideas
          contributed by developers, thinkers, and creators. Each idea focuses
          on solving real-world environmental problems through technology,
          creativity, and community-driven impact.
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
              className="bg-card border border-border overflow-hidden shadow-custom hover:shadow-lg transition flex flex-col"
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
                    <div className="bg-background p-2 shadow">
                      <Lock size={18} className="text-primary" />
                    </div>

                    {idea.isPaid && (
                      <span className="bg-primary text-primary-foreground text-xs px-3 py-1">
                        PREMIUM CONTENT
                      </span>
                    )}
                  </div>
                )}

                {/* LEFT TOP BADGES (NEW POSITION) */}
                <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
                  {idea.isOwner && (
                    <span className="bg-primary text-primary-foreground text-[11px] px-2 py-1">
                      OWNER
                    </span>
                  )}

                  {idea.hasPurchased && (
                    <span className="bg-primary text-primary-foreground text-[11px] px-2 py-1 flex items-center gap-1">
                      <Star size={11} className="fill-white" />
                      Already Purchased
                    </span>
                  )}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                {/* TITLE */}
                <h3 className="text-lg font-semibold text-foreground">
                  {idea.title}
                </h3>

                {/* DESCRIPTION */}
                <div className="text-sm text-muted-foreground line-clamp-2">
                  <TiptapViewer content={idea.description} />
                </div>

                {/* META */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="bg-muted px-2 py-1">
                    {idea.category.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground font-medium">Author:</span>
                    <span className="bg-muted px-2 py-1">
                      {idea.author.name}
                    </span>
                  </div>
                </div>

                {/* SOLUTION */}
                <div className="bg-muted/40 border border-border p-3 text-xs text-muted-foreground">
                  <TiptapViewer content={idea.solution} />
                </div>

                {/* VOTE + COMMENTS + WATCHLIST*/}
                <div className="flex items-center justify-between text-xs pt-1">
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

                  {/* WATCHLIST (MOVED FROM PRICE POSITION) */}
                  <div className="flex items-center gap-1">
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

                {/* FOOTER */}
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/60">
                  {/* PRICE */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>Price:</span>
                    <span
                      className={`font-semibold ${
                        idea.isPaid ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {idea.isPaid ? `$${idea.price}` : "Free"}
                    </span>
                  </div>

                  {/* CTA */}
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

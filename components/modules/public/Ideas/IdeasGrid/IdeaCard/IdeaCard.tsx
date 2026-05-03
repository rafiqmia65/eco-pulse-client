import TiptapViewer from "@/components/shared/TiptapViewer/TiptapViewer";
import { Idea } from "@/types/public/ideas.types";
import { ThumbsUp, ThumbsDown, MessageCircle, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IdeaCardProps {
  idea: Idea;
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  const isUpvoted = idea.currentUserVote === "UPVOTE";
  const isDownvoted = idea.currentUserVote === "DOWNVOTE";

  return (
    <div className="bg-card border border-border overflow-hidden shadow-custom hover:shadow-lg transition flex flex-col">
      {/* IMAGE (same as LatestIdeas) */}
      <div className="relative">
        <Image
          src={idea.image || "/placeholder.png"}
          alt={idea.title}
          width={600}
          height={300}
          className="w-full h-48 object-cover"
        />

        {idea.isPaid && (
          <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs px-2 py-1">
            Premium
          </span>
        )}

        {idea.isLocked && (
          <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 flex items-center gap-1">
            <Lock size={12} /> Locked
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* TITLE */}
        <h3 className="text-lg font-semibold text-foreground">{idea.title}</h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          <TiptapViewer content={idea.description} />
        </p>

        {/* META */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="bg-muted px-2 py-1 rounded">
            {idea.category?.name}
          </span>
          <span>{idea.author?.name}</span>
        </div>

        {/* SOLUTION (LATEST STYLE MATCH) */}
        <div className="bg-muted/40 border border-border p-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">
            Solution: {idea.solution}
          </span>
        </div>

        {/* VOTE + COMMENTS */}
        <div className="flex items-center justify-between text-xs pt-1">
          <div className="flex items-center gap-3 text-muted-foreground">
            <span
              className={`flex items-center gap-1 transition ${
                isUpvoted ? "text-green-500 font-semibold" : ""
              }`}
            >
              <ThumbsUp size={14} />
              {idea.upvotes}
            </span>

            <span
              className={`flex items-center gap-1 transition ${
                isDownvoted ? "text-red-500 font-semibold" : ""
              }`}
            >
              <ThumbsDown size={14} />
              {idea.downvotes}
            </span>

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
            <button className="px-4 py-2 text-sm rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition">
              See Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

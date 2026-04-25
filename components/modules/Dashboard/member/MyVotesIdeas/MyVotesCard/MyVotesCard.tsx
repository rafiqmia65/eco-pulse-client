import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  ArrowRight,
  User,
  Calendar,
  Layers,
  CheckCircle2
} from "lucide-react";
import { IVote } from "@/types/memberTypes/myVotes.types";
import { Badge } from "@/components/ui/badge";
import { formatTimeAgo } from "@/lib/formatDate";

interface MyVotesCardProps {
  vote: IVote;
}

const MyVotesCard: React.FC<MyVotesCardProps> = ({ vote }) => {
  const idea = vote.idea;
  const isUpvote = vote.value === 1;

  return (
    <div className="group bg-card rounded-2xl border overflow-hidden transition-all hover:shadow-xl hover:border-primary/20 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        {idea.image ? (
          <Image
            src={idea.image}
            alt={idea.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Layers className="w-12 h-12 text-muted-foreground/20" />
          </div>
        )}
        
        {/* Vote Status Overlay */}
        <div className="absolute top-4 left-4">
          <Badge className={`font-bold px-3 py-1.5 shadow-lg border-2 border-white/20 backdrop-blur-md ${isUpvote ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
            <span className="flex items-center gap-1.5">
              {isUpvote ? (
                <>
                  <ThumbsUp className="w-3.5 h-3.5" /> 
                  Upvoted
                </>
              ) : (
                <>
                  <ThumbsDown className="w-3.5 h-3.5" /> 
                  Downvoted
                </>
              )}
            </span>
          </Badge>
        </div>

        <div className="absolute bottom-4 right-4">
           <Badge variant="secondary" className="bg-white/90 backdrop-blur-md font-bold">
              {idea.category.name}
           </Badge>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {idea.title}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
          {idea.description}
        </p>

        <div className="mt-auto space-y-4">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
             <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
               idea.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 
               idea.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 
               'bg-blue-100 text-blue-700'
             }`}>
               <CheckCircle2 className="w-3 h-3" />
               {idea.status}
             </div>
          </div>

          {/* Author & Date */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
            <div className="flex items-center gap-1.5 font-medium">
              <User className="w-3.5 h-3.5" />
              <span className="line-clamp-1">{idea.author.name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatTimeAgo(idea.createdAt)}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="p-4 bg-muted/20 border-t flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-blue-500">
            <ThumbsUp className="w-4 h-4" />
            <span className="text-xs font-bold">{idea.upvotesCount}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-red-500">
            <ThumbsDown className="w-4 h-4" />
            <span className="text-xs font-bold">{idea.downvotesCount}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-green-500">
            <MessageSquare className="w-4 h-4" />
            <span className="text-xs font-bold">{idea.commentsCount}</span>
          </div>
        </div>

        <Link 
          href={`/ideas/${idea.id}`}
          className="flex items-center gap-1.5 text-xs font-bold text-primary hover:gap-2.5 transition-all"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default MyVotesCard;

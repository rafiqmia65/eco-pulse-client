import { Reply } from "lucide-react";
import { IComment } from "@/types/public/ideaDetails.types";

export default function CommentItem({ comment }: { comment: IComment }) {
  return (
    <div className="border border-border rounded-2xl p-4 bg-card shadow-sm hover:shadow-md transition">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
            {comment.user.name?.charAt(0)}
          </div>

          <div>
            <p className="text-sm font-medium">{comment.user.name}</p>
            <p className="text-xs text-muted-foreground">Just now</p>
          </div>
        </div>

        <Reply size={16} className="text-muted-foreground" />
      </div>

      {/* CONTENT */}
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        {comment.content}
      </p>

      {/* REPLIES */}
      {comment.replies?.length > 0 && (
        <div className="mt-4 pl-4 border-l border-border space-y-3">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="text-sm">
              <span className="font-medium">{reply.user.name}</span>{" "}
              <span className="text-muted-foreground">{reply.content}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

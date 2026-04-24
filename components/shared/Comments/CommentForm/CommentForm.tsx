/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, RefObject } from "react";
import { Send, Loader2, MessageSquare, X } from "lucide-react";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import { useCreateComment } from "@/hooks/useComments";

interface Props {
  ideaId: string;
  replyTo?: string | null;
  inputRef?: RefObject<HTMLTextAreaElement | null>;
  clearReply?: () => void;
}

export default function CommentForm({
  ideaId,
  replyTo,
  inputRef,
  clearReply,
}: Props) {
  const [comment, setComment] = useState("");
  const createComment = useCreateComment(ideaId);

  const handleSubmit = () => {
    if (!comment.trim()) return;
    createComment.mutate(
      {
        content: comment,
        parentId: replyTo || undefined,
      },
      {
        onSuccess: () => {
          setComment("");
          clearReply?.();
        },
      }
    );
  };

  return (
    <div className="border rounded-2xl bg-card p-4 space-y-4 shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <MessageSquare size={20} />
          <h3 className="font-semibold text-sm">Write Comment</h3>
        </div>

        {replyTo && (
          <CustomButton
            onClick={clearReply}
            variant="outline"
            className="text-xs border border-primary text-primary hover:bg-primary/10"
          >
            <X size={10} />
            Cancel
          </CustomButton>
        )}
      </div>

      {/* REPLY MODE */}
      {replyTo && (
        <div className=" bg-muted/40 px-3 py-2 rounded-lg">
          <p className="text-xs text-muted-foreground">
            Replying to a comment...
          </p>
        </div>
      )}

      {/* INPUT */}
      <textarea
        ref={inputRef}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        className="w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <CustomButton
        onClick={handleSubmit}
        disabled={!comment.trim() || createComment.isPending}
        className="w-full flex items-center justify-center gap-2"
      >
        {createComment.isPending ? (
          <Loader2 className="animate-spin" size={14} />
        ) : (
          <Send size={14} />
        )}
        Comment
      </CustomButton>
    </div>
  );
}

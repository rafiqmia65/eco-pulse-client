/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, RefObject } from "react";
import { Send, Loader2, MessageSquare, X } from "lucide-react";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCommentAction } from "@/app/(PublicLayout)/ideas/[id]/_actions";

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
  const queryClient = useQueryClient();

  const createComment = useMutation({
    mutationFn: async () => {
      const res = await createCommentAction(ideaId, {
        content: comment,
        parentId: replyTo || undefined,
      });
      if (!res.success) throw new Error(res.message);
      return res;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Comment created successfully");
      setComment("");
      clearReply?.();
      queryClient.invalidateQueries({ queryKey: ["idea-comments", ideaId] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create comment");
    },
  });

  const handleSubmit = () => {
    if (!comment.trim()) return;
    createComment.mutate();
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

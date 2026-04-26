"use client";

import { useState, useRef } from "react";

import CommentItem from "./CommentItem/CommentItem";
import CommentForm from "./CommentForm/CommentForm";
import Section from "@/components/shared/reusableComponents/Section";
import Pagination from "@/components/shared/Pagination/Pagination";
import { Skeleton } from "@/components/ui/skeleton";

import { useIdeaComments } from "@/hooks/useComments";
import { IComment } from "@/types/public/ideaDetails.types";
import { RoleType } from "@/constants/roles";

interface CommentsSectionProps {
  ideaId: string;
  currentUserId?: string;
  currentUserRole?: RoleType;
}

export default function CommentsSection({
  ideaId,
  currentUserId,
  currentUserRole,
}: CommentsSectionProps) {
  const [page, setPage] = useState(1);
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const formRef = useRef<HTMLTextAreaElement>(null);

  const { data, isLoading, isFetching } = useIdeaComments(ideaId, page);

  const comments: IComment[] = data?.data?.comments ?? [];
  const meta = data?.data?.commentsMeta;

  const handleReply = (id: string) => {
    setReplyTo((prev) => (prev === id ? null : id));

    setTimeout(() => {
      formRef.current?.focus();
    }, 100);
  };

  return (
    <Section variant="muted">
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">Discussion</h3>
          <span className="text-xs text-muted-foreground">
            {meta?.total ?? 0} comments
          </span>
        </div>

        {/* LOADING */}
        {isFetching && !isLoading && (
          <p className="text-sm text-muted-foreground">Updating...</p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FIXED STICKY */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <CommentForm
                ideaId={ideaId}
                replyTo={replyTo}
                inputRef={formRef}
                clearReply={() => setReplyTo(null)}
              />
            </div>
          </div>

          {/* COMMENTS */}
          <div className="lg:col-span-2 space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : comments.length === 0 ? (
              <p className="text-muted-foreground text-sm">No comments yet. Be the first to share your thoughts!</p>
            ) : (
              <div className="space-y-4">
                {comments.map((c) => (
                  <CommentItem
                    key={c.id}
                    ideaId={ideaId}
                    comment={c}
                    onReply={handleReply}
                    currentUserId={currentUserId}
                    currentUserRole={currentUserRole}
                  />
                ))}
              </div>
            )}

            {/* PAGINATION */}
            {meta && meta.totalPages > 1 && (
              <Pagination
                meta={{ page, totalPages: meta.totalPages }}
                onPageChange={(newPage) => setPage(newPage)}
              />
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

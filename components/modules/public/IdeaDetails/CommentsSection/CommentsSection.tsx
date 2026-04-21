import { IComment, ICommentsMeta } from "@/types/public/ideaDetails.types";
import CommentItem from "./CommentItem/CommentItem";
import CommentForm from "./CommentForm/CommentForm";
import Section from "@/components/shared/reusableComponents/Section";
import CommentPaginationClient from "./CommentPagination/CommentPaginationClient";

export default function CommentsSection({
  ideaId,
  comments,
  meta,
}: {
  ideaId: string;
  comments: IComment[];
  meta: ICommentsMeta;
}) {
  return (
    <Section variant="muted">
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Discussion</h3>
          <span className="text-xs text-muted-foreground">
            {meta.total} comments
          </span>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* FORM */}
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <CommentForm ideaId={ideaId} />
          </div>

          {/* COMMENTS */}
          <div className="lg:col-span-2 space-y-4">
            {comments.length === 0 ? (
              <div className="p-6 text-sm text-muted-foreground border rounded-xl bg-card">
                No comments yet. Be the first to start discussion.
              </div>
            ) : (
              comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            )}

            {/* CLIENT PAGINATION */}
            <CommentPaginationClient meta={meta} />
          </div>
        </div>
      </div>
    </Section>
  );
}

"use client";

import { useState } from "react";
import { Send, Loader2, MessageSquare } from "lucide-react";

export default function CommentForm({ ideaId }: { ideaId: string }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setLoading(true);

    console.log({ ideaId, comment });

    setTimeout(() => {
      setComment("");
      setLoading(false);
    }, 500);
  };

  return (
    <div className="border border-border rounded-2xl bg-card p-4 shadow-sm space-y-4">
      {/* HEADER */}
      <div className="flex items-center gap-2">
        <MessageSquare size={16} />
        <h3 className="font-semibold text-sm">Write Comment</h3>
      </div>

      {/* TEXTAREA */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        placeholder="Share your thoughts..."
        className="w-full text-sm bg-transparent outline-none resize-none border border-border rounded-xl p-3 focus:ring-2 focus:ring-primary/20"
      />

      {/* ACTION */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!comment.trim() || loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Posting...
            </>
          ) : (
            <>
              <Send size={14} />
              Comment
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Lock,
  Unlock,
} from "lucide-react";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import { useState } from "react";

export default function IdeaDetails({ idea }: { idea: any }) {
  const [showPaywall, setShowPaywall] = useState(false);

  if (!idea) return <p className="p-10">Idea not found</p>;

  return (
    <div className="w-full py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* IMAGE */}
        <div className="relative w-full h-[300px] md:h-[420px] rounded-xl overflow-hidden border">
          <Image
            src={idea.image}
            alt={idea.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* TITLE */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{idea.title}</h1>
          <p className="text-muted-foreground">
            {idea.author?.name} • {idea.category?.name}
          </p>

          <div className="flex gap-3 text-sm">
            {idea.isPaid ? (
              <span className="flex items-center gap-1 text-yellow-500">
                <Lock size={16} /> Paid
              </span>
            ) : (
              <span className="flex items-center gap-1 text-green-500">
                <Unlock size={16} /> Free
              </span>
            )}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <h2 className="font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground">{idea.description}</p>
        </div>

        {/* VOTES */}
        <div className="flex gap-6">
          <button className="flex items-center gap-2">
            <ThumbsUp /> {idea.upvotes}
          </button>

          <button className="flex items-center gap-2">
            <ThumbsDown /> {idea.downvotes}
          </button>

          <button className="flex items-center gap-2">
            <MessageCircle /> {idea.comments?.length || 0}
          </button>
        </div>

        {/* SOLUTION */}
        <div className="p-5 border rounded-xl">
          <h2 className="font-semibold mb-2">Solution</h2>

          {idea.isLocked ? (
            <div>
              <p className="text-muted-foreground mb-3">
                This content is locked
              </p>

              <CustomButton onClick={() => setShowPaywall(true)}>
                Unlock Full Access
              </CustomButton>
            </div>
          ) : (
            <p>{idea.solution}</p>
          )}
        </div>

        {/* PAYWALL MODAL */}
        {showPaywall && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-card p-6 rounded-xl w-[400px] space-y-4">
              <h2 className="text-xl font-semibold">Unlock Idea</h2>
              <p className="text-sm text-muted-foreground">
                Pay to access full solution
              </p>

              <CustomButton className="w-full">Pay Now</CustomButton>

              <button
                onClick={() => setShowPaywall(false)}
                className="w-full text-sm text-muted-foreground"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

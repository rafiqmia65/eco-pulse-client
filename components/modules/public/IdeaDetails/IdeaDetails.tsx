/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { IIdeaAccessData } from "@/types/public/ideaDetails.types";
import IdeaHero from "./IdeaHero/IdeaHero";
import IdeaContent from "./IdeaContent/IdeaContent";
import CommentsSection from "@/components/shared/Comments/CommentsSection";
import RelatedIdeas from "./RelatedIdeas/RelatedIdeas";
import IdeaAnalysisPanel from "@/components/shared/IdeaAnalysis/IdeaAnalysisPanel";
import SmartRecommendations from "@/components/shared/SmartRecommendations/SmartRecommendations";
import { isOwnerOrAdmin } from "@/lib/access-utils";

import { RoleType } from "@/constants/roles";
import Section from "@/components/shared/reusableComponents/Section";

import { useAppStore } from "@/store";

export default function IdeaDetails({
  idea,
  currentUserId,
  currentUserRole,
}: {
  idea?: IIdeaAccessData;
  currentUserId?: string;
  currentUserRole?: RoleType;
}) {
  const { isConfettiActive, setIsConfettiActive } = useAppStore();
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";
  const isCanceled = searchParams.get("canceled") === "true";

  useEffect(() => {
    if (isSuccess && !isConfettiActive) {
      setIsConfettiActive(true);
      // Trigger Confetti
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          setIsConfettiActive(false);
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      toast.success("Payment Successful!", {
        description:
          "You now have full access to this idea's strategic content.",
        duration: 5000,
      });
    }

    if (isCanceled) {
      toast.error("Payment Canceled", {
        description: "The purchase process was not completed.",
      });
    }
  }, [isSuccess, isCanceled, isConfettiActive, setIsConfettiActive]);

  if (!idea) return <p className="p-10 text-center">Idea not found</p>;

  const showAnalysis = isOwnerOrAdmin(idea.accessLevel);

  return (
    <div className="relative">
      {/* HERO SECTION */}
      <IdeaHero idea={idea} />

      {/* MAIN CONTENT */}
      <Section>
        <IdeaContent idea={idea} />
      </Section>

      {/* ANALYSIS PANEL */}
      {showAnalysis && (
        <Section className="py-0">
          <IdeaAnalysisPanel ideaId={idea.id} isOwnerOrAdmin={showAnalysis} />
        </Section>
      )}

      <CommentsSection
        ideaId={idea.id}
        currentUserId={currentUserId}
        currentUserRole={currentUserRole}
      />

      {/* AI SMART RECOMMENDATIONS — logged-in members only */}
      {currentUserId && (
        <Section className="border-t border-border/50">
          <SmartRecommendations currentUserId={currentUserId} />
        </Section>
      )}

      <RelatedIdeas categoryId={idea.category.id} currentIdeaId={idea.id} />
    </div>
  );
}

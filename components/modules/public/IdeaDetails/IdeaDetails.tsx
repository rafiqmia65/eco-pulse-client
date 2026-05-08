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

import { RoleType } from "@/constants/roles";
import Section from "@/components/shared/reusableComponents/Section";

export default function IdeaDetails({
  idea,
  currentUserId,
  currentUserRole,
}: {
  idea?: IIdeaAccessData;
  currentUserId?: string;
  currentUserRole?: RoleType;
}) {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";
  const isCanceled = searchParams.get("canceled") === "true";

  useEffect(() => {
    if (isSuccess) {
      // Trigger Confetti
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
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
  }, [isSuccess, isCanceled]);

  if (!idea) return <p className="p-10 text-center">Idea not found</p>;

  return (
    <div className="relative">
      {/* HERO SECTION */}
      <IdeaHero idea={idea} />

      {/* MAIN CONTENT */}
      <Section>
        <IdeaContent idea={idea} />
      </Section>

      <CommentsSection
        ideaId={idea.id}
        currentUserId={currentUserId}
        currentUserRole={currentUserRole}
      />

      <RelatedIdeas categoryId={idea.category.id} currentIdeaId={idea.id} />
    </div>
  );
}

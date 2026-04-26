"use client";

import { useState } from "react";
import { IIdeaDetailsByOwner } from "@/types/memberTypes/IdeaDetailsByOwner.types";

const PREVIEW_LIMIT = 300;

/* -------------------------
   Expandable Text Component
--------------------------*/
function ExpandableText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);

  const safeText = text || "";
  const isLong = safeText.length > PREVIEW_LIMIT;

  const display =
    isLong && !expanded ? safeText.slice(0, PREVIEW_LIMIT) + "…" : safeText;

  return (
    <div className="space-y-2">
      <p className="text-muted-foreground whitespace-pre-line leading-relaxed wrap-break-words">
        {display}
      </p>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-medium text-primary hover:underline"
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
}

/* -------------------------
   Section Card
--------------------------*/
function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted/30 border border-border/60 rounded-2xl p-5 md:p-6 space-y-3 hover:shadow-sm transition">
      <h2 className="text-base md:text-lg font-semibold tracking-tight">
        {title}
      </h2>

      <div className="text-sm md:text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}

/* -------------------------
   Main Component
--------------------------*/
export default function IdeaContent({ idea }: { idea: IIdeaDetailsByOwner }) {
  return (
    <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
      {/* Problem */}
      <SectionCard title="Problem">
        <ExpandableText text={idea.problem ?? ""} />
      </SectionCard>

      {/* Solution */}
      <SectionCard title="Solution">
        <ExpandableText text={idea.solution ?? ""} />
      </SectionCard>

      {/* Description */}
      <SectionCard title="Description">
        <ExpandableText text={idea.description ?? ""} />
      </SectionCard>
    </div>
  );
}

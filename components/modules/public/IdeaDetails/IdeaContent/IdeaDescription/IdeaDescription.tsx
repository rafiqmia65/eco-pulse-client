"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Lock, FileText, Info } from "lucide-react";
import Section from "@/components/shared/reusableComponents/Section";
import { isFullAccess, isLockedAccess } from "@/lib/access-utils";

interface Props {
  description: string;
  accessLevel: string;
}

export default function IdeaDescription({ description, accessLevel }: Props) {
  const [expanded, setExpanded] = useState(false);

  const isLocked = isLockedAccess(accessLevel);
  const fullAccess = isFullAccess(accessLevel);

  const isLong = description?.length > 500;
  const preview = description?.slice(0, 500);

  return (
    <Section className="relative overflow-hidden group">
      {/* BACKGROUND DECOR */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl transition-all group-hover:bg-primary/10" />

      <div className="space-y-5">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold flex items-center gap-2 tracking-tight">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <FileText size={20} />
              </div>
              Project Overview
            </h2>
            <p className="text-xs text-muted-foreground ml-11">
              Detailed breakdown of the core concept and goals
            </p>
          </div>

          {isLocked && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 backdrop-blur-sm">
              <Lock size={12} className="text-muted-foreground" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Limited Access
              </span>
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="relative">
          <div
            className={`text-foreground/80 text-base leading-relaxed wrap-break-words whitespace-pre-wrap transition-all duration-500 ${
              !expanded && isLong && !isLocked
                ? "max-h-[300px] overflow-hidden"
                : ""
            }`}
          >
            {isLocked ? description : expanded ? description : preview}
            {!expanded && isLong && !isLocked && "…"}
          </div>

          {!isLocked && !expanded && isLong && (
            <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-background to-transparent z-10" />
          )}
        </div>

        {/* ACTION */}
        {fullAccess && isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="group/btn flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-all"
          >
            <div className="p-1 rounded-full bg-primary/5 group-hover/btn:bg-primary/10 transition-colors">
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {expanded ? "Show Less" : "Read Full Description"}
          </button>
        )}

        {/* LOCKED CTA */}
        {isLocked && (
          <div className="mt-6 relative p-5 rounded-2xl border border-primary/10 bg-primary/2 overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/20" />
            <div className="flex gap-3">
              <div className="mt-0.5 p-1.5 rounded-lg bg-primary/10 text-primary">
                <Info size={16} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-foreground">
                  Complete Breakdown Locked
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This project&apos;s full architecture, scalability strategy,
                  and market implementation details are reserved for premium
                  members.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

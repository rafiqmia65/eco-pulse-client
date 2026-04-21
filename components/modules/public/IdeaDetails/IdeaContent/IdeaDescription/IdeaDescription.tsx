"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Lock, FileText } from "lucide-react";
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
    <Section>
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FileText size={18} />
          Description
        </h2>

        {isLocked && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Lock size={14} />
            Limited Access
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="relative">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {isLocked ? description : expanded ? description : preview}
          {!expanded && isLong && "…"}
        </p>

        {!isLocked && !expanded && isLong && (
          <div className="absolute bottom-0 left-0 w-full h-10 bg-linear-to-t from-card to-transparent" />
        )}
      </div>

      {/* ACTION */}
      {fullAccess && isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80 transition"
        >
          {expanded ? (
            <>
              Show Less <ChevronUp size={16} />
            </>
          ) : (
            <>
              See More <ChevronDown size={16} />
            </>
          )}
        </button>
      )}

      {/* LOCKED CTA */}
      {isLocked && (
        <div className="mt-3 p-4 rounded-xl border border-border bg-muted text-xs text-muted-foreground flex items-start gap-2">
          <Lock size={14} className="mt-0.5" />
          <span>
            This is a preview version. Unlock full access to view complete
            breakdown, architecture, and execution strategy.
          </span>
        </div>
      )}
    </Section>
  );
}

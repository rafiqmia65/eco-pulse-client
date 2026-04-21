import Section from "@/components/shared/reusableComponents/Section";
import { isLockedAccess } from "@/lib/access-utils";
import { IIdeaAccessData } from "@/types/public/ideaDetails.types";
import { Lock, Sparkles, ShieldAlert } from "lucide-react";

export default function IdeaSolution({ idea }: { idea: IIdeaAccessData }) {
  const isLocked = isLockedAccess(idea.accessLevel);

  return (
    <Section variant="muted">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Sparkles size={18} />
          Solution
        </h2>

        {isLocked && (
          <span className="text-xs flex items-center gap-1 text-muted-foreground">
            <Lock size={14} />
            Locked
          </span>
        )}
      </div>

      {/* CONTENT */}
      {isLocked ? (
        <div className="p-4 rounded-xl border border-border bg-muted/50 text-sm text-muted-foreground flex gap-2">
          <ShieldAlert size={16} className="mt-0.5" />
          <div>
            {idea.solution}
            <p className="mt-2 text-xs text-muted-foreground/70">
              Unlock full implementation plan, architecture & strategy
            </p>
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground text-sm leading-relaxed">
          {idea.solution}
        </p>
      )}
    </Section>
  );
}

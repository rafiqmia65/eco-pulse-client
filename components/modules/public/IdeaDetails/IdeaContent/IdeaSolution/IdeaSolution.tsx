import Section from "@/components/shared/reusableComponents/Section";
import { isLockedAccess } from "@/lib/access-utils";
import { IIdeaAccessData } from "@/types/public/ideaDetails.types";
import { Lock, Sparkles, ShieldAlert, ArrowRight, Zap } from "lucide-react";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";

export default function IdeaSolution({ idea }: { idea: IIdeaAccessData }) {
  const isLocked = isLockedAccess(idea.accessLevel);

  return (
    <Section
      variant={isLocked ? "muted" : "default"}
      className="relative overflow-hidden group"
    >
      {/* BACKGROUND DECOR */}
      {!isLocked && (
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl transition-all group-hover:bg-primary/10" />
      )}

      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold flex items-center gap-2 tracking-tight text-primary">
              <div className="p-2 rounded-lg bg-primary/10">
                <Zap size={20} />
              </div>
              Strategic Solution
            </h2>
            <p className="text-xs text-muted-foreground ml-11">
              Architecture and implementation roadmap
            </p>
          </div>

          {isLocked && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 border border-destructive/20 text-destructive">
              <Lock size={12} />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Locked Content
              </span>
            </div>
          )}
        </div>

        {/* CONTENT */}
        {isLocked ? (
          <div className="relative group/lock mt-4">
            {/* BLURRED PREVIEW OVERLAY */}
            <div className="p-6 rounded-2xl border border-dashed border-border/60 bg-muted/30 backdrop-blur-[2px] transition-all group-hover/lock:bg-muted/50">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="p-2 rounded-xl bg-background shadow-sm h-fit">
                    <ShieldAlert
                      size={20}
                      className="text-muted-foreground/50"
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-muted-foreground/10 rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-muted-foreground/10 rounded w-1/2 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <p className="text-sm font-medium text-foreground/60 leading-relaxed italic">
                    {`"${idea.solution?.slice(0, 100)}..."`}
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 border-t border-border/50">
                    <div className="flex-1">
                      <p className="text-xs font-bold text-foreground mb-1 uppercase tracking-tight">
                        Unlock Strategy & Architecture
                      </p>
                      <p className="text-[11px] text-muted-foreground leading-tight">
                        Get the full technical breakdown, execution roadmap, and
                        risk assessment for this project.
                      </p>
                    </div>

                    <CustomButton className="w-full sm:w-auto shadow-lg shadow-primary/20">
                      Unlock Full Access{" "}
                      <ArrowRight size={14} className="ml-2" />
                    </CustomButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative p-6 rounded-2xl bg-card border border-border shadow-sm group-hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles size={40} className="text-primary" />
            </div>
            <p className="text-foreground/80 text-base leading-relaxed wrap-break-words whitespace-pre-wrap relative z-10">
              {idea.solution}
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}

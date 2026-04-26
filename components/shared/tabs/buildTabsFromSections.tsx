import { ReactNode } from "react";
import { TabItem } from "./types";

/* ---------------- Section UI ---------------- */
function SectionCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-muted/30 border border-border/60 rounded-2xl p-5 md:p-6 space-y-3">
      <h2 className="text-base md:text-lg font-semibold tracking-tight">
        {title}
      </h2>

      <div className="text-sm md:text-[15px] leading-relaxed text-muted-foreground whitespace-pre-line">
        {children}
      </div>
    </div>
  );
}

/* ---------------- Builder Function ---------------- */
export function buildTabsFromSections(
  sections: (
    | false
    | null
    | undefined
    | { label: string; content?: ReactNode }
  )[],
): TabItem[] {
  return (
    sections.filter(Boolean) as { label: string; content?: ReactNode }[]
  ).map((section) => ({
    key: section.label.toLowerCase().replace(/\s+/g, "-"),
    label: section.label,
    content: (
      <SectionCard title={section.label}>
        {section.content ?? "No content available"}
      </SectionCard>
    ),
  }));
}

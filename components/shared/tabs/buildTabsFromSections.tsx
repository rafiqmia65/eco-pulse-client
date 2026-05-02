import { ReactNode } from "react";
import { TabItem } from "./types";

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
    content: section.content ?? (
      <div className="p-4 text-muted-foreground italic">
        No content available
      </div>
    ),
  }));
}

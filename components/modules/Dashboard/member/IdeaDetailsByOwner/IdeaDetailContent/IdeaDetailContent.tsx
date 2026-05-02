import React from "react";
import { buildTabsFromSections } from "@/components/shared/tabs/buildTabsFromSections";
import Tabs from "@/components/shared/tabs/Tabs";
import TiptapViewer from "@/components/shared/TiptapViewer/TiptapViewer";
import { IIdeaDetailsByOwner } from "@/types/memberTypes/IdeaDetailsByOwner.types";

export default function IdeaDetailContent({
  idea,
}: {
  idea: IIdeaDetailsByOwner;
}) {
  const tabs = React.useMemo(
    () =>
      buildTabsFromSections([
        {
          label: "Problem",
          content: <TiptapViewer content={idea.problem} />,
        },
        {
          label: "Solution",
          content: <TiptapViewer content={idea.solution} />,
        },
        {
          label: "Description",
          content: <TiptapViewer content={idea.description} />,
        },
      ]),
    [idea.problem, idea.solution, idea.description],
  );

  return (
    <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
      <Tabs tabs={tabs} defaultTab="problem" />
    </div>
  );
}

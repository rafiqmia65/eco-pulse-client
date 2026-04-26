import React from "react";
import { IPurchasedIdeaDetails } from "@/types/memberTypes/purchasedIdeas.types";
import Tabs from "@/components/shared/tabs/Tabs";
import { buildTabsFromSections } from "@/components/shared/tabs/buildTabsFromSections";
import TiptapViewer from "@/components/shared/TiptapViewer/TiptapViewer";

interface IdeaContentProps {
  idea: IPurchasedIdeaDetails;
}

const IdeaContent: React.FC<IdeaContentProps> = ({ idea }) => {
  const tabs = buildTabsFromSections([
    {
      label: "Problem",
      content: <TiptapViewer content={idea.problem} />,
    },

    {
      label: "Description",
      content: <TiptapViewer content={idea.description} />,
    },

    {
      label: "Solution",
      content: <TiptapViewer content={idea.solution} />,
    },
  ]);

  return <Tabs tabs={tabs} defaultTab="problem" />;
};

export default IdeaContent;

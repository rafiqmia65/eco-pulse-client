import { buildTabsFromSections } from "@/components/shared/tabs/buildTabsFromSections";
import Tabs from "@/components/shared/tabs/Tabs";
import TiptapViewer from "@/components/shared/TiptapViewer/TiptapViewer";
import { IIdeaDetailsByOwner } from "@/types/memberTypes/IdeaDetailsByOwner.types";

export default function IdeaDetailContent({
  idea,
}: {
  idea: IIdeaDetailsByOwner;
}) {
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
}

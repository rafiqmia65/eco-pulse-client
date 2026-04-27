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
      label: "Solution",
      content: <TiptapViewer content={idea.solution} />,
    },
    {
      label: "Description",
      content: <TiptapViewer content={idea.description} />,
    },
  ]);

  return <Tabs tabs={tabs} defaultTab="problem" />;
}

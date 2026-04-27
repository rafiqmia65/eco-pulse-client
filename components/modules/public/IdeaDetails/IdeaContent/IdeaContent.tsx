import { buildTabsFromSections } from "@/components/shared/tabs/buildTabsFromSections";
import Tabs from "@/components/shared/tabs/Tabs";
import TiptapViewer from "@/components/shared/TiptapViewer/TiptapViewer";
import { IIdeaAccessData } from "@/types/public/ideaDetails.types";

export default function IdeaContent({ idea }: { idea: IIdeaAccessData }) {
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

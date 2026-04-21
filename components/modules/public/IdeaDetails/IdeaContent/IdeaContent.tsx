import { IIdeaAccessData } from "@/types/public/ideaDetails.types";
import IdeaSolution from "./IdeaSolution/IdeaSolution";
import IdeaDescription from "./IdeaDescription/IdeaDescription";

export default function IdeaContent({ idea }: { idea: IIdeaAccessData }) {
  return (
    <div className="space-y-6">
      <IdeaDescription
        description={idea.description}
        accessLevel={idea.accessLevel}
      />

      <IdeaSolution idea={idea} />
    </div>
  );
}

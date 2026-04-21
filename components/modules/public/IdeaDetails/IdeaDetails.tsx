// IdeaDetails.tsx

import { IIdeaAccessData } from "@/types/public/ideaDetails.types";
import IdeaHero from "./IdeaHero/IdeaHero";
import IdeaContent from "./IdeaContent/IdeaContent";
import CommentsSection from "./CommentsSection/CommentsSection";

export default function IdeaDetails({ idea }: { idea: IIdeaAccessData }) {

  if (!idea) return <p className="p-10">Idea not found</p>;

  return (
    <div>
      {/* HERO SECTION */}
      <IdeaHero idea={idea} />

      {/* MAIN CONTENT */}
      <IdeaContent idea={idea} />

      {/* COMMENTS */}
      <CommentsSection
        ideaId={idea.id}
        comments={idea.comments}
        meta={idea.commentsMeta}
      />
    </div>
  );
}

import { IIdeaAccessData } from "@/types/public/ideaDetails.types";
import IdeaHero from "./IdeaHero/IdeaHero";
import IdeaContent from "./IdeaContent/IdeaContent";
import CommentsSection from "./CommentsSection/CommentsSection";
import { getUserInfo } from "@/services/auth/auth.services";

export default async function IdeaDetails({ idea }: { idea?: IIdeaAccessData }) {
  if (!idea) return <p className="p-10">Idea not found</p>;

  const user = await getUserInfo();

  return (
    <div>
      {/* HERO SECTION */}
      <IdeaHero idea={idea} />

      {/* MAIN CONTENT */}
      <IdeaContent idea={idea} />

      <CommentsSection
        ideaId={idea.id}
        currentUserId={user?.id}
        currentUserRole={user?.role}
      />
    </div>
  );
}

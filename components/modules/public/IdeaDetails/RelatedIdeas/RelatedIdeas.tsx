"use client";

import { useIdeas } from "@/app/(PublicLayout)/ideas/_actions";
import IdeaCard from "../../Ideas/IdeasGrid/IdeaCard/IdeaCard";
import Section from "@/components/shared/reusableComponents/Section";
import { Idea } from "@/types/public/ideas.types";

interface RelatedIdeasProps {
  categoryId: string;
  currentIdeaId: string;
}

export default function RelatedIdeas({
  categoryId,
  currentIdeaId,
}: RelatedIdeasProps) {
  const { data, isLoading } = useIdeas({
    categoryId,
    limit: 3,
  });

  const relatedIdeas =
    data?.data?.filter((idea: Idea) => idea.id !== currentIdeaId) || [];

  if (!isLoading && relatedIdeas.length === 0) return null;

  return (
    <Section className="py-12 border-t border-border/50 bg-muted/5">
      <div className="space-y-8">
        <div className="flex flex-col items-center text-center space-y-3">
          <h2 className="text-3xl font-black tracking-tighter">Related Solutions</h2>
          <p className="text-muted-foreground text-sm max-w-lg">
            Explore other innovative ideas in the <span className="text-primary font-bold">Sustainability</span> space that might interest you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-[400px] bg-muted animate-pulse rounded-2xl" />
              ))
            : relatedIdeas.map((idea: Idea) => (
                <IdeaCard key={idea.id} idea={idea} />
              ))}
        </div>
      </div>
    </Section>
  );
}

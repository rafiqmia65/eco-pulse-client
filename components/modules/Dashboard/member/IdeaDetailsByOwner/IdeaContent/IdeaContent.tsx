import { IIdeaDetailsByOwner } from "@/types/memberTypes/IdeaDetailsByOwner.types";

export default function IdeaContent({ idea }: { idea: IIdeaDetailsByOwner }) {
  return (
    <div className="bg-card border rounded-2xl p-6 space-y-8 shadow-sm">
      <section>
        <h2 className="text-lg font-semibold">Problem</h2>
        <p className="text-muted-foreground mt-2">{idea.problem}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Solution</h2>
        <p className="text-muted-foreground mt-2">{idea.solution}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Full Details</h2>
        <p className="text-muted-foreground mt-2 whitespace-pre-line leading-relaxed">
          {idea.description}
        </p>
      </section>
    </div>
  );
}

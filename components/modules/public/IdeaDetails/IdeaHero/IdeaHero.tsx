import Image from "next/image";
import { IIdeaAccessData } from "@/types/public/ideaDetails.types";
import IdeaActionsPanel from "./IdeaActionsPanel/IdeaActionsPanel";
import Section from "@/components/shared/reusableComponents/Section";

export default function IdeaHero({ idea }: { idea: IIdeaAccessData }) {
  return (
    <Section variant="muted">
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        {/* IMAGE (2/3) */}
        <div className="lg:col-span-2 relative h-80 md:h-112.5 rounded-2xl overflow-hidden border shadow-custom">
          <Image
            src={idea.image}
            alt={idea.title}
            fill
            className="object-cover"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

          {/* badge */}
          <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur">
            Idea Preview
          </div>
        </div>

        {/* ACTION PANEL */}
        <div className="lg:sticky lg:top-24">
          <IdeaActionsPanel idea={idea} />
        </div>
      </div>
    </Section>
  );
}

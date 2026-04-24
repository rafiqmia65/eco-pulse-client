import { IIdeaDetailsByOwner } from "@/types/memberTypes/IdeaDetailsByOwner.types";
import Image from "next/image";
import { format } from "date-fns";

export default function IdeaHeader({ idea }: { idea: IIdeaDetailsByOwner }) {
  return (
    <div className="relative rounded-3xl overflow-hidden border shadow-md">
      <div className="h-72 relative">
        {idea.image && (
          <Image
            src={idea.image}
            alt={idea.title}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          {idea.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-white/80">
          <span>{idea.author?.name}</span>
          <span>•</span>
          <span>{format(new Date(idea.createdAt), "PPP")}</span>
        </div>
      </div>
    </div>
  );
}

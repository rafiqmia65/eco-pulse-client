import Image from "next/image";
import { IPurchasedIdeaDetails } from "@/types/memberTypes/purchasedIdeas.types";
import IdeaActionsPanel from "@/components/shared/IdeaActionsPanel/IdeaActionsPanel";
import ReceiptCard from "./ReceiptCard/ReceiptCard";

export default function IdeaHeader({ idea }: { idea: IPurchasedIdeaDetails }) {
  return (
    <div>
      {/* IMAGE */}
      <div className=" relative h-60 md:h-100 rounded-2xl overflow-hidden border shadow-custom">
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

      <div className="flex mt-3 flex-col md:flex-row items-stretch gap-3">
        <div className="flex-1 flex w-full justify-center md:justify-start">
          <div className="w-full max-w-md md:max-w-none h-full">
            <IdeaActionsPanel idea={idea} />
          </div>
        </div>

        <div className="flex-1 flex w-full justify-center md:justify-start">
          <div className="w-full max-w-md md:max-w-none h-full">
            <ReceiptCard idea={idea} />
          </div>
        </div>
      </div>
    </div>
  );
}

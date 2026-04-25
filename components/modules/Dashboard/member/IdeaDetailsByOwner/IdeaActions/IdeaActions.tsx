"use client";

import React from "react";
import { IIdeaDetailsByOwner } from "@/types/memberTypes/IdeaDetailsByOwner.types";
import { IdeaActionButtons } from "@/components/shared/IdeaActionButtonsByOwner/IdeaActionButtonsByOwner";

export default function IdeaActions({ idea }: { idea: IIdeaDetailsByOwner }) {
  return (
    <IdeaActionButtons
      idea={{ id: idea.id, status: idea.status }}
      variant="sidebar"
      redirectAfterDelete="/dashboard/my-ideas"
    />
  );
}

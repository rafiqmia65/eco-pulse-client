import IdeaDetails from "@/components/modules/public/IdeaDetails/IdeaDetails";
import { fetchIdeaById } from "./_actions";
import { getUserInfo } from "@/services/auth/auth.services";
import { Suspense } from "react";

import { RoleType } from "@/constants/roles";

export default async function IdeaDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserInfo();
  const res = await fetchIdeaById(id);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IdeaDetails 
        idea={res?.data} 
        currentUserId={user?.id}
        currentUserRole={user?.role as RoleType}
      />
    </Suspense>
  );
}

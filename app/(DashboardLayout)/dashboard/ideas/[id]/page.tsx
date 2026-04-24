import IdeaDetailsByOwner from "@/components/modules/Dashboard/member/IdeaDetailsByOwner/IdeaDetailsByOwner";
import { getUserInfo } from "@/services/auth/auth.services";
import { RoleType } from "@/constants/roles";

export default async function OwnerIdeaDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserInfo();

  return (
    <IdeaDetailsByOwner
      id={id}
      currentUserId={user?.id}
      currentUserRole={user?.role as RoleType}
    />
  );
}

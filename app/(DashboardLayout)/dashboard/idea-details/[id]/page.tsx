import React from "react";
import PurchasedIdeaDetails from "@/components/modules/Dashboard/member/PurchasedIdeaDetails/PurchasedIdeaDetails";
import { getUserInfo } from "@/services/auth/auth.services";

const PurchasedIdeaDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const user = await getUserInfo();

  return (
    <PurchasedIdeaDetails 
      id={id} 
      currentUserId={user?.id}
      currentUserRole={user?.role}
    />
  );
};

export default PurchasedIdeaDetailsPage;

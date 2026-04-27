import AdminIdeaDetails from "@/components/modules/Dashboard/admin/AdminIdeaDetails/AdminIdeaDetails";
import { getUserInfo } from "@/services/auth/auth.services";
import React from "react";

const AdminIdeaDetailsPage = async () => {
  const user = await getUserInfo();

  return <AdminIdeaDetails user={user} />;
};

export default AdminIdeaDetailsPage;


import UpdateProfile from "@/components/modules/Dashboard/common/UpdateProfile/UpdateProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Profile | EcoPulse",
  description: "Update your profile information and account security settings.",
};

const UpdateProfilePage = () => {
  return <UpdateProfile />;
};

export default UpdateProfilePage;
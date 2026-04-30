import { getUserInfo } from "@/services/auth/auth.services";
import { AuthUser } from "@/types/auth.types";
import UpdateProfileForm from "./UpdateProfileForm/UpdateProfileForm";
import ChangePasswordForm from "./ChangePasswordForm/ChangePasswordForm";
import { Settings } from "lucide-react";

const UpdateProfile = async () => {
  const user: AuthUser | null = await getUserInfo();

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-xl text-primary-foreground shadow-lg shadow-primary/20">
            <Settings className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Account Settings
          </h1>
        </div>
        <p className="text-muted-foreground ml-11">
          Manage your profile information and security preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <UpdateProfileForm user={user} />
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default UpdateProfile;

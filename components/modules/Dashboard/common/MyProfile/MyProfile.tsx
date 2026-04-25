import { getUserInfo } from "@/services/auth/auth.services";
import { AuthUser } from "@/types/auth.types";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileWelcome from "./ProfileWelcome/ProfileWelcome";
import ProfileSecurity from "./ProfileSecurity/ProfileSecurity";
import ProfileDates from "./ProfileDates/ProfileDates";

const MyProfile = async () => {
  const user: AuthUser | null = await getUserInfo();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <ProfileHeader user={user} />

      <ProfileWelcome user={user} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileSecurity user={user} />
        <ProfileDates user={user} />
      </div>
    </div>
  );
};

export default MyProfile;

import { Shield } from "lucide-react";
import { AuthUser } from "@/types/auth.types";

const ProfileWelcome = ({ user }: { user: AuthUser }) => {
  const isMember = user.role === "MEMBER";

  return (
    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
          <Shield className="w-5 h-5" />
        </div>

        <div>
          <h3 className="font-bold text-primary">
            Welcome back, {isMember ? "Innovator" : "Administrator"}!
          </h3>

          <p className="text-sm text-muted-foreground">
            {isMember
              ? "Submit ideas, vote and grow the community."
              : "Manage platform, moderate and lead the ecosystem."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileWelcome;

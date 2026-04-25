import { Shield, CheckCircle2, AlertCircle } from "lucide-react";
import { AuthUser } from "@/types/auth.types";

const ProfileSecurity = ({ user }: { user: AuthUser }) => {
  return (
    <div className="bg-card border rounded-2xl p-6 space-y-4">
      <h3 className="font-bold flex items-center gap-2">
        <Shield className="w-4 h-4 text-muted-foreground" />
        Account Status
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between p-3 rounded-xl bg-muted/30 border">
          <span className="text-sm text-muted-foreground">Status</span>
          <span className="text-green-600 text-xs font-bold flex gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {user.status}
          </span>
        </div>

        <div className="flex justify-between p-3 rounded-xl bg-muted/30 border">
          <span className="text-sm text-muted-foreground">Email Verified</span>

          {user.emailVerified ? (
            <span className="text-blue-600 text-xs font-bold flex gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Verified
            </span>
          ) : (
            <span className="text-orange-500 text-xs font-bold flex gap-1">
              <AlertCircle className="w-3 h-3" />
              Pending
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSecurity;

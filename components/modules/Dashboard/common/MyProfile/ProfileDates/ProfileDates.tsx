import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { AuthUser } from "@/types/auth.types";

const ProfileDates = ({ user }: { user: AuthUser }) => {
  return (
    <div className="bg-card border rounded-2xl p-6 space-y-4">
      <h3 className="font-bold flex items-center gap-2">
        <Calendar className="w-4 h-4 text-muted-foreground" />
        Important Dates
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between p-3 rounded-xl bg-muted/30 border">
          <span className="text-sm text-muted-foreground">Member Since</span>
          <span className="text-xs font-bold">
            {format(new Date(user.createdAt), "MMM dd, yyyy")}
          </span>
        </div>

        <div className="flex justify-between p-3 rounded-xl bg-muted/30 border">
          <span className="text-sm text-muted-foreground">Last Update</span>
          <span className="text-xs font-bold">
            {format(new Date(user.updatedAt), "MMM dd, yyyy")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileDates;

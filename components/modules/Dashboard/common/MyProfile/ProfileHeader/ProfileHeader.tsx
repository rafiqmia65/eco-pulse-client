import { Mail, Shield, User as UserIcon, Edit3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthUser } from "@/types/auth.types";

const ProfileHeader = ({ user }: { user: AuthUser }) => {
  return (
    <div className="bg-card border rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center gap-6">
      {/* Avatar */}
      <div className="relative w-24 h-24 rounded-2xl bg-muted overflow-hidden border-2 border-background shadow-md">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
            <UserIcon className="w-10 h-10" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 space-y-1 text-left">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold">{user.name}</h1>

          <div className="px-2.5 py-0.5 rounded-full bg-primary/10 text-[10px] font-bold text-primary uppercase flex items-center gap-1">
            {user.role === "ADMIN" ? (
              <Shield className="w-3 h-3" />
            ) : (
              <UserIcon className="w-3 h-3" />
            )}
            {user.role}
          </div>
        </div>

        <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
          <Mail className="w-3.5 h-3.5" />
          {user.email}
        </p>
      </div>

      <Link href="/dashboard/update-profile">
        <Button variant="outline" className="rounded-xl gap-2 font-bold">
          <Edit3 className="w-4 h-4" />
          Edit Profile
        </Button>
      </Link>
    </div>
  );
};

export default ProfileHeader;

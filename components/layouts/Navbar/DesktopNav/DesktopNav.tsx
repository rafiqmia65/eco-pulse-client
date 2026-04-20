import { AuthUser } from "@/types/auth.types";
import Link from "next/link";
import Image from "next/image";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import LogOutButton from "@/components/shared/LogOutButton/LogOutButton";
import { getDefaultDashboardRoute } from "@/lib/authUtils";

export default function DesktopNav({
  user,
  navLinks,
}: {
  user: AuthUser | null;
  navLinks: { href: string; label: string }[];
}) {
  const getInitial = (name?: string) => name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="hidden md:flex flex-1 items-center justify-between ml-10">
      {/* CENTER NAV */}
      <nav className="flex items-center gap-6 mx-auto">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-muted-foreground hover:text-primary transition"
          >
            {link.label}
          </Link>
        ))}

        {user && (
          <Link
            href={getDefaultDashboardRoute(user.role)}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Dashboard
          </Link>
        )}
      </nav>

      {/* RIGHT AUTH */}
      <div className="flex items-center gap-3 mr-3">
        {user ? (
          <>
            <div className="w-9 h-9 rounded-full overflow-hidden border bg-muted">
              {user.image ? (
                <Image
                  src={user.image}
                  alt="profile"
                  width={36}
                  height={36}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground font-bold">
                  {getInitial(user.name)}
                </div>
              )}
            </div>

            <LogOutButton />
          </>
        ) : (
          <>
            <Link href="/login">
              <CustomButton variant="ghost">Login</CustomButton>
            </Link>

            <Link href="/register">
              <CustomButton>Register</CustomButton>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

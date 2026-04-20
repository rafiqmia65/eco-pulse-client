import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "../ModeToggle/ModeToggle";
import BrandLogo from "@/components/shared/BrandLogo/BrandLogo";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import { getUserInfo } from "@/services/auth/auth.services";
import { LogOut } from "lucide-react";

export default async function Navbar() {
  const user = await getUserInfo();

  const getInitial = (name?: string) =>
    name?.trim()?.charAt(0).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <BrandLogo />

          {/* NAV LINKS */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Home
            </Link>

            <Link
              href="/ideas"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Ideas
            </Link>

            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              About
            </Link>

            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Blog
            </Link>

            {/* DASHBOARD → LAST */}
            {user && (
              <Link
                href="/dashboard"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            <ModeToggle />

            {/* AUTH */}
            {user ? (
              <div className="flex items-center gap-3">
                {/* USER IMAGE ONLY */}
                <div className="w-9 h-9 rounded-full overflow-hidden border">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt="profile"
                      width={36}
                      height={36}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary text-white text-sm font-bold">
                      {getInitial(user.name)}
                    </div>
                  )}
                </div>

                {/* LOGOUT */}
                <form action="/api/auth/logout" method="post">
                  <CustomButton
                    variant="ghost"
                    className="flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </CustomButton>
                </form>
              </div>
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
      </div>
    </header>
  );
}

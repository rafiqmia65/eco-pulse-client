"use client";

import Link from "next/link";
import Image from "next/image";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import LogOutButton from "@/components/shared/LogOutButton/LogOutButton";
import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { usePathname } from "next/navigation";
import { AuthUser } from "@/types/auth.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, User, Settings } from "lucide-react";

import { ModeToggle } from "../../ModeToggle/ModeToggle";

export default function DesktopNav({
  user,
  navLinks,
}: {
  user: AuthUser | null;
  navLinks: { href: string; label: string }[];
}) {
  const pathname = usePathname();
  const getInitial = (name?: string) => name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="hidden md:flex flex-1 items-center justify-between ml-10">
      {/* CENTER NAV */}
      <nav className="flex items-center gap-8 mx-auto">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition font-medium relative py-1 ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* RIGHT AUTH + MODE TOGGLE */}
      <div className="flex items-center gap-6">
        <ModeToggle />
        
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary transition p-0.5 bg-background shadow-sm cursor-pointer">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt="profile"
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground font-bold text-sm">
                        {getInitial(user.name)}
                      </div>
                    )}
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 mt-2 shadow-xl border-border/60"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link
                    href={getDefaultDashboardRoute(user.role)}
                    className="flex items-center"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/my-profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/update-profile" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Update Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer">
                  <LogOutButton className="w-full justify-start h-auto p-0 hover:bg-transparent" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <CustomButton variant="ghost" className="text-sm">
                  Login
                </CustomButton>
              </Link>

              <Link href="/register">
                <CustomButton className="text-sm shadow-sm">
                  Register
                </CustomButton>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

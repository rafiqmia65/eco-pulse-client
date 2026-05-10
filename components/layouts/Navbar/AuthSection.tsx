"use client";

import Link from "next/link";
import Image from "next/image";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import LogOutButton from "@/components/shared/LogOutButton/LogOutButton";
import { getDefaultDashboardRoute } from "@/lib/authUtils";
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
import { cn } from "@/lib/utils";

interface AuthSectionProps {
  user: AuthUser | null;
  isMobile?: boolean;
}

export default function AuthSection({ user, isMobile = false }: AuthSectionProps) {
  const getInitial = (name?: string) => name?.charAt(0).toUpperCase() || "U";

  if (!user) {
    return (
      <div className={cn("flex items-center", isMobile ? "gap-1" : "gap-2")}>
        <Link href="/login">
          <CustomButton variant="ghost" className={cn("text-sm px-3", isMobile && "h-8 py-0")}>
            Login
          </CustomButton>
        </Link>

        {!isMobile && (
          <Link href="/register">
            <CustomButton className="text-sm shadow-sm">
              Register
            </CustomButton>
          </Link>
        )}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className={cn(
          "rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary transition p-0.5 bg-background shadow-sm cursor-pointer",
          isMobile ? "w-8 h-8" : "w-10 h-10"
        )}>
          <div className="w-full h-full rounded-full overflow-hidden">
            {user.image ? (
              <Image
                src={user.image}
                alt="profile"
                width={isMobile ? 32 : 40}
                height={isMobile ? 32 : 40}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className={cn(
                "w-full h-full flex items-center justify-center bg-primary text-primary-foreground font-bold",
                isMobile ? "text-xs" : "text-sm"
              )}>
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
          <Link href="/dashboard/profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/dashboard/settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer">
          <LogOutButton className="w-full justify-start h-auto p-0 hover:bg-transparent" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

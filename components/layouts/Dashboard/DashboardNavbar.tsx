"use client";

import React from "react";
import Link from "next/link";
import { Bell, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/layouts/ModeToggle/ModeToggle";
import { DashboardSidebar } from "./DashboardSidebar";
import { AuthUser } from "@/types/public/auth.types";
import BrandLogo from "@/components/shared/BrandLogo/BrandLogo";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";

interface DashboardNavbarProps {
  user: AuthUser;
}

export const DashboardNavbar = ({ user }: DashboardNavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* 🔹 Navbar */}
      <header className="h-16 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-40 w-full">
        <div className="container h-full flex items-center justify-between px-4">
          {/* Left */}
          <div className="flex items-center gap-4 flex-1">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            <Link href="/">
              <CustomButton>Go Back Home</CustomButton>
            </Link>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <ModeToggle />

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background" />
            </Button>
          </div>
        </div>
      </header>

      {/* 🔹 Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMenu}
          />

          {/* Sidebar */}
          <div className="absolute inset-y-0 left-0 w-72 bg-background border-r shadow-2xl animate-in slide-in-from-left duration-300 flex flex-col">
            {/* Top */}
            <div className="flex items-center justify-between p-2 border-b">
              <BrandLogo />

              <Button variant="ghost" size="icon" onClick={closeMenu}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto">
              <DashboardSidebar
                user={user}
                className="h-full w-full border-none"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

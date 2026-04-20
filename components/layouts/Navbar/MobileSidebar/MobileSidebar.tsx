"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import LogOutButton from "@/components/shared/LogOutButton/LogOutButton";
import BrandLogo from "@/components/shared/BrandLogo/BrandLogo";
import { AuthUser } from "@/types/auth.types";
import { getDefaultDashboardRoute } from "@/lib/authUtils";

export default function MobileSidebar({
  open,
  onClose,
  user,
  navLinks,
}: {
  open: boolean;
  onClose: () => void;
  user: AuthUser | null;
  navLinks: { href: string; label: string }[];
}) {
  const getInitial = (name?: string) =>
    name?.trim()?.charAt(0).toUpperCase() || "U";

  // ESC close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Wrapper */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-[80%] max-w-sm
          bg-background text-foreground
          shadow-2xl
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-4 border-b bg-background">
          <BrandLogo />
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* NAV LINKS */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-background">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block text-base text-muted-foreground hover:text-primary transition"
            >
              {link.label}
            </Link>
          ))}

          {user && (
            <Link
              href={getDefaultDashboardRoute(user.role)}
              onClick={onClose}
              className="block text-base text-muted-foreground hover:text-primary transition"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* AUTH SECTION */}
        <div className="border-t px-4 py-4 bg-background">
          {user ? (
            <div className="flex items-center justify-between">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full overflow-hidden border bg-muted">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt="profile"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground font-bold">
                    {getInitial(user.name)}
                  </div>
                )}
              </div>

              <LogOutButton />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link href="/login" onClick={onClose}>
                <CustomButton className="w-full" variant="ghost">
                  Login
                </CustomButton>
              </Link>

              <Link href="/register" onClick={onClose}>
                <CustomButton className="w-full">Register</CustomButton>
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

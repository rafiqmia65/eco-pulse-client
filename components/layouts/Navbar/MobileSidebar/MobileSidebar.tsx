"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, LayoutDashboard, User, Settings, ChevronRight } from "lucide-react";
import CustomButton from "@/components/shared/reusableComponents/CustomButton";
import LogOutButton from "@/components/shared/LogOutButton/LogOutButton";
import BrandLogo from "@/components/shared/BrandLogo/BrandLogo";

import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { usePathname } from "next/navigation";
import { AuthUser } from "@/types/auth.types";
import { motion, AnimatePresence } from "framer-motion";

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
  const pathname = usePathname();
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
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sidebar Wrapper */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 z-70 h-dvh w-[85%] max-w-sm bg-background text-foreground shadow-2xl flex flex-col border-r border-border/40"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-5 border-b bg-background/80 backdrop-blur-md sticky top-0 z-10">
              <BrandLogo />
              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* USER INFO (Top section if logged in) */}
            {user && (
              <div className="px-6 py-6 border-b bg-muted/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 p-0.5 bg-background shadow-sm">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt="profile"
                        width={56}
                        height={56}
                        className="object-cover w-full h-full rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground font-bold text-xl rounded-full">
                        {getInitial(user.name)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-base leading-tight">
                      {user.name}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Profile Quick Links */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Link
                    href="/dashboard/profile"
                    onClick={onClose}
                    className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-lg text-xs font-medium hover:border-primary/50 transition-colors"
                  >
                    <User size={14} className="text-primary" />
                    Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={onClose}
                    className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-lg text-xs font-medium hover:border-primary/50 transition-colors"
                  >
                    <Settings size={14} className="text-primary" />
                    Settings
                  </Link>
                </div>
              </div>
            )}

            {/* NAV LINKS */}
            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 custom-scrollbar">
              <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">
                Main Navigation
              </p>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-4 py-3 text-sm rounded-xl transition-all ${
                      isActive
                        ? "text-primary font-bold bg-primary/5 border-l-4 border-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {link.label}
                    <ChevronRight
                      size={14}
                      className={
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100 transition-opacity"
                      }
                    />
                  </Link>
                );
              })}

              {user && (
                <>
                  <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mt-6 mb-2">
                    Dashboard
                  </p>
                  <Link
                    href={getDefaultDashboardRoute(user.role)}
                    onClick={onClose}
                    className={`flex items-center justify-between px-4 py-3 text-sm rounded-xl transition-all ${
                      pathname.includes("/dashboard")
                        ? "text-primary font-bold bg-primary/5 border-l-4 border-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <LayoutDashboard size={16} />
                      Go to Dashboard
                    </div>
                    <ChevronRight size={14} />
                  </Link>
                </>
              )}
            </nav>

            {/* AUTH SECTION (Bottom) */}
            <div className="border-t px-6 py-6 bg-background/80 backdrop-blur-md mt-auto">
              {user ? (
                <div className="flex flex-col gap-3">
                  <LogOutButton className="w-full justify-center bg-destructive/10 hover:bg-destructive/20 text-destructive border-destructive/20 py-6" />
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/login" onClick={onClose}>
                    <CustomButton
                      className="w-full py-6 rounded-xl"
                      variant="ghost"
                    >
                      Login
                    </CustomButton>
                  </Link>

                  <Link href="/register" onClick={onClose}>
                    <CustomButton className="w-full py-6 rounded-xl shadow-lg shadow-primary/20">
                      Get Started
                    </CustomButton>
                  </Link>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

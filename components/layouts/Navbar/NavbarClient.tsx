"use client";

import { useEffect } from "react";
import { Menu } from "lucide-react";
import BrandLogo from "@/components/shared/BrandLogo/BrandLogo";
import { ModeToggle } from "../ModeToggle/ModeToggle";
import DesktopNav from "./DesktopNav/DesktopNav";
import MobileSidebar from "./MobileSidebar/MobileSidebar";
import AuthSection from "./AuthSection";
import { AuthUser } from "@/types/auth.types";
import { useAppStore } from "@/store";

export default function NavbarClient({
  user,
  navLinks,
}: {
  user: AuthUser | null;
  navLinks: { href: string; label: string }[];
}) {
  // Use Zustand store for global mobile menu state (Select separately to avoid infinite render loops)
  const isMobileMenuOpen = useAppStore((state) => state.isMobileMenuOpen);
  const setMobileMenuOpen = useAppStore((state) => state.setMobileMenuOpen);

  // lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  // auto close on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) setMobileMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen, setMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b bg-muted backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* LEFT - LOGO */}
        <BrandLogo />

        {/* CENTER - NAV (Desktop only) */}
        <DesktopNav user={user} navLinks={navLinks} />

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <AuthSection user={user} isMobile={true} />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-md hover:bg-muted transition"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
      {/* Mobile Sidebar */}
      <MobileSidebar
        open={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        user={user}
        navLinks={navLinks}
      />
    </header>
  );
}

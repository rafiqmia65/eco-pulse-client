"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import BrandLogo from "@/components/shared/BrandLogo/BrandLogo";
import { ModeToggle } from "../ModeToggle/ModeToggle";
import DesktopNav from "./DesktopNav/DesktopNav";
import MobileSidebar from "./MobileSidebar/MobileSidebar";
import { AuthUser } from "@/types/auth.types";

export default function NavbarClient({
  user,
  navLinks,
}: {
  user: AuthUser | null;
  navLinks: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);

  // lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  // auto close on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-muted/50 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* LEFT - LOGO */}
        <BrandLogo />

        {/* CENTER - NAV (Desktop only) */}
        <DesktopNav user={user} navLinks={navLinks} />

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <ModeToggle />

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 rounded-md hover:bg-muted transition"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
      {/* Mobile Sidebar */}
      <MobileSidebar
        open={open}
        onClose={() => setOpen(false)}
        user={user}
        navLinks={navLinks}
      />
    </header>
  );
}

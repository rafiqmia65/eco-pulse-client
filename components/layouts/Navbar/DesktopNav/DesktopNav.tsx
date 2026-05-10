"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthUser } from "@/types/auth.types";
import { ModeToggle } from "../../ModeToggle/ModeToggle";
import AuthSection from "../AuthSection";

export default function DesktopNav({
  user,
  navLinks,
}: {
  user: AuthUser | null;
  navLinks: { href: string; label: string }[];
}) {
  const pathname = usePathname();

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
        <AuthSection user={user} />
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "../ModeToggle/ModeToggle";
import BrandLogo from "@/components/shared/BrandLogo/BrandLogo";
import CustomButton from "@/components/shared/CustomButton/CustomButton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/ideas", label: "Ideas" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <BrandLogo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <ModeToggle />

              <Link href="/login">
                <CustomButton variant="ghost">Login</CustomButton>
              </Link>

              <Link href="/register">
                <CustomButton>Register</CustomButton>
              </Link>
            </div>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center gap-3 pt-3">
              <ModeToggle />

              <Link href="/login" className="text-sm">
                Login
              </Link>

              <Link
                href="/register"
                className="px-3 py-2 rounded bg-primary text-primary-foreground text-sm"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

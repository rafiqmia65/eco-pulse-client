import Link from "next/link";
import BrandLogo from "@/components/shared/BrandLogo/BrandLogo";
import {
  Mail,
  Phone,
  Leaf,
  Copyright,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

// ── Social SVG Icons (brand icons removed from lucide-react v1.x) ────────────

const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

// ── Data ────────────────────────────────────────────────────────────────────

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Ideas", href: "/ideas" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
];

const socialLinks = [
  { label: "X (Twitter)", href: "https://x.com/rafiqmia65", icon: XIcon },
  { label: "GitHub", href: "https://github.com/rafiqmia65", icon: GithubIcon },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/rafiqmia65",
    icon: LinkedInIcon,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/rafiqmia65",
    icon: InstagramIcon,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/rafiqmia65",
    icon: FacebookIcon,
  },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email us",
    value: "support@ecopulse.com",
    href: "mailto:support@ecopulse.com",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+880 1234-567890",
    href: "tel:+8801234567890",
  },
  {
    icon: MapPin,
    label: "Find us",
    value: "Dhaka, Bangladesh",
    href: "https://maps.google.com/?q=Dhaka,Bangladesh",
  },
];

// ── Component ────────────────────────────────────────────────────────────────

const FooterSection = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border overflow-hidden">
      {/* Subtle background gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 120%, hsl(var(--primary)/0.07) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        {/* ── Top Grid ── */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <BrandLogo />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Building a sustainable future by sharing impactful ideas,
              encouraging collaboration, and empowering communities to create
              real environmental impact. EcoPulse connects innovators,
              environmental enthusiasts, and changemakers through a modern
              platform where ideas can inspire action, drive awareness, and
              contribute to a greener, smarter, and more sustainable world for
              future generations.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex items-left gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground">
              Contact
            </h3>
            <ul className="space-y-3.5">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={label}
                    className="group flex items-start gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4 mt-0.5 shrink-0 text-primary/70 group-hover:text-primary transition-colors duration-200" />
                    <span>{value}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Eco badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs text-primary font-medium">
              <Leaf className="w-3.5 h-3.5" />
              Eco Pulse Community Platform
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="
                    flex items-center justify-center w-8 h-8 rounded-full
                    border border-border bg-background
                    text-muted-foreground hover:text-primary hover:border-primary/50
                    hover:bg-primary/5
                    transition-all duration-200
                  "
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mt-12 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />

        {/* ── Bottom Bar ── */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p className="flex items-center gap-1.5">
            <Copyright className="w-3.5 h-3.5" />
            {year} EcoPulse. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="hover:text-primary transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <span className="w-px h-3 bg-border" />
            <Link
              href="/about"
              className="hover:text-primary transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

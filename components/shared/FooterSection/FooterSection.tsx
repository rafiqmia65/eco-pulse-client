import Link from "next/link";
import Section from "@/components/shared/reusableComponents/Section";
import BrandLogo from "@/components/shared/BrandLogo/BrandLogo";
import { Mail, Phone, Leaf, Copyright } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="border-t border-border">
      <Section>
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <BrandLogo />

            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Building a sustainable future by sharing impactful ideas,
              encouraging collaboration, and empowering communities to create
              real environmental impact.
            </p>

            {/* small eco badge */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Leaf className="w-4 h-4 text-primary" />
              <span>Eco Pulse Community Platform</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2">
              <Link
                className="hover:text-primary text-muted-foreground"
                href="/ideas"
              >
                Ideas
              </Link>
              <Link
                className="hover:text-primary text-muted-foreground"
                href="/about"
              >
                About Us
              </Link>
              <Link
                className="hover:text-primary text-muted-foreground"
                href="/blog"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Contact
            </h3>

            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@ecopulse.com</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+880 1234-567890</span>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom */}

        <div className="border-t border-border mt-12 pt-10 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Copyright className="w-4 h-4" />
            {new Date().getFullYear()} EcoPulse. All rights reserved.
          </p>
        </div>
      </Section>
    </footer>
  );
};

export default FooterSection;

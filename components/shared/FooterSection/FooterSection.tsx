import Link from "next/link";
import Section from "@/components/shared/Section/Section";
import BrandLogo from "@/components/shared/BrandLogo/BrandLogo";

const FooterSection = () => {
  return (
    <div className="border-t border-border">
      <Section>
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <BrandLogo />
            <p className="text-sm text-muted-foreground max-w-xs">
              Building a sustainable future by sharing impactful ideas and
              empowering communities.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Quick Links
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/ideas"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Ideas
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                About Us
              </Link>
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Contact
            </h3>
            <p className="text-sm text-muted-foreground">
              Email: support@ecopulse.com
            </p>
            <p className="text-sm text-muted-foreground">
              Phone: +880 1234-567890
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EcoPulse Hub. All rights reserved.
          </p>
        </div>
      </Section>
    </div>
  );
};

export default FooterSection;

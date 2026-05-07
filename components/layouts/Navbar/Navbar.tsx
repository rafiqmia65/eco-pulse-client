import { getUserInfo } from "@/services/auth/auth.services";
import { AuthUser } from "@/types/auth.types";
import NavbarClient from "./NavbarClient";

const guestLinks = [
  { href: "/", label: "Home" },
  { href: "/ideas", label: "Ideas" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

const userLinks = [
  { href: "/", label: "Home" },
  { href: "/ideas", label: "Ideas" },
  { href: "/dashboard/ideas-create", label: "Create Idea" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export default async function Navbar() {
  const user: AuthUser | null = await getUserInfo();
  const navLinks = user ? userLinks : guestLinks;

  return <NavbarClient user={user} navLinks={navLinks} />;
}

import { getUserInfo } from "@/services/auth/auth.services";
import { AuthUser } from "@/types/public/auth.types";
import NavbarClient from "./NavbarClient";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/ideas", label: "Ideas" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export default async function Navbar() {
  const user: AuthUser | null = await getUserInfo();

  return <NavbarClient user={user} navLinks={navLinks} />;
}

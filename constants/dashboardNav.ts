import {
  LayoutDashboard,
  User,
  Lock,
  Users,
  Lightbulb,
  Tags,
  CreditCard,
  PlusCircle,
  ShoppingBag,
  ThumbsUp,
  Bookmark,
  Sparkles,
} from "lucide-react";

import { role } from "@/constants/roles";
import { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const getDashboardNav = (userRole: string): NavSection[] => {
  const commonLinks: NavItem[] = [
    { title: "My Profile", href: "/my-profile", icon: User },
    {
      title: "Update Profile",
      href: "/update-profile",
      icon: Lock,
    },
  ];

  const adminLinks: NavItem[] = [
    { title: "Overview", href: "/admin", icon: LayoutDashboard },
    { title: "Users", href: "/admin/users", icon: Users },
    { title: "All Ideas", href: "/admin/all-ideas", icon: Lightbulb },
    { title: "Categories", href: "/admin/categories", icon: Tags },
    { title: "Payments", href: "/admin/payments", icon: CreditCard },
    { title: "AI Analytics", href: "/admin/ai-analytics", icon: Sparkles },
  ];

  const memberLinks: NavItem[] = [
    { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { title: "Create Idea", href: "/dashboard/ideas-create", icon: PlusCircle },
    { title: "My All Ideas", href: "/dashboard/my-ideas", icon: Lightbulb },
    {
      title: "Purchased Ideas",
      href: "/dashboard/purchased-ideas",
      icon: ShoppingBag,
    },
    {
      title: "My Votes Ideas",
      href: "/dashboard/my-votes-ideas",
      icon: ThumbsUp,
    },
    {
      title: "Watchlist Ideas",
      href: "/dashboard/watchlist-ideas",
      icon: Bookmark,
    },
    { title: "My Payments", href: "/dashboard/my-payments", icon: CreditCard },
  ];

  const sections: NavSection[] = [{ label: "Account", items: commonLinks }];

  if (userRole === role.ADMIN) {
    sections.push({ label: "Admin Management", items: adminLinks });
  } else if (userRole === role.MEMBER) {
    sections.push({ label: "Member Panel", items: memberLinks });
  }

  return sections;
};

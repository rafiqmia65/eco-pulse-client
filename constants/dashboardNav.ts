import {
  LayoutDashboard,
  User,
  Lock,
  Home,
  Users,
  Lightbulb,
  Tags,
  MessageSquare,
  CreditCard,
  PlusCircle,
  Clock,
  Search,
  CheckCircle,
  XCircle,
  ShoppingBag,
  ThumbsUp,
  Bookmark,
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
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "My Profile", href: "/dashboard/my-profile", icon: User },
    {
      title: "Change Password",
      href: "/dashboard/change-password",
      icon: Lock,
    },
  ];

  const adminLinks: NavItem[] = [
    { title: "Overview", href: "/dashboard/admin", icon: Home },
    { title: "Users", href: "/dashboard/admin/users", icon: Users },
    { title: "Ideas", href: "/dashboard/admin/ideas", icon: Lightbulb },
    { title: "Pending", href: "/dashboard/admin/ideas/pending", icon: Clock },
    {
      title: "Approved",
      href: "/dashboard/admin/ideas/approved",
      icon: CheckCircle,
    },
    {
      title: "Rejected",
      href: "/dashboard/admin/ideas/rejected",
      icon: XCircle,
    },
    { title: "Categories", href: "/dashboard/admin/categories", icon: Tags },
    {
      title: "Comments",
      href: "/dashboard/admin/comments",
      icon: MessageSquare,
    },
    { title: "Payments", href: "/dashboard/admin/payments", icon: CreditCard },
  ];

  const memberLinks: NavItem[] = [
    { title: "Create Idea", href: "/dashboard/ideas/create", icon: PlusCircle },
    { title: "Pending Ideas", href: "/dashboard/ideas/pending", icon: Clock },
    {
      title: "Under Review",
      href: "/dashboard/ideas/under-review",
      icon: Search,
    },
    {
      title: "Approved Ideas",
      href: "/dashboard/ideas/approved",
      icon: CheckCircle,
    },
    {
      title: "Rejected Ideas",
      href: "/dashboard/ideas/rejected",
      icon: XCircle,
    },
    {
      title: "Purchased Ideas",
      href: "/dashboard/purchased-ideas",
      icon: ShoppingBag,
    },
    { title: "My Votes", href: "/dashboard/votes", icon: ThumbsUp },
    { title: "Watchlist", href: "/dashboard/watchlist", icon: Bookmark },
  ];

  const sections: NavSection[] = [{ label: "Account", items: commonLinks }];

  if (userRole === role.ADMIN) {
    sections.push({ label: "Admin Management", items: adminLinks });
  } else if (userRole === role.MEMBER) {
    sections.push({ label: "Member Panel", items: memberLinks });
  }

  return sections;
};

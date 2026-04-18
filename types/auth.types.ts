import { RoleType } from "@/constants/roles";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  status: string;
  image?: string | null;
  emailVerified: boolean;
  createdAt: string;
  updateAt: string;
};

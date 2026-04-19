import { RoleType } from "@/constants/roles";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  status: string;
  image?: string | null;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  image?: string;
};

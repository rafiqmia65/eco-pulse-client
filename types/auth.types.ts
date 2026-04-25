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
export type LoginPayload = {
  email: string;
  password: string;
};

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: RoleType;
      status: string;
      emailVerified: boolean;
      image: string | null;
      createdAt: string;
      updatedAt: string;
      needPasswordChange: boolean;
      isDeleted: boolean;
      deletedAt: string | null;
    };
  };
}
export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  image?: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

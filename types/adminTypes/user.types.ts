import { ApiMeta } from "../api.types";
import { RoleType } from "@/constants/roles";
import { UserStatus } from "@/constants/userStatus";

export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: RoleType;
  status: UserStatus;
  needPasswordChange: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IUserStats {
  totalUsers: number;
  activeUsers: number;
  blockedUsers: number;
  adminUsers: number;
  memberUsers: number;
}

export interface IUserListResponse {
  httpStatusCode: number;
  success: boolean;
  message: string;
  meta?: ApiMeta;
  data?: {
    users: IUser[];
    stats: IUserStats;
  };
}

export interface ISingleUserResponse {
  httpStatusCode: number;
  success: boolean;
  message: string;
  data?: IUser;
}

export interface IUserFilters {
  searchTerm?: string;
  role?: RoleType;
  status?: UserStatus;
  page?: number;
  limit?: number;
  [key: string]: unknown;
}

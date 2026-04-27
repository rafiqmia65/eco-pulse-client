export interface IAdminCategory {
  id: string;
  name: string;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IAdminCategoryFilters {
  searchTerm?: string;
  status?: "active" | "deleted" | "all";
}

export interface IAdminCategoryResponse {
  success: boolean;
  message: string;
  data: IAdminCategory[];
}

export interface ICreateCategoryPayload {
  name: string;
}

export interface IUpdateCategoryPayload {
  name: string;
}

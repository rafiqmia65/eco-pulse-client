"use server";

import { httpClient } from "@/lib/axios/httpClient";

export interface ICategory {
  id: string;
  name: string;
  description?: string;
}

export const fetchCategories = async () => {
  return await httpClient.get<ICategory[]>("/api/v1/categories");
};

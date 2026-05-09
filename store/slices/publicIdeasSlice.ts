import { StateCreator } from "zustand";
import { AppState } from "../index";

export interface PublicIdeasSlice {
  publicIdeasSearch: string;
  publicIdeasCategory: string;
  publicIdeasIsPaid: string;
  publicIdeasSortBy: string;
  publicIdeasPage: number;
  isFilterSidebarOpen: boolean;
  setPublicIdeasSearch: (search: string) => void;
  setPublicIdeasCategory: (category: string) => void;
  setPublicIdeasIsPaid: (isPaid: string) => void;
  setPublicIdeasSortBy: (sortBy: string) => void;
  setPublicIdeasPage: (page: number) => void;
  setIsFilterSidebarOpen: (isOpen: boolean) => void;
  resetPublicIdeasFilters: () => void;
}

export const createPublicIdeasSlice: StateCreator<
  AppState,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  PublicIdeasSlice
> = (set) => ({
  publicIdeasSearch: "",
  publicIdeasCategory: "all",
  publicIdeasIsPaid: "all",
  publicIdeasSortBy: "latest",
  publicIdeasPage: 1,
  isFilterSidebarOpen: false,

  setPublicIdeasSearch: (search) =>
    set(
      { publicIdeasSearch: search, publicIdeasPage: 1 },
      false,
      "publicIdeas/setSearch"
    ),
  setPublicIdeasCategory: (category) =>
    set(
      { publicIdeasCategory: category, publicIdeasPage: 1 },
      false,
      "publicIdeas/setCategory"
    ),
  setPublicIdeasIsPaid: (isPaid) =>
    set(
      { publicIdeasIsPaid: isPaid, publicIdeasPage: 1 },
      false,
      "publicIdeas/setIsPaid"
    ),
  setPublicIdeasSortBy: (sortBy) =>
    set(
      { publicIdeasSortBy: sortBy, publicIdeasPage: 1 },
      false,
      "publicIdeas/setSortBy"
    ),
  setPublicIdeasPage: (page) =>
    set({ publicIdeasPage: page }, false, "publicIdeas/setPage"),
  setIsFilterSidebarOpen: (isOpen) =>
    set({ isFilterSidebarOpen: isOpen }, false, "publicIdeas/setSidebarOpen"),
  resetPublicIdeasFilters: () =>
    set(
      {
        publicIdeasSearch: "",
        publicIdeasCategory: "all",
        publicIdeasIsPaid: "all",
        publicIdeasSortBy: "latest",
        publicIdeasPage: 1,
      },
      false,
      "publicIdeas/resetFilters"
    ),
});

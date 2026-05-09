import { StateCreator } from "zustand";
import { AppState } from "../index";

export interface AdminDashboardSlice {
  // Category Filters
  categorySearch: string;
  categoryStatus: string;
  setCategorySearch: (search: string) => void;
  setCategoryStatus: (status: string) => void;
  resetCategoryFilters: () => void;

  // User Filters
  userSearch: string;
  userRole: string;
  userStatus: string;
  userPage: number;
  setUserSearch: (search: string) => void;
  setUserRole: (role: string) => void;
  setUserStatus: (status: string) => void;
  setUserPage: (page: number) => void;
  resetUserFilters: () => void;

  // Idea Filters (Moderation)
  ideaSearch: string;
  ideaStatus: string;
  ideaCategory: string;
  ideaIsPaid: string;
  ideaPage: number;
  setIdeaSearch: (search: string) => void;
  setIdeaStatus: (status: string) => void;
  setIdeaCategory: (category: string) => void;
  setIdeaIsPaid: (isPaid: string) => void;
  setIdeaPage: (page: number) => void;
  resetIdeaFilters: () => void;

  // Payment Filters
  paymentSearch: string;
  paymentStatus: string;
  paymentGateway: string;
  paymentPage: number;
  setPaymentSearch: (search: string) => void;
  setPaymentStatus: (status: string) => void;
  setPaymentGateway: (gateway: string) => void;
  setPaymentPage: (page: number) => void;
  resetPaymentFilters: () => void;
}

export const createAdminDashboardSlice: StateCreator<
  AppState,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  AdminDashboardSlice
> = (set) => ({
  // Category Initial State
  categorySearch: "",
  categoryStatus: "all",
  setCategorySearch: (search) =>
    set({ categorySearch: search }, false, "admin/setCategorySearch"),
  setCategoryStatus: (status) =>
    set({ categoryStatus: status }, false, "admin/setCategoryStatus"),
  resetCategoryFilters: () =>
    set(
      { categorySearch: "", categoryStatus: "all" },
      false,
      "admin/resetCategoryFilters"
    ),

  // User Initial State
  userSearch: "",
  userRole: "",
  userStatus: "",
  userPage: 1,
  setUserSearch: (search) =>
    set({ userSearch: search, userPage: 1 }, false, "admin/setUserSearch"),
  setUserRole: (role) =>
    set({ userRole: role, userPage: 1 }, false, "admin/setUserRole"),
  setUserStatus: (status) =>
    set({ userStatus: status, userPage: 1 }, false, "admin/setUserStatus"),
  setUserPage: (page) =>
    set({ userPage: page }, false, "admin/setUserPage"),
  resetUserFilters: () =>
    set(
      { userSearch: "", userRole: "", userStatus: "", userPage: 1 },
      false,
      "admin/resetUserFilters"
    ),

  // Idea Initial State
  ideaSearch: "",
  ideaStatus: "",
  ideaCategory: "",
  ideaIsPaid: "",
  ideaPage: 1,
  setIdeaSearch: (search) =>
    set({ ideaSearch: search, ideaPage: 1 }, false, "admin/setIdeaSearch"),
  setIdeaStatus: (status) =>
    set({ ideaStatus: status, ideaPage: 1 }, false, "admin/setIdeaStatus"),
  setIdeaCategory: (category) =>
    set(
      { ideaCategory: category, ideaPage: 1 },
      false,
      "admin/setIdeaCategory"
    ),
  setIdeaIsPaid: (isPaid) =>
    set({ ideaIsPaid: isPaid, ideaPage: 1 }, false, "admin/setIdeaIsPaid"),
  setIdeaPage: (page) =>
    set({ ideaPage: page }, false, "admin/setIdeaPage"),
  resetIdeaFilters: () =>
    set(
      {
        ideaSearch: "",
        ideaStatus: "",
        ideaCategory: "",
        ideaIsPaid: "",
        ideaPage: 1,
      },
      false,
      "admin/resetIdeaFilters"
    ),

  // Payment Initial State
  paymentSearch: "",
  paymentStatus: "all",
  paymentGateway: "all",
  paymentPage: 1,
  setPaymentSearch: (search) =>
    set(
      { paymentSearch: search, paymentPage: 1 },
      false,
      "admin/setPaymentSearch"
    ),
  setPaymentStatus: (status) =>
    set(
      { paymentStatus: status, paymentPage: 1 },
      false,
      "admin/setPaymentStatus"
    ),
  setPaymentGateway: (gateway) =>
    set(
      { paymentGateway: gateway, paymentPage: 1 },
      false,
      "admin/setPaymentGateway"
    ),
  setPaymentPage: (page) =>
    set({ paymentPage: page }, false, "admin/setPaymentPage"),
  resetPaymentFilters: () =>
    set(
      {
        paymentSearch: "",
        paymentStatus: "all",
        paymentGateway: "all",
        paymentPage: 1,
      },
      false,
      "admin/resetPaymentFilters"
    ),
});

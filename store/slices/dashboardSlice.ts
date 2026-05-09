import { StateCreator } from "zustand";
import { AppState } from "../index";

export interface DashboardSlice {
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

export const createDashboardSlice: StateCreator<
  AppState,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  DashboardSlice
> = (set) => ({
  // Category Initial State
  categorySearch: "",
  categoryStatus: "all",
  setCategorySearch: (search) =>
    set({ categorySearch: search }, false, "dashboard/setCategorySearch"),
  setCategoryStatus: (status) =>
    set({ categoryStatus: status }, false, "dashboard/setCategoryStatus"),
  resetCategoryFilters: () =>
    set(
      { categorySearch: "", categoryStatus: "all" },
      false,
      "dashboard/resetCategoryFilters"
    ),

  // User Initial State
  userSearch: "",
  userRole: "",
  userStatus: "",
  userPage: 1,
  setUserSearch: (search) =>
    set({ userSearch: search, userPage: 1 }, false, "dashboard/setUserSearch"),
  setUserRole: (role) =>
    set({ userRole: role, userPage: 1 }, false, "dashboard/setUserRole"),
  setUserStatus: (status) =>
    set({ userStatus: status, userPage: 1 }, false, "dashboard/setUserStatus"),
  setUserPage: (page) =>
    set({ userPage: page }, false, "dashboard/setUserPage"),
  resetUserFilters: () =>
    set(
      { userSearch: "", userRole: "", userStatus: "", userPage: 1 },
      false,
      "dashboard/resetUserFilters"
    ),

  // Idea Initial State
  ideaSearch: "",
  ideaStatus: "",
  ideaCategory: "",
  ideaIsPaid: "",
  ideaPage: 1,
  setIdeaSearch: (search) =>
    set({ ideaSearch: search, ideaPage: 1 }, false, "dashboard/setIdeaSearch"),
  setIdeaStatus: (status) =>
    set({ ideaStatus: status, ideaPage: 1 }, false, "dashboard/setIdeaStatus"),
  setIdeaCategory: (category) =>
    set(
      { ideaCategory: category, ideaPage: 1 },
      false,
      "dashboard/setIdeaCategory"
    ),
  setIdeaIsPaid: (isPaid) =>
    set({ ideaIsPaid: isPaid, ideaPage: 1 }, false, "dashboard/setIdeaIsPaid"),
  setIdeaPage: (page) =>
    set({ ideaPage: page }, false, "dashboard/setIdeaPage"),
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
      "dashboard/resetIdeaFilters"
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
      "dashboard/setPaymentSearch"
    ),
  setPaymentStatus: (status) =>
    set(
      { paymentStatus: status, paymentPage: 1 },
      false,
      "dashboard/setPaymentStatus"
    ),
  setPaymentGateway: (gateway) =>
    set(
      { paymentGateway: gateway, paymentPage: 1 },
      false,
      "dashboard/setPaymentGateway"
    ),
  setPaymentPage: (page) =>
    set({ paymentPage: page }, false, "dashboard/setPaymentPage"),
  resetPaymentFilters: () =>
    set(
      {
        paymentSearch: "",
        paymentStatus: "all",
        paymentGateway: "all",
        paymentPage: 1,
      },
      false,
      "dashboard/resetPaymentFilters"
    ),
});

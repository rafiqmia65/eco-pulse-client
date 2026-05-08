/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateCreator } from "zustand";
import { AppState } from "../index";

export type ModalType =
  | "confirmAction"
  | "categoryModal"
  | "rejectIdea"
  | "purchase"
  | "deleteComment"
  | "deleteIdea"
  | "userDetails"
  | null;

export interface UISlice {
  // Theme & Sidebar
  isSidebarOpen: boolean;
  theme: "light" | "dark" | "system";
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setTheme: (theme: "light" | "dark" | "system") => void;

  // Mobile Menu
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (isOpen: boolean) => void;

  // Global Modals
  activeModal: ModalType;
  modalData: any; // Optional data to pass to the modal
  openModal: (modal: ModalType, data?: any) => void;
  closeModal: () => void;
}

export const createUISlice: StateCreator<
  AppState,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  UISlice
> = (set) => ({
  // Theme & Sidebar Initial State
  isSidebarOpen: false,
  theme: "system",

  // Mobile Menu Initial State
  isMobileMenuOpen: false,

  // Modal Initial State
  activeModal: null,
  modalData: null,

  // Theme & Sidebar Actions
  toggleSidebar: () =>
    set(
      (state) => ({ isSidebarOpen: !state.isSidebarOpen }),
      false,
      "ui/toggleSidebar",
    ),
  setSidebarOpen: (isOpen) =>
    set({ isSidebarOpen: isOpen }, false, "ui/setSidebarOpen"),
  setTheme: (theme) => set({ theme }, false, "ui/setTheme"),

  // Mobile Menu Actions
  toggleMobileMenu: () =>
    set(
      (state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen }),
      false,
      "ui/toggleMobileMenu",
    ),
  setMobileMenuOpen: (isOpen) =>
    set({ isMobileMenuOpen: isOpen }, false, "ui/setMobileMenuOpen"),

  // Modal Actions
  openModal: (modal, data = null) =>
    set({ activeModal: modal, modalData: data }, false, "ui/openModal"),
  closeModal: () =>
    set({ activeModal: null, modalData: null }, false, "ui/closeModal"),
});

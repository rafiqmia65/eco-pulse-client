import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createUISlice, type UISlice } from "./slices/uiSlice";
import { AuthSlice, createAuthSlice } from "./slices/authSlice";
import {
  createAdminDashboardSlice,
  type AdminDashboardSlice,
} from "./slices/adminDashboardSlice";
import {
  createMemberDashboardSlice,
  type MemberDashboardSlice,
} from "./slices/memberDashboardSlice";

// Combine all slice interfaces into a single AppState
export type AppState = UISlice &
  AuthSlice &
  AdminDashboardSlice &
  MemberDashboardSlice;

// Create the unified store
export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (...a) => ({
        ...createUISlice(...a),
        ...createAuthSlice(...a),
        ...createAdminDashboardSlice(...a),
        ...createMemberDashboardSlice(...a),
        // Spread more slices here
      }),
      {
        name: "eco-pulse-storage", // name of the item in local storage
        // Optionally, specify which parts of the state you want to persist:
        partialize: (state) => ({
          theme: state.theme,
          // user: state.user, // Un-comment to persist user session
        }),
      },
    ),
    { name: "EcoPulseStore" },
  ),
);

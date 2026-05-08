import { StateCreator } from "zustand";
import { AppState } from "../index";
import { AuthUser } from "@/types/auth.types";

export interface AuthSlice {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
}

export const createAuthSlice: StateCreator<
  AppState,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  AuthSlice
> = (set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) =>
    set({ user, isAuthenticated: !!user }, false, "auth/setUser"),
  logout: () =>
    set({ user: null, isAuthenticated: false }, false, "auth/logout"),
});

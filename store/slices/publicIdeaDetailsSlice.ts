import { StateCreator } from "zustand";
import { AppState } from "../index";

export interface PublicIdeaDetailsSlice {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isConfettiActive: boolean;
  setIsConfettiActive: (isActive: boolean) => void;
}

export const createPublicIdeaDetailsSlice: StateCreator<
  AppState,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  PublicIdeaDetailsSlice
> = (set) => ({
  activeTab: "problem",
  setActiveTab: (tab) =>
    set({ activeTab: tab }, false, "publicIdeaDetails/setActiveTab"),
  isConfettiActive: false,
  setIsConfettiActive: (isActive) =>
    set(
      { isConfettiActive: isActive },
      false,
      "publicIdeaDetails/setIsConfettiActive"
    ),
});

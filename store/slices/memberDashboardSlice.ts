import { StateCreator } from "zustand";
import { AppState } from "../index";

export interface MemberDashboardSlice {
  // Member - My Ideas
  myIdeasSearch: string;
  myIdeasStatus: string;
  myIdeasCategory: string;
  myIdeasPage: number;
  setMyIdeasSearch: (search: string) => void;
  setMyIdeasStatus: (status: string) => void;
  setMyIdeasCategory: (category: string) => void;
  setMyIdeasPage: (page: number) => void;
  resetMyIdeasFilters: () => void;

  // Member - My Payments
  myPaymentsPage: number;
  setMyPaymentsPage: (page: number) => void;

  // Member - Voted Ideas
  votedSearch: string;
  votedCategory: string;
  votedPage: number;
  setVotedSearch: (search: string) => void;
  setVotedCategory: (category: string) => void;
  setVotedPage: (page: number) => void;
  resetVotedFilters: () => void;

  // Member - Purchased Ideas
  purchasedSearch: string;
  purchasedSortBy: string;
  purchasedCategory: string;
  purchasedPage: number;
  setPurchasedSearch: (search: string) => void;
  setPurchasedSortBy: (sortBy: string) => void;
  setPurchasedCategory: (category: string) => void;
  setPurchasedPage: (page: number) => void;
  resetPurchasedFilters: () => void;

  // Member - Watchlist
  watchlistSearch: string;
  watchlistCategory: string;
  watchlistPage: number;
  setWatchlistSearch: (search: string) => void;
  setWatchlistCategory: (category: string) => void;
  setWatchlistPage: (page: number) => void;
  resetWatchlistFilters: () => void;
}

export const createMemberDashboardSlice: StateCreator<
  AppState,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  MemberDashboardSlice
> = (set) => ({
  // Member - My Ideas
  myIdeasSearch: "",
  myIdeasStatus: "all",
  myIdeasCategory: "all",
  myIdeasPage: 1,
  setMyIdeasSearch: (search) =>
    set(
      { myIdeasSearch: search, myIdeasPage: 1 },
      false,
      "member/setMyIdeasSearch"
    ),
  setMyIdeasStatus: (status) =>
    set(
      { myIdeasStatus: status, myIdeasPage: 1 },
      false,
      "member/setMyIdeasStatus"
    ),
  setMyIdeasCategory: (category) =>
    set(
      { myIdeasCategory: category, myIdeasPage: 1 },
      false,
      "member/setMyIdeasCategory"
    ),
  setMyIdeasPage: (page) =>
    set({ myIdeasPage: page }, false, "member/setMyIdeasPage"),
  resetMyIdeasFilters: () =>
    set(
      {
        myIdeasSearch: "",
        myIdeasStatus: "all",
        myIdeasCategory: "all",
        myIdeasPage: 1,
      },
      false,
      "member/resetMyIdeasFilters"
    ),

  // Member - My Payments
  myPaymentsPage: 1,
  setMyPaymentsPage: (page) =>
    set({ myPaymentsPage: page }, false, "member/setMyPaymentsPage"),

  // Member - Voted Ideas
  votedSearch: "",
  votedCategory: "all",
  votedPage: 1,
  setVotedSearch: (search) =>
    set({ votedSearch: search, votedPage: 1 }, false, "member/setVotedSearch"),
  setVotedCategory: (category) =>
    set(
      { votedCategory: category, votedPage: 1 },
      false,
      "member/setVotedCategory"
    ),
  setVotedPage: (page) =>
    set({ votedPage: page }, false, "member/setVotedPage"),
  resetVotedFilters: () =>
    set(
      { votedSearch: "", votedCategory: "all", votedPage: 1 },
      false,
      "member/resetVotedFilters"
    ),

  // Member - Purchased Ideas
  purchasedSearch: "",
  purchasedSortBy: "all",
  purchasedCategory: "all",
  purchasedPage: 1,
  setPurchasedSearch: (search) =>
    set(
      { purchasedSearch: search, purchasedPage: 1 },
      false,
      "member/setPurchasedSearch"
    ),
  setPurchasedSortBy: (sortBy) =>
    set(
      { purchasedSortBy: sortBy, purchasedPage: 1 },
      false,
      "member/setPurchasedSortBy"
    ),
  setPurchasedCategory: (category) =>
    set(
      { purchasedCategory: category, purchasedPage: 1 },
      false,
      "member/setPurchasedCategory"
    ),
  setPurchasedPage: (page) =>
    set({ purchasedPage: page }, false, "member/setPurchasedPage"),
  resetPurchasedFilters: () =>
    set(
      {
        purchasedSearch: "",
        purchasedSortBy: "all",
        purchasedCategory: "all",
        purchasedPage: 1,
      },
      false,
      "member/resetPurchasedFilters"
    ),

  // Member - Watchlist
  watchlistSearch: "",
  watchlistCategory: "all",
  watchlistPage: 1,
  setWatchlistSearch: (search) =>
    set(
      { watchlistSearch: search, watchlistPage: 1 },
      false,
      "member/setWatchlistSearch"
    ),
  setWatchlistCategory: (category) =>
    set(
      { watchlistCategory: category, watchlistPage: 1 },
      false,
      "member/setWatchlistCategory"
    ),
  setWatchlistPage: (page) =>
    set({ watchlistPage: page }, false, "member/setWatchlistPage"),
  resetWatchlistFilters: () =>
    set(
      { watchlistSearch: "", watchlistCategory: "all", watchlistPage: 1 },
      false,
      "member/resetWatchlistFilters"
    ),
});

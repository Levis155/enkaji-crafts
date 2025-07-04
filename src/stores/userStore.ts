import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types";
import logoutUser from "../Utils/logoutUser";

interface UserState {
  user: User | null;
  refreshExpiry: number | null;
  setUserInfo: (userObject: User, refreshExpiryMs?: number) => void;
  removeUserInfo: () => void;
}

let logoutTimeout: ReturnType<typeof setTimeout>;

const userStore = (
  set: (
    partial: Partial<UserState> | ((state: UserState) => Partial<UserState>)
  ) => void
): UserState => ({
  user: null,
  refreshExpiry: null,

  setUserInfo: (userObject: User, refreshExpiryMs?: number) => {
    if (refreshExpiryMs) {
      const expiryTimestamp = Date.now() + refreshExpiryMs;

      if (logoutTimeout) clearTimeout(logoutTimeout);

      logoutTimeout = setTimeout(() => {
        logoutUser();
      }, refreshExpiryMs);

      set({ user: userObject, refreshExpiry: expiryTimestamp });
    } else {
      set((state) => ({ ...state, user: userObject }));
    }
  },

  removeUserInfo: () => {
    if (logoutTimeout) clearTimeout(logoutTimeout);
    set({ user: null, refreshExpiry: null });
  },
});

const useUserStore = create(
  persist<UserState>(userStore, { name: "user_info" })
);

export default useUserStore;

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types";



interface UserState {
    user: User | null;
    setUserInfo: (userObject: User) => void;
    removeUserInfo: () => void;
}

const userStore = (set: (state: Partial<UserState>) => void): UserState => {
    return {
        user: null,
        setUserInfo: (userObject: User) => {
            set({ user: userObject });
        },
        removeUserInfo: () => {
            set({ user: null });
        },
    };
};

const useUserStore = create(
    persist<UserState>(userStore, { name: "user_info" })
);

export default useUserStore;
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserObject {
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
}

interface UserState {
    user: UserObject | null;
    setUserInfo: (userObject: UserObject) => void;
    removeUserInfo: () => void;
}

const userStore = (set: (state: Partial<UserState>) => void): UserState => {
    return {
        user: null,
        setUserInfo: (userObject: UserObject) => {
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
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WishlistItem } from "../types";

interface WishlistState {
  wishlist: WishlistItem[];
  addItem: (newItem: WishlistItem) => void;
  removeItem: (itemId: string) => void;
  clearWishlist: () => void;
  setWishlistData: (remoteWishlist: WishlistItem[]) => void;
}

const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      wishlist: [],
      addItem: (newItem) => {
        set((state) => ({
          wishlist: [newItem, ...state.wishlist],
        }));
      },
      removeItem: (itemId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== itemId),
        }));
      },
      clearWishlist: () => {
        set({ wishlist: [] });
      },
      setWishlistData: (remoteWishlist: any[]) => {
        const transformedWishlist = remoteWishlist.map((item) => ({
          ...item,
          id: item.productId, 
        }));
        set({ wishlist: transformedWishlist });
      },
    }),
    { name: "wishlist_info" }
  )
);

export default useWishlistStore;

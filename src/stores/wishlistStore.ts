import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WishlistItem } from "../types";
import apiUrl from "../Utils/apiUrl";

interface WishlistState {
  wishlist: WishlistItem[];
  addItem: (newItem: WishlistItem) => void;
  removeItem: (itemId: string) => void;
  clearWishlist: () => void;
  setWishlistData: (remoteWishlist: WishlistItem[]) => void;
  refreshWishlistStock: () => Promise<void>;
}

const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
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
      refreshWishlistStock: async () => {
        const wishlist = get().wishlist;
        try {
          const updatedWishlist = await Promise.all(
            wishlist.map(async (item) => {
              const response = await axios.get(`${apiUrl}/products/${item.id}`);
              const updatedProduct = response.data;

              return {
                ...item,
                inStock: updatedProduct.inStock,
              };
            })
          );

          set({ wishlist: updatedWishlist });
        } catch (error) {
          console.error("Failed to refresh wishlist stock", error);
        }
      },
    }),
    { name: "wishlist_info" }
  )
);

export default useWishlistStore;

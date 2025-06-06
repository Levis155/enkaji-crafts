import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "../types";

interface CartState {
  cart: CartItem[];
  addItem: (newItem: CartItem) => void;
  incrementItemQuantity: (itemId: string) => void;
  decrementItemQuantity: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalQuantity: () => number;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addItem: (newItem) => {
        set((state) => ({
          cart: [newItem, ...state.cart],
        }));
      },
      incrementItemQuantity: (itemId) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }));
      },
      decrementItemQuantity: (itemId) => {
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === itemId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        }));
      },
      removeItem: (itemId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
        }));
      },
      clearCart: () => {
        set({ cart: [] });
      },
      getTotalPrice: () => {
        const { cart } = get();
        return cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      getTotalQuantity: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    { name: "cart_info" }
  )
);

export default useCartStore;

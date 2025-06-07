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
  mergeCart: (itemsFromBackend: any[]) => void;
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
      mergeCart: (itemsFromBackend) => {
        set((state) => {
          const existingIds = new Set(state.cart.map((item) => item.id));
          const newItems: CartItem[] = itemsFromBackend
            .filter((item) => !existingIds.has(item.productId))
            .map((item) => ({
              id: item.productId, 
              name: item.name,
              price: item.price,
              originalPrice: item.originalPrice,
              image: item.image,
              inStock: item.inStock,
              quantity: item.quantity,
            }));

          return {
            cart: [...state.cart, ...newItems],
          };
        });
      },
    }),
    { name: "cart_info" }
  )
);

export default useCartStore;

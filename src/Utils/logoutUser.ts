import axiosInstance from "./axiosInstance";
import useUserStore from "../stores/userStore";
import useCartStore from "../stores/cartStore";
import useWishlistStore from "../stores/wishlistStore";
import { toast } from "react-toastify";

const logoutUser = async (navigate?: (path: string) => void) => {
  const removeUserInfo = useUserStore.getState().removeUserInfo;
  const clearCart = useCartStore.getState().clearCart;
  const clearWishlist = useWishlistStore.getState().clearWishlist;
  const cart = useCartStore.getState().cart;
  const wishlist = useWishlistStore.getState().wishlist;

  try {
    await Promise.all([
      axiosInstance.post(`/cart/items`, { cart }),
      axiosInstance.post(`/wishlist/items`, { wishlist }),
      axiosInstance.post(`/auth/logout`, {}),
    ]);

    toast.success("Logged out successfully.");
  } catch (error) {
    console.error("Logout error", error);
    toast.error("Logout failed.");
  } finally {
    clearCart();
    clearWishlist();
    removeUserInfo();
    if (navigate) navigate("/");
  }
};

export default logoutUser;

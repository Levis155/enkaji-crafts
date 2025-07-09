import { Link } from "react-router-dom";
import useWishlistStore from "../stores/wishlistStore";
import useCartStore from "../stores/cartStore";
import useBrowseProducts from "../hooks/useBrowseProducts";
import "../styles/WishlistPage.css";

const WishlistPage = () => {
  const wishlistItems = useWishlistStore((state) => state.wishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);
  const addToCart = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.cart);
  const handleShopNow = useBrowseProducts();

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page empty-wishlist">
        <h1>My Wishlist</h1>
        <div className="empty-state">
          <p>Your wishlist is empty.</p>
          <button className="shop-now-btn" onClick={handleShopNow}>
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h1 className="wishlist-page-title">
        {" "}
        {wishlistItems.length > 0
          ? `My Wishlist (${wishlistItems.length})`
          : `My Wishlist`}
      </h1>
      <div className="wishlist-items">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className={`wishlist-item ${!item.inStock ? "out-of-stock" : ""}`}
          >
            <div className="item-image">
              <Link to={`/product/${item.id}`} className="item-image-wrapper">
                <img src={item.image} alt={item.name} />
              </Link>
              {!item.inStock && (
                <div className="out-of-stock-overlay">Out of Stock</div>
              )}
            </div>

            <div className="item-details">
              <Link to={`/product/${item.id}`}>
                <h3 className="item-name">{item.name}</h3>
              </Link>

              <div className="wishlist-item-price">
                <span className="wishlist-current-price">Ksh {item.price}</span>
                <span className="wishlist-original-price">
                  Ksh {item.originalPrice}
                </span>
                <span className="wishlist-discount-tag">
                  -{Math.round(100 - (item.price / item.originalPrice) * 100)}%
                </span>
              </div>

              <div className="item-stock-status">
                <span className={item.inStock ? "in-stock" : "out-of-stock"}>
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            <div className="item-actions">
              {!cartItems.some((cartItem) => cartItem.id === item.id) && (
                <button
                  className="move-to-cart"
                  onClick={() => {
                    const newCartItem = {
                      id: item.id,
                      name: item.name,
                      image: item.image,
                      price: item.price,
                      originalPrice: item.originalPrice,
                      inStock: item.inStock,
                      quantity: 1,
                    };

                    addToCart(newCartItem);
                  }}
                  disabled={!item.inStock}
                >
                  Add to Cart
                </button>
              )}
              <button
                className="remove-from-wishlist"
                onClick={() => removeFromWishlist(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;

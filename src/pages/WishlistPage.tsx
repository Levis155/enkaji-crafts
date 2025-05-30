import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import "../styles/WishlistPage.css";

const WishlistPage = () => {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  const handleMoveToCart = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      addItem({
        ...item,
        quantity: 1,
      });
      removeItem(id);
    }
  };

  if (items.length === 0) {
    return (
      <div className="wishlist-page empty-wishlist">
        <h1>My Wishlist</h1>
        <div className="empty-state">
          <p>Your wishlist is empty.</p>
          <Link to="/" className="shop-now-btn">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h1>My Wishlist ({items.length})</h1>
      <div className="wishlist-items">
        {items.map((item) => (
          <div
            key={item.id}
            className={`wishlist-item ${!item.inStock ? "out-of-stock" : ""}`}
          >
            <div className="item-image">
              <div className="item-image-wrapper">
                <Link to={`/product/${item.id}`}>
                  <img src={item.image} alt={item.name} />
                </Link>
                {!item.inStock && (
                  <div className="out-of-stock-overlay">Out of Stock</div>
                )}
              </div>
            </div>

            <div className="item-details">
              <Link to={`/product/${item.id}`}>
                <h3 className="item-name">{item.name}</h3>
              </Link>

              <div className="wishlist-item-price">
                <span className="wishlist-current-price">
                  Ksh {item.price.toLocaleString()}
                </span>
                <span className="wishlist-original-price">
                  Ksh {item.originalPrice.toLocaleString()}
                </span>
                <span className="wishlist-discount-tag">-{item.discount}%</span>
              </div>

              <div className="item-stock-status">
                <span className={item.inStock ? "in-stock" : "out-of-stock"}>
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            <div className="item-actions">
              <button
                className="move-to-cart"
                onClick={() => handleMoveToCart(item.id)}
                disabled={!item.inStock}
              >
                Move to Cart
              </button>
              <button
                className="remove-from-wishlist"
                onClick={() => removeItem(item.id)}
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

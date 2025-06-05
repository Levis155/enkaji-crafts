import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "../styles/ProductCard.css";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  rating: number;
  inStock: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  discount,
  image,
  rating,
  inStock,
}: ProductCardProps) => {
  const { items, addItem, updateQuantity } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [cartQuantity, setCartQuantity] = useState(0);

  // Check if product is already in cart and set initial state
  useEffect(() => {
    const cartItem = items.find((item) => item.id === id);
    if (cartItem) {
      setCartQuantity(cartItem.quantity);
    } else {
      setCartQuantity(0);
    }
  }, [items, id]);

  const handleAddToCart = () => {
    if (!inStock) return;

    addItem({
      id,
      name,
      price,
      originalPrice,
      discount,
      image,
      quantity,
      inStock,
    });

    setQuantity(1);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(id)) {
      removeItem(id);
    } else {
      addToWishlist({
        id,
        name,
        price,
        originalPrice,
        discount,
        image,
        inStock,
      });
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      updateQuantity(id, 0);
      setCartQuantity(0);
    } else {
      updateQuantity(id, newQuantity);
      setCartQuantity(newQuantity);
    }
  };

  const incrementQuantity = () => {
    handleQuantityChange(cartQuantity + 1);
  };

  const decrementQuantity = () => {
    handleQuantityChange(cartQuantity - 1);
  };

  return (
    <div className={`product-card ${!inStock ? "out-of-stock" : ""}`}>
      <Link to={`/product/${id}`} className="product-card-image">
        <img src={image} alt={name} />

        <div
          className="product-card-wishlist-button"
          onClick={handleWishlistToggle}
          aria-label={
            isInWishlist(id) ? "Remove from wishlist" : "Add to wishlist"
          }
        >
          {isInWishlist(id) ? <FaHeart /> : <FaRegHeart />}
        </div>

        {!inStock && <div className="out-of-stock-label">Out of Stock</div>}
      </Link>

      <div className="product-card-content">
        <Link to={`/product/${id}`}>
          <h3 className="product-card-product-name">{name}</h3>
        </Link>

        <div className="product-card-product-price">
          <span className="current-price-of-product">
            Ksh {price.toLocaleString()}
          </span>
          <span className="product-card-original-price">
            Ksh {originalPrice.toLocaleString()}
          </span>
          <span className="product-card-discount-percentage">-{discount}%</span>
        </div>

        <div className="product-card-rating">
          <Rating
            name="read-only"
            value={rating}
            sx={{ fontSize: "1.3rem" }}
            readOnly
          />
        </div>

        <div className="product-manipulation">
          {cartQuantity > 0 ? (
            <div className="quantity-control">
              <button onClick={decrementQuantity} className="quantity-btn">
                -
              </button>
              <span className="quantity">{cartQuantity}</span>
              <button onClick={incrementQuantity} className="quantity-btn">
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="product-card-add-to-cart"
              disabled={!inStock}
            >
              {inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

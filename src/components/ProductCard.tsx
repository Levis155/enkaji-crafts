import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import useCartStore from "../stores/cartStore";
import useWishlistStore from "../stores/wishlistStore";
import useUserStore from "../stores/userStore";
import { ProductCardProps } from "../types";
import "../styles/ProductCard.css";


const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  averageRating,
  inStock,
  numberOfReviews,
}: ProductCardProps) => {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addItem);
  const incrementItemQuantity = useCartStore(
    (state) => state.incrementItemQuantity
  );
  const decrementItemQuantity = useCartStore(
    (state) => state.decrementItemQuantity
  );
  const wishlist = useWishlistStore((state) => state.wishlist);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);
  const user = useUserStore((state) => state.user);

  const cartItem = cart.find((item) => item.id === id);
  const cartQuantity = cartItem?.quantity ?? 0;
  const wishlistItem = wishlist.find((item) => item.id === id);

  const handleAddToCart = () => {
    const newCartItem = {
      id: id,
      name: name,
      image: image,
      price: price,
      originalPrice: originalPrice,
      inStock: inStock,
      quantity: 1,
    };

    addToCart(newCartItem);
  };

  const handleAddToWishlist = () => {
    const newWishlistItem = {
      id: id,
      name: name,
      image: image,
      price: price,
      originalPrice: originalPrice,
      inStock: inStock,
    };

    addToWishlist(newWishlistItem);
  };

  return (
    <div className={`product-card ${!inStock ? "out-of-stock" : ""}`}>
      <Link to={`/product/${id}`} className="product-card-image">
        <img src={image} alt={name} />
        <button
          className="product-card-wishlist-button"
          onClick={(e) => {
            e.preventDefault(); 
            e.stopPropagation(); 

            if (!user) {
              toast.info("You need to be signed in for this action.");
              return;
            }

            if (wishlistItem) {
              removeFromWishlist(id);
            } else {
              handleAddToWishlist();
            }
          }}
          aria-label={wishlistItem ? "Remove from wishlist" : "Add to wishlist"}
        >
          {wishlistItem ? <FaHeart /> : <FaRegHeart />}
        </button>
        {!inStock && <div className="out-of-stock-label">Out of Stock</div>}
      </Link>

      <div className="product-card-content">
        <Link to={`/product/${id}`}>
          <h3 className="product-card-product-name">{name}</h3>
        </Link>

        <div className="product-card-product-price">
          <span className="current-price-of-product">Ksh {price}</span>
          <span className="product-card-original-price">
            Ksh {originalPrice}
          </span>
          <span className="product-card-discount-percentage">
            -{Math.round(100 - (price / originalPrice) * 100)}%
          </span>
        </div>

        <div className="product-card-rating">
          <Rating
            name="read-only"
            value={averageRating}
            sx={{ fontSize: "1.3rem" }}
            readOnly
          />
          <span className="no-reviews-text">({numberOfReviews})</span>
        </div>

        <div className="product-manipulation">
          {cartQuantity > 0 ? (
            <div className="quantity-control">
              <button
                onClick={() => decrementItemQuantity(id)}
                className="quantity-btn"
              >
                -
              </button>
              <span className="quantity">{cartQuantity}</span>
              <button
                onClick={() => incrementItemQuantity(id)}
                className="quantity-btn"
              >
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

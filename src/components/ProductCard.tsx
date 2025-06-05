import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
// import { FaRegHeart, FaHeart } from "react-icons/fa";
import useCartStore from "../stores/cartStore";
import { Product } from "../types";
import "../styles/ProductCard.css";

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  inStock,
  discount,
}: Product) => {
  const cart = useCartStore(state => state.cart);
  const addItem = useCartStore(state => state.addItem);
  const incrementItemQuantity = useCartStore(state => state.incrementItemQuantity);
  const decrementItemQuantity = useCartStore(state => state.decrementItemQuantity);

  const cartItem = cart.find(item => item.id === id);
  const cartQuantity = cartItem?.quantity ?? 0;

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

    addItem(newCartItem);
  };

  const handleIncrementQuantity = () => {
    incrementItemQuantity(id);
  };

  const handleDecrementQuantity = () => {
    decrementItemQuantity(id);
  };

  return (
    <div className={`product-card ${!inStock ? "out-of-stock" : ""}`}>
      <Link to={`/product/${id}`} className="product-card-image">
        <img src={image} alt={name} />
        {!inStock && <div className="out-of-stock-label">Out of Stock</div>}
      </Link>

      <div className="product-card-content">
        <Link to={`/product/${id}`}>
          <h3 className="product-card-product-name">{name}</h3>
        </Link>

        <div className="product-card-product-price">
          <span className="current-price-of-product">Ksh {price}</span>
          <span className="product-card-original-price">Ksh {originalPrice}</span>
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
              <button onClick={handleDecrementQuantity} className="quantity-btn">-</button>
              <span className="quantity">{cartQuantity}</span>
              <button onClick={handleIncrementQuantity} className="quantity-btn">+</button>
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

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDoubleLeft } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useCartStore from "../stores/cartStore";
import useUserStore from "../stores/userStore";
import "../styles/CartPage.css";

const CartPage = () => {
  const user = useUserStore((state) => state.user);
  const cart = useCartStore((state) => state.cart);
  const incrementItemQuantity = useCartStore(
    (state) => state.incrementItemQuantity
  );
  const decrementItemQuantity = useCartStore(
    (state) => state.decrementItemQuantity
  );
  const removeCartItem = useCartStore((state) => state.removeItem);
  const getCartTotal = useCartStore((state) => state.getTotalPrice);
  const getTotalCartQuantity = useCartStore((state) => state.getTotalQuantity);
  const navigate = useNavigate();
  const [shippingFee] = useState(120); // Default shipping fee

  const inStockItems = cart.filter((item) => item.inStock);
  const outOfStockItems = cart.filter((item) => !item.inStock);

  const handleCheckout = () => {
    if (inStockItems.length === 0) return;

    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div>
        <Header />
        <main className="container cart-page">
          <div className="empty-cart">
            <h1>Your Cart</h1>
            <p>Your cart is currently empty.</p>
            <div className="empty-cart-link-cont">
              <Link to="/" className="empty-cart-link">
                <FaAngleDoubleLeft /> Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="cart-page">
        <h1>Your Cart ({getTotalCartQuantity()})</h1>

        <div className="cart-container">
          <div className="cart-items">
            {inStockItems.length > 0 && (
              <div className="cart-section">
                {inStockItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <Link to={`/product/${item.id}`} className="item-image">
                      <img src={item.image} alt={item.name} />
                    </Link>

                    <div className="cart-item-details">
                      <Link
                        to={`/product/${item.id}`}
                        className="cart-item-name"
                      >
                        {item.name}
                      </Link>

                      <div className="cart-item-price-details">
                        <span className="cart-item-price">
                          Ksh {item.price}
                        </span>
                        <span className="cart-item-original-price">
                          Ksh {item.originalPrice}
                        </span>
                        <span className="cart-item-discount">
                          -
                          {Math.round(
                            100 - (item.price / item.originalPrice) * 100
                          )}
                          %
                        </span>
                      </div>
                    </div>

                    <div className="item-actions">
                      <div className="cart-page-quantity-control">
                        <button
                          onClick={() => decrementItemQuantity(item.id)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button onClick={() => incrementItemQuantity(item.id)}>
                          +
                        </button>
                      </div>

                      <button
                        className="remove-item"
                        onClick={() => removeCartItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="item-subtotal">
                      <span>Ksh {item.price * item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {outOfStockItems.length > 0 && (
              <div className="cart-section out-of-stock-section">
                <h2>Out of Stock Items</h2>
                {outOfStockItems.map((item) => (
                  <div key={item.id} className="cart-item out-of-stock">
                    <Link to={`/product/${item.id}`} className="item-image">
                      <img src={item.image} alt={item.name} />
                    </Link>
                    <div className="out-of-stock-label">Out of Stock</div>

                    <div className="item-details">
                      <Link
                        to={`/product/${item.id}`}
                        className="cart-item-name"
                      >
                        {item.name}
                      </Link>

                      <div className="cart-item-price-details">
                        <span className="cart-item-price">
                          Ksh {item.price}
                        </span>
                        <span className="cart-item-original-price">
                          Ksh {item.originalPrice}
                        </span>
                        <span className="cart-item-discount">
                          -
                          {Math.round(
                            100 - (item.price / item.originalPrice) * 100
                          )}
                          %
                        </span>
                      </div>
                    </div>

                    <div className="item-actions">
                      <button
                        className="remove-item"
                        onClick={() => removeCartItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="item-subtotal">
                      <span>Ksh {item.price * item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="cart-page-summary-row">
              <span>Subtotal</span>
              <span>Ksh {getCartTotal()}</span>
            </div>

            <div className="cart-page-summary-row">
              <span>Shipping Fee</span>
              <span>Ksh {shippingFee}</span>
            </div>

            <div className="cart-page-total">
              <span>Total</span>
              <span>Ksh {getCartTotal() + shippingFee}</span>
            </div>

            <button
              className="checkout-button"
              onClick={
                user
                  ? handleCheckout
                  : () => {
                      navigate("/login");
                    }
              }
              disabled={inStockItems.length === 0}
            >
              {user ? "Proceed to Checkout" : "Sign In to Checkout"}
            </button>

            <Link to="/" className="continue-shopping">
              <FaAngleDoubleLeft /> Continue Shopping
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;

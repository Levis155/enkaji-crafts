import { Link, useNavigate } from "react-router-dom";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useCartStore from "../stores/cartStore";
import useBrowseProducts from "../hooks/useBrowseProducts";
import useUserStore from "../stores/userStore";
import "../styles/CartPage.css";

const CartPage = () => {
  const user = useUserStore((state) => state.user);
  const cart = useCartStore((state) => state.cart);
  const outOfStockItems = cart.filter((item) => !item.inStock);
  const refreshCartStock = useCartStore((state) => state.refreshCartStock);
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
  const handleContinueShopping = useBrowseProducts();
  const shippingFee = user ? user.shippingCharge : 120;

  useEffect(() => {
    const onFocus = () => refreshCartStock();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div>
        <Header />
        <main className="container cart-page">
          <div className="empty-cart">
            <h1>My Cart</h1>
            <p>Your cart is currently empty.</p>
            <div className="empty-cart-link-cont">
              <button
                className="empty-cart-link"
                onClick={handleContinueShopping}
              >
                <FaAngleDoubleLeft /> Continue Shopping
              </button>
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
        <h1>My Cart ({getTotalCartQuantity()})</h1>

        <div className="cart-container">
          <div className="cart-items">
            {cart.length > 0 && (
              <div className="cart-section">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <Link to={`/product/${item.id}`} className="item-image">
                        <img src={item.image} alt={item.name} />
                        {!item.inStock && (
                          <div className="out-of-stock-overlay">
                            Out of Stock
                          </div>
                        )}
                      </Link>
                    </div>

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
              disabled={outOfStockItems.length > 0}
            >
              {user ? "Proceed to Checkout" : "Sign In to Checkout"}
            </button>

            <button
              className="continue-shopping"
              onClick={handleContinueShopping}
            >
              <FaAngleDoubleLeft /> Continue Shopping
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;

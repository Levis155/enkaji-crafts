import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/CartPage.css';

const CartPage = () => {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [shippingFee, setShippingFee] = useState(120); // Default shipping fee
  
  const inStockItems = items.filter(item => item.inStock);
  const outOfStockItems = items.filter(item => !item.inStock);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: number) => {
    removeItem(id);
  };

  const handleCheckout = () => {
    if (inStockItems.length === 0) return;
    
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div>
        <Header />
        <main className="container cart-page">
          <div className="empty-cart">
            <h1>Your Cart</h1>
            <p>Your cart is currently empty.</p>
            <Link to="/" className="continue-shopping">Continue Shopping</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="container cart-page">
        <h1>Your Cart</h1>
        
        <div className="cart-container">
          <div className="cart-items">
            {inStockItems.length > 0 && (
              <div className="cart-section">
                <h2>Available Items</h2>
                {inStockItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <Link to={`/product/${item.id}`}>
                        <img src={item.image} alt={item.name} />
                      </Link>
                    </div>
                    
                    <div className="item-details">
                      <Link to={`/product/${item.id}`} className="item-name">
                        {item.name}
                      </Link>
                      
                      {item.variation && (
                        <p className="item-variation">Variation: {item.variation}</p>
                      )}
                      
                      <div className="item-price-details">
                        <span className="item-price">Ksh {item.price.toLocaleString()}</span>
                        <span className="item-original-price">Ksh {item.originalPrice.toLocaleString()}</span>
                        <span className="item-discount">-{item.discount}%</span>
                      </div>
                    </div>
                    
                    <div className="item-actions">
                      <div className="quantity-control">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                          +
                        </button>
                      </div>
                      
                      <button 
                        className="remove-item" 
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div className="item-subtotal">
                      <span>Ksh {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {outOfStockItems.length > 0 && (
              <div className="cart-section out-of-stock-section">
                <h2>Out of Stock Items</h2>
                {outOfStockItems.map(item => (
                  <div key={item.id} className="cart-item out-of-stock">
                    <div className="item-image">
                      <Link to={`/product/${item.id}`}>
                        <img src={item.image} alt={item.name} />
                      </Link>
                      <div className="out-of-stock-label">Out of Stock</div>
                    </div>
                    
                    <div className="item-details">
                      <Link to={`/product/${item.id}`} className="item-name">
                        {item.name}
                      </Link>
                      
                      {item.variation && (
                        <p className="item-variation">Variation: {item.variation}</p>
                      )}
                      
                      <div className="item-price-details">
                        <span className="item-price">Ksh {item.price.toLocaleString()}</span>
                        <span className="item-original-price">Ksh {item.originalPrice.toLocaleString()}</span>
                        <span className="item-discount">-{item.discount}%</span>
                      </div>
                    </div>
                    
                    <div className="item-actions">
                      <button 
                        className="remove-item" 
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div className="item-subtotal">
                      <span>Ksh {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row subtotal">
              <span>Subtotal</span>
              <span>Ksh {totalPrice.toLocaleString()}</span>
            </div>
            
            <div className="summary-row shipping">
              <span>Shipping Fee</span>
              <span>Ksh {shippingFee.toLocaleString()}</span>
            </div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>Ksh {(totalPrice + shippingFee).toLocaleString()}</span>
            </div>
            
            <button 
              className="checkout-button"
              onClick={handleCheckout}
              disabled={inStockItems.length === 0}
            >
              {isAuthenticated 
                ? 'Proceed to Checkout' 
                : 'Sign In to Checkout'
              }
            </button>
            
            <div className="cart-actions">
              <Link to="/" className="continue-shopping">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
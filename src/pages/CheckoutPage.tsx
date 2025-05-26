import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/CheckoutPage.css';

const CheckoutPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [shippingFee] = useState(120); // Default shipping fee
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    county: user?.shippingAddress.county || 'Nairobi',
    town: user?.shippingAddress.town || 'CBD'
  });

  // Filter out of stock items
  const inStockItems = items.filter(item => item.inStock);

  if (!isAuthenticated) {
    navigate('/customer/account');
    return null;
  }

  if (inStockItems.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = () => {
    // In a real app, this would call an API to place the order
    setOrderPlaced(true);
    // Clear the cart
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div>
        <Header />
        <main className="container checkout-page">
          <div className="order-success">
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for your order. Your order has been placed successfully.</p>
            <p>We've sent a confirmation email to {user?.email}.</p>
            <button 
              onClick={() => navigate('/')}
              className="continue-shopping-btn"
            >
              Continue Shopping
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="container checkout-page">
        <h1>Checkout</h1>
        
        <div className="checkout-container">
          <div className="checkout-details">
            <section className="customer-info">
              <h2>Customer Information</h2>
              <div className="info-content">
                <div className="info-item">
                  <span className="info-label">Name:</span>
                  <span className="info-value">{user?.fullName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{user?.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone:</span>
                  <span className="info-value">{user?.phone}</span>
                </div>
              </div>
            </section>
            
            <section className="delivery-details">
              <div className="section-header">
                <h2>Delivery Details</h2>
              </div>
              
              <div className="shipping-address">
                <div className="subsection-header">
                  <h3>Shipping Address</h3>
                  {!isEditingAddress && (
                    <button 
                      className="edit-button"
                      onClick={() => setIsEditingAddress(true)}
                    >
                      Change
                    </button>
                  )}
                </div>
                
                {isEditingAddress ? (
                  <form className="address-form">
                    <div className="form-group">
                      <label htmlFor="county">County</label>
                      <input
                        type="text"
                        id="county"
                        name="county"
                        value={shippingAddress.county}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="town">Town/City</label>
                      <input
                        type="text"
                        id="town"
                        name="town"
                        value={shippingAddress.town}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                    
                    <div className="form-actions">
                      <button 
                        type="button" 
                        className="save-button"
                        onClick={() => setIsEditingAddress(false)}
                      >
                        Save Address
                      </button>
                      <button 
                        type="button" 
                        className="cancel-button"
                        onClick={() => {
                          setIsEditingAddress(false);
                          setShippingAddress({
                            county: user?.shippingAddress.county || 'Nairobi',
                            town: user?.shippingAddress.town || 'CBD'
                          });
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="address-display">
                    <p>{shippingAddress.county}, {shippingAddress.town}</p>
                  </div>
                )}
              </div>
              
              <div className="shipment">
                <div className="subsection-header">
                  <h3>Shipment</h3>
                  <button 
                    className="edit-button"
                    onClick={() => navigate('/cart')}
                  >
                    Modify Cart
                  </button>
                </div>
                
                <div className="shipment-items">
                  {inStockItems.map(item => (
                    <div key={item.id} className="shipment-item">
                      <div className="item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="item-details">
                        <h4 className="item-name">{item.name}</h4>
                        {item.variation && (
                          <p className="item-variation">Variation: {item.variation}</p>
                        )}
                        <div className="item-meta">
                          <span className="item-price">Ksh {item.price.toLocaleString()}</span>
                          <span className="item-quantity">Qty: {item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
          
          <div className="order-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row items-total">
              <span>Item(s) Total</span>
              <span>Ksh {totalPrice.toLocaleString()}</span>
            </div>
            
            <div className="summary-row delivery-fee">
              <span>Delivery Fee</span>
              <span>Ksh {shippingFee.toLocaleString()}</span>
            </div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>Ksh {(totalPrice + shippingFee).toLocaleString()}</span>
            </div>
            
            <button 
              className="place-order-button"
              onClick={handlePlaceOrder}
              disabled={isEditingAddress}
            >
              Place Order
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
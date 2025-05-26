import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getOrdersByUserId } from '../data/orders';
import { Order } from '../types';
import '../styles/OrdersPage.css';

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      const userOrders = getOrdersByUserId(user.id);
      setOrders(userOrders);
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="orders-page empty-orders">
        <h1>My Orders</h1>
        <div className="empty-state">
          <p>You haven't placed any orders yet.</p>
          <Link to="/" className="shop-now-btn">Shop Now</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1>My Orders</h1>
      
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <div className="order-meta">
                  <span className="order-date">Order placed: {order.date}</span>
                  <span className="order-number">Order #{order.id}</span>
                </div>
                <div className={`order-status ${order.status}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
              </div>
              <div className="order-shipping">
                <span className="shipping-address">
                  Ship to: {order.shippingAddress.county}, {order.shippingAddress.town}
                </span>
              </div>
            </div>
            
            <div className="order-products">
              {order.products.map((product, index) => (
                <div key={index} className="order-product">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-details">
                    <h3 className="product-name">{product.name}</h3>
                    {product.variation && (
                      <p className="product-variation">Variation: {product.variation}</p>
                    )}
                    <div className="product-price-qty">
                      <span className="product-price">Ksh {product.price.toLocaleString()}</span>
                      <span className="product-quantity">Qty: {product.quantity}</span>
                    </div>
                  </div>
                  
                  {order.status === 'delivered' && (
                    <div className="product-actions">
                      <Link to="#" className="write-review-btn">Write a Review</Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="order-footer">
              <div className="order-totals">
                <div className="subtotal">
                  <span>Subtotal:</span>
                  <span>Ksh {order.total.toLocaleString()}</span>
                </div>
                <div className="shipping-fee">
                  <span>Shipping:</span>
                  <span>Ksh {order.shippingFee.toLocaleString()}</span>
                </div>
                <div className="order-total">
                  <span>Total:</span>
                  <span>Ksh {(order.total + order.shippingFee).toLocaleString()}</span>
                </div>
              </div>
              
              {order.status === 'processing' || order.status === 'pending' ? (
                <button className="track-order-btn">Track Order</button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
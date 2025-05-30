import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineRateReview } from "react-icons/md";
import { TextField, Rating } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { getOrdersByUserId } from "../data/orders";
import { Order } from "../types";
import "../styles/OrdersPage.css";
import formControlStyle from "../styles/formControlStyles";

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [ratingValue, SetRatingValue] = React.useState<number | null>(0);

  useEffect(() => {
    if (user) {
      const userOrders = getOrdersByUserId(user.id);
      setOrders(userOrders);
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReviewing(false);
  };

  if (orders.length === 0) {
    return (
      <div className="orders-page empty-orders">
        <h1>My Orders</h1>
        <div className="empty-state">
          <p>You haven't placed any orders yet.</p>
          <Link to="/" className="shop-now-btn">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  if (isReviewing) {
    return (
      <form className="rate-and-review-form" action="">
        <p className="rate-and-review-form-title">rate & review</p>

        <div className="rate-and-review-form-body">
          <div className="rate-container">
            <p className="rate-container-title">
              select the stars to rate the product
            </p>

            <div className="rate-container-card">
              <div className="rate-container-card-col1">
                <div className="rate-container-card-img">
                  <img src={selectedProduct.image} alt="" />
                </div>
              </div>

              <div className="rate-container-card-col2">
                <p className="rate-container-card-product-headline">
                  {selectedProduct.name}
                </p>
                <Rating
                  name="simple-controlled"
                  value={ratingValue}
                  onChange={(_, newValue) => {
                    SetRatingValue(newValue);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="review-container">
            <p className="review-container-title">leave a review</p>

            <div className="review-container-body">
              <div className="text-field-container">
                <TextField
                  id="outlined-basic-1"
                  label="Review Title"
                  variant="outlined"
                  sx={formControlStyle}
                />

                <TextField
                  id="outlined-basic-1"
                  label="Your Name"
                  variant="outlined"
                  sx={formControlStyle}
                />
              </div>

              <div className="text-area-container">
                <TextField
                  id="outlined-multiline-static"
                  label="Detailed Review"
                  multiline
                  rows={7}
                  // defaultValue="Default Value"
                  sx={formControlStyle}
                />
              </div>
            </div>
          </div>
          <button className="submit-review-btn" onClick={handleSubmitReview}>
            submit you review
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="orders-page">
      <h1>My Orders ({orders.length})</h1>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <div className="order-meta">
                  <span className="order-number">Order #{order.id}</span>
                  <span className="order-date">Order placed: {order.date}</span>
                </div>
                <div className={`order-status ${order.status}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
              </div>
              <div className="order-ship-to">
                <span className="order-ship-to-add">
                  Ship to: {order.shippingAddress.county},{" "}
                  {order.shippingAddress.town}
                </span>
              </div>
            </div>

            <div className="order-products">
              {order.products.map((product, index) => (
                <div key={index} className="order-product">
                  <div className="order-product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="order-product-details">
                    <h3 className="order-product-name">{product.name}</h3>
                    {product.variation && (
                      <p className="order-product-variation">
                        Variation: {product.variation}
                      </p>
                    )}
                    <div className="order-product-price-qty">
                      <span className="order-product-price">
                        Ksh {product.price.toLocaleString()}
                      </span>
                      <span className="order-product-quantity">
                        Qty: {product.quantity}
                      </span>
                    </div>
                  </div>

                  {order.status === "delivered" && (
                    <div className="order-product-actions">
                      <button
                        onClick={() => {
                          setIsReviewing(true);
                          setSelectedProduct(product);
                        }}
                        className="review-product-btn"
                      >
                        <MdOutlineRateReview /> Review product
                      </button>
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
                  <span>
                    Ksh {(order.total + order.shippingFee).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;

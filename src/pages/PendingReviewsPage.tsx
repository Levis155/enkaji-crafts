import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPendingReviewOrders } from '../data/orders';
import { Order } from '../types';
import '../styles/PendingReviewsPage.css';

const PendingReviewsPage = () => {
  const { user } = useAuth();
  const [pendingReviews, setPendingReviews] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      const ordersToReview = getPendingReviewOrders(user.id);
      setPendingReviews(ordersToReview);
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (pendingReviews.length === 0) {
    return (
      <div className="pending-reviews-page empty-reviews">
        <h1>Pending Reviews</h1>
        <div className="empty-state">
          <p>You don't have any products to review at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pending-reviews-page">
      <h1>Pending Reviews</h1>
      <p className="subtitle">Share your experience with these products you've purchased</p>
      
      <div className="pending-reviews-list">
        {pendingReviews.flatMap(order => 
          order.products.map((product, index) => (
            <div key={`${order.id}-${index}`} className="review-item">
              <div className="product-info">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  {product.variation && (
                    <p className="product-variation">Variation: {product.variation}</p>
                  )}
                  <p className="order-info">
                    Ordered on {order.date} | Order #{order.id}
                  </p>
                </div>
              </div>
              <div className="review-actions">
                <Link to={`/product/${product.id}`} className="view-product">View Product</Link>
                <button className="write-review-btn">Write a Review</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PendingReviewsPage;
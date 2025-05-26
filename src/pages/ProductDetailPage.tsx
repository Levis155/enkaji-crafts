import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getProductById, getRelatedProducts } from '../data/products';
import { getReviewsByProductId } from '../data/reviews';
import { Product, Review } from '../types';
import '../styles/ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { addItem } = useCart();
  const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist();
  
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [selectedVariation, setSelectedVariation] = useState<number | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    if (id) {
      const productId = parseInt(id);
      const foundProduct = getProductById(productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Set default variation if available
        if (foundProduct.variations && foundProduct.variations.length > 0) {
          setSelectedVariation(foundProduct.variations[0].id);
        }
        
        // Get product reviews
        const productReviews = getReviewsByProductId(productId);
        setReviews(productReviews);
        
        // Get related products
        const related = getRelatedProducts(productId, 4);
        setRelatedProducts(related);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div>
        <Header />
        <div className="container loading-container">
          <p>Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    const variationName = selectedVariation && product.variations 
      ? product.variations.find(v => v.id === selectedVariation)?.name 
      : undefined;
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      image: selectedVariation && product.variations 
        ? product.variations.find(v => v.id === selectedVariation)?.image || product.image
        : product.image,
      quantity,
      variation: variationName,
      inStock: product.inStock
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount,
        image: product.image,
        inStock: product.inStock
      });
    }
  };

  const selectedVariationImage = selectedVariation && product.variations
    ? product.variations.find(v => v.id === selectedVariation)?.image
    : product.image;

  return (
    <div className="product-detail-page">
      <Header />
      <main className="container">
        <div className="product-detail">
          <div className="product-detail-left">
            <div className="product-main-image">
              <img 
                src={selectedVariationImage} 
                alt={product.name} 
              />
              {!product.inStock && (
                <div className="out-of-stock-overlay">Out of Stock</div>
              )}
            </div>
            
            {product.variations && product.variations.length > 0 && (
              <div className="product-variations">
                {product.variations.map(variation => (
                  <div 
                    key={variation.id}
                    className={`variation-item ${selectedVariation === variation.id ? 'active' : ''}`}
                    onClick={() => setSelectedVariation(variation.id)}
                  >
                    <img src={variation.image} alt={variation.name} />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="product-detail-right">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-pricing">
              <div className="price-info">
                <span className="current-price">Ksh {product.price.toLocaleString()}</span>
                <span className="original-price">Ksh {product.originalPrice.toLocaleString()}</span>
                <span className="discount-tag">-{product.discount}%</span>
              </div>
              
              <div className="product-rating">
                <div className="stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span 
                      key={index} 
                      className={`star ${index < Math.floor(product.rating) ? 'filled' : ''}`}
                    >
                      {index < Math.floor(product.rating) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <span className="rating-count">({product.totalRatings} ratings)</span>
              </div>
            </div>
            
            {user && (
              <div className="shipping-info">
                <span className="shipping-cost">
                  Ksh 120 shipping to {user.shippingAddress.county}, {user.shippingAddress.town}
                </span>
              </div>
            )}
            
            <div className="stock-status">
              <span className={product.inStock ? 'in-stock' : 'out-of-stock'}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            {product.variations && product.variations.length > 0 && (
              <div className="variations-selection">
                <h3>Variations:</h3>
                <div className="variation-options">
                  {product.variations.map(variation => (
                    <button
                      key={variation.id}
                      className={`variation-button ${selectedVariation === variation.id ? 'active' : ''}`}
                      onClick={() => setSelectedVariation(variation.id)}
                    >
                      {variation.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="product-actions">
              <div className="quantity-selector">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  disabled={!product.inStock}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  disabled={!product.inStock}
                >
                  +
                </button>
              </div>
              
              <button 
                className="add-to-cart-button"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <button 
                className={`wishlist-button ${isInWishlist(product.id) ? 'active' : ''}`}
                onClick={handleWishlistToggle}
              >
                {isInWishlist(product.id) ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="product-info-tabs">
          <div className="product-description">
            <h2>Product Details</h2>
            <p>{product.description}</p>
          </div>
          
          <div className="product-specifications">
            <h2>Specifications</h2>
            <ul>
              {Object.entries(product.specifications).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
            
            <h3>What's in the Package:</h3>
            <ul className="package-contents">
              {product.inPackage.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="product-reviews">
          <h2>Customer Reviews</h2>
          
          {reviews.length === 0 ? (
            <div className="no-reviews">
              <p>This product doesn't have any reviews yet.</p>
            </div>
          ) : (
            <div className="reviews-container">
              <div className="reviews-summary">
                <div className="average-rating">
                  <span className="rating-number">{product.rating.toFixed(1)}</span>
                  <div className="rating-stars">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={index} className={`star ${index < Math.floor(product.rating) ? 'filled' : ''}`}>
                        {index < Math.floor(product.rating) ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <span className="total-ratings">Based on {product.totalRatings} ratings</span>
                </div>
              </div>
              
              <div className="review-list">
                {reviews.map(review => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <h3 className="review-title">{review.title}</h3>
                      <div className="review-rating">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span key={index} className={`star ${index < review.rating ? 'filled' : ''}`}>
                            {index < review.rating ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <p className="review-text">{review.text}</p>
                    
                    <div className="review-footer">
                      <span className="reviewer-name">
                        {review.isVerified && <span className="verified-badge">✓ Verified Purchase</span>}
                        {review.userName}
                      </span>
                      <span className="review-date">{review.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>You May Also Like</h2>
            <div className="product-grid">
              {relatedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  image={product.image}
                  rating={product.rating}
                  inStock={product.inStock}
                />
              ))}
            </div>
          </div>
        )}
        
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-content">
            <div className="summary-details">
              <p><strong>Ship to:</strong> {user ? `${user.shippingAddress.county}, ${user.shippingAddress.town}` : 'Nairobi CBD'}</p>
              <p><strong>Shipping Fee:</strong> Ksh 120</p>
              <div className="summary-price">
                <span className="product-price">Ksh {product.price.toLocaleString()}</span>
                <span className="quantity">x {quantity}</span>
                <span className="total-price">Ksh {(product.price * quantity).toLocaleString()}</span>
              </div>
            </div>
            
            <div className="summary-actions">
              <button 
                className="add-to-cart-button"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <button 
                className={`wishlist-button ${isInWishlist(product.id) ? 'active' : ''}`}
                onClick={handleWishlistToggle}
              >
                {isInWishlist(product.id) ? '❤️ Remove from Wishlist' : '🤍 Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
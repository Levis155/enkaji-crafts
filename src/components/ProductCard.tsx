import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import '../styles/ProductCard.css';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  rating: number;
  inStock: boolean;
}

const ProductCard = ({ id, name, price, originalPrice, discount, image, rating, inStock }: ProductCardProps) => {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [showQuantityControl, setShowQuantityControl] = useState(false);

  const handleAddToCart = () => {
    if (!inStock) return;
    
    if (!showQuantityControl) {
      setShowQuantityControl(true);
      return;
    }
    
    addItem({
      id,
      name,
      price,
      originalPrice,
      discount,
      image,
      quantity,
      inStock
    });
    
    // Reset state after adding to cart
    setQuantity(1);
    setShowQuantityControl(false);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(id)) {
      removeItem(id);
    } else {
      addToWishlist({
        id,
        name,
        price,
        originalPrice,
        discount,
        image,
        inStock
      });
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i - 0.5 <= rating) {
        stars.push(<span key={i} className="star half-filled">★</span>);
      } else {
        stars.push(<span key={i} className="star">☆</span>);
      }
    }
    return stars;
  };

  return (
    <div className={`product-card ${!inStock ? 'out-of-stock' : ''}`}>
      <div className="product-card-image">
        <Link to={`/product/${id}`}>
          <img src={image} alt={name} />
        </Link>
        
        <button 
          className={`wishlist-button ${isInWishlist(id) ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          aria-label={isInWishlist(id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist(id) ? '❤️' : '🤍'}
        </button>
        
        {!inStock && (
          <div className="out-of-stock-label">Out of Stock</div>
        )}
      </div>
      
      <div className="product-card-content">
        <Link to={`/product/${id}`}>
          <h3 className="product-name">{name}</h3>
        </Link>
        
        <div className="product-price">
          <span className="current-price">Ksh {price.toLocaleString()}</span>
          <span className="original-price">Ksh {originalPrice.toLocaleString()}</span>
          <span className="discount-percentage">-{discount}%</span>
        </div>
        
        <div className="product-rating">
          {renderStars(rating)}
        </div>
        
        <div className="product-actions">
          {showQuantityControl ? (
            <div className="quantity-control">
              <button onClick={decrementQuantity} className="quantity-btn">-</button>
              <span className="quantity">{quantity}</span>
              <button onClick={incrementQuantity} className="quantity-btn">+</button>
            </div>
          ) : (
            <button 
              onClick={handleAddToCart} 
              className="add-to-cart-btn"
              disabled={!inStock}
            >
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          )}
          
          {showQuantityControl && (
            <button 
              className="add-to-cart-btn confirm" 
              onClick={handleAddToCart}
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
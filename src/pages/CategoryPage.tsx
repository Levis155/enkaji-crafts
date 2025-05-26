import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { getProductsByCategory, searchProducts, products } from '../data/products';
import { Product } from '../types';
import '../styles/CategoryPage.css';

const CategoryPage = () => {
  const { category, query } = useParams<{ category?: string, query?: string }>();
  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    
    // Determine whether we're showing category results or search results
    let filteredProducts: Product[] = [];
    
    if (query) {
      // Search results
      filteredProducts = searchProducts(query);
    } else if (category) {
      // Category results
      filteredProducts = getProductsByCategory(category);
    } else {
      // Fallback to all products
      filteredProducts = products;
    }
    
    setProductList(filteredProducts);
    setIsLoading(false);
  }, [category, query]);

  const sortProducts = (sortOption: string) => {
    setSortBy(sortOption);
    
    // Create a copy to avoid modifying the original array
    const sortedProducts = [...productList];
    
    switch (sortOption) {
      case 'price-asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // In a real app, you would sort by date
        // For this demo, we'll just reverse the array to simulate "newest" products
        sortedProducts.reverse();
        break;
      default:
        break;
    }
    
    setProductList(sortedProducts);
  };

  const getPageTitle = () => {
    if (query) {
      return `Products from your search: "${query}"`;
    } else if (category) {
      // Capitalize category name
      return category.charAt(0).toUpperCase() + category.slice(1);
    }
    return 'All Products';
  };

  return (
    <div className="category-page">
      <Header />
      <main className="container">
        <div className="category-header">
          <h1>{getPageTitle()}</h1>
          <div className="filter-sort">
            <select 
              value={sortBy} 
              onChange={(e) => sortProducts(e.target.value)}
              className="sort-select"
            >
              <option value="">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Top Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="loading">Loading products...</div>
        ) : productList.length === 0 ? (
          <div className="no-results">
            <p>No products found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="products-grid">
            {productList.map(product => (
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
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
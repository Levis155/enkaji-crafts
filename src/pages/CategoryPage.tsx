import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";
import apiUrl from "../Utils/apiUrl";
import "../styles/CategoryPage.css";

const fetchProducts = async (
  category?: string,
  query?: string
): Promise<Product[]> => {
  if (query) {
    const { data } = await axios.get(`${apiUrl}/products/search/${query}`);
    return data;
  } else if (category) {
    const { data } = await axios.get(`${apiUrl}/products/category/${category}`);
    return data;
  } else {
    const { data } = await axios.get(`${apiUrl}/products`); // fallback if needed
    return data;
  }
};

const CategoryPage = () => {
  const { category, query } = useParams<{
    category?: string;
    query?: string;
  }>();
  const [sortBy, setSortBy] = useState<string>("");
  const [fetchError, setFetchError] = useState<string | null>(null);

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", { category, query }],
    queryFn: () => fetchProducts(category, query),
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

  useEffect(() => {
    if (isError) {
      if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data.message;
        setFetchError(serverMessage);
      } else {
        setFetchError("Something went wrong.");
      }
    }
  }, [error]);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        sorted.sort((a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0));
        break;
      case "newest":
        sorted.reverse();
        break;
      default:
        break;
    }
    return sorted;
  }, [products, sortBy]);

  const getPageTitle = () => {
    if (query) {
      return `Search Results for "${query}"`;
    } else if (category) {
      return category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return "All Products";
  };

  return (
    <>
      <Header />
      <div className="category-page">
        <section className="category-page-container">
          <div className="category-header">
            <h1>{getPageTitle()}</h1>
            <div className="filter-sort">
              <label htmlFor="sort-select">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="category-page-loading">
              <PulseLoader size={15} color="#e61919" />
            </div>
          ) : fetchError ? (
            <div className="category-page-error">
               <p>{fetchError}</p>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="category-page-no-results">
              <p>No products found matching your criteria.</p>
              <p
                style={{
                  fontSize: "1.4rem",
                  marginTop: "10px",
                  opacity: "0.8",
                }}
              >
                Try adjusting your search or browse our other categories.
              </p>
            </div>
          ) : (
            <>
              <div className="products-count">
                Showing {sortedProducts.length} product
                {sortedProducts.length !== 1 ? "s" : ""}
              </div>
              <div className="products-grid">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";
import apiUrl from "../Utils/apiUrl";
import { FaHandHoldingHeart, FaBriefcase } from "react-icons/fa";
import { FaEarthAfrica } from "react-icons/fa6";
import { PulseLoader } from "react-spinners";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";
import "../styles/HomePage.css";
import { useState } from "react";

const HomePage = () => {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const productsPerPage = 8;

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["fetch-all-products"],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/products`);
      console.log(response.data);
      return response.data;
    },
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

  // Calculate pagination data
  const totalProducts = data ? data.length : 0;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = data ? data.slice(startIndex, endIndex) : [];

  const handlePrevious = () => {
    setCurrentPage(prev => prev > 0 ? prev - 1 : 0);
  };

  const handleNext = () => {
    setCurrentPage(prev => prev < totalPages - 1 ? prev + 1 : prev);
  };

  return (
    <div className="home-page">
      <Header />
      <main>
        <Hero />

        <section id="featured-products" className="featured-products">
          <div className="container">
            <h2 className="section-title">crafts collection</h2>

            {isLoading && (
              <div className="products-loader-container">
                {" "}
                <PulseLoader size={15} color="#e61919" />{" "}
              </div>
            )}

            {fetchError && (
              <div className="products-error-container">{fetchError}</div>
            )}

            {data && (
              <>
                <div className="product-grid">
                  {currentProducts.map((product: Product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      discount={Math.round(
                        100 - (product.price / product.originalPrice) * 100
                      )}
                      image={product.image}
                      rating={4}
                      inStock={product.inStock}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="pagination-container">
                    <div className="pagination-info">
                      <span>
                        Page {currentPage + 1} of {totalPages}
                      </span>
                    </div>
                    <div className="pagination-controls">
                      <button 
                        className="pagination-btn prev-btn" 
                        onClick={handlePrevious}
                        disabled={currentPage === 0}
                      >
                        ← Previous
                      </button>
                      <button 
                        className="pagination-btn next-btn" 
                        onClick={handleNext}
                        disabled={currentPage === totalPages - 1}
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <section id="about-enkaji" className="about-enkaji">  
          <div className="container">
            <div className="about-hero">
              <h2 className="about-title">Welcome to Enkaji Crafts</h2>
              <p className="about-subtitle">Where Heritage Finds a Home</p>
            </div>

            <div className="about-content">
              <div className="about-text">
                <div className="intro-text">
                  <p className="meaning">
                    "Enkaji" means home in Maa, the language of the Maasai
                    people. At Enkaji Crafts, we bring the spirit of the Maasai
                    home to you through authentic, handmade treasures rooted in
                    tradition and crafted with purpose.
                  </p>

                  <p>
                    Our store is a celebration of Maasai culture, artistry, and
                    identity. We offer a curated selection of traditional tools,
                    attire, jewelry, and home accents — each one a reflection of
                    the Maasai's deep connection to community, craftsmanship,
                    and nature.
                  </p>
                </div>

                <div className="mission-section">
                  <h3>
                    But Enkaji Crafts is more than just a shop. It's a
                    mission-driven platform:
                  </h3>

                  <div className="mission-points">
                    <div className="mission-point">
                      <div className="mission-icon-cont">
                        <FaHandHoldingHeart className="mission-icon" />
                      </div>
                      <div className="mission-text">
                        <strong>To honor Maasai artisans</strong> by sharing
                        their stories and preserving generations of skill passed
                        down through hands, not machines.
                      </div>
                    </div>

                    <div className="mission-point">
                      <div className="mission-icon-cont">
                        <FaEarthAfrica className="mission-icon" />
                      </div>
                      <div className="mission-text">
                        <strong>To connect cultures,</strong> allowing people
                        from around the world to experience the richness,
                        resilience, and beauty of Maasai life.
                      </div>
                    </div>

                    <div className="mission-point">
                      <div className="mission-icon-cont">
                        <FaBriefcase className="mission-icon" />
                      </div>
                      <div className="mission-text">
                        <strong>To support livelihoods</strong> by providing
                        sustainable income for local creators and empowering
                        communities, especially women, who are the backbone of
                        many of these crafts.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="closing-message">
                  <p>
                    When you buy from Enkaji Crafts, you're not just purchasing
                    a product — you're welcoming a piece of Africa's heritage
                    into your home. Every bead, stitch, and carving carries
                    meaning, memory, and pride.
                  </p>

                  <div className="enkaji-tagline">
                    <p>
                      <strong>Enkaji is home.</strong>
                    </p>
                    <p>
                      <strong>And we invite you to make it yours.</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="about-image">
                <img
                  src="https://public.youware.com/users-website-assets/prod/f5306d2d-82ec-481b-9bc1-074696dfb3b3/g8bc283a7d165aa85ee45cc3251d4ec7daca8eaa63c51ec0f5239d6cdc0c9adcb7f2681bb7fbd38b28a38c1f91f78927897f250443e4e137eb8f162898143b180_640.jpg"
                  alt="Traditional Maasai Beadwork"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
import { useState, useEffect } from "react";
import { FaHandHoldingHeart, FaBriefcase } from "react-icons/fa";
import { FaEarthAfrica } from "react-icons/fa6";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import "../styles/HomePage.css";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  
  // Calculate pagination
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);
  
  // Reset to page 1 if we navigate elsewhere and come back
  useEffect(() => {
    setCurrentPage(1);
  }, []);
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      // Scroll back to the top of the product section
      document.getElementById("featured-products")?.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      // Scroll back to the top of the product section
      document.getElementById("featured-products")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="home-page">
      <Header />
      <main>
        <Hero />

        <section id="featured-products" className="featured-products">
          <div className="container">
            <h2 className="section-title">crafts collection</h2>
            <div className="product-grid">
              {currentProducts.map((product) => (
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
            
            <div className="pagination-container">
              <div className="pagination-info">
                <span>Page {currentPage} of {totalPages}</span>
                <span>Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length} products</span>
              </div>
              <div className="pagination-controls">
                <button 
                  className="pagination-btn prev-btn"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  Previous
                </button>
                <button 
                  className="pagination-btn next-btn"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>
            </div>
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
                    "Enkaji" means home in Maa, the language of the Maasai people. At Enkaji Crafts, we bring the spirit of the Maasai home to you through authentic, handmade treasures rooted in tradition and crafted with purpose.
                  </p>
                  
                  <p>
                    Our store is a celebration of Maasai culture, artistry, and identity. We offer a curated selection of traditional tools, attire, jewelry, and home accents — each one a reflection of the Maasai's deep connection to community, craftsmanship, and nature.
                  </p>
                </div>

                <div className="mission-section">
                  <h3>But Enkaji Crafts is more than just a shop. It's a mission-driven platform:</h3>
                  
                  <div className="mission-points">
                    <div className="mission-point">
                      <div className="mission-icon-cont">
                                              <FaHandHoldingHeart className="mission-icon" />
                      </div>
                      <div className="mission-text">
                        <strong>To honor Maasai artisans</strong> by sharing their stories and preserving generations of skill passed down through hands, not machines.
                      </div>
                    </div>
                    
                    <div className="mission-point">
                      <div className="mission-icon-cont">
                        <FaEarthAfrica className="mission-icon" />
                      </div>
                      <div className="mission-text">
                        <strong>To connect cultures,</strong> allowing people from around the world to experience the richness, resilience, and beauty of Maasai life.
                      </div>
                    </div>
                    
                    <div className="mission-point">
                      <div className="mission-icon-cont">
                        <FaBriefcase className="mission-icon" />
                      </div>
                      <div className="mission-text">
                        <strong>To support livelihoods</strong> by providing sustainable income for local creators and empowering communities, especially women, who are the backbone of many of these crafts.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="closing-message">
                  <p>
                    When you buy from Enkaji Crafts, you're not just purchasing a product — you're welcoming a piece of Africa's heritage into your home. Every bead, stitch, and carving carries meaning, memory, and pride.
                  </p>
                  
                  <div className="enkaji-tagline">
                    <p><strong>Enkaji is home.</strong></p>
                    <p><strong>And we invite you to make it yours.</strong></p>
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
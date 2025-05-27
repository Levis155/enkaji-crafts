import { useState, useEffect } from 'react';
import { MdOutlineExpandMore } from "react-icons/md";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import '../styles/HomePage.css';

const HomePage = () => {
  const [visibleCount, setVisibleCount] = useState(4); // Initially show 4
  const [visibleProducts, setVisibleProducts] = useState(products.slice(0, 4));

  useEffect(() => {
    setVisibleProducts(products.slice(0, visibleCount));
  }, [visibleCount]);

  const handleSeeMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return (
    <div className="home-page">
      <Header />
      <main>
        <Hero />
        
        <section id="featured-products" className="featured-products">
          <div className="container">
            <h2 className="section-title">Products</h2>
            <div className="product-grid">
              {visibleProducts.map(product => (
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

            {visibleCount < products.length && (
              <div className="see-more-container">
                <button onClick={handleSeeMore} className="see-more-button">
                  See More <MdOutlineExpandMore />
                </button>
              </div>
            )}
          </div>
        </section>
        
        <section id="about-maasai" className="about-maasai">
          <div className="container">
            <div className="about-content">
              <div className="about-image">
                <img src="https://cdn.pixabay.com/photo/2019/10/02/19/58/maasai-4521843_1280.jpg" alt="Maasai People" />
              </div>
              <div className="about-text">
                <h2>The Maasai People</h2>
                <p>
                  The Maasai are a Nilotic ethnic group inhabiting northern, central and southern Kenya and northern Tanzania. 
                  They are among the best known local populations internationally due to their residence near the many game parks of 
                  the African Great Lakes, and their distinctive customs and dress.
                </p>
                <p>
                  Maasai society is strongly patriarchal in nature, with elder men, sometimes joined by retired elders, 
                  deciding most major matters for each Maasai group. The Maasai are known for their intricate jewelry and 
                  for decades, have sold these items to tourists as a business.
                </p>
                <p>
                  By purchasing authentic Maasai products, you are directly supporting the livelihoods of indigenous 
                  artisans and helping to preserve their unique cultural heritage for generations to come.
                </p>
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

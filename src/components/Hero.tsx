import '../styles/Hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1>Authentic Maasai Craftsmanship</h1>
        <h2>Directly from Kenya's Indigenous Artisans</h2>
        <p>
          Discover handcrafted treasures from the nomadic Maasai people. 
          Each product tells a story of tradition, skill, and cultural heritage.
        </p>
        <div className="hero-buttons">
          <a href="#featured-products" className="btn btn-solid">Shop Now</a>
          <a href="#about-maasai" className="btn btn-outline">Learn More</a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
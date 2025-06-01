import { Link } from 'react-router-dom';
import { FaTiktok, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { FaXTwitter, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md"
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h3>Red Dune</h3>
            <p>
              Authentic Maasai products made by indigenous artisans from Kenya.
              Supporting traditional craftsmanship and sustainable livelihoods.
            </p>
            <div className="social-icons">
              <a href="#" aria-label="tik-tok"><FaTiktok /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Twitter"><FaXTwitter /></a>
            </div>
          </div>

          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/category/attire">Attire</Link></li>
              <li><Link to="/category/jewelry">Jewelry</Link></li>
              <li><Link to="/category/tools">Tools</Link></li>
              <li><Link to="/category/footwear">Footwear</Link></li>
            </ul>
          </div>

          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p><FaPhoneAlt /> +254 712 345 678</p>
            <p><MdEmail /> info@reddune.co.ke</p>
            <p><FaLocationDot /> Nairobi, Kenya</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Red Dune | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
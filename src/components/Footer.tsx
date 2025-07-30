import { Link } from 'react-router-dom';
import { FaTiktok, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md"
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h3>Enkaji Crafts</h3>
            <p>
              Authentic Maasai products made by indigenous artisans from Kenya.
              Supporting traditional craftsmanship and sustainable livelihoods.
            </p>
            <div className="social-icons">
              <a href="http://tiktok.com/@maasaicurrio" target='_blank' aria-label="tik-tok"><FaTiktok /></a>
              <a href="https://www.instagram.com/maasaicurio?igsh=MXNuengzczEwcDR4eg==" target='_blank' aria-label="Instagram"><FaInstagram /></a>
            </div>
          </div>

          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/category/accessories">Accessories</Link></li>
              <li><Link to="/category/tools">Tools</Link></li>
            </ul>
          </div>

          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p><FaPhoneAlt /> +254 793 038 491</p>
            <p><MdEmail /> info@enkajicrafts.co.ke</p>
            <p><FaLocationDot /> Nairobi, Kenya</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Enkaji Crafts | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { FaList, FaRegUser, FaHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { LuPackage } from "react-icons/lu";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { IoCreateOutline } from "react-icons/io5";
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import LogoUrl from  "../assets/red-dune-logo.png";
import '../styles/Header.css';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const navigate = useNavigate();
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const categoriesMenuRef = useRef<HTMLDivElement>(null);

  const categories = [
    { name: 'Attire', path: '/category/attire' },
    { name: 'Jewelry', path: '/category/jewelry' },
    { name: 'Footwear', path: '/category/footwear' },
    { name: 'Tools', path: '/category/tools' },
    { name: 'Accessories', path: '/category/accessories' },
    { name: 'Decor', path: '/category/decor' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setShowAccountMenu(false);
      }
      if (categoriesMenuRef.current && !categoriesMenuRef.current.contains(event.target as Node)) {
        setShowCategoriesMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const toggleAccountMenu = () => {
    setShowAccountMenu(!showAccountMenu);
    setShowCategoriesMenu(false);
  };

  const toggleCategoriesMenu = () => {
    setShowCategoriesMenu(!showCategoriesMenu);
    setShowAccountMenu(false);
  };

  return (
    <header className="header">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <div className="logo-cont">
                <img src={LogoUrl} />
              </div>
            </Link>
          </div>
          
          <div className="search-bar">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-button">
                <CiSearch />
              </button>
            </form>
          </div>
          
          <div className="header-icons">
            <div className="header-icon-wrapper" ref={accountMenuRef}>
              <div className="header-icon" onClick={toggleAccountMenu}>
                <FaRegUser />
                <span>{isAuthenticated ? `Hi ${user?.fullName.split(' ')[0]}` : 'Account'}</span>
              </div>
              
              {showAccountMenu && (
                <div className="dropdown-menu account-menu">
                  {isAuthenticated ? (
                    <>
                      <Link to="/customer/account" onClick={() => setShowAccountMenu(false)}>
                        <FaRegUser /> Account
                      </Link>
                      <Link to="/customer/orders" onClick={() => setShowAccountMenu(false)}>
                        <LuPackage /> Orders
                      </Link>
                      <Link to="/customer/wishlist" onClick={() => setShowAccountMenu(false)}>
                        <FaHeart /> Wishlist
                      </Link>
                      <a href="#" onClick={() => { logout(); setShowAccountMenu(false); }}>
                        <HiOutlineArrowRightOnRectangle /> Sign Out
                      </a>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setShowAccountMenu(false)}>
                        <BsBoxArrowInLeft /> Sign In
                      </Link>
                      <Link to="/register" onClick={() => setShowAccountMenu(false)}>
                        <IoCreateOutline /> Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            
            <div className="header-icon-wrapper" ref={categoriesMenuRef}>
              <div className="header-icon" onClick={toggleCategoriesMenu}>
                <FaList />
                <span>Categories</span>
              </div>
              
              {showCategoriesMenu && (
                <div className="dropdown-menu categories-menu">
                  {categories.map((category, index) => (
                    <Link 
                      key={index} 
                      to={category.path} 
                      onClick={() => setShowCategoriesMenu(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <div className="header-icon cart-icon">
              <Link className='cart-link' to="/cart">
                <MdOutlineShoppingCart />
                <span>Cart</span>
                {totalItems > 0 && <p className="cart-count">{totalItems}</p>}
              </Link>
            </div>
          </div>
        </div>
    </header>
  );
};

export default Header;
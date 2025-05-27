import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaList, FaRegUser, FaHeart, FaBars } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { LuPackage } from "react-icons/lu";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { IoCreateOutline } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "../styles/Header.css";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const categoriesMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const categories = [
    { name: "Attire", path: "/category/attire" },
    { name: "Jewelry", path: "/category/jewelry" },
    { name: "Footwear", path: "/category/footwear" },
    { name: "Tools", path: "/category/tools" },
    { name: "Accessories", path: "/category/accessories" },
    { name: "Decor", path: "/category/decor" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setShowAccountMenu(false);
      }
      if (
        categoriesMenuRef.current &&
        !categoriesMenuRef.current.contains(event.target as Node)
      ) {
        setShowCategoriesMenu(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
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

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Standard Header for normal browser width
  const standardHeader = (
    <div className="header-content">
      <div className="logo">
        <Link to="/">red dune</Link>
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
            <span>
              {isAuthenticated
                ? `Hi ${user?.fullName.split(" ")[0]}`
                : "Account"}
            </span>
          </div>

          {showAccountMenu && (
            <div className="dropdown-menu account-menu">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/customer/account"
                    onClick={() => setShowAccountMenu(false)}
                  >
                    <FaRegUser /> Account
                  </Link>
                  <Link
                    to="/customer/orders"
                    onClick={() => setShowAccountMenu(false)}
                  >
                    <LuPackage /> Orders
                  </Link>
                  <Link
                    to="/customer/wishlist"
                    onClick={() => setShowAccountMenu(false)}
                  >
                    <FaHeart /> Wishlist
                  </Link>
                  <a
                    href="#"
                    onClick={() => {
                      logout();
                      setShowAccountMenu(false);
                    }}
                  >
                    <HiOutlineArrowRightOnRectangle /> Sign Out
                  </a>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setShowAccountMenu(false)}>
                    <BsBoxArrowInLeft /> Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setShowAccountMenu(false)}
                  >
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
          <Link className="cart-link" to="/cart">
            <MdOutlineShoppingCart />
            <span>Cart</span>
            {totalItems > 0 && <p className="cart-count">{totalItems}</p>}
          </Link>
        </div>
      </div>
    </div>
  );

  // Minimized Header for narrow browser width
  const minimizedHeader = (
    <div className="header-content minimized">
      <div className="logo">
        <Link to="/">red dune</Link>
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

      <div className="header-icons minimized">
        <div className="header-icon-wrapper" ref={mobileMenuRef}>
          <div className="header-icon" onClick={toggleMobileMenu}>
            <FaBars />
          </div>

          {showMobileMenu && (
            <div className="dropdown-menu mobile-menu">
              <div className="menu-section">
                <h3 className="menu-title">Account</h3>
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/customer/account"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <FaRegUser /> Account
                    </Link>
                    <Link
                      to="/customer/orders"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <LuPackage /> Orders
                    </Link>
                    <Link
                      to="/customer/wishlist"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <FaHeart /> Wishlist
                    </Link>
                    <a
                      href="#"
                      onClick={() => {
                        logout();
                        setShowMobileMenu(false);
                      }}
                    >
                      <HiOutlineArrowRightOnRectangle /> Sign Out
                    </a>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setShowMobileMenu(false)}>
                      <BsBoxArrowInLeft /> Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <IoCreateOutline /> Register
                    </Link>
                  </>
                )}
              </div>

              <div className="menu-section">
                <h3 className="menu-title">Categories</h3>
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={category.path}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="header-icon cart-icon">
          <Link className="cart-link" to="/cart">
            <MdOutlineShoppingCart />
            {totalItems > 0 && <p className="cart-count mini">{totalItems}</p>}
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <header className="header">
      {windowWidth <= 1060 ? minimizedHeader : standardHeader}
    </header>
  );
};

export default Header;

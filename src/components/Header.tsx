import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  FaRegUser,
  FaHeart,
  FaBars,
  FaSearch,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import { TbCategory } from "react-icons/tb";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { LuPackage } from "react-icons/lu";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { IoCreateOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import apiUrl from "../Utils/apiUrl";
import useUserStore from "../stores/userStore";
import useCartStore from "../stores/cartStore";
import useWishlistStore from "../stores/wishlistStore";
import Logo from "./Logo";
import "../styles/Header.css";

const Header = () => {
  const [logOutError, setLogOutError] = useState<string | null>(null);

  const user = useUserStore((state) => state.user);
  const removeUserInfo = useUserStore((state) => state.removeUserInfo);
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalCartQuantity = useCartStore((state) => state.getTotalQuantity);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  const [cartCount, setCartCount] = useState(getTotalCartQuantity());
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
    { name: "Tools", path: "/category/tools" },
    { name: "Accessories", path: "/category/accessories" },
  ];

  const { mutate: sendCartData } = useMutation({
    mutationKey: ["send-cart-data"],
    mutationFn: async () => {
      await axios.post(
        `${apiUrl}/cart/items`,
        { cart },
        { withCredentials: true }
      );
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const serverMessage = err.response?.data.message;
        setLogOutError(serverMessage);
      } else {
        setLogOutError("Something went wrong.");
      }
      toast.error(logOutError);
    },
  });

  const { mutate: sendWishlistData } = useMutation({
    mutationKey: ["send-wishlist-data"],
    mutationFn: async () => {
      await axios.post(
        `${apiUrl}/wishlist/items`,
        { wishlist },
        { withCredentials: true }
      );
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const serverMessage = err.response?.data.message;
        setLogOutError(serverMessage);
      } else {
        setLogOutError("Something went wrong.");
      }
      toast.error(logOutError);
    },
  });

  useEffect(() => {
    setCartCount(getTotalCartQuantity());
  }, [cart, getTotalCartQuantity]);

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

const handleLogOut = async () => {
  try {
    await Promise.all([
      sendCartData(),
      sendWishlistData(),
      axios.post(`${apiUrl}/auth/logout`, {}, { withCredentials: true }), 
    ]);

    toast.success("Logged out successfully.");
  } catch (error) {
    console.error("Error during logout", error);
    toast.error("Logout failed.");
  } finally {
    clearCart();
    clearWishlist();
    removeUserInfo();
    navigate("/");
  }
};


  // Standard Header for normal browser width
  const standardHeader = (
    <div className="header-content">
      <div className="logo">
        <Link to="/">
          <Logo /> enkaji crafts
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
            <FaSearch />
          </button>
        </form>
      </div>

      <div className="header-icons">
        <div className="header-icon-wrapper" ref={accountMenuRef}>
          <div className="header-icon" onClick={toggleAccountMenu}>
            <FaRegUser />
            <span className={user ? "hi-user" : ""}>
              {user ? `Hi ${user?.fullName.split(" ")[0]}` : "Account"}
            </span>
            <div className="angle-arrow-cont">
              {showAccountMenu ? <FaAngleUp /> : <FaAngleDown />}
            </div>
          </div>

          {showAccountMenu && (
            <div className="dropdown-menu account-menu">
              {user ? (
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
                  <button
                    className="account-btn"
                    onClick={() => {
                      handleLogOut();
                      setShowAccountMenu(false);
                    }}
                  >
                    <BiLogOut /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setShowAccountMenu(false)}>
                    <BiLogIn /> Sign In
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
            <TbCategory />
            <span>Categories</span>
            <div className="angle-arrow-cont">
              {showCategoriesMenu ? <FaAngleUp /> : <FaAngleDown />}
            </div>
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
            {cartCount > 0 && <p className="cart-count">{cartCount}</p>}
          </Link>
        </div>
      </div>
    </div>
  );

  // Minimized Header for narrow browser width
  const minimizedHeader = (
    <div className="header-content minimized">
      <div className="logo">
        <Link to="/">
          <Logo /> Enkaji Crafts
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
            <FaSearch />
          </button>
        </form>
      </div>

      <div className="header-icons minimized">
        <div className="header-icon-wrapper" ref={mobileMenuRef}>
          <div className="header-icon" onClick={toggleMobileMenu}>
            {showMobileMenu ? <IoMdClose /> : <FaBars />}
          </div>

          {showMobileMenu && (
            <div className="dropdown-menu mobile-menu">
              <div className="menu-section">
                <h3 className="menu-title">Account</h3>
                {user ? (
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
                    <button
                      className="account-btn"
                      onClick={() => {
                        handleLogOut();
                        setShowMobileMenu(false);
                      }}
                    >
                      <HiOutlineArrowRightOnRectangle /> Sign Out
                    </button>
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
            {cartCount > 0 && <p className="cart-count mini">{cartCount}</p>}
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header className="header">
        {windowWidth <= 1060 ? minimizedHeader : standardHeader}
      </header>
    </>
  );
};

export default Header;

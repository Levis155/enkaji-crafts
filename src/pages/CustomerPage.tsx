import { Outlet, NavLink } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import '../styles/CustomerPage.css';

const CustomerPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div>
        <Header />
        <main className="container customer-login-required">
          <h2>Please log in to access your account</h2>
          <p>You need to be logged in to view this page.</p>
          <button className="login-button">Sign In</button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="customer-page">
      <Header />
      <main className="container">
        <div className="customer-page-container">
          <aside className="customer-sidebar">
            <h2>My Account</h2>
            <nav className="customer-nav">
              <NavLink 
                to="/customer/account" 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Account Overview
              </NavLink>
              <NavLink 
                to="/customer/orders" 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                My Orders
              </NavLink>
              <NavLink 
                to="/customer/pending-reviews" 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Pending Reviews
              </NavLink>
              <NavLink 
                to="/customer/wishlist" 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                My Wishlist
              </NavLink>
            </nav>
          </aside>
          
          <div className="customer-content">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerPage;
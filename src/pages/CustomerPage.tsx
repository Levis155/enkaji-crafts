import { Outlet, NavLink } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/CustomerPage.css';

const CustomerPage = () => {
  return (
    <div className="customer-page">
      <Header />
      <main>
        <div className="customer-page-container">
          <aside className="customer-sidebar">
            <h2>Account</h2>
            <nav className="customer-nav">
              <NavLink 
                to="/customer/account" 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                My Account
              </NavLink>
              <NavLink 
                to="/customer/orders" 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                My Orders
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
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/AccountPage.css';

const AccountPage = () => {
  const { user, updateUserDetails } = useAuth();
  
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    county: user?.shippingAddress?.county || '',
    town: user?.shippingAddress?.town || ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAccountDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateUserDetails({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone
    });
    
    setIsEditingDetails(false);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateUserDetails({
      shippingAddress: {
        county: formData.county,
        town: formData.town
      }
    });
    
    setIsEditingAddress(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="account-page">
      <h1>Account Overview</h1>
      
      <section className="account-details">
        <div className="section-header">
          <h2>Account Details</h2>
          {!isEditingDetails && (
            <button 
              className="edit-button"
              onClick={() => setIsEditingDetails(true)}
            >
              Edit
            </button>
          )}
        </div>
        
        {isEditingDetails ? (
          <form onSubmit={handleAccountDetailsSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="save-button">Save Changes</button>
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => setIsEditingDetails(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="details-display">
            <div className="detail-item">
              <span className="detail-label">Full Name:</span>
              <span className="detail-value">{user.fullName}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{user.email}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">{user.phone}</span>
            </div>
          </div>
        )}
      </section>
      
      <section className="shipping-address">
        <div className="section-header">
          <h2>Shipping Address</h2>
          {!isEditingAddress && (
            <button 
              className="edit-button"
              onClick={() => setIsEditingAddress(true)}
            >
              Edit
            </button>
          )}
        </div>
        
        {isEditingAddress ? (
          <form onSubmit={handleAddressSubmit}>
            <div className="form-group">
              <label htmlFor="county">County</label>
              <input
                type="text"
                id="county"
                name="county"
                value={formData.county}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="town">Town/City</label>
              <input
                type="text"
                id="town"
                name="town"
                value={formData.town}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="save-button">Save Changes</button>
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => setIsEditingAddress(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="details-display">
            <div className="detail-item">
              <span className="detail-label">County:</span>
              <span className="detail-value">{user.shippingAddress.county}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Town/City:</span>
              <span className="detail-value">{user.shippingAddress.town}</span>
            </div>
          </div>
        )}
      </section>
      
      <section className="password-change">
        <div className="section-header">
          <h2>Password</h2>
        </div>
        <div className="password-link">
          <a href="#">Change Password</a>
        </div>
      </section>
    </div>
  );
};

export default AccountPage;
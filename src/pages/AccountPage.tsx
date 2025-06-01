import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import {
  TextField,
  InputLabel,
  FormControl,
  IconButton,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import formControlStyle from "../styles/formControlStyles";
import { useAuth } from "../context/AuthContext";
import "../styles/AccountPage.css";

const AccountPage = () => {
  const { user, updateUserDetails } = useAuth();

  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    county: user?.shippingAddress?.county || "",
    town: user?.shippingAddress?.town || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAccountDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateUserDetails({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
    });

    setIsEditingDetails(false);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateUserDetails({
      shippingAddress: {
        county: formData.county,
        town: formData.town,
      },
    });

    setIsEditingAddress(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingPassword(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="account-page">
      <h1>My Account</h1>

      <section className="account-details">
        <div className="account-section-header">
          <h2>Account Details</h2>
          {!isEditingDetails && (
            <button
              className="edit-button"
              onClick={() => setIsEditingDetails(true)}
            >
              <FaEdit /> Edit
            </button>
          )}
        </div>

        {isEditingDetails ? (
          <form onSubmit={handleAccountDetailsSubmit}>
            <TextField
              label="Full Name"
              variant="outlined"
              sx={formControlStyle}
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />

            <TextField
              label="Email"
              variant="outlined"
              sx={formControlStyle}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <TextField
              label="Phone Number"
              variant="outlined"
              type="tel"
              sx={formControlStyle}
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />

            <div className="account-page-form-actions">
              <button type="submit" className="save-button">
                Save Changes
              </button>
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

      <section className="account-page-shipping-address">
        <div className="account-section-header">
          <h2>Shipping Address</h2>
          {!isEditingAddress && (
            <button
              className="edit-button"
              onClick={() => setIsEditingAddress(true)}
            >
              <FaEdit /> Edit
            </button>
          )}
        </div>

        {isEditingAddress ? (
          <form onSubmit={handleAddressSubmit}>
            <TextField
              label="County"
              variant="outlined"
              sx={formControlStyle}
              name="county"
              value={formData.county}
              onChange={handleInputChange}
              required
            />

            <TextField
              label="Town"
              variant="outlined"
              sx={formControlStyle}
              name="town"
              value={formData.town}
              onChange={handleInputChange}
              required
            />

            <div className="account-page-form-actions">
              <button type="submit" className="save-button">
                Save Changes
              </button>
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
              <span className="detail-value">
                {user.shippingAddress.county}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Town/City:</span>
              <span className="detail-value">{user.shippingAddress.town}</span>
            </div>
          </div>
        )}
      </section>

      <section className="password-change">
        <div className="account-section-header">
          <h2>Password</h2>
          {!isEditingPassword && (
            <button
              className="edit-button"
              onClick={() => setIsEditingPassword(true)}
            >
              <FaEdit /> Edit
            </button>
          )}
        </div>
        {isEditingPassword ? (
          <form onSubmit={handlePasswordSubmit}>
            <FormControl variant="outlined" sx={formControlStyle}>
              <InputLabel>Old Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                name="OldPassword"
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Old Password"
              />
            </FormControl>

            <FormControl variant="outlined" sx={formControlStyle}>
              <InputLabel>New Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                name="NewPassword"
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
              />
            </FormControl>

            <FormControl variant="outlined" sx={formControlStyle}>
              <InputLabel>Confirm New Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                name="confirmedNewPassword"
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm New Password"
              />
            </FormControl>

            <div className="account-page-form-actions">
              <button type="submit" className="save-button">
                Save Changes
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setIsEditingPassword(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="details-display">********</div>
        )}
      </section>
    </div>
  );
};

export default AccountPage;

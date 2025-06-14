import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import {
  TextField,
  InputLabel,
  FormControl,
  IconButton,
  OutlinedInput,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import apiUrl from "../Utils/apiUrl";
import formControlStyle from "../styles/formControlStyles";
import useUserStore from "../stores/userStore";
import "../styles/AccountPage.css";

const AccountPage = () => {
  const user = useUserStore((state) => state.user);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: user?.fullName,
    emailAddress: user?.emailAddress,
    phoneNumber: user?.phoneNumber,
    county: user?.county,
    town: user?.town,
    oldPassword: "",
    newPassword: "",
    confirmedNewPassword: "",
  });

  const { isPending, mutate } = useMutation({
    mutationKey: ["update-user-info"],
    mutationFn: async () => {
      const response = await axios.patch(`${apiUrl}/users`, {
        fullName: formData.fullName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        county: formData.county,
        town: formData.town,
        password: formData.newPassword,
        oldPassword: formData.oldPassword
      }, {
        withCredentials: true,
      });
      return response.data;
    },

    onSuccess: (data) => {
      setUserInfo(data);
      setIsEditingDetails(false);
      setIsEditingAddress(false);
      setIsEditingPassword(false);
      toast.success("Updated user successfully!");
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const serverMessage = err.response?.data.message;
        setFormError(serverMessage);
      } else {
        setFormError("Something went wrong.");
      }
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleUpdateDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    mutate();
  };
  const handleUpdateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    mutate();
  };
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (formData.newPassword !== formData.confirmedNewPassword) {
      setFormError("New Password and confirmed password should match.");
      return;
    }
    mutate();
  };

  return (
    <div className="account-page">
      <h1>My Account</h1>

      <section className="account-details">
        <div className="account-section-header">
          <h2>Account Details</h2>
          {!isEditingDetails && (
            <button
              className="edit-button"
              onClick={() => {
                setFormError(null);
                setIsEditingDetails(true);
                setIsEditingAddress(false);
                setIsEditingPassword(false);
              }}
            >
              <FaEdit /> Edit
            </button>
          )}
        </div>

        {isEditingDetails ? (
          <form onSubmit={handleUpdateDetails}>
            {formError && (
              <Alert severity="error" sx={{ mb: "1rem", fontSize: "1.4rem" }}>
                {formError}
              </Alert>
            )}
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
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleInputChange}
              required
            />

            <TextField
              label="Phone Number"
              variant="outlined"
              type="tel"
              sx={formControlStyle}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />

            <div className="account-page-form-actions">
              <button
                type="submit"
                className="save-button"
                disabled={isPending}
              >
                {isPending ? (
                  <CircularProgress size="1.3rem" sx={{ color: "white" }} />
                ) : (
                  "Save Changes"
                )}
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
              <span className="detail-value">{user?.fullName}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{user?.emailAddress}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">{user?.phoneNumber}</span>
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
              onClick={() => {
                setFormError(null);
                setIsEditingDetails(false);
                setIsEditingAddress(true);
                setIsEditingPassword(false);
              }}
            >
              <FaEdit /> Edit
            </button>
          )}
        </div>

        {isEditingAddress ? (
          <form onSubmit={handleUpdateAddress}>
            {formError && (
              <Alert severity="error" sx={{ mb: "1rem", fontSize: "1.4rem" }}>
                {formError}
              </Alert>
            )}
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
              <button
                type="submit"
                className="save-button"
                disabled={isPending}
              >
                {isPending ? (
                  <CircularProgress size="1.3rem" sx={{ color: "white" }} />
                ) : (
                  "Save Changes"
                )}
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
              <span className="detail-value">{user?.county}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Town/City:</span>
              <span className="detail-value">{user?.town}</span>
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
              onClick={() => {
                setFormError(null);
                setIsEditingDetails(false);
                setIsEditingAddress(false);
                setIsEditingPassword(true);
              }}
            >
              <FaEdit /> Edit
            </button>
          )}
        </div>
        {isEditingPassword ? (
          <form onSubmit={handleUpdatePassword}>
            {formError && (
              <Alert severity="error" sx={{ mb: "1rem", fontSize: "1.4rem" }}>
                {formError}
              </Alert>
            )}
            <FormControl variant="outlined" sx={formControlStyle}>
              <InputLabel>Old Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleInputChange}
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
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
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
                value={formData.confirmedNewPassword}
                onChange={handleInputChange}
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
              <button
                type="submit"
                className="save-button"
                disabled={isPending}
              >
                {isPending ? (
                  <CircularProgress size="1.3rem" sx={{ color: "white" }} />
                ) : (
                  "Save Changes"
                )}
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

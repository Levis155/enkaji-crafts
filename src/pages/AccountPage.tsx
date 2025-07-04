import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../Utils/axiosInstance";
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
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import formControlStyle from "../Utils/formControlStyles";
import useUserStore from "../stores/userStore";
import countyTownFeeMap from "../data/regionTownFeeMap"; // Import your shipping fee map
import { getShippingFee, getTownsForCounty } from "../Utils/shippingUtils";
import "../styles/AccountPage.css";

const AccountPage = () => {
  const user = useUserStore((state) => state.user);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [availableTowns, setAvailableTowns] = useState<string[]>(
    getTownsForCounty(user?.county || "")
  );
  const [initialUserData, setInitialUserData] = useState({
    fullName: user?.fullName || "",
    emailAddress: user?.emailAddress || "",
    phoneNumber: user?.phoneNumber || "",
    county: user?.county || "",
    town: user?.town || "",
    shippingCharge: user?.shippingCharge || 0,
  });
  const [formData, setFormData] = useState({
    fullName: user?.fullName,
    emailAddress: user?.emailAddress,
    phoneNumber: user?.phoneNumber,
    county: user?.county || "",
    town: user?.town || "",
    shippingCharge: user?.shippingCharge || 0,
    oldPassword: "",
    newPassword: "",
    confirmedNewPassword: "",
  });

  const { isPending, mutate } = useMutation({
    mutationKey: ["update-user-info"],
    mutationFn: async () => {
      const response = await axiosInstance.patch(
        `/users`,
        {
          fullName: formData.fullName,
          emailAddress: formData.emailAddress,
          phoneNumber: formData.phoneNumber,
          county: formData.county,
          town: formData.town,
          shippingCharge: formData.shippingCharge,
          password: formData.newPassword,
          oldPassword: formData.oldPassword,
        }
      );
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

  useEffect(() => {
    if (user) {
      setInitialUserData({
        fullName: user.fullName,
        emailAddress: user.emailAddress,
        phoneNumber: user.phoneNumber,
        county: user.county,
        town: user.town,
        shippingCharge: user.shippingCharge,
      });

      setFormData({
        fullName: user.fullName,
        emailAddress: user.emailAddress,
        phoneNumber: user.phoneNumber,
        county: user.county,
        town: user.town,
        shippingCharge: user.shippingCharge,
        oldPassword: "",
        newPassword: "",
        confirmedNewPassword: "",
      });

      setAvailableTowns(getTownsForCounty(user.county));
    }
  }, [user]);

  useEffect(() => {
    if (user?.county && user?.town) {
      const fee = getShippingFee(user.county, user.town);
      setFormData((prev) => ({
        ...prev,
        county: user.county,
        town: user.town,
        shippingCharge: fee !== undefined ? fee : 0,
      }));
      setAvailableTowns(getTownsForCounty(user.county));
    }
  }, [user]);

  const handleCountyChange = (e: SelectChangeEvent<string>) => {
    const county = e.target.value;
    const towns = getTownsForCounty(county);

    setFormData((prev) => ({
      ...prev,
      county,
      town: towns.includes(prev.town) ? prev.town : "",
      shippingCharge: 0,
    }));

    setAvailableTowns(towns);
  };

  const handleTownChange = (e: SelectChangeEvent<string>) => {
    const town = e.target.value;
    const fee = getShippingFee(formData.county, town);

    setFormData((prev) => ({
      ...prev,
      town,
      shippingCharge: fee !== undefined ? fee : 0,
    }));
  };

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

  const handleCancelDetails = () => {
    setIsEditingDetails(false);
    setFormData((prev) => ({
      ...prev,
      fullName: initialUserData.fullName,
      emailAddress: initialUserData.emailAddress,
      phoneNumber: initialUserData.phoneNumber,
    }));
  };

  const handleCancelAddress = () => {
    setIsEditingAddress(false);
    setFormData((prev) => ({
      ...prev,
      county: initialUserData.county,
      town: initialUserData.town,
      shippingCharge: initialUserData.shippingCharge,
    }));
    setAvailableTowns(getTownsForCounty(initialUserData.county));
  };

  const handleCancelPassword = () => {
    setIsEditingPassword(false);
    setFormData((prev) => ({
      ...prev,
      oldPassword: "",
      newPassword: "",
      confirmedNewPassword: "",
    }));
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
                onClick={handleCancelDetails}
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

            <FormControl fullWidth sx={formControlStyle}>
              <InputLabel id="county-select-label">County</InputLabel>
              <Select
                labelId="county-select-label"
                id="county-select"
                value={formData.county}
                label="County"
                onChange={handleCountyChange}
                name="county"
                required
              >
                {Object.keys(countyTownFeeMap)
                  .sort((a, b) => a.localeCompare(b))
                  .map((county) => (
                    <MenuItem key={county} value={county}>
                      {county.replace(" County", "")}{" "}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl
              fullWidth
              sx={formControlStyle}
              disabled={!formData.county}
            >
              <InputLabel id="town-select-label">Town</InputLabel>
              <Select
                labelId="town-select-label"
                id="town-select"
                value={formData.town}
                label="Town"
                onChange={handleTownChange}
                name="town"
                required
              >
                {availableTowns
                  .sort((a, b) => a.localeCompare(b))
                  .map((town) => (
                    <MenuItem key={town} value={town}>
                      {town}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {formData.shippingCharge > 0 && (
              <Alert severity="info" sx={{ fontSize: "1.4rem" }}>
                Shipping Fee: Ksh {formData.shippingCharge}
              </Alert>
            )}

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
                onClick={handleCancelAddress}
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

            <div className="detail-item">
              <span className="detail-label">Shipping Fee:</span>
              <span className="detail-value">Ksh {user?.shippingCharge}</span>
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
                onClick={handleCancelPassword}
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

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import "../styles/RegisterPage.css";
import Logo from "../components/Logo";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    county: "Nairobi",
    town: "CBD",
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { register, error, clearError, loading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear any previous errors when the user starts typing
    if (error) clearError();

    // Clear password matching error if user is changing password fields
    if (name === "password" || name === "confirmPassword") {
      setPasswordError(null);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Register the user (excluding confirmPassword)
    const { confirmPassword, ...registerData } = formData;
    const success = await register(registerData);

    if (success) {
      navigate("/"); // Redirect to home page after successful registration
    }
  };

  return (
    <div className="registration-page-wrapper">
      <form action="" onSubmit={handleSubmit}>
        <Logo  />
        <p className="registration-form-title">Register with Red Dune</p>

        <div className="registration-form-body">
          {error && <div className="auth-error">{error}</div>}
          {passwordError && <div className="auth-error">{passwordError}</div>}
          <TextField
            label="Full Name"
            variant="outlined"
            sx={formControlStyle}
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <TextField
            label="Email Address"
            variant="outlined"
            sx={formControlStyle}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <TextField
            label="Phone Number"
            variant="outlined"
            sx={formControlStyle}
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <TextField
            label="County"
            variant="outlined"
            sx={formControlStyle}
            name="county"
            value={formData.county}
            onChange={handleChange}
          />

          <TextField
            label="Town/City"
            variant="outlined"
            sx={formControlStyle}
            name="town"
            value={formData.town}
            onChange={handleChange}
          />

          <FormControl variant="outlined" sx={formControlStyle}>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
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
              label="Password"
            />
          </FormControl>

          <FormControl variant="outlined" sx={formControlStyle}>
            <InputLabel>Confirm Password</InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
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
              label="Confirm Password"
            />
          </FormControl>

          <button className="signup-btn" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </div>

        <p className="login-text">
          Already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;

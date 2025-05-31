import "../styles/LoginPage.css";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
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
import Logo from "../components/Logo";

const LoginPage = () => {
  const { login, error, clearError, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear any previous errors when the user starts typing
    if (error) clearError();
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

    const success = await login(formData);
    if (success) {
      navigate("/"); // Redirect to home page after successful login
    }
  };

  return (
    <div className="login-page-wrapper">
      <form action="" onSubmit={handleSubmit}>
        <Logo />
        <p className="login-form-title">Login to Red Dune</p>

        <div className="login-form-body">
          {error && <div className="auth-error">{error}</div>}
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={formControlStyle}
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

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="register-text">
          Don't have an account? <Link to={"/register"}>Register</Link>
        </p>
      </form>
    </div>
  );
}


export default LoginPage;
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../Utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
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
import "../styles/LoginPage.css";
import formControlStyle from "../Utils/formControlStyles";
import Logo from "../components/Logo";
import apiUrl from "../Utils/apiUrl";
import useUserStore from "../stores/userStore";
import useCartStore from "../stores/cartStore";
import useWishlistStore from "../stores/wishlistStore";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    emailAddress: "",
    password: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const mergeCart = useCartStore((state) => state.mergeCart);
  const setWishlistData = useWishlistStore((state) => state.setWishlistData);

  const fetchAndMergeCart = async () => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/cart/items`, {
        withCredentials: true,
      });
      mergeCart(response.data.cart);
    } catch (error) {
      toast.error("Failed to fetch wishlist.");
      console.error("Failed to fetch cart:", error);
    }
  };

  const fetchAndSetWishlist = async () => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/wishlist/items`, {
        withCredentials: true,
      });
      setWishlistData(response.data.wishlist);
    } catch (error) {
      toast.error("Failed to fetch wishlist.");
      console.error("Failed to fetch wishlist:", error);
    }
  };

  const { isPending, mutate } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async () => {
      const response = await axios.post(`${apiUrl}/auth/login`, formData, {
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: async (data) => {
      const { refreshTokenExpiry, ...userData } = data;
      setUserInfo(userData, refreshTokenExpiry);
      await fetchAndMergeCart();
      await fetchAndSetWishlist();
      toast.success("Login successful.");
      navigate("/");
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

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    setFormError(null);
    mutate();
  };

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      const res = await axios.post(
        `${apiUrl}/auth/google`,
        {
          token: credentialResponse.credential,
        },
        {
          withCredentials: true,
        }
      );

      const { refreshTokenExpiry, ...userData } = res.data;
      setUserInfo(userData, refreshTokenExpiry);

      await fetchAndMergeCart();
      await fetchAndSetWishlist();

      toast.success("Google login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Google login failed.");
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="login-page-wrapper">
      <form onSubmit={handleSubmit}>
        <Logo />
        <p className="login-form-title">Login to Enkaji Crafts</p>

        <div className="login-form-body">
          {formError && (
            <Alert severity="error" sx={{ mb: "1rem", fontSize: "1.4rem" }}>
              {formError}
            </Alert>
          )}

          <TextField
            label="Email"
            variant="outlined"
            type="email"
            required
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleOnChange}
            sx={formControlStyle}
          />

          <FormControl variant="outlined" sx={formControlStyle}>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
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

          <button type="submit" disabled={isPending} className="login-btn">
            {isPending ? (
              <CircularProgress size="1.3rem" sx={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </button>
          <Link to="/forgot-password" className="forgot-password">
            Forgot Password?
          </Link>
          <div className="divider">
            <span className="divider-text">or</span>
          </div>
          <div
            style={{
              marginBottom: "1.5rem",
              width: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => toast.error("Google login failed")}
            />
          </div>
        </div>

        <p className="register-text">
          Don't have an account? <Link to={"/register"}>Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

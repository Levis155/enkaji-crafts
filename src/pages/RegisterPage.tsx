import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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
import formControlStyle from "../styles/formControlStyles";
import "../styles/RegisterPage.css";
import Logo from "../components/Logo";
import apiUrl from "../Utils/apiUrl";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async () => {
      const response = await axios.post(`${apiUrl}/auth/register`, formData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Account created successfully.");
      setTimeout(() => navigate("/login"), 2000);
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

    if (formData.password !== formData.confirmPassword) {
      setFormError("Password and confirmed password must match.");
      return;
    }
    console.log(formData);
    mutate();
  };

  return (
    <div className="registration-page-wrapper">
      <form action="" onSubmit={handleSubmit}>
        <Logo />
        <p className="registration-form-title">Register with Enkaji Crafts</p>

        <div className="registration-form-body">
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
            onChange={handleOnChange}
            required
          />

          <TextField
            label="Email Address"
            variant="outlined"
            sx={formControlStyle}
            type="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleOnChange}
            required
          />

          <TextField
            label="Phone Number"
            variant="outlined"
            sx={formControlStyle}
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleOnChange}
            required
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
              onChange={handleOnChange}
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

          <button className="signup-btn" type="submit" disabled={isPending}>
            {isPending ? (
              <CircularProgress size="1.3rem" sx={{ color: "white" }} />
            ) : (
              "Register"
            )}
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

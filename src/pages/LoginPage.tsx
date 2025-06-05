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
  CircularProgress
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import "../styles/LoginPage.css";
import formControlStyle from "../styles/formControlStyles";
import Logo from "../components/Logo";
import apiUrl from "../Utils/apiUrl";
import useUserStore from "../stores/userStore";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    emailAddress: "",
    password: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const setUserInfo = useUserStore((state) => state.setUserInfo)

  const { isPending, mutate} = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async () => {
      const response = await axios.post(`${apiUrl}/auth/login`, formData);
      console.log(response.data);
      return response.data;
    },
    onSuccess: (data) => {
      setUserInfo(data);
      toast.success("Logged in successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => navigate("/"), 2000);
    },
    onError: (err) => {
      if(axios.isAxiosError(err)) {
        const serverMessage = err.response?.data.message;
        setFormError(serverMessage);
      } else{
        setFormError("Something went wrong.")
      }
    }
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

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="login-page-wrapper">
        <form action="" onSubmit={handleSubmit}>
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

            <button type="submit" disabled={isPending} className="login-btn">
              {isPending ? <CircularProgress size="1.3rem" sx={{ color: "white" }} /> : "Login"}
            </button>
          </div>

          <p className="register-text">
            Don't have an account? <Link to={"/register"}>Register</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginPage;

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
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
import "../styles/ResetPasswordPage.css";
import formControlStyle from "../styles/formControlStyles";
import Logo from "../components/Logo";
import apiUrl from "../Utils/apiUrl";


const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { resetToken } = useParams();



  const { isPending, mutate } = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: async () => {
      const response = await axios.post(`${apiUrl}/auth/reset-password/${resetToken}`, {
        newPassword,
      },);
      return response.data;
    },
    onSuccess: async () => {
      toast.success("Password has been reset.");
      navigate("/login");
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const serverMessage = err.response?.data.message;
        setFormError(serverMessage);
      } else {
        setFormError("Failed to reset password.");
      }
    },
  });

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
    if (newPassword !== confirmedPassword) {
      setFormError("Password and confirmed password must match.");
      return;
    }
    mutate();
  };

  return (
    <>
      <div className="reset-password-page-wrapper">
        <form onSubmit={handleSubmit}>
          <Logo />
          <p className="reset-password-form-title">Reset Your Password</p>

          <div className="reset-password-form-body">
            {formError && (
              <Alert severity="error" sx={{ mb: "1rem", fontSize: "1.4rem" }}>
                {formError}
              </Alert>
            )}

            <FormControl variant="outlined" sx={formControlStyle}>
              <InputLabel>New Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                label="New Password"
              />
            </FormControl>

            <FormControl variant="outlined" sx={formControlStyle}>
              <InputLabel>Confirm Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                name="confirmedPassword"
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
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

            <button type="submit" disabled={isPending} className="reset-password-btn">
              {isPending ? (
                <CircularProgress size="1.3rem" sx={{ color: "white" }} />
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPasswordPage;

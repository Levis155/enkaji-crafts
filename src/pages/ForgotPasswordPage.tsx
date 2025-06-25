import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { TextField, Alert, CircularProgress } from "@mui/material";
import "../styles/ForgotPasswordPage.css";
import formControlStyle from "../styles/formControlStyles";
import apiUrl from "../Utils/apiUrl";
import Logo from "../components/Logo";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const { isPending, mutate } = useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: async () => {
      const response = await axios.post(`${apiUrl}/auth/forgot-password`, {
        emailAddress: email,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Check your email for a reset link.");
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const serverMessage = err.response?.data.message;
        setFormError(serverMessage);
      } else {
        setFormError("Could not send reset link.");
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    mutate();
  };
  return (
    <>
      <div className="forgot-password-page-wrapper">
        <form onSubmit={handleSubmit}>
          <Logo />
          <p className="forgot-password-form-title">Forgot Password</p>

          <div className="forgot-password-form-body">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={formControlStyle}
            />

            <button
              type="submit"
              disabled={isPending}
              className="send-link-btn"
            >
              {isPending ? (
                <CircularProgress size="1.3rem" sx={{ color: "white" }} />
              ) : (
                "Send Reset Link"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPasswordPage;

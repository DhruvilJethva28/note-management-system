import { useState } from "react";
import "./style/auth.css";

function ForgotPassword() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // STEP 1: SEND OTP
  const sendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to send OTP");
        return;
      }

      setMessage("OTP sent to your email");
      setStep("otp");
    } catch {
      setError("Something went wrong");
    }
  };

  // STEP 2: VERIFY OTP
  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid OTP");
        return;
      }

      setStep("reset");
    } catch {
      setError("Something went wrong");
    }
  };

  // STEP 3: RESET PASSWORD
  const resetPassword = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Password reset failed");
        return;
      }

      setMessage("Password reset successful. You can login now.");
      setStep("done");
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Forgot Password</h2>

        {error && <p className="auth-error">{error}</p>}
        {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}

        {/* STEP 1 */}
        {step === "email" && (
          <form onSubmit={sendOtp}>
            <div className="auth-field">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button className="auth-btn">Send OTP</button>
          </form>
        )}

        {/* STEP 2 */}
        {step === "otp" && (
          <form onSubmit={verifyOtp}>
            <div className="auth-field">
              <label>Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button className="auth-btn">Verify OTP</button>
          </form>
        )}

        {/* STEP 3 */}
        {step === "reset" && (
          <form onSubmit={resetPassword}>
            <div className="auth-field">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button className="auth-btn">Reset Password</button>
          </form>
        )}

        {step === "done" && (
          <p style={{ textAlign: "center" }}>
            Please login with your new password.
          </p>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;

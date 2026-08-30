import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setStatus({ type: "success", msg: "Password reset email sent! Check your inbox." });
    } catch (err) {
      setStatus({ type: "danger", msg: err.message || "Failed to send reset email." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ background: "#F6F9FF", minHeight: "100vh", display: "flex", alignItems: "center", padding: "2rem" }}>
      <div
        style={{
          maxWidth: 420,
          margin: "0 auto",
          width: "100%",
          background: "white",
          borderRadius: 16,
          boxShadow: "0 8px 30px rgba(61, 97, 221, 0.1)",
          padding: "2.5rem",
        }}
      >
        <h3 className="fw-bold mb-2">Reset your password</h3>
        <p className="text-muted mb-4">
          Enter the email associated with your account and we'll send you a link to reset your password.
        </p>

        {status.msg && (
          <div className={`alert alert-${status.type} py-2 small`}>{status.msg}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-semibold">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-white"><FaEnvelope /></span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn w-100 text-white"
            style={{ background: "#3D61DD", border: "none", borderRadius: 8, padding: "0.65rem" }}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/Login" className="text-decoration-none small">
            <FaArrowLeft className="me-1" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

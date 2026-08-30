import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { useUserAuth } from "../context/UserAuthContext";
import UserDataService from "../services/UserDataService";
import { FaSignInAlt, FaLock, FaEnvelope, FaEye, FaEyeSlash, FaMapMarkerAlt } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const addLoginLog = async (userId) => {
    try {
      const loginLog = {
        timestamp: new Date(),
        method: "email-password",
        ipAddress: "ip address", // Replace with real IP logic
      };
      await UserDataService.addLoginLog(userId, loginLog);
    } catch (error) {
      console.error("Error adding login log:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const userCredential = await logIn(email, password);
      const userId = userCredential.user?.uid;
      if (userId) {
        await addLoginLog(userId);
        navigate("/");
      } else {
        setError("User ID not found.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-split-page">
      <style>{`
        .auth-split-page {
          --primary: #C1622D;
          --dark: #1E3A2E;
          --gray: #6b6459;
          --field-bg: #F4F1EA;
          --border: #e6ddcf;
          --error: #b3261e;

          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: white;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .auth-split-form {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2.5rem 4vw;
        }

        .auth-split-form-inner {
          width: 100%;
          max-width: 420px;
          margin: 0 auto;
        }

        .auth-split-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
          color: var(--dark);
          font-weight: 800;
          font-size: 1.15rem;
          margin-bottom: 2.5rem;
        }

        .auth-split-brand-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .auth-split-form-inner h1 {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 1.9rem;
          font-weight: 600;
          color: var(--dark);
          margin-bottom: 0.35rem;
        }

        .auth-split-form-inner > p.subtext {
          color: var(--gray);
          font-size: 0.95rem;
          margin-bottom: 1.75rem;
        }

        .error-alert {
          background-color: rgba(179, 38, 30, 0.08);
          color: var(--error);
          padding: 0.85rem 1rem;
          border-radius: 8px;
          margin-bottom: 1.25rem;
          font-size: 0.85rem;
          border-left: 3px solid var(--error);
        }

        .social-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.85rem;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: white;
          font-weight: 600;
          font-size: 0.92rem;
          color: var(--dark);
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 1.5rem;
        }

        .social-btn:hover {
          border-color: var(--primary);
          background: #fdf8f2;
        }

        .social-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .divider {
          display: flex;
          align-items: center;
          margin: 0 0 1.5rem;
          color: var(--gray);
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .divider::before,
        .divider::after {
          content: "";
          flex: 1;
          border-bottom: 1px solid var(--border);
        }

        .divider::before { margin-right: 1rem; }
        .divider::after { margin-left: 1rem; }

        .form-group {
          margin-bottom: 1.15rem;
          position: relative;
        }

        .form-label {
          display: block;
          margin-bottom: 0.4rem;
          font-weight: 600;
          color: var(--dark);
          font-size: 0.82rem;
        }

        .input-group {
          position: relative;
        }

        .form-control {
          width: 100%;
          padding: 0.85rem 1rem 0.85rem 2.5rem;
          border: 1px solid transparent;
          border-radius: 10px;
          font-size: 0.92rem;
          transition: all 0.2s ease;
          background-color: var(--field-bg);
        }

        .form-control:focus {
          border-color: var(--primary);
          background-color: white;
          box-shadow: 0 0 0 3px rgba(193, 98, 45, 0.12);
          outline: none;
        }

        .input-icon {
          position: absolute;
          left: 0.9rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray);
          font-size: 0.9rem;
          z-index: 2;
          pointer-events: none;
        }

        .password-toggle {
          position: absolute;
          right: 0.9rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray);
          cursor: pointer;
          font-size: 0.9rem;
          z-index: 2;
        }

        .auth-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.35rem;
          font-size: 0.85rem;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--gray);
          cursor: pointer;
        }

        .auth-row a {
          color: var(--primary);
          font-weight: 600;
          text-decoration: none;
        }

        .login-btn {
          width: 100%;
          padding: 0.9rem;
          background: var(--dark);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-btn:hover {
          background: #12241c;
        }

        .login-btn:disabled {
          background: var(--border);
          cursor: not-allowed;
        }

        .btn-icon {
          margin-right: 0.5rem;
        }

        .signup-link {
          text-align: center;
          margin-top: 1.5rem;
          color: var(--gray);
          font-size: 0.85rem;
        }

        .signup-link a {
          color: var(--primary);
          font-weight: 700;
          text-decoration: none;
        }

        .auth-split-visual {
          position: relative;
          margin: 1.25rem 1.25rem 1.25rem 0;
          border-radius: 32px;
          overflow: hidden;
          background:
            linear-gradient(to top, rgba(18, 36, 28, 0.65), rgba(18, 36, 28, 0.05) 45%),
            url('https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80');
          background-size: cover;
          background-position: center;
        }

        .auth-split-visual-caption {
          position: absolute;
          left: 2rem;
          right: 2rem;
          bottom: 2rem;
          color: white;
        }

        .auth-split-visual-caption strong {
          display: block;
          font-family: 'Fraunces', Georgia, serif;
          font-size: 1.6rem;
          font-weight: 600;
          line-height: 1.25;
          margin-bottom: 0.5rem;
        }

        .auth-split-visual-caption span {
          font-size: 0.92rem;
          color: rgba(255,255,255,0.85);
        }

        @media (max-width: 991px) {
          .auth-split-page {
            grid-template-columns: 1fr;
          }

          .auth-split-visual {
            display: none;
          }

          .auth-split-form {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>

      <div className="auth-split-form">
        <div className="auth-split-form-inner">
          <Link to="/" className="auth-split-brand">
            <div className="auth-split-brand-icon">
              <FaMapMarkerAlt />
            </div>
            OtagoRentals
          </Link>

          <h1>Welcome back</h1>
          <p className="subtext">Log in to grab your next home.</p>

          {error && <div className="error-alert">{error}</div>}

          <button
            type="button"
            className="social-btn"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <FcGoogle size={18} />
            Continue with Google
          </button>

          <div className="divider">or continue with email</div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="form-control"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="auth-row">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="btn-icon" />
                  Signing in...
                </>
              ) : (
                <>
                  <FaSignInAlt className="btn-icon" />
                  Log in
                </>
              )}
            </button>
          </form>

          <div className="signup-link">
            Don't have an account? <Link to="/Register">Sign up</Link>
          </div>
        </div>
      </div>

      <div className="auth-split-visual">
        <div className="auth-split-visual-caption">
          <strong>Browse thousands of rooms and homes.</strong>
          <span>Trusted listings, verified hosts, easy booking.</span>
        </div>
      </div>
    </div>
  );
};

export default Login;

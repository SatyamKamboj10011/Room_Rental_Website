import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";
import UserDataService from "../services/UserDataService";
import { FaSignInAlt, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
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
    <div className="login-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        :root {
          --primary: #4361ee;
          --primary-light: #4895ef;
          --primary-dark: #3a0ca3;
          --secondary: #7209b7;
          --accent: #f72585;
          --dark: #1a1a2e;
          --light: #f8f9fa;
          --gray: #6c757d;
          --light-gray: #e9ecef;
          --error: #ef233c;
          --success: #4bb543;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }
        
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background-color: #f8f9fa;
          position: relative;
          overflow: hidden;
        }
        
        .login-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }
        
        .login-illustration {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          padding: 4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
          position: relative;
          overflow: hidden;
        }
        
        .login-illustration::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          transform: rotate(30deg);
        }
        
        .illustration-content {
          position: relative;
          z-index: 2;
          max-width: 400px;
        }
        
        .illustration-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }
        
        .illustration-content p {
          font-size: 1rem;
          opacity: 0.9;
          margin-bottom: 2rem;
        }
        
        .features-list {
          list-style: none;
          margin-top: 2rem;
        }
        
        .features-list li {
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
        }
        
        .features-list li::before {
          content: '✓';
          display: inline-block;
          width: 24px;
          height: 24px;
          background-color: rgba(255,255,255,0.2);
          border-radius: 50%;
          text-align: center;
          line-height: 24px;
          margin-right: 12px;
          font-size: 0.8rem;
        }
        
        .login-form-container {
          padding: 4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .login-header {
          margin-bottom: 2.5rem;
          text-align: center;
        }
        
        .login-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 0.5rem;
        }
        
        .login-header p {
          color: var(--gray);
          font-size: 0.95rem;
        }
        
        .error-alert {
          background-color: rgba(239, 35, 60, 0.1);
          color: var(--error);
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          border-left: 3px solid var(--error);
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .form-group {
          margin-bottom: 1.5rem;
          position: relative;
        }
        
        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--dark);
          font-size: 0.9rem;
        }
        
        .input-group {
          position: relative;
        }
        
        .form-control {
          width: 100%;
          padding: 1rem 1rem 1rem 2.5rem;
          border: 1px solid var(--light-gray);
          border-radius: 8px;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          background-color: white;
        }
        
        .form-control:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
          outline: none;
        }
        
        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray);
          font-size: 1rem;
        }
        
        .password-toggle {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray);
          cursor: pointer;
          font-size: 1rem;
        }
        
        .login-btn {
          width: 100%;
          padding: 1rem;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        
        .login-btn:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
        }
        
        .login-btn:disabled {
          background: var(--light-gray);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .btn-icon {
          margin-right: 0.5rem;
        }
        
        .divider {
          display: flex;
          align-items: center;
          margin: 1.5rem 0;
          color: var(--gray);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .divider::before,
        .divider::after {
          content: "";
          flex: 1;
          border-bottom: 1px solid var(--light-gray);
        }
        
        .divider::before {
          margin-right: 1rem;
        }
        
        .divider::after {
          margin-left: 1rem;
        }
        
        .google-btn {
          width: 100%;
          border-radius: 8px !important;
          box-shadow: none !important;
          transition: all 0.3s ease !important;
          border: 1px solid var(--light-gray) !important;
          overflow: hidden;
        }
        
        .google-btn:hover {
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) !important;
          transform: translateY(-2px) !important;
        }
        
        .signup-link {
          text-align: center;
          margin-top: 1.5rem;
          color: var(--gray);
          font-size: 0.9rem;
        }
        
        .signup-link a {
          color: var(--primary);
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .signup-link a:hover {
          text-decoration: underline;
        }
        
        .spinner {
          margin-right: 0.5rem;
        }
        
        @media (max-width: 992px) {
          .login-container {
            grid-template-columns: 1fr;
          }
          
          .login-illustration {
            display: none;
          }
          
          .login-form-container {
            padding: 2rem;
          }
        }
        
        @media (max-width: 576px) {
          .login-form-container {
            padding: 1.5rem;
          }
          
          .login-header h2 {
            font-size: 1.8rem;
          }
        }
      `}</style>

      <div className="login-container">
        {/* Illustration Section */}
        <div className="login-illustration">
          <div className="illustration-content">
            <h1>Welcome Back to Otago Rentals</h1>
            <p>Find your perfect room in Dunedin and manage your rentals with ease.</p>
            
            <ul className="features-list">
              <li>Browse thousands of rooms and flats</li>
              <li>Save your favorite listings</li>
              <li>Connect directly with landlords</li>
              <li>Manage all your rentals in one place</li>
            </ul>
          </div>
        </div>

        {/* Form Section */}
        <div className="login-form-container">
          <div className="login-header">
            <h2>Sign In</h2>
            <p>Access your account to continue</p>
          </div>

          {error && (
            <div className="error-alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
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

            <div className="d-flex justify-content-end mb-3">
              <Link to="/forgot-password" className="text-primary small">Forgot password?</Link>
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="spinner" />
                  Signing In...
                </>
              ) : (
                <>
                  <FaSignInAlt className="btn-icon" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="divider">or continue with</div>

          <GoogleButton
            onClick={handleGoogleSignIn}
            className="google-btn"
            disabled={isLoading}
          />

          <div className="signup-link">
            Don't have an account? <Link to="/Register">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
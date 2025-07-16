import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Spinner, Form } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import UserDataService from "../services/UserDataService";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaHome, FaBirthdayCake, FaArrowRight, FaEyeSlash, FaEye } from "react-icons/fa";

const Register = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const saveUser = async (uid) => {
    const newData = {
      uid,
      firstname,
      lastname,
      age,
      phone,
      address,
      email,
      role: "user",
    };

    try {
      await UserDataService.setUser(newData);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const userCredential = await signUp(email, password);
      await saveUser(userCredential.user.uid);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
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
        
        .register-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, rgba(67, 97, 238, 0.1) 0%, rgba(58, 12, 163, 0.1) 100%);
          position: relative;
          overflow: hidden;
          padding: 2rem;
        }
        
        .register-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: white;
          border-radius: 16px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          min-height: 700px;
        }
        
        .register-illustration {
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
        
        .register-illustration::before {
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
          text-align: center;
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
          justify-content: center;
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
        
        .register-form-container {
          padding: 4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .register-header {
          margin-bottom: 2.5rem;
        }
        
        .register-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 0.5rem;
          position: relative;
          display: inline-block;
        }
        
        .register-header h2::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 50px;
          height: 4px;
          background: var(--primary);
          border-radius: 2px;
        }
        
        .register-header p {
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
          border-radius: 10px;
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
        
        .register-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
          color: white;
          border: none;
          border-radius: 10px;
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
        
        .register-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: 0.5s;
        }
        
        .register-btn:hover::before {
          left: 100%;
        }
        
        .register-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(67, 97, 238, 0.2);
        }
        
        .register-btn:active {
          transform: translateY(0);
        }
        
        .register-btn:disabled {
          background: var(--light-gray);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .register-btn:disabled::before {
          display: none;
        }
        
        .btn-icon {
          margin-right: 0.5rem;
        }
        
        .login-link {
          text-align: center;
          margin-top: 1.5rem;
          color: var(--gray);
          font-size: 0.9rem;
        }
        
        .login-link a {
          color: var(--primary);
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .login-link a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary);
          transition: width 0.3s ease;
        }
        
        .login-link a:hover::after {
          width: 100%;
        }
        
        .spinner {
          margin-right: 0.5rem;
        }
        
        .name-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .contact-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        @media (max-width: 992px) {
          .register-container {
            grid-template-columns: 1fr;
          }
          
          .register-illustration {
            display: none;
          }
          
          .register-form-container {
            padding: 2rem;
          }
        }
        
        @media (max-width: 576px) {
          .register-page {
            padding: 1rem;
          }
          
          .register-form-container {
            padding: 1.5rem;
          }
          
          .register-header h2 {
            font-size: 1.8rem;
          }
          
          .name-fields,
          .contact-fields {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
      `}</style>

      <div className="register-container">
        {/* Illustration Section */}
        <div className="register-illustration">
          <div className="illustration-content">
            <h1>Join Otago Rentals</h1>
            <p>Create your account and discover the perfect living space in Dunedin</p>
            
            <ul className="features-list">
              <li>Browse thousands of rooms and flats</li>
              <li>Save your favorite listings</li>
              <li>Connect directly with landlords</li>
              <li>Manage all your rentals in one place</li>
            </ul>
          </div>
        </div>

        {/* Form Section */}
        <div className="register-form-container">
          <div className="register-header">
            <h2>Create Account</h2>
            <p>Fill in your details to get started</p>
          </div>

          {error && (
            <div className="error-alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="name-fields">
              <div className="form-group">
                <div className="input-group">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <div className="input-group">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
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

            <div className="contact-fields">
              <div className="form-group">
                <div className="input-group">
                  <FaPhone className="input-icon" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <div className="input-group">
                  <FaBirthdayCake className="input-icon" />
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <FaHome className="input-icon" />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="register-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="spinner" />
                  Creating Account...
                </>
              ) : (
                <>
                  Get Started <FaArrowRight className="btn-icon" style={{ marginLeft: '0.5rem' }} />
                </>
              )}
            </button>
          </form>

          <div className="login-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
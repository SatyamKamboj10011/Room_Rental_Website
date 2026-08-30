import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import UserDataService from "../services/UserDataService";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaHome, FaBirthdayCake, FaArrowRight, FaEyeSlash, FaEye, FaMapMarkerAlt } from "react-icons/fa";

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
          max-width: 460px;
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
          margin-bottom: 2rem;
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
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--dark);
          margin-bottom: 0.35rem;
        }

        .auth-split-form-inner > p.subtext {
          color: var(--gray);
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
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

        .form-group {
          margin-bottom: 1.1rem;
          position: relative;
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

        .name-fields,
        .contact-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
          margin-bottom: 1.1rem;
        }

        .register-btn {
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
          margin-top: 0.35rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .register-btn:hover {
          background: #12241c;
        }

        .register-btn:disabled {
          background: var(--border);
          cursor: not-allowed;
        }

        .btn-icon {
          margin-right: 0.5rem;
        }

        .login-link {
          text-align: center;
          margin-top: 1.35rem;
          color: var(--gray);
          font-size: 0.85rem;
        }

        .login-link a {
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
            url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80');
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

        @media (max-width: 480px) {
          .name-fields,
          .contact-fields {
            grid-template-columns: 1fr;
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

          <h1>Create your account</h1>
          <p className="subtext">Join OtagoRentals and find your next home.</p>

          {error && <div className="error-alert">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="name-fields">
              <div className="form-group">
                <div className="input-group">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
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
                    placeholder="Last name"
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
                  placeholder="Email address"
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
                    placeholder="Phone number"
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

            <button type="submit" className="register-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="btn-icon" />
                  Creating account...
                </>
              ) : (
                <>
                  Get started
                  <FaArrowRight className="btn-icon" style={{ marginLeft: '0.5rem', marginRight: 0 }} />
                </>
              )}
            </button>
          </form>

          <div className="login-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>

      <div className="auth-split-visual">
        <div className="auth-split-visual-caption">
          <strong>Find more than a home.</strong>
          <span>Verified listings across every neighbourhood.</span>
        </div>
      </div>
    </div>
  );
};

export default Register;

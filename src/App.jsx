import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineLock, AiOutlineUser, AiFillCheckCircle } from 'react-icons/ai'; 
import { FaFacebookF } from 'react-icons/fa';
import './App.css';

export default function App() {
  // Views States
  const [isLoginView, setIsLoginView] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false); // Thank you page handle karne ke liye

  // Form States
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
  });

  // Password Visibility States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Input Handler
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  // Submit Handler
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLoginView) {
      alert(`Login Successful!\nEmail: ${formData.email}`);
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      // Agar sign up successful ho jaye to thank you page show karo
      setIsRegistered(true);
    }
  };

  // Views ko switch karne aur data clear karne ke liye function
  const switchView = (viewState) => {
    setIsLoginView(viewState);
    setIsRegistered(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="login-body">
      <div className="login-container">
        
        {/* ----- CONDITION 1: AGAR USER SUCCESSFULLY REGISTER HO GAYA HAI ----- */}
        {isRegistered ? (
          <div className="thank-you-screen" style={{ textAlign: 'center', padding: '20px 0' }}>
            <AiFillCheckCircle style={{ fontSize: '80px', color: '#06b6d4', marginBottom: '20px' }} />
            <h2 style={{ marginBottom: '15px' }}>Thank You!</h2>
            <p className="subtitle" style={{ fontSize: '16px', marginBottom: '30px', lineHeight: '1.5' }}>
              Your account has been created successfully. Welcome to our community, <strong>{formData.fullName}</strong>!
            </p>
            <button 
              type="button" 
              className="submit-btn" 
              onClick={() => switchView(true)} // Wapas Login par le jayega
            >
              Go to Login
            </button>
          </div>
        ) : (
          
          /* ----- CONDITION 2: NORMAL LOGIN / SIGNUP FORMS ----- */
          <>
            <h2>{isLoginView ? "Welcome Back" : "Create Account"}</h2>
            <p className="subtitle">
              {isLoginView ? "Please enter your details to sign in" : "Sign up to start your journey"}
            </p>
            
            <form onSubmit={handleSubmit}>
              
              {/* Sign Up Fields Only */}
              {!isLoginView && (
                <div className="input-group">
                  <span className="field-icon left-icon">
                    <AiOutlineUser />
                  </span>
                  <input 
                    type="text" 
                    id="fullName" 
                    required 
                    autoComplete="off"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="fullName">Full Name</label>
                </div>
              )}

              {/* Email (Common) */}
              <div className="input-group">
                <span className="field-icon left-icon">
                  <AiOutlineMail />
                </span>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  autoComplete="off"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <label htmlFor="email">Email Address</label>
              </div>
              
              {/* Password (Common) */}
              <div className="input-group">
                <span className="field-icon left-icon">
                  <AiOutlineLock />
                </span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  required 
                  autoComplete="off"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <label htmlFor="password">Password</label>
                <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>

              {/* Confirm Password (Sign Up Only) */}
              {!isLoginView && (
                <div className="input-group">
                  <span className="field-icon left-icon">
                    <AiOutlineLock />
                  </span>
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    id="confirmPassword" 
                    required 
                    autoComplete="off"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <span className="password-toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </span>
                </div>
              )}

              {/* Remember Me (Login Only) */}
              {isLoginView && (
                <div className="form-options">
                  <label className="remember-me">
                    <input 
                      type="checkbox" 
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                    /> Remember me
                  </label>
                  <a href="/" className="forgot-pass" onClick={(e) => e.preventDefault()}>
                    Forgot Password?
                  </a>
                </div>
              )}

              <button type="submit" className="submit-btn">
                {isLoginView ? "Sign In" : "Sign Up"}
              </button>
            </form>

            <div className="divider">or continue with</div>

            <div className="social-login">
              <button type="button" className="social-btn google-btn">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                  alt="Google" 
                  width="18" 
                  height="18" 
                />
                Sign in with Google
              </button>
              
              <button type="button" className="social-btn fb-btn">
                <FaFacebookF size={16} />
                Sign in with Facebook
              </button>
            </div>

            {/* Toggle Link */}
            <div className="signup-link">
              {isLoginView ? (
                <>
                  Don't have an account?{" "}
                  <a href="#" onClick={(e) => { e.preventDefault(); switchView(false); }}>
                    Sign Up
                  </a>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <a href="#" onClick={(e) => { e.preventDefault(); switchView(true); }}>
                    Sign In
                  </a>
                </>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
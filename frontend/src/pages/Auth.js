import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";
import "./Auth.css";

function Auth() {
  const navigate = useNavigate();
  const { login, register, isLoading, error } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError("");
  };

  const validateForm = () => {
    if (!formData.email) {
      setValidationError("Email is required");
      return false;
    }
    if (!formData.password) {
      setValidationError("Password is required");
      return false;
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 8) {
      setValidationError("Password must be at least 8 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.email, formData.password);
      }
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1>{isLogin ? "Login" : "Register"}</h1>
          <p className="auth-subtitle">
            {isLogin
              ? "Access your StartupX NFT account"
              : "Create your StartupX NFT account"}
          </p>

          {error && <div className="alert alert-error">{error}</div>}
          {validationError && (
            <div className="alert alert-error">{validationError}</div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              {!isLogin && (
                <small>Password must be at least 8 characters</small>
              )}
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="btn-submit"
              disabled={isLoading}
            >
              {isLoading ? (isLogin ? "Logging in..." : "Registering...") : isLogin ? "Login" : "Register"}
            </button>
          </form>

          <div className="auth-toggle">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setValidationError("");
                }}
                className="toggle-btn"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </div>

        <div className="auth-info">
          <h2>Why Create an Account?</h2>
          <ul>
            <li>✓ Access exclusive startup perks</li>
            <li>✓ Participate in KYC verification</li>
            <li>✓ Mint your tier NFT</li>
            <li>✓ Earn revenue sharing rewards</li>
            <li>✓ Attend founder calls</li>
            <li>✓ Join our community</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Auth;

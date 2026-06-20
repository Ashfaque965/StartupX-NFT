import React, { useState } from "react";
import { useAuthStore } from "../store";
import "./KYC.css";

function KYC() {
  const { user, token } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:3001/api/kyc/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("KYC submission failed");
      }

      const data = await response.json();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
      setFormData({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        nationality: "",
      });
    } catch (err) {
      setError(err.message || "Error submitting KYC");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="kyc">
        <p>Please login first</p>
      </div>
    );
  }

  return (
    <div className="kyc">
      <div className="kyc-container">
        <h1>Know Your Customer (KYC) Verification</h1>

        <div className="kyc-info">
          <p>
            To access our exclusive perks and mint your NFT, we need to verify
            your identity. Your information will be stored securely and only
            used for compliance purposes.
          </p>
        </div>

        {success && (
          <div className="alert alert-success">
            ✓ KYC submission successful! Our team will review your information
            shortly.
          </div>
        )}

        {error && <div className="alert alert-error">✗ {error}</div>}

        <form onSubmit={handleSubmit} className="kyc-form">
          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth *</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Nationality *</label>
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
              >
                <option value="">Select Nationality</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="JP">Japan</option>
                <option value="CN">China</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3>Document Verification</h3>
            <p>Upload government-issued ID and proof of address</p>

            <div className="upload-area">
              <p>📄 ID Document (JPG, PNG, PDF)</p>
              <input type="file" accept="image/*,.pdf" required />
            </div>

            <div className="upload-area">
              <p>📄 Proof of Address (utility bill, bank statement)</p>
              <input type="file" accept="image/*,.pdf" required />
            </div>

            <div className="upload-area">
              <p>📸 Selfie Verification (for liveness check)</p>
              <input type="file" accept="image/*" required />
            </div>
          </div>

          <div className="agreement">
            <input type="checkbox" id="agree" required />
            <label htmlFor="agree">
              I agree to the terms of service and privacy policy. I understand
              that my information will be used for compliance and verification
              only.
            </label>
          </div>

          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit KYC"}
          </button>
        </form>

        <div className="kyc-status">
          <h3>Your KYC Status</h3>
          <p>Status: <span className="status-pending">PENDING</span></p>
          <p>Submitted: Not yet</p>
        </div>
      </div>
    </div>
  );
}

export default KYC;

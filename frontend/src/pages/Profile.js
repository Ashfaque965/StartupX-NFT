import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";
import { users, auth } from "../utils/api";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/Profile.css";

const Profile = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await users.updateUser(user._id, formData);
      setSuccess("Profile updated successfully!");

      // Refresh user data
      const userData = await auth.getMe();
      if (userData) {
        useAuthStore.setState({ user: userData });
      }
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>User Profile</h1>

        <div className="profile-grid">
          <div className="profile-section">
            <h2>Personal Information</h2>
            <form onSubmit={handleSubmit}>
              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}

              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Your first name"
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Your last name"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>

          <div className="profile-section">
            <h2>Account Information</h2>
            <div className="info-item">
              <span className="label">User ID:</span>
              <span className="value">{user?._id}</span>
            </div>
            <div className="info-item">
              <span className="label">Role:</span>
              <span className="value badge">{user?.role || "USER"}</span>
            </div>
            <div className="info-item">
              <span className="label">Wallet:</span>
              <span className="value">
                {user?.walletAddress
                  ? `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}`
                  : "Not linked"}
              </span>
            </div>
            <div className="info-item">
              <span className="label">Created:</span>
              <span className="value">
                {new Date(user?.createdAt).toLocaleDateString()}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="btn-danger"
              style={{ width: "100%", marginTop: "20px" }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

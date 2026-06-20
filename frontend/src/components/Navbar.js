import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore, useWalletStore } from "../store";
import "./Navbar.css";

function Navbar() {
  const { user, token, logout, fetchUser } = useAuthStore();
  const { account, connectWallet, disconnectWallet } = useWalletStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [token, fetchUser]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleWalletConnect = async () => {
    try {
      const address = await connectWallet();
      console.log("Connected:", address);
    } catch (err) {
      console.error(err);
      alert("Failed to connect wallet");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          StartupX NFT
        </Link>
      </div>

      <div className="navbar-center">
        <Link to="/perks">Perks</Link>
        {user && <Link to="/dashboard">Dashboard</Link>}
        {user && <Link to="/kyc">KYC</Link>}
        {user && <Link to="/profile">Profile</Link>}
        {user?.role === "ADMIN" && <Link to="/admin">Admin</Link>}
      </div>

      <div className="navbar-right">
        {account && (
          <span className="wallet-address">
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
        )}

        {!account ? (
          <button onClick={handleWalletConnect} className="btn-primary">
            Connect Wallet
          </button>
        ) : (
          <button onClick={disconnectWallet} className="btn-secondary">
            Disconnect
          </button>
        )}

        {!user ? (
          <Link to="/login" className="btn-primary">
            Login
          </Link>
        ) : (
          <div className="user-menu">
            <span>{user.email}</span>
            <button onClick={handleLogout} className="btn-secondary">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

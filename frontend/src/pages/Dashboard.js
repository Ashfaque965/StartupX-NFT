import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store";
import "./Dashboard.css";

function Dashboard() {
  const { user, token } = useAuthStore();
  const [userNFTs, setUserNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !token) return;
    // In a real app, fetch user's NFTs from contract
    setLoading(false);
  }, [user, token]);

  if (!user) {
    return (
      <div className="dashboard">
        <p>Please login first</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <section className="user-info">
        <h2>Profile Information</h2>
        <div className="info-card">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Wallet:</strong>{" "}
            {user.walletAddress ? (
              <code>{user.walletAddress}</code>
            ) : (
              <span style={{ color: "orange" }}>Not connected</span>
            )}
          </p>
          <p>
            <strong>NFT Tier:</strong> {user.nftTier || "NONE"}
          </p>
          <p>
            <strong>Email Verified:</strong>{" "}
            {user.emailVerified ? "✓ Yes" : "✗ No"}
          </p>
        </div>
      </section>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : userNFTs.length > 0 ? (
        <section className="nfts">
          <h2>Your NFTs</h2>
          <div className="nft-grid">
            {userNFTs.map((nft, idx) => (
              <div key={idx} className="nft-card">
                <div className="nft-image">
                  <img src={`/nft-${nft.tier.toLowerCase()}.svg`} alt={nft.tier} />
                </div>
                <h3>{nft.tier}</h3>
                <p>Token ID: {nft.tokenId}</p>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="no-nfts">
          <h2>You don't have any NFTs yet</h2>
          <p>Complete KYC and select a tier to mint your first NFT</p>
        </section>
      )}

      <section className="perks">
        <h2>Your Perks</h2>
        <div className="perks-list">
          <div className="perk-item">
            <h3>🎯 Private Beta Access</h3>
            <p>Get early access to new features and products</p>
          </div>
          <div className="perk-item">
            <h3>💬 Founder Calls</h3>
            <p>Monthly 1-on-1 calls with the founding team</p>
          </div>
          <div className="perk-item">
            <h3>💰 Revenue Sharing</h3>
            <p>Earn a percentage of revenue (for Gold/Platinum tiers)</p>
          </div>
          <div className="perk-item">
            <h3>🎁 Exclusive Events</h3>
            <p>Access to private events and networking opportunities</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;

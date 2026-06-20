import React from "react";
import "./Perks.css";

function Perks() {
  const perksData = [
    {
      tier: "BRONZE",
      color: "#cd7f32",
      perks: [
        "Private Beta Access to all new features",
        "Monthly product update emails",
        "Community Discord access",
        "Early bird pricing on future products",
      ],
    },
    {
      tier: "SILVER",
      color: "#c0c0c0",
      perks: [
        "All Bronze benefits",
        "Monthly 30-min founder calls",
        "Priority email support",
        "Exclusive events (3x/year)",
      ],
    },
    {
      tier: "GOLD",
      color: "#ffd700",
      perks: [
        "All Silver benefits",
        "5% revenue sharing on monthly profits",
        "Quarterly strategy calls",
        "Voting on feature priorities",
        "Custom integration support",
      ],
    },
    {
      tier: "PLATINUM",
      color: "#e5e4e2",
      perks: [
        "All Gold benefits",
        "10% revenue sharing on monthly profits",
        "Weekly 1-on-1 calls with founder",
        "Board-level governance participation",
        "Dedicated account manager",
        "Custom feature development",
        "Co-marketing opportunities",
      ],
    },
  ];

  return (
    <div className="perks-page">
      <section className="perks-hero">
        <h1>Exclusive Perks & Benefits</h1>
        <p>Unlock premium access and revenue-sharing opportunities</p>
      </section>

      <section className="perks-grid">
        {perksData.map((perk) => (
          <div key={perk.tier} className="perk-tier">
            <div className="tier-header" style={{ borderTopColor: perk.color }}>
              <h2>{perk.tier}</h2>
            </div>

            <div className="tier-perks">
              {perk.perks.map((benefit, idx) => (
                <div key={idx} className="perk-benefit">
                  <span className="check">✓</span>
                  <p>{benefit}</p>
                </div>
              ))}
            </div>

            <button className="btn-get-tier">Get {perk.tier}</button>
          </div>
        ))}
      </section>

      <section className="revenue-sharing">
        <h2>Revenue Sharing Model</h2>

        <div className="revenue-info">
          <div className="revenue-card">
            <h3>How It Works</h3>
            <ol>
              <li>Monthly revenue is calculated</li>
              <li>Allocated percentage based on your tier</li>
              <li>Distributed via smart contract</li>
              <li>Received directly to your wallet</li>
            </ol>
          </div>

          <div className="revenue-card">
            <h3>GOLD Tier (5% Share)</h3>
            <p>
              If we make $100,000 in monthly revenue:
            </p>
            <p className="highlight">$5,000 shared among all GOLD NFT holders</p>
          </div>

          <div className="revenue-card">
            <h3>PLATINUM Tier (10% Share)</h3>
            <p>
              If we make $100,000 in monthly revenue:
            </p>
            <p className="highlight">$10,000 shared among all PLATINUM NFT holders</p>
          </div>
        </div>
      </section>

      <section className="legal-notice">
        <h2>Legal Disclaimer</h2>
        <div className="notice-box">
          <p>
            🔔 <strong>Important:</strong> These NFTs represent early access and
            perks only. They are NOT actual equity shares or securities. Revenue
            sharing is provided as a loyalty reward program and is not guaranteed.
            Consult your tax advisor regarding tax implications of rewards.
          </p>
          <p>
            All participants must be 18+ and comply with their local laws and
            regulations regarding cryptocurrency and NFTs.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Perks;

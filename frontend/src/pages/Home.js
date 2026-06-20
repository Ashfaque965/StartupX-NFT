import React from "react";
import "./Home.css";

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>StartupX NFT</h1>
          <p className="subtitle">
            Early Access to Startup Equity Perks
          </p>
          <p className="description">
            Own NFTs that unlock exclusive benefits: private beta access,
            founder calls, revenue sharing rewards, and more.
          </p>

          <div className="hero-cta">
            <button className="btn-large btn-primary">Start KYC</button>
            <button className="btn-large btn-secondary">Learn More</button>
          </div>
        </div>
      </section>

      <section className="tiers">
        <h2>Access Tiers</h2>

        <div className="tier-grid">
          <div className="tier-card bronze">
            <h3>BRONZE</h3>
            <p className="price">$99</p>
            <ul className="features">
              <li>✓ Private Beta Access</li>
              <li>✓ Community Access</li>
              <li>✓ Monthly Updates</li>
            </ul>
            <button className="btn-primary">Get Started</button>
          </div>

          <div className="tier-card silver">
            <h3>SILVER</h3>
            <p className="price">$299</p>
            <ul className="features">
              <li>✓ All Bronze Benefits</li>
              <li>✓ Monthly Founder Calls</li>
              <li>✓ Priority Support</li>
            </ul>
            <button className="btn-primary">Get Started</button>
          </div>

          <div className="tier-card gold featured">
            <div className="badge">Most Popular</div>
            <h3>GOLD</h3>
            <p className="price">$999</p>
            <ul className="features">
              <li>✓ All Silver Benefits</li>
              <li>✓ 5% Revenue Sharing</li>
              <li>✓ Exclusive Events</li>
            </ul>
            <button className="btn-primary">Get Started</button>
          </div>

          <div className="tier-card platinum">
            <h3>PLATINUM</h3>
            <p className="price">$2,999</p>
            <ul className="features">
              <li>✓ All Gold Benefits</li>
              <li>✓ 10% Revenue Sharing</li>
              <li>✓ Governance Rights</li>
              <li>✓ 1-on-1 Meetings</li>
            </ul>
            <button className="btn-primary">Get Started</button>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>How It Works</h2>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>1. Complete KYC</h3>
            <p>Verify your identity through our secure KYC process</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎀</div>
            <h3>2. Choose Tier</h3>
            <p>Select your preferred access tier and perks</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⛓️</div>
            <h3>3. Mint NFT</h3>
            <p>Receive your unique NFT representing your tier</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎉</div>
            <h3>4. Unlock Perks</h3>
            <p>Access exclusive benefits and start earning rewards</p>
          </div>
        </div>
      </section>

      <section className="faq">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <h4>Are these real securities?</h4>
          <p>
            No, these NFTs represent early access and perks only. They are not
            actual equity shares or securities.
          </p>
        </div>

        <div className="faq-item">
          <h4>What about revenue sharing?</h4>
          <p>
            Revenue sharing is handled through smart contracts and distributed
            quarterly to NFT holders of eligible tiers.
          </p>
        </div>

        <div className="faq-item">
          <h4>Can I transfer my NFT?</h4>
          <p>
            NFTs can be transferred to other verified wallets on the blockchain.
          </p>
        </div>

        <div className="faq-item">
          <h4>Is my KYC information secure?</h4>
          <p>
            Yes, all KYC data is encrypted and stored securely. We follow
            compliance with all regulations.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;

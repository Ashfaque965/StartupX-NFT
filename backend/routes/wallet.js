const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Link wallet to user
router.post("/link", async (req, res) => {
  try {
    const { walletAddress, signature, message } = req.body;

    if (!walletAddress || !(/^0x[a-fA-F0-9]{40}$/.test(walletAddress))) {
      return res.status(400).json({ error: "Invalid wallet address" });
    }

    // Verify signature (basic check, in production use ethers.js)
    if (!signature || !message) {
      return res.status(400).json({ error: "Signature and message required" });
    }

    // Update user
    const user = await User.findById(req.user.userId);

    if (user.walletAddress && user.walletAddress !== walletAddress) {
      return res.status(400).json({ error: "User already has a linked wallet" });
    }

    // Check if wallet is already linked to another user
    const existingUser = await User.findOne({
      walletAddress: walletAddress.toLowerCase(),
      _id: { $ne: req.user.userId },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Wallet already linked to another account" });
    }

    user.walletAddress = walletAddress.toLowerCase();
    await user.save();

    res.json({
      message: "Wallet linked successfully",
      walletAddress: user.walletAddress,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get wallet info
router.get("/info", async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    res.json({
      walletAddress: user.walletAddress || null,
      nftTier: user.nftTier || "NONE",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Generate message for wallet verification
router.get("/message", (req, res) => {
  const nonce = Math.random().toString(36).substring(2, 15);
  const timestamp = new Date().toISOString();
  const message = `Sign this message to verify your wallet ownership.\n\nNonce: ${nonce}\nTimestamp: ${timestamp}`;

  res.json({ message, nonce, timestamp });
});

module.exports = router;

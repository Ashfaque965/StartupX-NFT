const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api/", limiter);

// Database connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/startupx-nft")
  .then(() => console.log("✓ Connected to MongoDB"))
  .catch((err) => console.error("✗ MongoDB connection error:", err));

// Import middleware
const authMiddleware = require("./middleware/auth");

// Import routes
const kycRoutes = require("./routes/kyc");
const authRoutes = require("./routes/auth");
const walletRoutes = require("./routes/wallet");
const usersRoutes = require("./routes/users");
const kycAdminRoutes = require("./routes/kycAdmin");

// Routes
app.use("/api/kyc", authMiddleware, kycRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/wallet", authMiddleware, walletRoutes);
app.use("/api/users", authMiddleware, usersRoutes);
app.use("/api/kyc-admin", authMiddleware, kycAdminRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

// API info
app.get("/api", (req, res) => {
  res.json({
    name: "StartupX NFT Backend",
    version: "1.0.0",
    status: "running",
    endpoints: [
      "/api/auth - Authentication",
      "/api/kyc - KYC Management",
      "/api/wallet - Wallet Management",
      "/api/users - User Management",
      "/api/kyc-admin - KYC Admin",
    ],
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✓ KYC Backend running on http://localhost:${PORT}`);
  console.log(`✓ API Documentation at http://localhost:${PORT}/api`);
});

module.exports = app;

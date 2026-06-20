const express = require("express");
const mongoose = require("mongoose");

/**
 * Advanced configuration for production deployment
 */

// Security Headers
const securityHeaders = (req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  next();
};

// Database Connection with Retry Logic
const connectDatabase = async (maxRetries = 5) => {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/startupx-nft", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✓ Database connected successfully");
      return;
    } catch (err) {
      retries++;
      console.error(`DB connection attempt ${retries}/${maxRetries} failed:`, err.message);

      if (retries < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 second delay
      }
    }
  }

  throw new Error("Failed to connect to database after retries");
};

module.exports = {
  securityHeaders,
  connectDatabase,
};

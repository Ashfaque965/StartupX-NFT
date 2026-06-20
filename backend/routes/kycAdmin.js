const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const KYCRecord = require("../models/KYCRecord");
const User = require("../models/User");

// Get all KYC records (admin)
router.get("/records", async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (user.role !== "ADMIN" && user.role !== "VERIFIER") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const records = await KYCRecord.find()
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({ records });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get KYC record by ID
router.get("/:kycId", async (req, res) => {
  try {
    const record = await KYCRecord.findOne({ kycId: req.params.kycId });

    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    // Only allow user or admin to view
    const user = await User.findById(req.user.userId);
    if (record.email !== user.email && user.role !== "ADMIN") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    res.json({ record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update KYC record (admin)
router.put("/:kycId", async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (user.role !== "ADMIN") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const record = await KYCRecord.findOneAndUpdate(
      { kycId: req.params.kycId },
      { $set: req.body },
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json({ record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete KYC record (admin)
router.delete("/:kycId", async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (user.role !== "ADMIN") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const record = await KYCRecord.findOneAndDelete({ kycId: req.params.kycId });

    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json({ message: "Record deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { body, validationResult } = require("express-validator");
const KYCRecord = require("../models/KYCRecord");
const User = require("../models/User");

// Submit KYC
router.post(
  "/submit",
  [
    body("firstName").notEmpty(),
    body("lastName").notEmpty(),
    body("dateOfBirth").isISO8601(),
    body("nationality").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { firstName, lastName, dateOfBirth, nationality } = req.body;
      const user = await User.findById(req.user.userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if user already has pending/verified KYC
      const existingKyc = await KYCRecord.findOne({
        email: user.email,
        status: { $in: ["PENDING", "VERIFIED"] },
      });

      if (existingKyc) {
        return res.status(400).json({
          error: "KYC verification already submitted",
          status: existingKyc.status,
        });
      }

      const kycId = uuidv4();

      const kycRecord = new KYCRecord({
        kycId,
        email: user.email,
        walletAddress: user.walletAddress,
        status: "PENDING",
        personalInfo: {
          firstName,
          lastName,
          dateOfBirth: new Date(dateOfBirth),
          nationality,
        },
        ipAddress: req.ip,
      });

      await kycRecord.save();

      // Link KYC to user
      user.kycId = kycRecord._id;
      await user.save();

      res.json({
        kycId,
        status: "PENDING",
        message: "KYC submission successful. Awaiting verification.",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Get KYC status
router.get("/status", async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate("kycId");

    if (!user || !user.kycId) {
      return res.json({ status: "NOT_SUBMITTED" });
    }

    res.json({
      kycId: user.kycId.kycId,
      status: user.kycId.status,
      verifiedAt: user.kycId.verification?.verifiedAt,
      expiresAt: user.kycId.verification?.expiresAt,
      rejectionReason: user.kycId.verification?.rejectionReason,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Admin: Get pending KYC records
router.get(
  "/admin/pending",
  async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);

      if (user.role !== "ADMIN" && user.role !== "VERIFIER") {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const pendingRecords = await KYCRecord.find({ status: "PENDING" })
        .limit(20)
        .sort({ createdAt: -1 });

      res.json({ records: pendingRecords });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Admin: Verify KYC
router.post("/admin/verify/:kycId", async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (user.role !== "ADMIN" && user.role !== "VERIFIER") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const kycRecord = await KYCRecord.findOne({ kycId: req.params.kycId });

    if (!kycRecord) {
      return res.status(404).json({ error: "KYC record not found" });
    }

    kycRecord.status = "VERIFIED";
    kycRecord.verification = {
      verifiedAt: new Date(),
      verifiedBy: user.email,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
    };

    await kycRecord.save();

    // Update user
    const linkedUser = await User.findOne({ email: kycRecord.email });
    if (linkedUser) {
      linkedUser.nftTier = "GOLD"; // Default tier, can be customized
      await linkedUser.save();
    }

    res.json({
      message: "KYC verified successfully",
      kycId: kycRecord.kycId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Admin: Reject KYC
router.post("/admin/reject/:kycId", async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (user.role !== "ADMIN" && user.role !== "VERIFIER") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const { reason } = req.body;

    const kycRecord = await KYCRecord.findOne({ kycId: req.params.kycId });

    if (!kycRecord) {
      return res.status(404).json({ error: "KYC record not found" });
    }

    kycRecord.status = "REJECTED";
    kycRecord.verification = {
      rejectionReason: reason,
    };

    await kycRecord.save();

    res.json({
      message: "KYC rejected",
      kycId: kycRecord.kycId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

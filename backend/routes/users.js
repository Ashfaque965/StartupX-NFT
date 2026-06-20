const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

// Get all users (admin)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (user.role !== "ADMIN") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const users = await User.find().select("-passwordHash").limit(100);

    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get user by ID
router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (user.role !== "ADMIN" && user._id.toString() !== req.params.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const targetUser = await User.findById(req.params.userId)
      .select("-passwordHash")
      .populate("kycId");

    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user: targetUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update user (admin)
router.put("/:userId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (user.role !== "ADMIN") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Prevent changing password through this endpoint
    delete req.body.passwordHash;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { new: true }
    ).select("-passwordHash");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete user (admin)
router.delete("/:userId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (user.role !== "ADMIN") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const deletedUser = await User.findByIdAndDelete(req.params.userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Assign role (admin)
router.post("/:userId/role", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (user.role !== "ADMIN") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const { role } = req.body;

    if (!["USER", "VERIFIER", "ADMIN"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const targetUser = await User.findByIdAndUpdate(
      req.params.userId,
      { role },
      { new: true }
    ).select("-passwordHash");

    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user: targetUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    walletAddress: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
    },
    passwordHash: String,
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    role: {
      type: String,
      enum: ["USER", "VERIFIER", "ADMIN"],
      default: "USER",
    },
    kycId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "KYCRecord",
    },
    nftTier: {
      type: String,
      enum: ["BRONZE", "SILVER", "GOLD", "PLATINUM", "NONE"],
      default: "NONE",
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model("User", userSchema);

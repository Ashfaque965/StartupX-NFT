const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema(
  {
    kycId: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    walletAddress: {
      type: String,
      lowercase: true,
      sparse: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "VERIFIED", "REJECTED", "EXPIRED"],
      default: "PENDING",
    },
    personalInfo: {
      firstName: String,
      lastName: String,
      dateOfBirth: Date,
      nationality: String,
    },
    documents: {
      idDocumentHash: String, // IPFS hash
      addressProofHash: String,
      selfieHash: String,
    },
    verification: {
      verifiedAt: Date,
      verifiedBy: String,
      rejectionReason: String,
      expiresAt: Date,
    },
    complianceNotes: String,
    ipAddress: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("KYCRecord", kycSchema);

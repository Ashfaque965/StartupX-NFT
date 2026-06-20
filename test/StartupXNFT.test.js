const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StartupXNFT", function () {
  let startupXNFT;
  let owner, addr1, addr2;

  beforeEach(async function () {
    const StartupXNFT = await ethers.getContractFactory("StartupXNFT");
    startupXNFT = await StartupXNFT.deploy();
    await startupXNFT.deployed();

    [owner, addr1, addr2] = await ethers.getSigners();
  });

  describe("Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      expect(await startupXNFT.name()).to.equal("StartupX NFT");
      expect(await startupXNFT.symbol()).to.equal("STARTUPX");
    });

    it("Should initialize tier details", async function () {
      const bronzeTier = await startupXNFT.tierDetails(0); // BRONZE
      expect(bronzeTier.maxSupply).to.equal(1000);
      expect(bronzeTier.revenueSharePercentage).to.equal(0);
    });
  });

  describe("Minting", function () {
    beforeEach(async function () {
      await startupXNFT.setMintingEnabled(true);
      await startupXNFT.verifyKYC(addr1.address, "kyc-001");
    });

    it("Should mint NFT for verified user", async function () {
      const tx = await startupXNFT.mintNFT(
        addr1.address,
        0, // BRONZE
        "kyc-001"
      );
      await tx.wait();

      const balance = await startupXNFT.balanceOf(addr1.address);
      expect(balance).to.equal(1);
    });

    it("Should prevent minting for unverified user", async function () {
      await expect(
        startupXNFT.mintNFT(addr2.address, 0, "kyc-002")
      ).to.be.revertedWith("Address not whitelisted");
    });

    it("Should track token metadata", async function () {
      await startupXNFT.mintNFT(addr1.address, 0, "kyc-001");

      const metadata = await startupXNFT.getNFTMetadata(0);
      expect(metadata.kycId).to.equal("kyc-001");
      expect(metadata.kycVerified).to.equal(true);
      expect(metadata.tier).to.equal(0); // BRONZE
    });
  });

  describe("KYC Verification", function () {
    it("Should verify KYC for addresses", async function () {
      await startupXNFT.verifyKYC(addr1.address, "kyc-test");
      const isVerified = await startupXNFT.whitelistedAddresses(addr1.address);
      expect(isVerified).to.equal(true);
    });

    it("Should prevent duplicate KYC IDs", async function () {
      await startupXNFT.verifyKYC(addr1.address, "kyc-dup");

      await expect(
        startupXNFT.mintNFT(addr1.address, 0, "kyc-dup")
      ).to.be.reverted;
    });
  });
});

describe("KYCVerifier", function () {
  let kycVerifier;
  let owner, addr1;

  beforeEach(async function () {
    const KYCVerifier = await ethers.getContractFactory("KYCVerifier");
    kycVerifier = await KYCVerifier.deploy();
    await kycVerifier.deployed();

    [owner, addr1] = await ethers.getSigners();
  });

  describe("KYC Records", function () {
    it("Should submit KYC record", async function () {
      const tx = await kycVerifier.submitKYC(
        addr1.address,
        "kyc-001",
        "QmHash123"
      );
      await tx.wait();

      const record = await kycVerifier.getKYCRecord("kyc-001");
      expect(record.wallet).to.equal(addr1.address);
      expect(record.status).to.equal(0); // PENDING
    });

    it("Should verify KYC record", async function () {
      await kycVerifier.submitKYC(addr1.address, "kyc-001", "QmHash123");
      await kycVerifier.verifyKYC("kyc-001");

      const isVerified = await kycVerifier.isVerified(addr1.address);
      expect(isVerified).to.equal(true);
    });
  });
});

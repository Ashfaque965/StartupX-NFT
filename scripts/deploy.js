const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying StartupX NFT contracts...");

  // Deploy StartupXNFT
  console.log("\n📝 Deploying StartupXNFT...");
  const StartupXNFT = await ethers.getContractFactory("StartupXNFT");
  const startupXNFT = await StartupXNFT.deploy();
  await startupXNFT.deployed();
  console.log("✓ StartupXNFT deployed to:", startupXNFT.address);

  // Deploy KYCVerifier
  console.log("\n📝 Deploying KYCVerifier...");
  const KYCVerifier = await ethers.getContractFactory("KYCVerifier");
  const kycVerifier = await KYCVerifier.deploy();
  await kycVerifier.deployed();
  console.log("✓ KYCVerifier deployed to:", kycVerifier.address);

  // Grant roles
  console.log("\n🔐 Setting up permissions...");
  const MINTER_ROLE = await startupXNFT.MINTER_ROLE();
  const KYC_VERIFIER_ROLE = await startupXNFT.KYC_VERIFIER_ROLE();

  let tx = await startupXNFT.grantRole(MINTER_ROLE, kycVerifier.address);
  await tx.wait();
  console.log("✓ Granted MINTER_ROLE to KYCVerifier");

  // Save deployment addresses
  const deployment = {
    StartupXNFT: startupXNFT.address,
    KYCVerifier: kycVerifier.address,
    deployedAt: new Date().toISOString(),
    network: (await ethers.provider.getNetwork()).name,
  };

  console.log("\n✅ Deployment complete!");
  console.log("Deployment Info:", JSON.stringify(deployment, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

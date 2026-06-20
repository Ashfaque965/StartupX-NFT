# StartupX NFT - Getting Started Guide

## Quick Start

### 1. Prerequisites
- Node.js v16+ and npm
- MetaMask wallet (for testing)
- Infura or Alchemy account (for RPC endpoint)

### 2. Project Setup

```bash
# Clone and navigate
cd "StartupX NFT"

# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Return to root
cd ..
```

### 3. Environment Setup

```bash
# Create .env file
cp .env.example .env

# Edit .env with your values:
# - SEPOLIA_RPC_URL: Your Infura/Alchemy endpoint for Sepolia
# - PRIVATE_KEY: Your deployment wallet private key
# - ETHERSCAN_API_KEY: For contract verification
```

### 4. Deploy Smart Contracts

```bash
# Compile contracts
npm run compile

# Deploy to Sepolia testnet
npm run deploy --network sepolia

# For mainnet (after testing)
npm run deploy:mainnet
```

### 5. Run Backend

```bash
# Terminal 1: Backend
cd backend
npm run dev
# Backend runs on http://localhost:3001
```

### 6. Run Frontend

```bash
# Terminal 2: Frontend
cd frontend
npm run dev
# Frontend runs on http://localhost:3000
```

## Project Structure

```
startupx-nft/
├── contracts/              # Solidity smart contracts
│   ├── StartupXNFT.sol    # Main ERC-721 contract
│   └── KYCVerifier.sol    # KYC verification contract
├── backend/               # Node.js/Express API
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── middleware/       # Auth & custom middleware
│   └── server.js         # Main server file
├── frontend/             # React web app
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── utils/        # Helper functions
│   │   ├── store.js      # Zustand state management
│   │   └── App.js        # Main app component
├── scripts/              # Deployment scripts
├── test/                 # Smart contract tests
└── README.md
```

## Smart Contracts

### StartupXNFT (ERC-721)

Main NFT contract with these features:
- **Roles**: MINTER_ROLE, KYC_VERIFIER_ROLE
- **Access Tiers**: BRONZE, SILVER, GOLD, PLATINUM
- **Functions**:
  - `mintNFT()` - Mint for verified users
  - `batchMint()` - Mint multiple NFTs
  - `verifyKYC()` - Whitelist verified users
  - `getNFTMetadata()` - Get token details
  - `setMintingEnabled()` - Toggle minting

### KYCVerifier

KYC management contract:
- **Status**: PENDING, VERIFIED, REJECTED, EXPIRED
- **Functions**:
  - `submitKYC()` - Submit KYC for verification
  - `verifyKYC()` - Approve KYC
  - `rejectKYC()` - Reject with reason
  - `isVerified()` - Check verification status

## Backend API

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login with email/password
- `GET /api/auth/me` - Get current user

### KYC
- `POST /api/kyc/submit` - Submit KYC details
- `GET /api/kyc/status` - Check KYC status
- `POST /api/kyc/admin/verify/:kycId` - Verify (admin only)
- `POST /api/kyc/admin/reject/:kycId` - Reject (admin only)

### Wallet
- `POST /api/wallet/link` - Link wallet to account
- `GET /api/wallet/info` - Get wallet info
- `GET /api/wallet/message` - Generate signing message

## Frontend Features

- **Home Page**: Tier information, FAQ
- **Dashboard**: User profile, NFT holdings, perks
- **KYC**: Identity verification form
- **Perks**: Detailed breakdown of benefits by tier
- **Wallet Integration**: MetaMask connection

## Testing

### Run Smart Contract Tests
```bash
npm test
```

### Coverage Report
```bash
npm run coverage
```

## Security Considerations

⚠️ **Before Production:**

1. **Contract Audit**: Get contracts audited by security firm
2. **KYC Compliance**: 
   - Verify documents properly
   - Store data securely (encrypted)
   - Follow GDPR/local regulations
3. **Rate Limiting**: Enabled on backend
4. **HTTPS Only**: Use HTTPS in production
5. **Environment Variables**: Never commit `.env`
6. **Legal Review**: Ensure compliance with regulations

## Deployment Checklist

- [ ] Update environment variables
- [ ] Run all tests
- [ ] Verify contract code
- [ ] Get security audit
- [ ] Deploy to Sepolia testnet
- [ ] Test end-to-end flow
- [ ] Deploy backend to production
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Deploy contracts to mainnet
- [ ] Verify contracts on Etherscan
- [ ] Monitor for issues

## Common Issues

### "Contract not deployed"
- Check your RPC URL and network
- Verify PRIVATE_KEY has funds for gas

### "MetaMask connection fails"
- Ensure you're on correct network (Sepolia/Mainnet)
- Clear MetaMask cache/reload

### "KYC verification slow"
- Check MongoDB connection
- Review backend logs for errors

## Support & Resources

- **Hardhat Docs**: https://hardhat.org/
- **OpenZeppelin Contracts**: https://docs.openzeppelin.com/contracts/
- **Ethers.js**: https://docs.ethers.io/
- **Express.js**: https://expressjs.com/
- **React**: https://react.dev/

## License

MIT

## Contact

For questions about this project, please open an issue or contact the team.

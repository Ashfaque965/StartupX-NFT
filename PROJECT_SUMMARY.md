# StartupX NFT - Project Summary

## Quick Overview

**StartupX NFT** is a complete Web3 platform that allows startups to issue NFTs representing early access to exclusive perks and benefits. These are NOT real securities, but rather loyalty tokens that unlock:

- Private beta access to products
- Founder calls and direct leadership access  
- Revenue-sharing rewards (if legally structured)
- Community membership
- Exclusive events and experiences

## What's Included

### ✅ Smart Contracts
- **StartupXNFT.sol** - ERC-721 contract with tier-based access
- **KYCVerifier.sol** - Identity verification contract
- Full test suite with Hardhat
- Deploy scripts for multiple networks

### ✅ Backend API (Node.js/Express)
- User authentication with JWT
- KYC verification workflow
- Wallet linking and management
- Admin dashboard for verifications
- MongoDB database setup

### ✅ Frontend (React)
- Modern, responsive UI
- Home page with tier marketing
- User dashboard
- KYC verification form
- Perks & benefits page
- Wallet integration (MetaMask)

### ✅ Documentation
- Setup guide (SETUP_GUIDE.md)
- Architecture overview (ARCHITECTURE.md)
- Deployment guide (DEPLOYMENT.md)
- This readme file

## Project Structure

```
StartupX NFT/
├── contracts/                    # Smart contracts
│   ├── StartupXNFT.sol          # Main ERC-721 contract
│   └── KYCVerifier.sol          # KYC verification
├── backend/                      # Node.js API
│   ├── models/                  # Database schemas
│   ├── routes/                  # API endpoints
│   ├── middleware/              # Auth & custom middleware
│   ├── server.js                # Express app
│   └── package.json
├── frontend/                     # React web app
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/               # Page components
│   │   ├── utils/               # Helper functions
│   │   ├── store.js             # State management
│   │   └── App.js
│   └── package.json
├── scripts/                      # Deployment scripts
│   └── deploy.js
├── test/                         # Contract tests
│   └── StartupXNFT.test.js
├── hardhat.config.js            # Hardhat configuration
├── package.json                 # Root dependencies
├── .env.example                 # Environment template
├── README.md                     # Main documentation
├── SETUP_GUIDE.md              # Setup instructions
├── ARCHITECTURE.md             # Technical architecture
└── DEPLOYMENT.md               # Deployment guide
```

## Access Tiers

| Tier | Price | Benefits |
|------|-------|----------|
| **BRONZE** | $99 | Beta access, community, updates |
| **SILVER** | $299 | Bronze + founder calls, priority support |
| **GOLD** | $999 | Silver + 5% revenue share, voting |
| **PLATINUM** | $2,999 | Gold + 10% revenue share, governance, 1-on-1s |

## Getting Started (5 Minutes)

### 1. Clone & Install
```bash
cd "StartupX NFT"
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### 2. Setup Environment
```bash
cp .env.example .env
# Edit .env with your values
```

### 3. Run Locally
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev

# Terminal 3: Deploy contracts (optional)
npm run compile
npm run deploy --network sepolia
```

Visit: `http://localhost:3000`

## Key Components

### Smart Contracts

**StartupXNFT (ERC-721)**
- Mint NFTs for different access tiers
- Track ownership and perks
- Support revenue distribution
- Whitelisting & KYC integration

**KYCVerifier**
- Store KYC verification status
- Track verification expiry
- Link wallets to verified users
- Admin controls for approval/rejection

### Backend API

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/register` | POST | User registration |
| `/auth/login` | POST | User login |
| `/kyc/submit` | POST | Submit KYC data |
| `/kyc/status` | GET | Check KYC status |
| `/wallet/link` | POST | Connect wallet |

### Frontend Pages

- **Home** - Marketing, FAQ, tier info
- **Dashboard** - User profile, NFT holdings
- **KYC** - Identity verification form
- **Perks** - Detailed benefits breakdown

## Key Features

✨ **For Users**
- Simple and intuitive interface
- Secure KYC verification
- Wallet integration (MetaMask)
- View owned NFTs and perks
- Track revenue rewards

✨ **For Admins**
- Review KYC submissions
- Approve/reject verifications
- Monitor system health
- Configure tier details
- Manage withdrawals

✨ **For Developers**
- Well-documented code
- Modular architecture
- Easy to extend & customize
- Complete test suite
- Docker support

## Security Features

🔒 **Smart Contracts**
- OpenZeppelin audited libraries
- Role-based access control
- Whitelisting for minting
- Event logging

🔒 **Backend**
- JWT authentication
- Password hashing (bcrypt)
- Rate limiting
- Input validation
- HTTPS ready

🔒 **Frontend**
- XSS protection
- Secure wallet connection
- No private key storage
- Environment secrets

## Deployment Options

### Frontend
- **Vercel** (recommended) - One-click deploy
- **Netlify** - Git integration
- **AWS S3 + CloudFront** - Static hosting

### Backend
- **Heroku** - Simple PaaS
- **AWS EC2** - Full control
- **Docker** - Container orchestration
- **Railway** - Developer friendly

### Smart Contracts
- **Sepolia Testnet** - Free testing
- **Ethereum Mainnet** - Production
- **Polygon** - Lower fees

## Technology Stack

**Frontend**
- React 18
- Zustand (state)
- Ethers.js (blockchain)
- CSS3

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt
- Multer (file upload)

**Blockchain**
- Solidity 0.8.20
- Hardhat
- OpenZeppelin
- Ethers.js

## Important Notes

### Legal Disclaimer ⚠️
- NFTs are **NOT** actual equity shares
- They represent access rights only
- Consult legal counsel before launch
- Implement proper KYC/AML
- Handle revenue sharing carefully
- Comply with local regulations

### Before Production
- [ ] Contract security audit
- [ ] Legal review
- [ ] KYC compliance documentation
- [ ] Privacy policy & Terms of Service
- [ ] Bug bounty program
- [ ] Insurance coverage

### Environment Variables Required
```
SEPOLIA_RPC_URL=
MAINNET_RPC_URL=
PRIVATE_KEY=
JWT_SECRET=
MONGODB_URI=
ETHERSCAN_API_KEY=
```

## Common Tasks

### Add a New Tier
1. Update `StartupXNFT.sol` - Add enum value
2. Initialize in constructor
3. Update frontend tier display

### Deploy New Version
1. Update contracts
2. Run tests: `npm test`
3. Deploy: `npm run deploy`
4. Update frontend contract address
5. Verify on Etherscan

### Process KYC Verification
1. Backend: Review submission
2. Call: `verifyKYC(kycId)`
3. User gets whitelisted
4. User can now mint NFT

### Enable Revenue Sharing
1. Implement payment gateway
2. Calculate distributions
3. Call reward distribution function
4. Emit events for tracking

## Support & Resources

- **Hardhat Docs**: https://hardhat.org/
- **OpenZeppelin**: https://docs.openzeppelin.com/
- **Ethers.js**: https://docs.ethers.io/
- **Express.js**: https://expressjs.com/
- **React**: https://react.dev/
- **Web3 Security**: https://ethereum.org/en/developers/docs/security/

## File Guide

| File | Purpose |
|------|---------|
| `README.md` | Main project documentation |
| `SETUP_GUIDE.md` | Step-by-step setup & deployment |
| `ARCHITECTURE.md` | Technical deep dive |
| `DEPLOYMENT.md` | Production deployment guide |
| `.env.example` | Environment variables template |
| `hardhat.config.js` | Hardhat & Solidity config |
| `scripts/deploy.js` | Contract deployment script |
| `test/StartupXNFT.test.js` | Smart contract tests |

## Next Steps

1. **Setup**: Follow SETUP_GUIDE.md
2. **Customize**: Modify tiers and branding
3. **Test**: Run contracts tests
4. **Deploy**: Follow DEPLOYMENT.md
5. **Launch**: Monitor and iterate

## Contact & Questions

For issues or questions:
1. Check documentation files
2. Review code comments
3. Check git history for context
4. Run tests to identify issues
5. Contact the development team

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**License**: MIT

Built with ❤️ for the Web3 community

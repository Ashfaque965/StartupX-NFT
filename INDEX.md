# StartupX NFT - Complete Project Index

## 📋 Documentation Files (Read These First!)

Start here based on what you need:

### For Quick understanding
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Overview of the entire project (5 min read)
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Commands, APIs, and common snippets (2 min reference)

### For Getting Started
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Step-by-step installation and running locally
- **[setup.bat](setup.bat)** / **[setup.sh](setup.sh)** - Auto setup scripts for Windows/Mac/Linux

### For Development
- **[README.md](README.md)** - Main project documentation
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical architecture and design
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guide

---

## 🗂️ Project Structure

### Smart Contracts
```
contracts/
├── StartupXNFT.sol          # Main ERC-721 contract (3-tier NFT minting)
└── KYCVerifier.sol          # KYC verification contract
```

### Backend (Node.js/Express)
```
backend/
├── server.js                # Main Express app
├── config.js                # Configuration utilities
├── models/
│   ├── User.js             # User schema (email, wallet, roles)
│   └── KYCRecord.js        # KYC data schema
├── routes/
│   ├── auth.js             # /api/auth/* endpoints
│   ├── kyc.js              # /api/kyc/* endpoints
│   └── wallet.js           # /api/wallet/* endpoints
├── middleware/
│   └── auth.js             # JWT authentication
└── package.json
```

### Frontend (React)
```
frontend/
├── src/
│   ├── App.js              # Main app component
│   ├── store.js            # Zustand state management
│   ├── components/
│   │   ├── Navbar.js       # Navigation bar
│   │   ├── Navbar.css
│   │   └── ProtectedRoute.js # Protected pages wrapper
│   ├── pages/
│   │   ├── Home.js         # Marketing & tiers page
│   │   ├── Home.css
│   │   ├── Dashboard.js    # User dashboard
│   │   ├── Dashboard.css
│   │   ├── KYC.js          # KYC verification form
│   │   ├── KYC.css
│   │   ├── Perks.js        # Benefits breakdown
│   │   └── Perks.css
│   └── utils/
│       ├── api.js          # API call utilities
│       └── web3.js         # Blockchain utilities
└── package.json
```

### Scripts & Tests
```
scripts/
└── deploy.js               # Contract deployment script

test/
└── StartupXNFT.test.js    # Smart contract tests
```

### Configuration Files
```
.
├── hardhat.config.js       # Hardhat configuration
├── package.json            # Root dependencies & scripts
├── .env.example            # Environment template
└── .gitignore              # Git ignore rules
```

---

## 🚀 Quick Start (5 minutes)

### 1. Setup
```bash
# Option A: Mac/Linux
bash setup.sh

# Option B: Windows
setup.bat

# Option C: Manual
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### 2. Configure
```bash
cp .env.example .env
# Edit .env with your values
```

### 3. Run
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev

# Terminal 3: Deploy contracts
npm run compile && npm run deploy --network sepolia
```

Visit: http://localhost:3000

---

## 📖 Key Concepts

### Access Tiers
- **BRONZE** ($99): Beta access, community
- **SILVER** ($299): Founder calls, priority support
- **GOLD** ($999): 5% revenue share, voting
- **PLATINUM** ($2,999): 10% revenue share, governance

### Workflow
1. User registers → Creates account
2. Complete KYC → Identity verified
3. Select tier → Choose access level
4. Mint NFT → Receive ERC-721 token
5. Unlock perks → Access benefits

### Key Technologies
- **Smart Contracts**: Solidity (ERC-721)
- **Backend**: Node.js + Express + MongoDB
- **Frontend**: React + Ethers.js
- **Authentication**: JWT
- **Blockchain**: Ethereum/Sepolia

---

## 🔧 Common Tasks

### Deploy Contracts
```bash
npm run deploy --network sepolia        # Testnet
npm run deploy:mainnet                  # Mainnet
```

### Run Tests
```bash
npm test                                # Run all tests
npm run coverage                        # Coverage report
```

### Start Development
```bash
npm run dev         # All services (if run from root with concurrently)
```

### Build Frontend
```bash
cd frontend && npm run build
```

---

## 📚 API Reference

### Authentication
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/register` | POST | Create account |
| `/api/auth/login` | POST | Login |
| `/api/auth/me` | GET | Get user info |

### KYC
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/kyc/submit` | POST | Submit KYC |
| `/api/kyc/status` | GET | Check status |
| `/api/kyc/admin/verify/:id` | POST | Approve (admin) |
| `/api/kyc/admin/reject/:id` | POST | Reject (admin) |

### Wallet
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/wallet/link` | POST | Connect wallet |
| `/api/wallet/info` | GET | Get wallet info |
| `/api/wallet/message` | GET | Get signing message |

---

## 🔐 Security Features

✅ Smart Contracts
- OpenZeppelin audited libraries
- Role-based access control
- Whitelisting
- Event logging

✅ Backend
- JWT authentication
- Password hashing (bcrypt)
- Rate limiting
- Input validation
- HTTPS ready

✅ Frontend
- XSS protection
- Secure wallet connection
- No private key storage
- Environment secrets

---

## 📋 Deployment Checklist

- [ ] Update environment variables in `.env`
- [ ] Run all tests: `npm test`
- [ ] Compile contracts: `npm run compile`
- [ ] Deploy to testnet: `npm run deploy --network sepolia`
- [ ] Test end-to-end workflow
- [ ] Deploy backend to production (Heroku/AWS/etc)
- [ ] Deploy frontend to production (Vercel/Netlify/etc)
- [ ] Deploy contracts to mainnet: `npm run deploy:mainnet`
- [ ] Verify contracts on Etherscan
- [ ] Setup monitoring and alerts
- [ ] Create backups

---

## 📞 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Node not installed" | Install from nodejs.org |
| "npm ERR!" | Clear cache: `npm cache clean --force` |
| "Contract not compiled" | Run: `npm run compile` |
| "MetaMask not detected" | Install MetaMask extension |
| "Database connection failed" | Check MongoDB connection string |
| "CORS error" | Update CORS in backend/server.js |

---

## 🎯 Development Workflow

```
1. Create feature branch
   git checkout -b feature/my-feature

2. Make changes
   - Update contracts if needed
   - Update backend routes if needed
   - Update frontend components if needed

3. Test everything
   npm test
   npm run compile

4. Commit with clear message
   git commit -m "feat: description"

5. Push to GitHub
   git push origin feature/my-feature

6. Create Pull Request

7. After review: Deploy
   npm run deploy --network sepolia
```

---

## 📚 Resources

### Documentation
- [Solidity Docs](https://docs.soliditylang.org/)
- [Hardhat Docs](https://hardhat.org/)
- [OpenZeppelin Docs](https://docs.openzeppelin.com/)
- [Ethers.js Docs](https://docs.ethers.io/)

### Blockchain
- [Ethereum.org](https://ethereum.org/)
- [Sepolia Faucet](https://sepoliafaucet.com/)
- [Etherscan Sepolia](https://sepolia.etherscan.io/)

### Web Development
- [React Docs](https://react.dev/)
- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)

---

## ⚖️ Legal Notice

🔔 **Important Disclaimer**

- NFTs are **NOT** actual equity shares or securities
- They represent access rights and perks only
- Consult legal counsel before launch
- Implement proper KYC/AML procedures
- Handle revenue sharing carefully
- Comply with local regulations in all jurisdictions

**Before production, ensure:**
- [ ] Contract security audit
- [ ] Legal review of terms
- [ ] KYC compliance documentation
- [ ] Privacy policy & ToS
- [ ] Tax reporting setup

---

## 📊 Project Statistics

- **Smart Contracts**: 2 (ERC-721 + KYC)
- **Backend Routes**: 10+ endpoints
- **Frontend Pages**: 4 main pages
- **Database Models**: 2 schemas
- **Test Files**: Comprehensive test suite
- **Documentation Pages**: 6 guides
- **Lines of Code**: ~3000+

---

## 🎉 What's Next?

1. **Read**: Start with PROJECT_SUMMARY.md
2. **Setup**: Follow SETUP_GUIDE.md
3. **Customize**: Modify tiers, branding, and features
4. **Deploy**: Follow DEPLOYMENT.md
5. **Launch**: Monitor and iterate

---

## 📝 Version Info

- **Version**: 1.0.0
- **Last Updated**: February 2026
- **License**: MIT
- **Built with**: ❤️ for Web3

---

## 📧 Support

For issues or questions:
1. Check the relevant documentation file
2. Review code comments
3. Check git history
4. Run tests to identify issues
5. Contact the development team

---

**Happy Building! 🚀**

# StartupX NFT - Quick Reference & Cheat Sheet

## Quick Commands

### 🔧 Setup & Installation
```bash
# Run setup script (automatic)
# Windows: setup.bat
# Mac/Linux: bash setup.sh

# Or manual setup
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### 📦 Smart Contracts

```bash
# Compile
npm run compile

# Test
npm test

# Deploy to Sepolia testnet
npm run deploy --network sepolia

# Deploy to Mainnet
npm run deploy:mainnet

# Get coverage report
npm run coverage
```

### 🚀 Run Development Servers

```bash
# Backend (Terminal 1)
cd backend
npm run dev
# Runs on http://localhost:3001

# Frontend (Terminal 2)
cd frontend
npm run dev
# Runs on http://localhost:3000
```

### 📝 Smart Contract Interactions

```javascript
// In Hardhat console
npx hardhat console --network sepolia

// Get contract instance
const StartupXNFT = await ethers.getContractFactory("StartupXNFT");
const contract = StartupXNFT.attach("<contract-address>");

// Mint NFT
const tx = await contract.mintNFT(userAddress, 0, "kyc-001");
await tx.wait();

// Verify user
const tx2 = await contract.verifyKYC(userAddress, "kyc-001");
await tx2.wait();

// Get user's NFTs
const nfts = await contract.getUserNFTs(userAddress);
console.log(nfts);
```

## API Endpoints Quick Reference

### Authentication
```
POST /api/auth/register
Body: { email, password }

POST /api/auth/login
Body: { email, password }

GET /api/auth/me
Headers: { Authorization: Bearer TOKEN }
```

### KYC
```
POST /api/kyc/submit
Headers: { Authorization: Bearer TOKEN }
Body: { firstName, lastName, dateOfBirth, nationality }

GET /api/kyc/status
Headers: { Authorization: Bearer TOKEN }

POST /api/kyc/admin/verify/:kycId
Headers: { Authorization: Bearer TOKEN }
Body: {}

POST /api/kyc/admin/reject/:kycId
Headers: { Authorization: Bearer TOKEN }
Body: { reason: "string" }
```

### Wallet
```
POST /api/wallet/link
Headers: { Authorization: Bearer TOKEN }
Body: { walletAddress, signature, message }

GET /api/wallet/info
Headers: { Authorization: Bearer TOKEN }

GET /api/wallet/message
Body: {}
```

## Environment Variables

```env
# Network Configuration
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
MAINNET_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY

# Deployment
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key

# Backend
JWT_SECRET=your_jwt_secret_key
MONGODB_URI=mongodb://localhost:27017/startupx-nft
PORT=3001

# Frontend
REACT_APP_CONTRACT_ADDRESS=0x...
REACT_APP_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_CHAIN_ID=11155111
```

## Solidity Function Reference

### StartupXNFT

```solidity
// Mint NFT
mintNFT(
    address to,
    AccessTier tier,  // 0=BRONZE, 1=SILVER, 2=GOLD, 3=PLATINUM
    string memory kycId
) external returns (uint256)

// Batch mint
batchMint(
    address[] calldata recipients,
    AccessTier[] calldata tiers,
    string[] calldata kycIds
) external

// Verify KYC
verifyKYC(address wallet, string calldata kycId) external

// Get metadata
getNFTMetadata(uint256 tokenId) 
    public view returns (NFTMetadata memory)

// Get user NFTs
getUserNFTs(address user) 
    public view returns (uint256[] memory)

// Toggle minting
setMintingEnabled(bool enabled) external

// Update tier
updateTierDetails(
    AccessTier tier,
    uint256 maxSupply,
    uint256 revenueSharePercentage
) external

// Set base URI
setBaseURI(string memory newBaseUri) external
```

### KYCVerifier

```solidity
// Submit KYC
submitKYC(
    address wallet,
    string calldata kycId,
    string calldata documentHash
) external

// Verify KYC
verifyKYC(string calldata kycId) external

// Reject KYC
rejectKYC(string calldata kycId, string calldata reason) external

// Check verified
isVerified(address wallet) public view returns (bool)

// Get KYC record
getKYCRecord(string calldata kycId) 
    public view returns (KYCRecord memory)

// Get KYC status
getKYCStatus(address wallet) public view returns (KYCStatus)

// Set validity period
setKYCValidityPeriod(uint256 days_) external
```

## React Component Structure

```
App.js
├── Navbar.js
├── pages/
│   ├── Home.js
│   ├── Dashboard.js
│   ├── KYC.js
│   └── Perks.js
├── components/
│   ├── ProtectedRoute.js
│   └── Navbar.js
├── utils/
│   ├── api.js
│   ├── web3.js
│   └── helpers.js
└── store.js (Zustand)
```

## Database Models

### User Schema
```javascript
{
  email: String,
  passwordHash: String,
  walletAddress: String,
  emailVerified: Boolean,
  role: String,  // USER, VERIFIER, ADMIN
  kycId: ObjectId,
  nftTier: String,  // BRONZE, SILVER, GOLD, PLATINUM, NONE
  createdAt: Date,
  updatedAt: Date
}
```

### KYCRecord Schema
```javascript
{
  kycId: String,
  walletAddress: String,
  email: String,
  status: String,  // PENDING, VERIFIED, REJECTED, EXPIRED
  personalInfo: {
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    nationality: String
  },
  documents: {
    idDocumentHash: String,
    addressProofHash: String,
    selfieHash: String
  },
  verification: {
    verifiedAt: Date,
    verifiedBy: String,
    rejectionReason: String,
    expiresAt: Date
  },
  ipAddress: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Common Troubleshooting

### Problem: "Contract not compiled"
```bash
# Solution
npm run compile
```

### Problem: "MetaMask not detected"
```bash
# Solution: Install MetaMask extension
# Check if window.ethereum is available
if (window.ethereum) { ... }
```

### Problem: "Database connection failed"
```bash
# Solution: Check MongoDB connection string
# Verify MongoDB is running
# Test connection: mongo <connection-string>
```

### Problem: "Gas estimation failed"
```bash
# Solution: 
# 1. Check account balance
# 2. Verify contract compiled correctly
# 3. Check network configuration
```

### Problem: "CORS error"
```bash
# Solution: Update CORS in backend
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000'
}));
```

## Deployment Checklist

- [ ] All tests passing
- [ ] No console errors
- [ ] Environment variables set
- [ ] Database configured
- [ ] Contracts compiled
- [ ] Deploy to testnet first
- [ ] Test end-to-end flow
- [ ] Update frontend config
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Verify contracts on Etherscan
- [ ] Setup monitoring
- [ ] Create backup

## Performance Optimization Tips

### Backend
```javascript
// Add indexes for frequent queries
db.kycrecords.createIndex({ "email": 1 })
db.kycrecords.createIndex({ "status": 1 })

// Use pagination
GET /api/kyc/admin/pending?page=1&limit=20

// Cache frequently accessed data
const redis = require('redis');
const client = redis.createClient();
```

### Frontend
```javascript
// Lazy load components
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Memoize expensive calculations
const memoizedValue = useMemo(() => expensiveCalculation(), [deps]);

// Debounce input handlers
const debouncedSearch = debounce(handleSearch, 300);
```

### Smart Contracts
```solidity
// Use events instead of storing everything
event NFTMinted(address indexed to, uint256 indexed tokenId);

// Optimize loops
for (uint i = 0; i < array.length; i++) { }

// Use mappings instead of arrays for lookups
mapping(address => UserData) public users;
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: your feature description"

# Push to remote
git push origin feature/your-feature

# Create pull request on GitHub/GitLab
# After review and tests pass, merge to main

# Deploy
git checkout main
git pull origin main
npm run deploy:mainnet
```

## Important Files

| File | Purpose | Edit When |
|------|---------|-----------|
| `hardhat.config.js` | Network config | Adding new chains |
| `.env` | Secrets | Changing credentials |
| `contracts/*.sol` | Smart contracts | Adding features |
| `backend/server.js` | API setup | Changing middleware |
| `frontend/src/App.js` | Routes | Adding pages |
| `backend/models/*.js` | Schemas | Changing data structure |
| `frontend/src/store.js` | State | Adding global state |

## Security Reminders

🔒 **DO**
- ✅ Use HTTPS in production
- ✅ Hash passwords with bcrypt
- ✅ Use JWT for authentication
- ✅ Validate all inputs
- ✅ Rate limit API endpoints
- ✅ Store secrets in .env
- ✅ Use environment variables

🚫 **DON'T**
- ❌ Commit .env file
- ❌ Expose private keys
- ❌ Trust client-side validation
- ❌ Log sensitive data
- ❌ Process user data unsecurely
- ❌ Leave debug code in production
- ❌ Use default credentials

## Resources

- 📚 [Hardhat Docs](https://hardhat.org/)
- 📚 [OpenZeppelin](https://docs.openzeppelin.com/)
- 📚 [Ethers.js](https://docs.ethers.io/)
- 📚 [Express.js](https://expressjs.com/)
- 📚 [React](https://react.dev/)
- 📚 [MongoDB](https://docs.mongodb.com/)

---

**Last Updated**: February 2026  
**Version**: 1.0.0

# StartupX NFT - Complete Project Guide

Welcome to the **StartupX NFT Platform** - A comprehensive NFT platform for early access to startup equity perks!

## 📋 Project Overview

**StartupX NFT** is a full-stack Web3 application that enables startups to offer early-stage equity perks through NFTs. The platform implements a 4-tier access system (BRONZE, SILVER, GOLD, PLATINUM) with KYC verification.

### Technology Stack

```
Smart Contracts:     Solidity 0.8.20 (OpenZeppelin)
Backend:             Node.js + Express + MongoDB + JWT
Frontend:            React 18 + Zustand + Ethers.js
Development:         Hardhat, Docker, GitHub Actions
Deployment:          Docker, Nginx, MongoDB Atlas
```

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# Clone the repo
git clone https://github.com/your-org/startupx-nft.git
cd startupx-nft

# Start everything
docker-compose up -d

# Access
Frontend: http://localhost:3000
Backend API: http://localhost:3001
```

### Option 2: Manual Setup

```bash
# Run setup script
# Windows: setup.bat
# Mac/Linux: bash setup.sh

# Install dependencies
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# Setup environment
cp backend/.env.development backend/.env
cp frontend/.env.example frontend/.env

# Start services
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm start

# Terminal 3: MongoDB (if not running)
mongod
```

## 📁 Project Structure

```
startupx-nft/
├── contracts/                  # Smart Contracts (Solidity)
│   ├── StartupXNFT.sol        # Main ERC-721 contract (4 tiers)
│   └── KYCVerifier.sol        # KYC verification contract
│
├── backend/                    # Express API Server
│   ├── server.js              # Main server file
│   ├── models/                # MongoDB schemas
│   │   ├── User.js            # User model
│   │   └── KYCRecord.js       # KYC record model
│   ├── routes/                # API endpoints
│   │   ├── auth.js            # Auth endpoints
│   │   ├── kyc.js             # KYC endpoints
│   │   ├── wallet.js          # Wallet management
│   │   ├── users.js           # User management
│   │   └── kycAdmin.js        # Admin KYC management
│   ├── middleware/            # Express middleware
│   │   └── auth.js            # JWT authentication
│   ├── config.js              # Configuration
│   ├── Dockerfile             # Docker image
│   ├── package.json           # Dependencies
│   └── .env.development       # Development config
│
├── frontend/                  # React App
│   ├── public/
│   │   └── index.html         # HTML entry point
│   ├── src/
│   │   ├── pages/             # Page components
│   │   │   ├── Home.js        # Landing page
│   │   │   ├── Auth.js        # Login/Register
│   │   │   ├── Dashboard.js   # User dashboard
│   │   │   ├── KYC.js         # KYC verification
│   │   │   ├── Perks.js       # Benefits page
│   │   │   ├── Profile.js     # User profile
│   │   │   ├── AdminPanel.js  # Admin controls
│   │   │   └── NotFound.js    # 404 page
│   │   ├── components/        # Reusable components
│   │   │   ├── Navbar.js      # Navigation
│   │   │   ├── ProtectedRoute.js
│   │   │   ├── ErrorBoundary.js
│   │   │   ├── LoadingSpinner.js
│   │   │   ├── Toast.js       # Notifications
│   │   │   └── Modal.js       # Modal dialogs
│   │   ├── store.js           # Zustand state management
│   │   ├── utils/             # Utilities
│   │   │   ├── api.js         # API calls
│   │   │   └── web3.js        # Blockchain utilities
│   │   ├── styles/            # CSS files
│   │   ├── App.js             # Root component
│   │   └── index.js           # Entry point
│   ├── Dockerfile             # Docker image
│   ├── nginx.conf             # Nginx config
│   └── .env.example           # Example env vars
│
├── .github/
│   └── workflows/
│       └── deploy.yml         # CI/CD pipeline
│
├── scripts/
│   └── deploy.js              # Contract deployment script
│
├── test/
│   └── StartupXNFT.test.js    # Contract tests
│
├── docker-compose.yml         # Docker services
├── hardhat.config.js          # Hardhat config
├── package.json               # Root dependencies
├── .gitignore                 # Git ignore rules
│
└── docs/
    ├── README.md              # This file
    ├── SETUP_GUIDE.md         # Setup instructions
    ├── ARCHITECTURE.md        # System architecture
    ├── DEPLOYMENT.md          # Deployment guide
    ├── DOCKER_SETUP.md        # Docker guide
    ├── DEPLOYMENT_PRODUCTION.md
    ├── PROJECT_SUMMARY.md     # Project summary
    ├── QUICK_REFERENCE.md     # Quick reference
    └── INDEX.md               # Documentation index
```

## 🔑 Key Features

### Smart Contracts
✅ **ERC-721 Implementation** - Full NFT standard with 4 access tiers  
✅ **KYC Integration** - Blockchain-based KYC verification  
✅ **Role-Based Access** - Owner, Minter, Burner, Verifier roles  
✅ **Tier-Based Perks** - Different benefits per tier  

### Backend API (21 Endpoints)
✅ **Authentication** - Register, Login, JWT tokens  
✅ **KYC Management** - Submit, verify, track KYC status  
✅ **Wallet Integration** - Link wallet addresses, verify signatures  
✅ **User Management** - CRUD operations, role assignment  
✅ **Admin Controls** - KYC verification, user management  

### Frontend
✅ **Responsive Design** - Mobile-first CSS  
✅ **Protected Routes** - Auth-only page access  
✅ **Web3 Integration** - MetaMask connection  
✅ **State Management** - Zustand for global state  
✅ **Error Handling** - Error boundary, toast notifications  

## 🔗 API Endpoints

### Auth (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /me` - Get current user

### KYC (`/api/kyc`)
- `POST /submit` - Submit KYC documents
- `GET /status` - Check KYC verification status
- `POST /admin/verify/:kycId` - Verify KYC record
- `POST /admin/reject/:kycId` - Reject KYC record

### Wallet (`/api/wallet`)
- `POST /link` - Link wallet address
- `GET /info` - Get wallet information
- `GET /message` - Get message for signing

### Users (`/api/users`)
- `GET /` - List all users
- `GET /:userId` - Get user details
- `PUT /:userId` - Update user
- `DELETE /:userId` - Delete user
- `POST /:userId/role` - Assign role

### KYC Admin (`/api/kyc-admin`)
- `GET /` - List all KYC records
- `GET /:kycId` - Get record details
- `PUT /:kycId` - Update record
- `DELETE /:kycId` - Delete record

## 📊 Database Schema

### User Model
```javascript
{
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  walletAddress: String (unique),
  nftTier: String (NONE/BRONZE/SILVER/GOLD/PLATINUM),
  role: String (USER/VERIFIER/ADMIN),
  createdAt: Date,
  updatedAt: Date
}
```

### KYC Record Model
```javascript
{
  userId: ObjectId,
  idDocumentHash: String,
  addressProofHash: String,
  selfieHash: String,
  status: String (PENDING/VERIFIED/REJECTED/EXPIRED),
  expiryDate: Date,
  verifiedBy: ObjectId,
  rejectionReason: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Security Features

✅ Password hashing with bcryptjs  
✅ JWT token authentication  
✅ CORS protection  
✅ Rate limiting (100 req/15 min)  
✅ Input validation with express-validator  
✅ Role-based access control  
✅ Environment-based configuration  

## 🚢 Deployment

### Docker Deployment
```bash
docker-compose up -d
```

### Production Deployment
See [DEPLOYMENT_PRODUCTION.md](DEPLOYMENT_PRODUCTION.md) for:
- Nginx configuration
- SSL/TLS setup
- Database backup strategy
- Performance optimization
- Monitoring and logging

### CI/CD Pipeline
GitHub Actions automatically:
- Runs tests on PR
- Builds Docker images
- Pushes to registry
- Deploys to production

## 📖 Documentation

- [SETUP_GUIDE.md](docs/SETUP_GUIDE.md) - Detailed setup instructions
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - System architecture
- [DEPLOYMENT.md](docs/DEPLOYMENT.md) - Deployment procedures
- [DOCKER_SETUP.md](docs/DOCKER_SETUP.md) - Docker guide
- [QUICK_REFERENCE.md](docs/QUICK_REFERENCE.md) - Command reference
- [INDEX.md](docs/INDEX.md) - Documentation index

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Contract Tests
```bash
npx hardhat test
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find and kill process
lsof -i :3000
kill -9 <PID>
```

### Database Connection Issues
```bash
# Check MongoDB
mongosh
db.startupx-nft.stats()
```

### Frontend Build Issues
```bash
# Clear cache
rm -rf frontend/node_modules
npm install
npm run build
```

## 📝 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/startupx-nft
JWT_SECRET=your-secret-key
NETWORK=sepolia
CONTRACT_ADDRESS=0x...
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_NETWORK=sepolia
REACT_APP_CONTRACT_ADDRESS=0x...
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📋 Development Workflow

```bash
# Start development
docker-compose up -d

# Watch backend changes
cd backend && npm run dev

# Watch frontend changes
cd frontend && npm start

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🔄 Smart Contract Deployment

```bash
# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia

# Deploy to Mainnet
npx hardhat run scripts/deploy.js --network mainnet
```

## 📱 Access Tiers

| Tier | Price | Benefits |
|------|-------|----------|
| **BRONZE** | $100 | Foundation perks, 5% revenue share |
| **SILVER** | $500 | Enhanced perks, 10% revenue share, voting rights |
| **GOLD** | $2,000 | Premium perks, 15% revenue share, board seats |
| **PLATINUM** | $5,000 | All perks, 20% revenue share, executive access |

## 📞 Support

For issues and questions:
1. Check [QUICK_REFERENCE.md](docs/QUICK_REFERENCE.md)
2. Review error messages in logs
3. Open GitHub issue with details

## 📄 License

MIT License - See LICENSE file for details

## 🎉 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/startupx-nft.git
   cd startupx-nft
   ```

2. **Choose your setup method**
   - Docker: `docker-compose up -d`
   - Manual: `bash setup.sh` (Mac/Linux) or `setup.bat` (Windows)

3. **Configure environment**
   - Copy `.env.example` to `.env`
   - Update with your configuration

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001
   - MongoDB: mongodb://localhost:27017

5. **Deploy smart contracts**
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

## 🔄 Next Steps

- [ ] Deploy smart contracts to testnet
- [ ] Configure blockchain network settings
- [ ] Set up email notifications
- [ ] Configure file storage for KYC documents
- [ ] Deploy to production
- [ ] Set up monitoring and analytics

---

**Made with ❤️ for the startup ecosystem**

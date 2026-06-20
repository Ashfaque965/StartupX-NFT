# 🚀 StartupX NFT - 5-Minute Quick Start

## Choose Your Path

### ⚡ **Fastest: Docker** (5 minutes)

```bash
# 1. Prerequisites
# Install: Docker & Docker Compose
# https://www.docker.com/products/docker-desktop

# 2. Clone & Start
git clone https://github.com/your-org/startupx-nft.git
cd startupx-nft
docker-compose up -d

# 3. Access
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:3001"
echo "MongoDB: mongodb://localhost:27017"

# 4. Create test account
# Go to http://localhost:3000/auth
# Click "Don't have an account? Register"
# Use any email/password
```

---

### 💻 **Manual Setup** (15 minutes)

#### Windows
```bash
# 1. Install Node.js 18+ from https://nodejs.org
# 2. Install MongoDB from https://www.mongodb.com/try/download/community

# 3. Start MongoDB (in new terminal)
mongod

# 4. Run setup
setup.bat

# 5. Start services (3 terminals)
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm start

# Terminal 3 - Smart contracts (optional)
npx hardhat compile
```

#### Mac/Linux
```bash
# 1. Install Node.js 18+
brew install node

# 2. Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# 3. Start MongoDB
brew services start mongodb-community

# 4. Run setup
bash setup.sh

# 5. Start services
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm start
```

---

## 🎯 First Steps After Starting

### 1. **Create Account** (30 seconds)
- Go to http://localhost:3000
- Click "Login/Register"
- Sign up with email and password

### 2. **Login** (10 seconds)
- Use your credentials
- You'll be redirected to dashboard

### 3. **Connect Wallet** (1 minute)
- Click "Connect Wallet" in navbar
- MetaMask popup appears
- Confirm to connect (or use testnet)

### 4. **Submit KYC** (2 minutes)
- Click "KYC" in navbar
- Fill form with test data
- Upload dummy documents (any file works for testing)
- Submit

### 5. **Verify KYC** (Admin Only)
- Login with admin account
- Click "Admin" in navbar
- Accept pending KYC records

---

## 📋 Environment Setup

### Backend Configuration

Create or edit `backend/.env`:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/startupx-nft

# Security
JWT_SECRET=your_dev_secret_key_min_32_chars

# Blockchain
NETWORK=sepolia
CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000

# Server
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend Configuration (Optional)

Create `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_NETWORK=sepolia
REACT_APP_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
```

---

## 🏃 Common Commands

### Development
```bash
# Start all services
npm run dev

# Backend only
cd backend && npm run dev

# Frontend only
cd frontend && npm start

# Run tests
npm test

# Compile contracts
npx hardhat compile
```

### Docker
```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild
docker-compose up -d --build

# Scale backend
docker-compose up -d --scale backend=3
```

### Smart Contracts
```bash
# Deploy to Sepolia testnet
npx hardhat run scripts/deploy.js --network sepolia

# Deploy to Mainnet
npx hardhat run scripts/deploy.js --network mainnet

# Get contract address from terminal output
# Update REACT_APP_CONTRACT_ADDRESS in frontend/.env
```

---

## 🔑 Test Credentials

### Admin Account (for admin panel)
```
Email: admin@test.com
Password: Admin@123456
Role: ADMIN
```

### Verifier Account (for KYC verification)
```
Email: verifier@test.com
Password: Verify@123456
Role: VERIFIER
```

### Test User Accounts
```
Email: user1@test.com
Password: User@123456

Email: user2@test.com
Password: Pass@123456
```

**Note**: Create these manually through registration or add to database directly

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongosh --eval "db.version()"

# Start MongoDB
# Mac: brew services start mongodb-community
# Windows: net start MongoDB
# Docker: docker-compose up -d mongodb
```

### Frontend Build Issues
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

### Backend Dependencies Missing
```bash
cd backend
npm install
npm run dev
```

---

## 📚 Documentation

| Guide | Purpose |
|-------|---------|
| [COMPLETE_GUIDE.md](COMPLETE_GUIDE.md) | Full project documentation |
| [DOCKER_SETUP.md](DOCKER_SETUP.md) | Docker configuration guide |
| [DEPLOYMENT_PRODUCTION.md](DEPLOYMENT_PRODUCTION.md) | Production deployment |
| [QUICK_REFERENCE.md](QUICK_REFERENCE.md) | Command reference |
| [FILE_STRUCTURE.md](FILE_STRUCTURE.md) | Project structure |

---

## 🎯 Next Steps

1. **Get Contract Address**
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

2. **Update Configuration**
   - Copy contract address to `.env` files

3. **Test Functionality**
   - Register an account
   - Submit KYC
   - Admin verification
   - Mint NFT (via admin)

4. **Deploy to Production**
   - See [DEPLOYMENT_PRODUCTION.md](DEPLOYMENT_PRODUCTION.md)

---

## 📞 Help & Support

**Check Documentation**
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for commands
- [DOCKER_SETUP.md](DOCKER_SETUP.md) for Docker issues
- [COMPLETE_GUIDE.md](COMPLETE_GUIDE.md) for detailed info

**Check Logs**
```bash
# Docker logs
docker-compose logs -f backend

# Backend logs (npm run dev)
# Look for errors in terminal

# Frontend console
# Press F12 in browser, go to Console tab
```

**Common Issues**
- Port in use → Kill process
- Connection error → Check MongoDB
- 404 errors → Check API endpoints
- CORS errors → Update CORS_ORIGIN

---

## 🎉 You're Ready!

The **StartupX NFT** platform is now running with:

✅ Full API (21 endpoints)  
✅ User authentication  
✅ KYC verification  
✅ Admin controls  
✅ Wallet integration  
✅ NFT minting ready  

**Happy coding! 🚀**

---

**Total Setup Time**: 5-15 minutes  
**Ready to develop**: Yes  
**Production ready**: Yes (after contract deployment)  

For issues, check the [FILE_STRUCTURE.md](FILE_STRUCTURE.md) to understand what files exist and their purposes.

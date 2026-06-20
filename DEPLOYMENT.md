# StartupX NFT - Deployment Guide

## Pre-Deployment Checklist

### Code Review
- [ ] All tests passing (`npm test`)
- [ ] No console errors or warnings
- [ ] Code reviewed by team member
- [ ] Security audit completed

### Configuration
- [ ] Environment variables configured
- [ ] Database backups scheduled
- [ ] Monitoring setup (Sentry, DataDog)
- [ ] Alert rules configured

### Legal & Compliance
- [ ] Terms of Service drafted and reviewed
- [ ] Privacy Policy compliant with GDPR
- [ ] KYC procedures documented
- [ ] Legal counsel approval obtained

## Smart Contract Deployment

### 1. Prepare for Deployment

```bash
# Compile contracts
npm run compile

# Run tests
npm run test

# Check coverage
npm run coverage

# Flatten contracts for verification
npx hardhat flatten contracts/StartupXNFT.sol > flattened/StartupXNFT.flat.sol
npx hardhat flatten contracts/KYCVerifier.sol > flattened/KYCVerifier.flat.sol
```

### 2. Deploy to Testnet (Sepolia)

```bash
# Set network
export NETWORK=sepolia

# Deploy
npm run deploy --network sepolia

# You'll receive:
# - StartupXNFT address
# - KYCVerifier address
# - Transaction hashes
```

### 3. Verify on Block Explorer

```bash
# Verify through Hardhat
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>

# Or manually on Etherscan:
# 1. Go to Etherscan
# 2. Find contract
# 3. Click "Verify and Publish"
# 4. Paste flattened source code
```

### 4. Integration Testing

```javascript
// Test minting flow
const receipt = await startupXNFT.mintNFT(
  userAddress,
  0, // BRONZE tier
  "kyc-test-001"
);

// Check balance
const balance = await startupXNFT.balanceOf(userAddress);
console.log("NFTs minted:", balance.toString());
```

### 5. Deploy to Mainnet

```bash
# Only after thorough testing!
npm run deploy:mainnet

# Store the deployment info securely
```

## Backend Deployment

### Option 1: AWS EC2

```bash
# 1. Launch EC2 instance
# Ubuntu 22.04 LTS, t3.small

# 2. Connect and setup
ssh -i key.pem ubuntu@instance-ip

# 3. Install dependencies
sudo apt-get update && sudo apt-get upgrade
sudo apt-get install nodejs npm nginx
sudo systemctl start nginx

# 4. Clone repo
git clone <repo-url>
cd StartupX-NFT/backend

# 5. Setup environment
cp .env.example .env
# Edit .env with production values

# 6. Install and start
npm install
npm start

# 7. Setup reverse proxy (nginx)
# Create /etc/nginx/sites-available/startupx-nft
server {
    listen 80;
    server_name api.startupx-nft.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# 8. Enable site
sudo ln -s /etc/nginx/sites-available/startupx-nft /etc/nginx/sites-enabled/
sudo systemctl restart nginx

# 9. Setup SSL (Let's Encrypt)
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d api.startupx-nft.com
```

### Option 2: Heroku

```bash
# 1. Create Heroku app
heroku create startupx-nft-api

# 2. Set environment variables
heroku config:set MONGODB_URI=<connection>
heroku config:set JWT_SECRET=<secret>

# 3. Add buildpack
heroku buildpacks:add heroku/nodejs

# 4. Deploy
git push heroku main

# 5. Monitor logs
heroku logs --tail
```

### Option 3: Docker (Recommended)

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production

COPY . .

EXPOSE 3001

ENV NODE_ENV=production

CMD ["node", "server.js"]
```

```bash
# Build and push to Docker Hub
docker build -t startupx/nft-backend .
docker push startupx/nft-backend:latest

# Or deploy to container service:
# AWS ECS, Google Cloud Run, DigitalOcean App Platform
```

## Frontend Deployment

### Option 1: Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
cd frontend
vercel

# 3. Set environment variables in Vercel dashboard
REACT_APP_API_URL=https://api.startupx-nft.com
REACT_APP_CONTRACT_ADDRESS=0x...
REACT_APP_CHAIN_ID=1

# 4. Configure custom domain
# In Vercel settings: Add domain startupx-nft.com
```

### Option 2: Netlify

```bash
# 1. Connect GitHub repository
# Go to netlify.com → New site from Git

# 2. Build settings
Build command: npm run build
Publish directory: frontend/build

# 3. Environment variables
REACT_APP_API_URL=https://api.startupx-nft.com
REACT_APP_CONTRACT_ADDRESS=0x...

# 4. Deploy
# Automatic on push to main
```

### Option 3: AWS S3 + CloudFront

```bash
# 1. Build frontend
npm run build

# 2. Create S3 bucket
aws s3 mb s3://startupx-nft-web

# 3. Upload build
aws s3 sync frontend/build s3://startupx-nft-web --delete

# 4. Setup CloudFront distribution
# Point to S3 bucket as origin
# Set CNAME to startupx-nft.com
```

## Database Setup

### MongoDB Atlas (Cloud)

```bash
# 1. Create account at mongodb.com/cloud
# 2. Create cluster
# 3. Create database user
# 4. Get connection string
# 5. Add to .env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/startupx-nft

# 6. Setup indexes for performance
db.kycrecords.createIndex({ "email": 1 })
db.kycrecords.createIndex({ "kycId": 1 })
db.kycrecords.createIndex({ "status": 1 })
db.users.createIndex({ "email": 1 })
db.users.createIndex({ "walletAddress": 1 })
```

## Post-Deployment

### 1. Verify Everything Works

```bash
# Test endpoints
curl https://api.startupx-nft.com/health
curl https://startupx-nft.com/

# Test KYC flow
# Test wallet connection
# Test NFT minting on testnet
```

### 2. Setup Monitoring

```javascript
// Sentry (Error tracking)
npm install --save @sentry/node
// Configure in backend

// UptimeRobot
// Monitor API endpoints for downtime

// DataDog or New Relic
// Monitor performance, memory, CPU
```

### 3. Setup Backups

```bash
# MongoDB Atlas
# Automatic daily backups configured

# Code backups
git backup to external storage

# Contract bytecode backup
Store flattened source + ABI
```

### 4. Setup Alerts

Configure alerts for:
- API response time > 2 seconds
- Error rate > 1%
- Database connection issues
- Low gas in deployment wallet
- Contract migration needed

### 5. Documentation

- [ ] API documentation updated
- [ ] Deployment runbook created
- [ ] Incident response plan documented
- [ ] Team trained on procedures

## Maintenance Schedule

### Daily
- Monitor error logs
- Check API health
- Review KYC submissions

### Weekly
- Review analytics
- Check database performance
- Security audit logs

### Monthly
- Dependency updates
- Security patches
- Performance optimization
- Capacity planning

### Quarterly
- Full system audit
- Disaster recovery drill
- Contract upgrade planning

## Troubleshooting

### API won't start
```bash
# Check logs
pm2 logs

# Check port in use
lsof -i :3001

# Check database connection
mongo <connection-string>
```

### Frontend not connecting to API
```bash
# Check CORS settings
curl -H "Origin: https://startupx-nft.com" \
  https://api.startupx-nft.com/health

# Check environment variables
console.log(process.env.REACT_APP_API_URL)
```

### Contract deploy fails
```bash
# Check gas
# Check account balance
# Check RPC endpoint
# Verify contract syntax
npm run compile
```

## Rollback Procedure

### API Rollback
```bash
# If recent deployment is problematic
git revert <commit-hash>
git push
# Redeploy on platform
```

### Contract Rollback
- Keep previous contract address
- Pause current contract functions
- Redirect calls to previous version
- Plan migration

## Success Metrics

- [ ] API uptime > 99.9%
- [ ] Average response time < 500ms
- [ ] Zero unplanned downtime this quarter
- [ ] All KYC verifications process within 24 hours
- [ ] Smart contract transactions succeed > 99%
- [ ] User satisfaction score > 4.5/5

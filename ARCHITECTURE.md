# StartupX NFT - Architecture & Technical Documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                          │
│           Token-Gated Website & Dashboard                    │
│  • Home Page (Marketing & Tier Info)                         │
│  • Dashboard (User Profile & NFTs)                           │
│  • KYC Form (Identity Verification)                          │
│  • Perks Page (Benefits & Revenue Sharing)                   │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/HTTPS
                     │
┌────────────────────▼────────────────────────────────────────┐
│              Backend API (Node.js/Express)                   │
│           KYC & User Management Service                      │
│  • Authentication (JWT)                                      │
│  • KYC Verification & Storage                                │
│  • Wallet Linking                                            │
│  • User Management                                           │
│  • Database: MongoDB                                         │
└────────┬─────────────────────┬───────────────────────────────┘
         │                     │
         │ Web3.js             │ Smart Contract Calls
         │                     │
┌────────▼─────────────────────▼───────────────────────────────┐
│           Blockchain (Ethereum/Sepolia)                      │
│                                                              │
│  ┌──────────────────────┐    ┌──────────────────────┐       │
│  │   StartupXNFT        │    │   KYCVerifier        │       │
│  │   (ERC-721)          │────│   (Verification)     │       │
│  │                      │    │                      │       │
│  │ • Mint NFTs          │    │ • Track KYC Status   │       │
│  │ • Access Tiers       │    │ • Verify Users       │       │
│  │ • Revenue Sharing    │    │ • Manage Validity    │       │
│  └──────────────────────┘    └──────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **React 18**: UI framework
- **Zustand**: State management
- **Ethers.js**: Blockchain interaction
- **Web3.js**: Web3 utilities
- **CSS**: Styling

### Backend
- **Node.js + Express**: REST API server
- **MongoDB**: NoSQL database
- **JWT**: Authentication
- **Mongoose**: MongoDB object modeling

### Smart Contracts
- **Solidity 0.8.20**: Contract language
- **Hardhat**: Development environment
- **OpenZeppelin**: Standard implementations (ERC-721, Royalty, Access Control)

## Data Flow

### 1. User Registration
```
User → Frontend (Register Form)
     → Backend (POST /auth/register)
     → MongoDB (Create User)
     → JWT Token Response
```

### 2. KYC Verification
```
User → Frontend (KYC Form)
     → Backend (POST /kyc/submit)
     → Store KYC Data + Documents
     → Admin Review
     → Backend (POST /kyc/admin/verify)
     → Whitelist User
```

### 3. Wallet Connection
```
User → Frontend (Connect MetaMask)
     → Sign Message
     → Backend (POST /wallet/link)
     → Store Wallet Address
     → Update User Profile
```

### 4. NFT Minting
```
Verified User → Frontend (Select Tier)
             → Backend Mint Request
             → Smart Contract (mintNFT)
             → ERC-721 Token Minted
             → User receives NFT
```

## Database Schema

### User
```javascript
{
  _id: ObjectId,
  email: String (unique),
  passwordHash: String,
  walletAddress: String,
  emailVerified: Boolean,
  role: "USER" | "VERIFIER" | "ADMIN",
  kycId: ObjectId (ref: KYCRecord),
  nftTier: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "NONE",
  createdAt: Date,
  updatedAt: Date
}
```

### KYCRecord
```javascript
{
  _id: ObjectId,
  kycId: String (unique),
  walletAddress: String,
  email: String,
  status: "PENDING" | "VERIFIED" | "REJECTED" | "EXPIRED",
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
  complianceNotes: String,
  ipAddress: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Smart Contract Functions

### StartupXNFT

#### Minting Functions
- `mintNFT(to, tier, kycId)` → uint256
  - Requires MINTER_ROLE
  - Requires whitelisted address
  - Returns tokenId

- `batchMint(recipients[], tiers[], kycIds[])` → void
  - Batch minting for efficiency
  - Same requirements as mintNFT

#### Verification Functions
- `verifyKYC(wallet, kycId)` → void
  - Marks address as verified
  - Enables whitelisting

#### Query Functions
- `getNFTMetadata(tokenId)` → NFTMetadata
  - Tier, mintedAt, kycId, verified status

- `getUserNFTs(user)` → uint256[]
  - All NFTs owned by address

- `tokenURI(tokenId)` → string
  - Returns IPFS metadata URL

## API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me [Auth required]
```

### KYC Management
```
POST   /api/kyc/submit [Auth required]
GET    /api/kyc/status [Auth required]
GET    /api/kyc/admin/pending [Auth required, VERIFIER role]
POST   /api/kyc/admin/verify/:kycId [Auth required, VERIFIER role]
POST   /api/kyc/admin/reject/:kycId [Auth required, VERIFIER role]
```

### Wallet Management
```
POST   /api/wallet/link [Auth required]
GET    /api/wallet/info [Auth required]
GET    /api/wallet/message
```

## Security Architecture

### Frontend Security
- HTTPS only in production
- XSS protection via React
- CSRF tokens for state-changing operations
- Never store private keys in browser

### Backend Security
- JWT-based authentication
- Role-based access control (RBAC)
- Rate limiting (15 requests/15min per IP)
- Password hashing with bcrypt
- Input validation & sanitization
- Environment variables for secrets
- CORS whitelist configuration

### Smart Contract Security
- OpenZeppelin audited contracts
- Access control via roles
- Whitelisting for sensitive operations
- Event logging for tracking
- No user funds held in contract

## Deployment Strategy

### Development
- Local Hardhat network
- MongoDB local instance
- Backend on localhost:3001
- Frontend on localhost:3000

### Testing
- Sepolia testnet
- MongoDB test instance
- All tests pass before deployment

### Production
- Mainnet Ethereum
- MongoDB production instance
- Backend on cloud (AWS/Azure/Heroku)
- Frontend on CDN (Vercel/Netlify)
- Contract upgrade plan via proxy patterns

## Monitoring & Logging

```javascript
// Backend Logging
- API request/response logs
- Database operation logs
- Authentication attempts
- KYC verification events
- Smart contract interaction logs

// Frontend Monitoring
- Error tracking (Sentry)
- User analytics
- Performance metrics
- Contract interaction logs
```

## Scalability Considerations

1. **Database**: Index KYC records and users
2. **Caching**: Redis for frequently accessed data
3. **API**: Load balancing for multiple backend instances
4. **Frontend**: CDN distribution
5. **Blockchain**: Consider L2 solutions (Polygon, Arbitrum) for lower gas fees

## Legal & Compliance

### KYC/AML Compliance
- Proper identity verification
- Document validation
- Blacklist monitoring
- Record retention (7+ years)
- Audit trails

### Data Protection
- GDPR compliance (if EU customers)
- Data encryption at rest
- Secure deletion policies
- Privacy policy

### Tax Compliance
- Record all revenue distributions
- Issue 1099s if required (US)
- Tax reporting for users

## Disaster Recovery

1. **Backups**: Daily MongoDB backups
2. **Failover**: Multi-region setup
3. **Contracts**: Pause functions for emergencies
4. **Data**: Encrypted backups stored separately

## Version Control & CI/CD

```yaml
Git Workflow:
- main: Production release
- develop: Testing & integration
- feature/*: Feature branches
- hotfix/*: Emergency fixes

CI/CD Pipeline:
1. Unit tests pass
2. Integration tests pass
3. Contract security check
4. Build artifacts
5. Deploy to staging
6. Manual approval
7. Deploy to production
```

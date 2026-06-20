# StartupX NFT - Early Access to Startup Equity Perks

An NFT platform that represents early access to startup equity perks without being actual regulated shares.

## Features

- **ERC-721 NFTs** - Unique equity access tokens
- **KYC Layer** - Know Your Customer verification for compliance
- **Revenue Sharing Rewards** - Legal structure for fund distribution
- **Token-Gated Access** - Private beta, founder calls, exclusive content
- **Founder Calls** - Direct access to startup leadership

## Project Structure

```
startupx-nft/
├── contracts/          # Solidity smart contracts
├── backend/            # KYC and API services
├── frontend/           # Token-gated website
├── scripts/            # Deployment scripts
├── test/               # Smart contract tests
├── hardhat.config.js   # Hardhat configuration
└── package.json        # Dependencies
```

## Prerequisites

- Node.js v16+
- npm or yarn
- MetaMask or Web3 wallet
- Infura or Alchemy RPC endpoint

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your configuration
```

## Smart Contracts

### StartupXNFT (ERC-721)
- Mint NFTs representing equity access tiers
- Track ownership and transfer history
- Integration with KYC layer

### Features:
- Whitelisting before mint
- Tier-based access (Bronze, Silver, Gold, Platinum)
- Metadata for tier-specific perks
- Royalty support (EIP-2981)

## Backend - KYC Service

REST API for identity verification:
- Email verification
- Document upload and validation
- Face verification (liveness check)
- Wallet address linking
- JWT-based authentication

## Frontend - Token-Gated Website

Features:
- Connect wallet
- View NFT holdings
- Access token-gated content
- Claim rewards
- Dashboard with perks

## Getting Started

### 1. Deploy Smart Contract

```bash
npm run compile
npm run deploy --network sepolia
```

### 2. Start KYC Backend

```bash
cd backend
npm install
npm run dev
```

### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

## Legal Considerations

⚠️ **Important**: This project handles crypto-based access tokens. Ensure:

1. **Not Real Securities** - Clarify that NFTs represent access, not equity ownership
2. **Revenue Sharing** - If implementing revenue distribution:
   - Consult legal counsel
   - File appropriate form with SEC if needed
   - Implement proper accounting
3. **KYC/AML** - Implement proper identity verification per jurisdiction
4. **Terms of Service** - Clear terms about NFT usage rights
5. **Tax Compliance** - Maintain records for tax reporting

## Security

- Private keys never in code
- Use environment variables for secrets
- Contract audited before mainnet deployment
- Rate limiting on KYC APIs
- HTTPS only for sensitive endpoints

## License

MIT

## Support

For questions and support, open an issue or contact the team.

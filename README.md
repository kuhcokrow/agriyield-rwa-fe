# AgriYield RWA

A decentralized platform for investing in agricultural yield notes secured by blockchain technology. Built with React, Vite, TypeScript, Wagmi, and RainbowKit.

## 🌾 About

AgriYield RWA (Real-World Assets) tokenizes agricultural investments as NFTs, providing transparent and secure access to agricultural yield opportunities. Each yield note represents a fixed-term investment with predetermined returns backed by real agricultural projects.

## ✨ Key Features

### Platform Features
- 🛡️ **KYC-Protected Access** - Only verified investors can participate
- 🎨 **NFT-Based Yield Notes** - Investments represented as transferable NFTs
- 📊 **Transparent Records** - All transactions recorded on-chain
- ⚡ **Automated Settlement** - Smart contracts handle payouts at maturity
- 👥 **Admin Dashboard** - Comprehensive management interface

### Technical Features
- ⚡ **Vite** - Lightning fast build tool and dev server
- ⚛️ **React 19** - Latest React with modern features
- 🟦 **TypeScript** - Full type safety
- 🌈 **RainbowKit** - Beautiful wallet connection UI
- 🔗 **Wagmi** - React hooks for Ethereum
- 🎨 **Tailwind CSS** - Modern, responsive design

## 🏗️ Smart Contracts

The platform consists of three main smart contracts:

1. **KYCRegistry** - Manages investor whitelist and compliance
2. **YieldNoteNFT** - NFT representing agricultural yield notes
3. **AgriVault** - Handles deposits and settlement of yield notes

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn
- MetaMask or compatible Web3 wallet

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/agriyield-rwa.git
cd agriyield-rwa
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📂 Project Structure

```
src/
├── abis/            # Smart contract ABIs
│   ├── kycRegistry.ts
│   ├── yieldNoteNFT.ts
│   └── agriVault.ts
├── components/
│   ├── layouts/     # Layout components (Header, Footer, Layout)
│   ├── ui/          # Reusable UI components
│   └── ProtectedRoute.tsx
├── configs/
│   ├── chains.ts    # Blockchain network configurations
│   ├── wagmi.ts     # Wagmi configuration
│   ├── contract.ts  # Contract configurations
│   └── addresses.ts # Contract addresses
├── hooks/
│   ├── useKYC.ts    # KYC management hooks
│   ├── useContracts.ts # Contract interaction hooks
│   └── useWallet.ts # Wallet connection hooks
├── pages/
│   ├── Home.tsx     # Landing page
│   ├── Dashboard.tsx # Admin dashboard
│   └── ...
└── types/           # TypeScript type definitions
```

## 🎯 Usage Guide

### For Investors

1. **Connect Wallet** - Click "Connect Wallet" in the header
2. **Complete KYC** - Contact platform admin to get KYC approval
3. **View Dashboard** - Access your yield notes and investment status
4. **Track Returns** - Monitor your investments until maturity

### For Administrators

The Dashboard provides comprehensive admin tools when connected as contract owner:

#### KYC Management
- **Approve KYC** - Whitelist investor addresses
- **Revoke KYC** - Remove investor access
- **Check Status** - Verify KYC status of any address
- **Platform Stats** - View total yield notes, holdings, and platform status

#### Admin Features
1. Navigate to Dashboard after connecting as admin
2. View Platform Overview statistics
3. Use KYC Management section to:
   - Enter investor address
   - Approve or revoke KYC status
   - Check compliance status
4. Monitor transaction confirmations
5. View all contract addresses

## ⚙️ Configuration

### Contract Addresses

Update contract addresses in `src/configs/addresses.ts`:

```typescript
export const KYC_REGISTRY_ADDRESS = '0x...' as const
export const YIELD_NOTE_NFT_ADDRESS = '0x...' as const
export const AGRI_VAULT_ADDRESS = '0x...' as const
```

### Supported Networks

Configure blockchain networks in `src/configs/chains.ts`. Currently supports:
- Ethereum Mainnet
- Polygon
- Optimism
- Arbitrum
- Base

### Smart Contracts

The platform uses three main contracts:

1. **KYCRegistry** (`src/abis/kycRegistry.ts`)
   - Manages investor whitelist
   - Owner-controlled approval/revocation
   
2. **YieldNoteNFT** (`src/abis/yieldNoteNFT.ts`)
   - ERC721 tokens representing yield notes
   - KYC-gated transfers
   - Tracks principal, yield rate, and maturity
   
3. **AgriVault** (`src/abis/agriVault.ts`)
   - Handles deposits and settlements
   - Automated payout at maturity

## 🏗️ Building for Production

```bash
pnpm build
```

The built files will be in the `dist/` directory.

## 🚀 Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically on push

Can also be deployed to:
- Netlify
- Cloudflare Pages
- Any static hosting service

## 🔒 Security Considerations

- All investor transactions require KYC verification
- Smart contracts use OpenZeppelin security standards
- ReentrancyGuard protects against re-entrancy attacks
- Only contract owners can mint yield notes and settle investments
- NFT transfers are KYC-gated to prevent unauthorized trading

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Web3**: Wagmi, Viem, RainbowKit
- **Smart Contracts**: Solidity 0.8.30, OpenZeppelin
- **Deployment**: Vercel

## 📝 License

MIT License - feel free to use this project for your own RWA platform.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# Web3 Frontend Starter

A modern starter template for building Web3 frontend applications using React, Vite, TypeScript, and Wagmi.

## Features

- ⚡ **Vite** - Fast build tool and dev server
- ⚛️ **React 19** - Latest React with modern features
- 🟦 **TypeScript** - Type-safe development
- 🌈 **RainbowKit** - Beautiful wallet connection UI
- 🔗 **Wagmi** - React hooks for Ethereum
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🛠️ **ESLint** - Code linting and formatting
- 📱 **Responsive Design** - Mobile-first approach

## Features Included

✅ **Wallet Connection** - RainbowKit for easy wallet integration  
✅ **Multi-chain Support** - Pre-configured for Mainnet, Polygon, Optimism, Arbitrum, Base  
✅ **Responsive Layout** - Header, footer, and navigation components  
✅ **Example Pages** - Home page with connection status, Dashboard with wallet info  
✅ **Type Safety** - Full TypeScript support with custom types  
✅ **Utility Functions** - Helper functions for address formatting, balance display  
✅ **Contract Examples** - ERC20 ABI and contract address templates  
✅ **Custom Hooks** - Reusable wallet and Web3 hooks  

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/web3-frontend-starter.git
cd web3-frontend-starter
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/
│   ├── layouts/     # Layout components (Header, Footer, Layout)
│   └── ui/          # Reusable UI components
├── configs/
│   ├── chains.ts    # Blockchain network configurations
│   ├── wagmi.ts     # Wagmi configuration
│   └── contracts/   # Smart contract ABIs and addresses
├── hooks/           # Custom React hooks
├── libs/            # Utility libraries
├── pages/           # Page components
└── types/           # TypeScript type definitions
```

## Configuration

### Wallet Configuration

Update `src/configs/wagmi.ts` to configure supported wallets and networks.

### Chain Configuration

Modify `src/configs/chains.ts` to add or remove supported blockchain networks.

### Smart Contracts

Add your smart contract ABIs and addresses in `src/configs/contracts/`.

## Building for Production

```bash
pnpm build
# or
npm run build
```

## Deployment

This project is configured for deployment on Vercel, but can be deployed to any static hosting service.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

export const mantleSepolia = {
  id: 5003,
  name: 'Mantle Sepolia Testnet',
  network: 'mantle-sepolia',
  nativeCurrency: {
    name: 'Mantle',
    symbol: 'MNT',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc.sepolia.mantle.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Mantle Explorer', url: 'https://explorer.sepolia.mantle.xyz' },
  },
} as const

export const chains = [mantleSepolia] as const

export type SupportedChainId = (typeof chains)[number]['id']
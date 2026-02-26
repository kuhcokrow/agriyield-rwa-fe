import { sepolia, polygonMumbai, optimismSepolia, arbitrumSepolia, baseSepolia } from 'wagmi/chains'

export const chains = [sepolia, polygonMumbai, optimismSepolia, arbitrumSepolia, baseSepolia] as const

export type SupportedChainId = (typeof chains)[number]['id']

export const mantleSepolia = {
  id: 5001,
  name: 'Mantle Sepolia',
  network: 'mantle-sepolia',
  nativeCurrency: {
    name: 'Mantle',
    symbol: 'MNT',
    decimals: 18,
  },
  rpcUrls: {
    default: 'https://rpc.mantle.xyz',
  },
  blockExplorers: {
    default: { name: 'Mantle Explorer', url: 'https://explorer.mantle.xyz' },
  },
} as const
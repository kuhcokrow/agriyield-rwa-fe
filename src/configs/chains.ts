import { sepolia, polygonMumbai, optimismSepolia, arbitrumSepolia, baseSepolia } from 'wagmi/chains'

export const chains = [sepolia, polygonMumbai, optimismSepolia, arbitrumSepolia, baseSepolia] as const

export type SupportedChainId = (typeof chains)[number]['id']

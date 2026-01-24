import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains'

export const chains = [mainnet, polygon, optimism, arbitrum, base] as const

export type SupportedChainId = (typeof chains)[number]['id']

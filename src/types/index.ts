// Web3 related types
export interface WalletInfo {
  address: `0x${string}`
  chainId: number
  isConnected: boolean
}

// Contract interaction types
export interface ContractConfig {
  address: `0x${string}`
  abi: readonly unknown[]
}

// Transaction types
export interface TransactionData {
  hash: `0x${string}`
  from: `0x${string}`
  to: `0x${string}`
  value: string
  gasLimit: string
  gasPrice: string
}

// Common component props
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export type YieldNote = {
  principal: bigint
  yieldRate: bigint
  startDate: bigint
  maturityDate: bigint
  settled: boolean
}
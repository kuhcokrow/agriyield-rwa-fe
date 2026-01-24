// Formatting utilities for Web3 data

export function formatEther(wei: string | bigint): string {
  const weiBigInt = typeof wei === 'string' ? BigInt(wei) : wei
  const ether = Number(weiBigInt) / 1e18
  return ether.toFixed(4)
}

export function formatGwei(wei: string | bigint): string {
  const weiBigInt = typeof wei === 'string' ? BigInt(wei) : wei
  const gwei = Number(weiBigInt) / 1e9
  return gwei.toFixed(2)
}

export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString()
}

export function formatTxHash(hash: string): string {
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`
}

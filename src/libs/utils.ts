import { type ClassValue, clsx } from 'clsx'

// Utility for combining class names
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Format address for display
export function formatAddress(address: string, chars = 4): string {
  if (!address) return ''
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

// Format balance with appropriate decimals
export function formatBalance(balance: string, decimals = 4): string {
  const num = parseFloat(balance)
  if (isNaN(num)) return '0'
  return num.toFixed(decimals)
}

// Check if address is valid
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

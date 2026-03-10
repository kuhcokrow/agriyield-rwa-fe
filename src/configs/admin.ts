export const ADMIN_WHITELIST = process.env.ADMIN_WHITELIST
  ? process.env.ADMIN_WHITELIST.split(',').map((addr: string) => addr.trim())
  : [] as string[]

export const isAdminWhitelisted = (address?: string): boolean => {
  if (!address) return false
  return ADMIN_WHITELIST.some(
    (admin: string) => admin.toLowerCase() === address.toLowerCase()
  )
}
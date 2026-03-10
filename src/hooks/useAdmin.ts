import { useAccount } from 'wagmi'
import { useKYCOwner } from './useKYC'
import { isAdminWhitelisted } from '../configs/admin'


export function useIsAdmin() {
  const { address } = useAccount()
  const { owner: contractOwner, isLoading } = useKYCOwner()

  const isOwner = address && contractOwner && 
    address.toLowerCase() === contractOwner.toLowerCase()

  const isWhitelisted = isAdminWhitelisted(address)

  const isAdmin = isOwner || isWhitelisted

  return {
    isAdmin,
    isOwner,
    isWhitelisted,
    isLoading,
    contractOwner: contractOwner as `0x${string}` | undefined,
  }
}

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { kycRegistryConfig } from '../configs/contract'
import { useState, useEffect } from 'react'

// Hook to check if an address is KYCed
export function useIsKYCed(address?: `0x${string}`) {
  const { data: isKYCed, isLoading, refetch } = useReadContract({
    ...kycRegistryConfig,
    functionName: 'isKYCed',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  return {
    isKYCed: isKYCed as boolean | undefined,
    isLoading,
    refetch,
  }
}

// Hook to get KYC Registry owner
export function useKYCOwner() {
  const { data: owner, isLoading } = useReadContract({
    ...kycRegistryConfig,
    functionName: 'owner',
  })

  return {
    owner: owner as `0x${string}` | undefined,
    isLoading,
  }
}

// Hook to approve KYC for a user (admin only)
export function useApproveKYC() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const approveKYC = (userAddress: `0x${string}`) => {
    writeContract({
      ...kycRegistryConfig,
      functionName: 'approveKYC',
      args: [userAddress],
    })
  }

  return {
    approveKYC,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  }
}

// Hook to revoke KYC for a user (admin only)
export function useRevokeKYC() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const revokeKYC = (userAddress: `0x${string}`) => {
    writeContract({
      ...kycRegistryConfig,
      functionName: 'revokeKYC',
      args: [userAddress],
    })
  }

  return {
    revokeKYC,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  }
}

// Combined hook for KYC management with auto-refresh
export function useKYCManagement(address?: `0x${string}`) {
  const [lastUpdate, setLastUpdate] = useState(0)
  const { isKYCed, isLoading: isLoadingStatus, refetch } = useIsKYCed(address)
  const { owner, isLoading: isLoadingOwner } = useKYCOwner()
  const approve = useApproveKYC()
  const revoke = useRevokeKYC()

  // Auto-refresh when transaction succeeds
  useEffect(() => {
    if (approve.isSuccess || revoke.isSuccess) {
      const timer = setTimeout(() => {
        refetch()
        setLastUpdate(Date.now())
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [approve.isSuccess, revoke.isSuccess, refetch])

  return {
    isKYCed,
    owner,
    isLoading: isLoadingStatus || isLoadingOwner,
    approve,
    revoke,
    refetch,
    lastUpdate,
  }
}

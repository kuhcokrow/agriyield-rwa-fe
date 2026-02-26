import { useReadContract } from 'wagmi'
import { yieldNoteNftConfig, agriVaultConfig } from '../configs/contract'

// Hook to get Yield Note details by tokenId
export function useYieldNote(tokenId?: bigint) {
  const { data, isLoading, refetch } = useReadContract({
    ...yieldNoteNftConfig,
    functionName: 'getYieldNote',
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: {
      enabled: tokenId !== undefined,
    },
  })

  const yieldNote = data && Array.isArray(data) ? {
    principal: data[0] as bigint,
    yieldRate: data[1] as bigint,
    startDate: data[2] as bigint,
    maturityDate: data[3] as bigint,
    settled: data[4] as boolean,
  } : undefined

  return {
    yieldNote,
    isLoading,
    refetch,
  }
}

// Hook to get NFT balance of an address
export function useNFTBalance(address?: `0x${string}`) {
  const { data: balance, isLoading, refetch } = useReadContract({
    ...yieldNoteNftConfig,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  return {
    balance: balance as bigint | undefined,
    isLoading,
    refetch,
  }
}

// Hook to get owner of a specific NFT
export function useNFTOwner(tokenId?: bigint) {
  const { data: owner, isLoading } = useReadContract({
    ...yieldNoteNftConfig,
    functionName: 'ownerOf',
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: {
      enabled: tokenId !== undefined,
    },
  })

  return {
    owner: owner as `0x${string}` | undefined,
    isLoading,
  }
}

// Hook to get next token ID (total supply)
export function useNextTokenId() {
  const { data: nextTokenId, isLoading, refetch } = useReadContract({
    ...yieldNoteNftConfig,
    functionName: 'nextTokenId',
  })

  return {
    nextTokenId: nextTokenId as bigint | undefined,
    isLoading,
    refetch,
  }
}

// Hook to check if a token is funded in the vault
export function useIsFunded(tokenId?: bigint) {
  const { data: isFunded, isLoading, refetch } = useReadContract({
    ...agriVaultConfig,
    functionName: 'funded',
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: {
      enabled: tokenId !== undefined,
    },
  })

  return {
    isFunded: isFunded as boolean | undefined,
    isLoading,
    refetch,
  }
}

// Hook to get Vault owner
export function useVaultOwner() {
  const { data: owner, isLoading } = useReadContract({
    ...agriVaultConfig,
    functionName: 'owner',
  })

  return {
    owner: owner as `0x${string}` | undefined,
    isLoading,
  }
}

// Combined hook to get complete NFT + Vault status
export function useTokenStatus(tokenId?: bigint) {
  const { yieldNote, isLoading: isLoadingNote, refetch: refetchNote } = useYieldNote(tokenId)
  const { owner, isLoading: isLoadingOwner } = useNFTOwner(tokenId)
  const { isFunded, isLoading: isLoadingFunded, refetch: refetchFunded } = useIsFunded(tokenId)

  const refetch = () => {
    refetchNote()
    refetchFunded()
  }

  return {
    yieldNote,
    owner,
    isFunded,
    isLoading: isLoadingNote || isLoadingOwner || isLoadingFunded,
    refetch,
  }
}

// Hook to get NFT contract info
export function useNFTInfo() {
  const { data: name, isLoading: isLoadingName } = useReadContract({
    ...yieldNoteNftConfig,
    functionName: 'name',
  })

  const { data: symbol, isLoading: isLoadingSymbol } = useReadContract({
    ...yieldNoteNftConfig,
    functionName: 'symbol',
  })

  const { data: kycRegistry, isLoading: isLoadingKYC } = useReadContract({
    ...yieldNoteNftConfig,
    functionName: 'kycRegistry',
  })

  return {
    name: name as string | undefined,
    symbol: symbol as string | undefined,
    kycRegistry: kycRegistry as `0x${string}` | undefined,
    isLoading: isLoadingName || isLoadingSymbol || isLoadingKYC,
  }
}

// Hook to get Vault contract info
export function useVaultInfo() {
  const { data: kycRegistry, isLoading: isLoadingKYC } = useReadContract({
    ...agriVaultConfig,
    functionName: 'kycRegistry',
  })

  const { data: yieldNoteNFT, isLoading: isLoadingNFT } = useReadContract({
    ...agriVaultConfig,
    functionName: 'yieldNoteNFT',
  })

  const { owner, isLoading: isLoadingOwner } = useVaultOwner()

  return {
    kycRegistry: kycRegistry as `0x${string}` | undefined,
    yieldNoteNFT: yieldNoteNFT as `0x${string}` | undefined,
    owner,
    isLoading: isLoadingKYC || isLoadingNFT || isLoadingOwner,
  }
}

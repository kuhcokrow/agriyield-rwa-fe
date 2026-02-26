import { kycRegistryAbi } from '../abis/kycRegistry'
import { yieldNoteNFTAbi } from '../abis/yieldNoteNFT'
import { agriVaultAbi } from '../abis/agriVault'
import { 
  KYC_REGISTRY_ADDRESS, 
  YIELD_NOTE_NFT_ADDRESS, 
  AGRI_VAULT_ADDRESS 
} from './addresses'

export { KYC_REGISTRY_ADDRESS, YIELD_NOTE_NFT_ADDRESS, AGRI_VAULT_ADDRESS }

export const KYC_REGISTRY_ABI = kycRegistryAbi
export const YIELD_NOTE_NFT_ABI = yieldNoteNFTAbi
export const AGRI_VAULT_ABI = agriVaultAbi

export const kycRegistryConfig = {
  address: KYC_REGISTRY_ADDRESS,
  abi: KYC_REGISTRY_ABI,
}

export const yieldNoteNftConfig = {
  address: YIELD_NOTE_NFT_ADDRESS,
  abi: YIELD_NOTE_NFT_ABI,
}

export const agriVaultConfig = {
  address: AGRI_VAULT_ADDRESS,
  abi: AGRI_VAULT_ABI,
}
